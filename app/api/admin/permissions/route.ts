import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-guard";
import { z } from "zod";

const permSchema = z.object({ documentId: z.number(), roleId: z.number() });

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const perms = await prisma.documentPermission.findMany({
    include: { document: true, role: true },
  });
  return NextResponse.json(perms);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = permSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: body.error }, { status: 400 });

  const perm = await prisma.documentPermission.create({ data: body.data });
  return NextResponse.json(perm, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = permSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: body.error }, { status: 400 });

  await prisma.documentPermission.deleteMany({
    where: { documentId: body.data.documentId, roleId: body.data.roleId },
  });
  return NextResponse.json({ success: true });
}