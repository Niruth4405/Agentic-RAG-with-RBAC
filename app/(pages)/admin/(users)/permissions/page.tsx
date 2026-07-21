import { prisma } from '@/app/lib/prisma'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import GrantPermissionForm from '@/app/components/admin/CreatePermissionsForm'
import RevokeButton from '@/app/components/admin/RevokeButton'

export default async function PermissionsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const [documents, roles, permissions] = await Promise.all([
    prisma.document.findMany({ orderBy: { title: 'asc' } }),
    prisma.role.findMany({ orderBy: { name: 'asc' } }),
    prisma.documentPermission.findMany({
      include: {
        document: { select: { title: true } },
        role:     { select: { name: true } },
      },
      orderBy: { id: 'desc' },
    }),
  ])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Permissions</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">
          Control which roles can access which documents.
        </p>
      </div>

      <GrantPermissionForm
        documents={documents.map(d => ({ id: d.id, title: d.title }))}
        roles={roles.map(r => ({ id: r.id, name: r.name }))}
      />

      {/* Permission matrix table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
            Active permissions
          </h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
            {permissions.length} grant{permissions.length !== 1 ? 's' : ''} across{' '}
            {new Set(permissions.map(p => p.documentId)).size} document
            {new Set(permissions.map(p => p.documentId)).size !== 1 ? 's' : ''}
          </p>
        </div>

        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Document', 'Role', 'Granted', ''].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] text-[13px] font-semibold text-[var(--text-primary)]">
                  {p.document.title}
                </td>
                <td className="px-[26px] py-[14px]">
                  <span className="inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold bg-[var(--surface-offset)] border border-[var(--border-strong)] text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {p.role.name}
                  </span>
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">
                  #{p.id}
                </td>
                <td className="px-[26px] py-[14px] text-right">
                  <RevokeButton documentId={p.documentId} roleId={p.roleId} />
                </td>
              </tr>
            ))}
            {permissions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-[26px] py-5 text-[12px] text-[var(--text-tertiary)]">
                  No permissions granted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}