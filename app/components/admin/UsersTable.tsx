import type { Role } from '@prisma/client'

type UserRow = {
  id: string
  email: string
  fullName: string | null
  createdAt: Date
  role: { name: string } | null
}

const ROLE_COLORS: Record<string, string> = {
  admin:  'text-[var(--danger)]  bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]  border-[color-mix(in_srgb,var(--danger)_25%,transparent)]',
  editor: 'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_10%,transparent)] border-[color-mix(in_srgb,var(--role-editor)_25%,transparent)]',
  viewer: 'text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border-[color-mix(in_srgb,var(--accent)_25%,transparent)]',
}

function roleBadge(name: string) {
  const cls = ROLE_COLORS[name.toLowerCase()] ?? 'text-[var(--text-secondary)] bg-[var(--surface-raised)] border-[var(--border-strong)]'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-semibold border ${cls}`}>
      {name}
    </span>
  )
}

function fmt(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function UsersTable({ users }: { users: UserRow[] }) {
  if (users.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl">
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <svg className="w-10 h-10 text-[var(--text-tertiary)] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          </svg>
          <p className="text-[13.5px] font-medium text-[var(--text-secondary)]">No users yet</p>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-1">Create the first user above.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between">
        <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">All users</h2>
        <span className="font-mono text-[11.5px] text-[var(--text-tertiary)] tabular-nums">{users.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[540px]" role="table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Name / Email', 'Role', 'Joined'].map(h => (
                <th key={h} scope="col" className="text-left text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-5 py-3 whitespace-nowrap bg-[var(--bg-subtle)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-5 py-3">
                  <div className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">
                    {u.fullName ?? <span className="text-[var(--text-tertiary)]">—</span>}
                  </div>
                  <div className="font-mono text-[11.5px] text-[var(--text-tertiary)] mt-0.5">{u.email}</div>
                </td>
                <td className="px-5 py-3">
                  {u.role ? roleBadge(u.role.name) : <span className="text-[var(--text-tertiary)] text-[12px]">—</span>}
                </td>
                <td className="px-5 py-3 font-mono text-[12px] text-[var(--text-secondary)] tabular-nums">
                  {fmt(u.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
