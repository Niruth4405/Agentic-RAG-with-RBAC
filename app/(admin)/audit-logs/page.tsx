import { prisma } from "@/app/lib/prisma";
import { RiFileSearchLine } from "react-icons/ri";

export const dynamic = "force-dynamic";

const ACTION_STYLES: Record<string, { color: string; bg: string }> = {
  query:  { color: "var(--role-viewer)", bg: "rgba(95,168,211,0.12)" },
  upload: { color: "var(--accent)",      bg: "rgba(201,162,75,0.12)" },
  denied: { color: "var(--danger)",      bg: "rgba(248,113,113,0.12)" },
  login:  { color: "var(--success)",     bg: "rgba(52,211,153,0.12)" },
};

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user:     { select: { fullName: true, email: true } },
      role:     { select: { name: true } },
      document: { select: { title: true } },
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Audit Logs
        </h1>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          Last 100 system events across all users and roles
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
              {["Timestamp", "Actor", "Action", "Resource", "Allowed"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => {
              const style =
                ACTION_STYLES[log.action] ?? {
                  color: "var(--text-secondary)",
                  bg: "var(--surface-raised)",
                };
              return (
                <tr
                  key={log.id}
                  style={{
                    borderBottom:
                      i < logs.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {log.user?.fullName ?? log.user?.email ?? "System"}
                    {log.role && (
                      <span
                        className="ml-1 text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        ({log.role.name})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide"
                      style={{ color: style.color, background: style.bg }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {log.document?.title ??
                      log.queryText?.slice(0, 40) ??
                      "—"}
                  </td>
                  <td className="px-4 py-3">
                    {log.allowed === null ? (
                      <span style={{ color: "var(--text-tertiary)" }}>—</span>
                    ) : log.allowed ? (
                      <span style={{ color: "var(--success)" }}>✓ Yes</span>
                    ) : (
                      <span style={{ color: "var(--danger)" }}>✗ No</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div
            className="py-12 text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            <RiFileSearchLine size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No audit events recorded yet</p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {logs.length === 0 && (
          <p
            className="text-sm text-center py-8"
            style={{ color: "var(--text-tertiary)" }}
          >
            No events yet
          </p>
        )}
        {logs.map((log) => {
          const style =
            ACTION_STYLES[log.action] ?? {
              color: "var(--text-secondary)",
              bg: "var(--surface-raised)",
            };
          return (
            <div
              key={log.id}
              className="rounded-lg border p-4 space-y-2"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide"
                  style={{ color: style.color, background: style.bg }}
                >
                  {log.action}
                </span>
                {log.allowed !== null && (
                  <span
                    className="text-xs"
                    style={{
                      color: log.allowed
                        ? "var(--success)"
                        : "var(--danger)",
                    }}
                  >
                    {log.allowed ? "✓ Allowed" : "✗ Denied"}
                  </span>
                )}
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {log.user?.fullName ?? log.user?.email ?? "System"}
                {log.role && (
                  <span
                    className="font-normal text-xs ml-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    ({log.role.name})
                  </span>
                )}
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {log.document?.title ??
                  log.queryText?.slice(0, 60) ??
                  "—"}
              </p>
              <p
                className="text-xs font-mono"
                style={{ color: "var(--text-tertiary)" }}
              >
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
