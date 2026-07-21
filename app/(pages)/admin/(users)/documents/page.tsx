const DOCUMENTS = [
  { id: 1, title: 'Q2 Financial Report',       description: 'Quarterly financials — finance team only',    roles: ['finance'],              created: '15 Jul 2026' },
  { id: 2, title: 'Engineering Runbook',        description: 'Incident response and deployment procedures', roles: ['engineering', 'admin'], created: '10 Jul 2026' },
  { id: 3, title: 'HR Policy Handbook',         description: 'Company HR policies and procedures',          roles: ['hr', 'admin'],          created: '05 Jul 2026' },
  { id: 4, title: 'Product Roadmap 2026',       description: 'Confidential product strategy document',      roles: ['admin'],                 created: '01 Jul 2026' },
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

export default function DocumentsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Documents</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">Seed and manage documents available for retrieval.</p>
      </div>

      {/* Create document card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Create new document</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Seed a document record — upload/ingestion is out of MVP scope.</p>
        </div>
        <div className="px-[26px] py-[22px] pb-[26px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Title <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Q3 Financial Report"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Description
              </label>
              <input
                type="text"
                placeholder="Short description of this document"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
            <button
              className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px transition-all duration-150"
              style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}
            >
              Create document
            </button>
          </div>
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">All documents</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">{DOCUMENTS.length} seeded records</p>
        </div>

        {/* Desktop table */}
        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['Title', 'Description', 'Allowed Roles', 'Created'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc) => (
              <tr key={doc.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] text-[13px] font-semibold text-[var(--text-primary)]">{doc.title}</td>
                <td className="px-[26px] py-[14px] text-[12.5px] text-[var(--text-secondary)]">{doc.description}</td>
                <td className="px-[26px] py-[14px]">
                  <div className="flex flex-wrap gap-1.5">
                    {doc.roles.map(role => (
                      <span key={role} className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[role]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[role]}`} />
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{doc.created}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="sm:hidden p-4 flex flex-col gap-3">
          {DOCUMENTS.map((doc) => (
            <div key={doc.id} className="border border-[var(--border)] rounded-[10px] p-4 flex flex-col gap-2">
              <div className="font-semibold text-[13px] text-[var(--text-primary)]">{doc.title}</div>
              <div className="text-[12px] text-[var(--text-secondary)]">{doc.description}</div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Roles</span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {doc.roles.map(role => (
                    <span key={role} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold border border-[var(--border-strong)] ${ROLE_CHIP[role]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[role]}`} />
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Created</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{doc.created}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}