import { prisma } from "@/app/lib/prisma";
import PermissionMatrix from "../../components/admin/PermissionMatrix";

export const dynamic = "force-dynamic";

export default async function PermissionsPage() {
  const [documents, roles, permissions] = await Promise.all([
    prisma.document.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    }),
    prisma.role.findMany({ orderBy: { name: "asc" } }),
    prisma.documentPermission.findMany(),
  ]);

  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Permissions
        </h1>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          Toggle document access per role. Changes apply immediately.
        </p>
      </div>
      <PermissionMatrix
        documents={documents}
        roles={roles}
        permissions={permissions}
      />
    </div>
  );
}
