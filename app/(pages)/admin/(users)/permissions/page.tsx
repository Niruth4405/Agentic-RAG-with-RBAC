const PERMISSIONS = [
  { doc: 'Q2 Financial Report',  role: 'finance',     grantedBy: 'admin@test.com',   granted: '15 Jul 2026' },
  { doc: 'Engineering Runbook',  role: 'engineering', grantedBy: 'admin@test.com',   granted: '10 Jul 2026' },
  { doc: 'Engineering Runbook',  role: 'admin',       grantedBy: 'admin@test.com',   granted: '10 Jul 2026' },
  { doc: 'HR Policy Handbook',   role: 'hr',          grantedBy: 'niruth@company.com', granted: '05 Jul 2026' },
  { doc: 'HR Policy Handbook',   role: 'admin',       grantedBy: 'niruth@company.com', granted: '05 Jul 2026' },
  { doc: 'Product Roadmap 2026', role: 'admin',       grantedBy: 'admin@test.com',   granted: '01 Jul 2026' },
]

const ROLE_CHIP: Record<string, string> = {
  admin:       'text-[var(--role-admin)]  bg-[color-mix(in_srgb,var(--role-admin)_12%,transparent)]',
  hr:          'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_12%,transparent)]',
  finance:     'text-[var(--role-viewer)] bg-[color-mix(in_srgb,var(--role-viewer)_12%,transparent)]',
  engineering: 'text-[var(--success)]    bg-[color-mix(in_srgb,var(--success)_12%,transparent)]',
}

const DOT_COLOR: Record<string, string> = {
  admin:       'bg-[var(--role-admin)]',
  hr:          'bg-[var(--role-editor)]',
  finance:     'bg-[var(--role-viewer)]',
  engineering: 'bg-[var(--success)]',
}

export default function PermissionsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Permissions</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">Map documents to roles — controls retrieval access boundaries.</p>
      </div>

      {/* Grant permission card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Grant permission</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Allow a role to access a specific document.</p>
        </div>
        <div className="px-[26px] py-[22px] pb-[26px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">

            {/* Document select */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Document <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150">
                  <option>Select a document…</option>
                  <option>Q2 Financial Report</option>
                  <option>Engineering Runbook</option>
                  <option>HR Policy Handbook</option>
                  <option>Product Roadmap 2026</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
              </div>
            </div>

            {/* Role select */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Role <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150">
                  <option>Select a role…</option>
                  <option>admin</option>
                  <option>hr</option>
                  <option>finance</option>
                  <option>engineering</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
            <button
              className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px transition-all duration-150"
              style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}
            >
              Grant access
            </button>
          </div>
        </div>
      </div>

      {/* Permissions table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Active permissions</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">{PERMISSIONS.length} document–role mappings</p>
        </div>

        {/* Desktop table */}
        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Document', 'Role', 'Granted by', 'Date'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((p, i) => (
              <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] text-[13px] font-semibold text-[var(--text-primary)]">{p.doc}</td>
                <td className="px-[26px] py-[14px]">
                  <span className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[p.role]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[p.role]}`} />
                    {p.role}
                  </span>
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{p.grantedBy}</td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{p.granted}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="sm:hidden p-4 flex flex-col gap-3">
          {PERMISSIONS.map((p, i) => (
            <div key={i} className="border border-[var(--border)] rounded-[10px] p-4 flex flex-col gap-2">
              <div className="font-semibold text-[13px] text-[var(--text-primary)]">{p.doc}</div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Role</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[p.role]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[p.role]}`} />
                  {p.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Granted by</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{p.grantedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Date</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{p.granted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}