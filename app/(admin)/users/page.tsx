import { prisma } from "@/app/lib/prisma";
import RoleBadge from "../../components/ui/RoleBadge";
import { RiUserLine } from "react-icons/ri";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Users
        </h1>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          Manage user accounts and role assignments
        </p>
      </div>

      {/* Desktop table */}
      <div
        className="hidden sm:block rounded-lg border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-subtle)",
              }}
            >
              {["Name", "Email", "Role", "Joined"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                style={{
                  borderBottom:
                    i < users.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      {(user.fullName ?? user.email)[0].toUpperCase()}
                    </div>
                    {user.fullName ?? "—"}
                  </div>
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role.name} />
                </td>
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div
            className="py-12 text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            <RiUserLine size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {users.length === 0 && (
          <p
            className="text-sm text-center py-8"
            style={{ color: "var(--text-tertiary)" }}
          >
            No users found
          </p>
        )}
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border p-4 space-y-2"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  {(user.fullName ?? user.email)[0].toUpperCase()}
                </div>
                <span
                  className="font-medium text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user.fullName ?? "—"}
                </span>
              </div>
              <RoleBadge role={user.role.name} />
            </div>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {user.email}
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: "var(--text-tertiary)" }}
            >
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}