const USERS = [
  { initials: 'A', name: 'Admin',       email: 'admin@test.com',           role: 'admin',  avatarColor: 'linear-gradient(155deg, var(--role-admin), #8a6a24)',    date: '21 Jul 2026' },
  { initials: 'R', name: 'Riya Sen',    email: 'riya.sen@company.com',     role: 'viewer', avatarColor: 'linear-gradient(155deg, var(--role-viewer), #2b6f92)',   date: '18 Jul 2026' },
  { initials: 'D', name: 'Dev Kapoor',  email: 'dev.kapoor@company.com',   role: 'editor', avatarColor: 'linear-gradient(155deg, var(--role-editor), #5a4fc9)',   date: '12 Jul 2026' },
  { initials: 'N', name: 'Niruth',      email: 'niruth@company.com',       role: 'admin',  avatarColor: 'linear-gradient(155deg, var(--role-admin), #8a6a24)',    date: '03 Jul 2026' },
]

const ROLE_CHIP: Record<string, string> = {
  admin:  'text-[var(--role-admin)]  bg-[color-mix(in_srgb,var(--role-admin)_12%,transparent)]',
  editor: 'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_12%,transparent)]',
  viewer: 'text-[var(--role-viewer)] bg-[color-mix(in_srgb,var(--role-viewer)_12%,transparent)]',
}

const DOT_COLOR: Record<string, string> = {
  admin:  'bg-[var(--role-admin)]',
  editor: 'bg-[var(--role-editor)]',
  viewer: 'bg-[var(--role-viewer)]',
}

export default function UsersPage() {
  return (
    <>
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Users</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">Manage platform users and role assignments.</p>
      </div>

      {/* Create user card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Create new user</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Add a user and assign them a role.</p>
        </div>

        <div className="px-[26px] py-[22px] pb-[26px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Email <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="email"
                placeholder="user@company.com"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>

            {/* Full name */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Full name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Password <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>

            {/* Role select */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Role <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
                >
                  <option>Select a role…</option>
                  <option>admin</option>
                  <option>hr</option>
                  <option>finance</option>
                  <option>engineering</option>
                </select>
                {/* Custom caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
            <button
              className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px transition-all duration-150"
              style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}
            >
              Create user
            </button>
          </div>
        </div>
      </div>

      {/* Users table card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">All users</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">4 members across 3 roles</p>
        </div>

        {/* Desktop table */}
        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Name', 'Email', 'Role', 'Created'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] text-[13px]">
                  <div className="flex items-center gap-2.5 font-semibold text-[var(--text-primary)]">
                    <div className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-white text-[10.5px] font-bold"
                      style={{ background: u.avatarColor }}>
                      {u.initials}
                    </div>
                    {u.name}
                  </div>
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{u.email}</td>
                <td className="px-[26px] py-[14px]">
                  <span className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[u.role]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[u.role]}`} />
                    {u.role}
                  </span>
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className="sm:hidden p-4 flex flex-col gap-3">
          {USERS.map((u) => (
            <div key={u.email} className="border border-[var(--border)] rounded-[10px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 font-semibold text-[var(--text-primary)]">
                <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: u.avatarColor }}>
                  {u.initials}
                </div>
                {u.name}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Email</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{u.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Role</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[u.role]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[u.role]}`} />
                  {u.role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Created</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{u.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}