type Action = 'ACCESS_GRANTED' | 'ACCESS_DENIED' | 'USER_CREATED' | 'PERMISSION_GRANTED'

const LOGS: { user: string; role: string; action: Action; document: string | null; timestamp: string }[] = [
  { user: 'riya.sen@company.com',   role: 'viewer',      action: 'ACCESS_DENIED',      document: 'Q2 Financial Report',  timestamp: '21 Jul 2026, 15:42' },
  { user: 'dev.kapoor@company.com', role: 'engineering', action: 'ACCESS_GRANTED',     document: 'Engineering Runbook',  timestamp: '21 Jul 2026, 14:18' },
  { user: 'admin@test.com',         role: 'admin',       action: 'PERMISSION_GRANTED', document: 'HR Policy Handbook',   timestamp: '21 Jul 2026, 11:05' },
  { user: 'niruth@company.com',     role: 'admin',       action: 'USER_CREATED',       document: null,                   timestamp: '20 Jul 2026, 09:33' },
  { user: 'riya.sen@company.com',   role: 'viewer',      action: 'ACCESS_GRANTED',     document: 'Engineering Runbook',  timestamp: '19 Jul 2026, 16:50' },
  { user: 'dev.kapoor@company.com', role: 'engineering', action: 'ACCESS_DENIED',      document: 'HR Policy Handbook',   timestamp: '18 Jul 2026, 13:22' },
]

const ACTION_STYLE: Record<Action, string> = {
  ACCESS_GRANTED:      'text-[var(--success)]  bg-[color-mix(in_srgb,var(--success)_12%,transparent)]  border-[color-mix(in_srgb,var(--success)_25%,transparent)]',
  ACCESS_DENIED:       'text-[var(--danger)]   bg-[color-mix(in_srgb,var(--danger)_12%,transparent)]   border-[color-mix(in_srgb,var(--danger)_25%,transparent)]',
  USER_CREATED:        'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_12%,transparent)] border-[color-mix(in_srgb,var(--role-editor)_25%,transparent)]',
  PERMISSION_GRANTED:  'text-[var(--accent)]   bg-[var(--accent-soft)]  border-[color-mix(in_srgb,var(--accent)_25%,transparent)]',
}

const ACTION_DOT: Record<Action, string> = {
  ACCESS_GRANTED:     'bg-[var(--success)]',
  ACCESS_DENIED:      'bg-[var(--danger)]',
  USER_CREATED:       'bg-[var(--role-editor)]',
  PERMISSION_GRANTED: 'bg-[var(--accent)]',
}

export default function AuditLogsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Audit Logs</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">Full trail of access decisions and admin actions.</p>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
        <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">All events</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">{LOGS.length} records — newest first</p>
        </div>

        {/* Desktop table */}
        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr>
              {['User', 'Role', 'Action', 'Document', 'Timestamp'].map(h => (
                <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[26px] pb-3 pt-0 border-b border-[var(--border)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOGS.map((log, i) => (
              <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{log.user}</td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{log.role}</td>
                <td className="px-[26px] py-[14px]">
                  <span className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-full font-mono text-[11px] font-semibold border ${ACTION_STYLE[log.action]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ACTION_DOT[log.action]}`} />
                    {log.action.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-[26px] py-[14px] text-[12.5px] text-[var(--text-secondary)]">
                  {log.document ?? <span className="text-[var(--text-tertiary)] font-mono text-[11.5px]">—</span>}
                </td>
                <td className="px-[26px] py-[14px] font-mono text-[12.5px] text-[var(--text-secondary)]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="sm:hidden p-4 flex flex-col gap-3">
          {LOGS.map((log, i) => (
            <div key={i} className="border border-[var(--border)] rounded-[10px] p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{log.user}</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${ACTION_STYLE[log.action]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ACTION_DOT[log.action]}`} />
                  {log.action.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Role</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{log.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Document</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{log.document ?? '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--text-tertiary)]">Time</span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}