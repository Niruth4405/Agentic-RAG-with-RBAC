"use server";

import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type CreateUserState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

const schema = z.object({
  fullName:  z.string().min(1).optional(),
  email:     z.string().email({ message: "Invalid email address" }),
  password:  z.string().min(6, { message: "Password must be at least 6 characters" }),
  roleName:  z.string().min(1, { message: "Role is required" }),
});

export async function createUserAction(
  _prev: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const raw = {
    fullName: formData.get("fullName") as string | undefined,
    email:    formData.get("email")    as string,
    password: formData.get("password") as string,
    roleName: formData.get("roleName") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { fullName, email, password, roleName } = parsed.data;

  try {
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) return { error: `Role "${roleName}" not found in database.` };

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "A user with that email already exists." };

    const passwordHash = await hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        fullName:     fullName ?? null,
        passwordHash,
        roleId:       role.id,
      },
    });

    revalidatePath("/users");
    return { success: true };
  } catch (err) {
    console.error("[create-user]", err);
    return { error: "Something went wrong. Please try again." };
  }
}