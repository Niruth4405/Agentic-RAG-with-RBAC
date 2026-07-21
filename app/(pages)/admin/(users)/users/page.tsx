import { prisma } from '@/app/lib/prisma'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import CreateUserForm from '@/app/components/admin/users/CreateUserForm'

const ROLE_CHIP: Record<string, string> = {
  admin:       'text-[var(--role-admin)]  bg-[color-mix(in_srgb,var(--role-admin)_12%,transparent)]',
  hr:          'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_12%,transparent)]',
  finance:     'text-[var(--role-viewer)] bg-[color-mix(in_srgb,var(--role-viewer)_12%,transparent)]',
  engineering: 'text-[var(--success)]    bg-[color-mix(in_srgb,var(--success)_12%,transparent)]',
}
const DOT_COLOR: Record<string, string> = {
  admin: 'bg-[var(--role-admin)]', hr: 'bg-[var(--role-editor)]',
  finance: 'bg-[var(--role-viewer)]', engineering: 'bg-[var(--success)]',
}
const AVATAR_GRADIENT: Record<string, string> = {
  admin: 'linear-gradient(155deg, var(--role-admin), #8a6a24)',
  hr: 'linear-gradient(155deg, var(--role-editor), #5a4fc9)',
  finance: 'linear-gradient(155deg, var(--role-viewer), #2b6f92)',
  engineering: 'linear-gradient(155deg, var(--success), #1a6644)',
}

export default async function UsersPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const [users, roles] = await Promise.all([
    prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: 'desc' } }),
    prisma.role.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Users</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">Manage platform users and role assignments.</p>
      </div>

      {/* Create form — client component for interactivity */}
      <CreateUserForm roles={roles} />

      {/* Users table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">All users</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
            {users.length} member{users.length !== 1 ? 's' : ''} across {new Set(users.map(u => u.role.name)).size} role{new Set(users.map(u => u.role.name)).size !== 1 ? 's' : ''}
          </p>
        </div>

        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Name', 'Email', 'Role', 'Created'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const roleName = u.role.name as string
              const initial = (u.fullName || u.email)[0].toUpperCase()
              return (
                <tr key={u.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                  <td className="px-[26px] py-[14px] text-[13px]">
                    <div className="flex items-center gap-2.5 font-semibold text-[var(--text-primary)]">
                      <div className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-white text-[10.5px] font-bold"
                        style={{ background: AVATAR_GRADIENT[roleName] ?? AVATAR_GRADIENT.engineering }}>
                        {initial}
                      </div>
                      {u.fullName || '—'}
                    </div>
                  </td>
                  <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{u.email}</td>
                  <td className="px-[26px] py-[14px]">
                    <span className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[roleName]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[roleName]}`} />
                      {roleName}
                    </span>
                  </td>
                  <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">
                    {u.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              )
            })}
            {users.length === 0 && (
              <tr><td colSpan={4} className="px-[26px] py-5 text-[12px] text-[var(--text-tertiary)]">No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}