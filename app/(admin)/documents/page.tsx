import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import DocumentUploadForm from "../../components/admin/DocumentUploadForm";
import InlinePermissionToggle from "../../components/admin/InlinePermissionToggle";
import { RiFileTextLine } from "react-icons/ri";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const session = await auth();
  const adminId = parseInt((session?.user as any)?.id ?? "0");

  const [documents, roles] = await Promise.all([
    prisma.document.findMany({
      include: {
        permissions: { include: { role: true } },
        owner: { select: { fullName: true, email: true } },
        _count: { select: { chunks: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.role.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Documents
        </h1>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          Upload documents and manage role permissions — all in one place
        </p>
      </div>

      <DocumentUploadForm adminId={adminId} />

      {/* Desktop table */}
      <div
        className="hidden sm:block rounded-lg border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
              {["Document", "Owner", "Chunks", "Role Access", "Indexed"].map((h) => (
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
            {documents.map((doc, i) => {
              const grantedRoleIds = new Set(doc.permissions.map((p) => p.roleId));
              return (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: i < documents.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>
                    <div className="flex items-center gap-2">
                      <RiFileTextLine size={15} style={{ color: "var(--text-tertiary)" }} />
                      <span className="font-medium">{doc.title}</span>
                    </div>
                    {doc.description && (
                      <p className="text-xs mt-0.5 ml-5" style={{ color: "var(--text-tertiary)" }}>
                        {doc.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                    {doc.owner?.fullName ?? doc.owner?.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: "var(--text-secondary)" }}>
                    {doc._count.chunks}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {roles.map((role) => (
                        <InlinePermissionToggle
                          key={role.id}
                          documentId={doc.id}
                          role={role}
                          granted={grantedRoleIds.has(role.id)}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {documents.length === 0 && (
          <div className="py-12 text-center" style={{ color: "var(--text-tertiary)" }}>
            <RiFileTextLine size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No documents uploaded yet</p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {documents.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: "var(--text-tertiary)" }}>
            No documents uploaded yet
          </p>
        )}
        {documents.map((doc) => {
          const grantedRoleIds = new Set(doc.permissions.map((p) => p.roleId));
          return (
            <div
              key={doc.id}
              className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-start gap-2">
                <RiFileTextLine size={15} className="mt-0.5 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{doc.title}</p>
                  {doc.description && (
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{doc.description}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((role) => (
                  <InlinePermissionToggle
                    key={role.id}
                    documentId={doc.id}
                    role={role}
                    granted={grantedRoleIds.has(role.id)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                <span>{doc._count.chunks} chunks</span>
                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}