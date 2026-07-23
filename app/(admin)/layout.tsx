import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminStatsBar from "../components/admin/AdminStatsBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || role !== "admin") {
    redirect("/login");
  }

  const [userCount, docCount, roleCount, queryCount] = await Promise.all([
    prisma.user.count(),
    prisma.document.count(),
    prisma.role.count(),
    prisma.auditLog.count({ where: { action: "query" } }),
  ]);

  const stats = { userCount, docCount, roleCount, queryCount };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <AdminNavbar userName={session.user?.name ?? "Admin"} />
      <AdminStatsBar stats={stats} />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}