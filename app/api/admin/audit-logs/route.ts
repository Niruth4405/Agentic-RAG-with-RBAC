import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-guard";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;

  const logs = await prisma.auditLog.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } }, role: true, document: { select: { title: true } } },
  });
  const total = await prisma.auditLog.count();
  return NextResponse.json({ logs, total, page, totalPages: Math.ceil(total / limit) });
}