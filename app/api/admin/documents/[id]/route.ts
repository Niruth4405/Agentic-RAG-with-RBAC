import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-guard";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const docId = parseInt(id);

  if (isNaN(docId)) {
    return NextResponse.json({ error: "Invalid document id" }, { status: 400 });
  }

  await prisma.document.delete({ where: { id: docId } });
  return NextResponse.json({ success: true });
}
