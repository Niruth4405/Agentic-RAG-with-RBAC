import { prisma } from '@/app/lib/prisma'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import CreateDocumentForm from '@/app/components/admin/documents/CreateDocumentForm'

export default async function DocumentsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const docs = await prisma.document.findMany({
    include: {
      permissions: { include: { role: true } },
      owner: { select: { email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Documents</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">
          Seed document records for RBAC permission mapping.
        </p>
      </div>

      <CreateDocumentForm />

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">All documents</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
            {docs.length} document{docs.length !== 1 ? 's' : ''}
          </p>
        </div>

        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Title', 'Description', 'Accessible by', 'Created'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] text-[13px] font-semibold text-[var(--text-primary)]">
                  {doc.title}
                </td>
                <td className="px-[26px] py-[14px] text-[12.5px] text-[var(--text-secondary)] max-w-[220px] truncate">
                  {doc.description || <span className="text-[var(--text-tertiary)]">—</span>}
                </td>
                <td className="px-[26px] py-[14px]">
                  {doc.permissions.length === 0 ? (
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)]">No permissions</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {doc.permissions.map(p => (
                        <span key={p.id}
                          className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[var(--surface-offset)] border border-[var(--border-strong)] text-[var(--text-secondary)]">
                          {p.role.name}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">
                  {doc.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr><td colSpan={4} className="px-[26px] py-5 text-[12px] text-[var(--text-tertiary)]">No documents yet. Seed one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}