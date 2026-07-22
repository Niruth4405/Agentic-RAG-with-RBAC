import RevokeButton from '@/app/components/admin/RevokeButton'

type PermRow = {
  id: number
  document: { id: number; title: string }
  role:     { id: number; name:  string }
}

export default function PermissionsTable({ permissions }: { permissions: PermRow[] }) {
  if (permissions.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl">
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <svg className="w-10 h-10 text-[var(--text-tertiary)] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p className="text-[13.5px] font-medium text-[var(--text-secondary)]">No permissions yet</p>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-1">Grant access above to create the first permission.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between">
        <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">Active permissions</h2>
        <span className="font-mono text-[11.5px] text-[var(--text-tertiary)] tabular-nums">{permissions.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[420px]" role="table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Document', 'Role', 'Action'].map(h => (
                <th key={h} scope="col" className="text-left text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-5 py-3 whitespace-nowrap bg-[var(--bg-subtle)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map(p => (
              <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-5 py-3 text-[13px] font-medium text-[var(--text-primary)] max-w-[240px] truncate">
                  {p.document.title}
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-semibold border text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border-[color-mix(in_srgb,var(--accent)_25%,transparent)]">
                    {p.role.name}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <RevokeButton documentId={p.document.id} roleId={p.role.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
