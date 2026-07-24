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

  const formData = await req.formData();
  const file        = formData.get("file") as File | null;
  const title       = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? "";
  const ownerId     = parseInt(formData.get("ownerId") as string);

  if (!file || !title) {
    return NextResponse.json({ error: "Missing file or title" }, { status: 400 });
  }

  // TODO: parse PDF → chunk text → generate embeddings → insert into pgvector
  const doc = await prisma.document.create({
    data: { title, description, ownerId },
  });

  return NextResponse.json(doc, { status: 201 });
}

