import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import Providers from "@/app/components/Providers";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminStatsBar from "@/app/components/admin/AdminStatsBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) redirect("/login");
  const role = (session.user as any)?.role;
  if (role !== "admin") redirect("/");

  const [userCount, documentCount] = await Promise.all([
    prisma.user.count(),
    prisma.document.count(),
  ]);

  return (
    <Providers session={session}>
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <AdminNavbar />
        <AdminStatsBar stats={{ userCount, documentCount }} />
        <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </Providers>
  );
}