type DocRow = {
  id: number
  title: string
  description: string | null
  createdAt: Date
  permissions: { role: { name: string } }[]
}

function fmt(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function DocumentsTable({ documents }: { documents: DocRow[] }) {
  if (documents.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl">
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <svg className="w-10 h-10 text-[var(--text-tertiary)] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" />
          </svg>
          <p className="text-[13.5px] font-medium text-[var(--text-secondary)]">No documents yet</p>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-1">Seed the first document above.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between">
        <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">All documents</h2>
        <span className="font-mono text-[11.5px] text-[var(--text-tertiary)] tabular-nums">{documents.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]" role="table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Title', 'Description', 'Access Roles', 'Created'].map(h => (
                <th key={h} scope="col" className="text-left text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-5 py-3 whitespace-nowrap bg-[var(--bg-subtle)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-5 py-3 text-[13px] font-medium text-[var(--text-primary)] max-w-[180px] truncate">
                  {doc.title}
                </td>
                <td className="px-5 py-3 text-[12.5px] text-[var(--text-secondary)] max-w-[200px] truncate">
                  {doc.description ?? <span className="text-[var(--text-tertiary)]">—</span>}
                </td>
                <td className="px-5 py-3">
                  {doc.permissions.length === 0 ? (
                    <span className="text-[11.5px] text-[var(--text-tertiary)] italic">No roles</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {doc.permissions.map(p => (
                        <span
                          key={p.role.name}
                          className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-semibold border text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
                        >
                          {p.role.name}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-5 py-3 font-mono text-[12px] text-[var(--text-secondary)] tabular-nums">
                  {fmt(doc.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
