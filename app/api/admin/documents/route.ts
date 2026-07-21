import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-guard";
import { z } from "zod";

const createDocSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const docs = await prisma.document.findMany({
    include: { permissions: { include: { role: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  const body = createDocSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 });

  const doc = await prisma.document.create({
    data: { title: body.data.title, description: body.data.description },
  });
  return NextResponse.json(doc, { status: 201 });
}