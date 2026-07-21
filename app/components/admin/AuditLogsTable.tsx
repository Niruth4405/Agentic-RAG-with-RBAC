'use client'
import { useState, useEffect, useCallback } from 'react'

type Log = {
  id: number
  action: 'query' | 'upload' | 'denied' | 'login'
  allowed: boolean | null
  queryText: string | null
  reason: string | null
  createdAt: string
  user: { email: string } | null
  role: { name: string } | null
  document: { title: string } | null
}

const ACTION_STYLE: Record<string, string> = {
  query:   'text-[var(--accent)]   bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]   border-[color-mix(in_srgb,var(--accent)_25%,transparent)]',
  login:   'text-[var(--success)]  bg-[color-mix(in_srgb,var(--success)_10%,transparent)]  border-[color-mix(in_srgb,var(--success)_25%,transparent)]',
  denied:  'text-[var(--danger)]   bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]   border-[color-mix(in_srgb,var(--danger)_25%,transparent)]',
  upload:  'text-[var(--warning)]  bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]  border-[color-mix(in_srgb,var(--warning)_25%,transparent)]',
}

const ALLOWED_STYLE = {
  true:  'text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]',
  false: 'text-[var(--danger)]  bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]  border-[color-mix(in_srgb,var(--danger)_25%,transparent)]',
}

export default function AuditLogsTable() {
  const [logs, setLogs] = useState<Log[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async (p: number) => {
    setLoading(true)
    const res = await fetch(`/api/admin/audit-logs?page=${p}`)
    const data = await res.json()
    setLogs(data.logs)
    setTotal(data.total)
    setTotalPages(data.totalPages)
    setPage(data.page)
    setLoading(false)
  }, [])

  useEffect(() => { fetchLogs(1) }, [fetchLogs])

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">

      {/* Header */}
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Audit log</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
            {total} event{total !== 1 ? 's' : ''} recorded
          </p>
        </div>
        <button
          onClick={() => fetchLogs(page)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[12px] font-semibold text-[var(--text-secondary)] border border-[var(--border-strong)] hover:bg-[var(--surface-offset)] transition-all duration-150"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="px-[26px] py-8 flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[38px] rounded-[6px] bg-[var(--surface-offset)] animate-pulse" />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div className="px-[26px] py-10 text-center text-[13px] text-[var(--text-tertiary)]">
          No audit events yet. They will appear once users start querying.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr>
                {['Time', 'User', 'Role', 'Action', 'Document', 'Outcome', 'Reason'].map(h => (
                  <th key={h} className="text-left text-[10.5px] font-bold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-[22px] pb-3 pt-0 border-b border-[var(--border)] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100">
                  <td className="px-[22px] py-[12px] font-mono text-[11.5px] text-[var(--text-secondary)] whitespace-nowrap">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-[22px] py-[12px] font-mono text-[12px] text-[var(--text-primary)] max-w-[160px] truncate">
                    {log.user?.email ?? <span className="text-[var(--text-tertiary)]">—</span>}
                  </td>
                  <td className="px-[22px] py-[12px]">
                    {log.role ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold bg-[var(--surface-offset)] border border-[var(--border-strong)] text-[var(--text-secondary)]">
                        {log.role.name}
                      </span>
                    ) : <span className="text-[var(--text-tertiary)] text-[12px]">—</span>}
                  </td>
                  <td className="px-[22px] py-[12px]">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[11px] font-bold border ${ACTION_STYLE[log.action]}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-[22px] py-[12px] text-[12.5px] text-[var(--text-secondary)] max-w-[160px] truncate">
                    {log.document?.title ?? <span className="text-[var(--text-tertiary)]">—</span>}
                  </td>
                  <td className="px-[22px] py-[12px]">
                    {log.allowed === null ? (
                      <span className="text-[var(--text-tertiary)] text-[12px]">—</span>
                    ) : (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[11px] font-bold border ${ALLOWED_STYLE[String(log.allowed) as 'true' | 'false']}`}>
                        {log.allowed ? 'ALLOWED' : 'DENIED'}
                      </span>
                    )}
                  </td>
                  <td className="px-[22px] py-[12px] text-[12px] text-[var(--text-secondary)] max-w-[180px] truncate">
                    {log.reason ?? <span className="text-[var(--text-tertiary)]">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-[26px] py-[18px] border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-[12px] font-mono text-[var(--text-tertiary)]">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchLogs(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold text-[var(--text-secondary)] border border-[var(--border-strong)] hover:bg-[var(--surface-offset)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              ← Prev
            </button>
            <button
              onClick={() => fetchLogs(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold text-[var(--text-secondary)] border border-[var(--border-strong)] hover:bg-[var(--surface-offset)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              Next →
            </button>
          </div>
        </div>
      )}

    </div>
  )
}