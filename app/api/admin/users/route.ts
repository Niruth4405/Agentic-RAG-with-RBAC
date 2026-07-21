import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-guard";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
  roleName: z.enum(["admin", "hr", "finance", "engineering"]),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = createUserSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 });

  const role = await prisma.role.findUnique({ where: { name: body.data.roleName } });
  if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });

  const passwordHash = await bcrypt.hash(body.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: body.data.email,
      passwordHash,
      fullName: body.data.fullName,
      roleId: role.id,
    },
    include: { role: true },
  });
  return NextResponse.json(user, { status: 201 });
}