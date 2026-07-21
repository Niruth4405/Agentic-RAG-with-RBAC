import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/admin/users",       label: "Users" },
  { href: "/admin/documents",   label: "Documents" },
  { href: "/admin/permissions", label: "Permissions" },
  { href: "/admin/audit-logs",  label: "Audit Logs" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-neutral-200 bg-neutral-50 p-4 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Admin
        </p>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-200 transition"
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}