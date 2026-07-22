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

const ACTION_META: Record<string, { label: string; color: string }> = {
  query:  { label: 'QUERY',  color: 'text-[var(--accent)]  bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]  border-[color-mix(in_srgb,var(--accent)_25%,transparent)]'  },
  login:  { label: 'LOGIN',  color: 'text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]' },
  denied: { label: 'DENIED', color: 'text-[var(--danger)]  bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]  border-[color-mix(in_srgb,var(--danger)_25%,transparent)]'  },
  upload: { label: 'UPLOAD', color: 'text-[var(--role-editor)] bg-[color-mix(in_srgb,var(--role-editor)_10%,transparent)] border-[color-mix(in_srgb,var(--role-editor)_25%,transparent)]' },
}

const OUTCOME_META = {
  true:  'text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]',
  false: 'text-[var(--danger)]  bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]  border-[color-mix(in_srgb,var(--danger)_25%,transparent)]',
}

const COLS = ['Time', 'User', 'Role', 'Action', 'Document', 'Outcome', 'Reason']

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

  function fmt(iso: string) {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <section>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[17px] font-bold tracking-[-0.015em] text-[var(--text-primary)]">Audit Logs</h1>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
            {loading ? 'Loading…' : `${total} event${total !== 1 ? 's' : ''} recorded`}
          </p>
        </div>
        <button
          onClick={() => fetchLogs(page)}
          aria-label="Refresh logs"
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12.5px] font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors duration-150 shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Table card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-9 rounded-md bg-[var(--surface-raised)] animate-pulse" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <svg className="w-10 h-10 text-[var(--text-tertiary)] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M9 13h6M9 17h6" />
            </svg>
            <p className="text-[13.5px] font-medium text-[var(--text-secondary)]">No audit events yet</p>
            <p className="text-[12px] text-[var(--text-tertiary)] mt-1 max-w-[280px]">
              Events will appear here once users start querying documents.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[720px]" role="table">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {COLS.map(h => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--text-tertiary)] px-5 py-3 whitespace-nowrap bg-[var(--bg-subtle)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => {
                    const action = ACTION_META[log.action] ?? { label: log.action.toUpperCase(), color: '' }
                    return (
                      <tr
                        key={log.id}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors duration-100"
                      >
                        <td className="px-5 py-3 font-mono text-[11.5px] text-[var(--text-secondary)] whitespace-nowrap tabular-nums">
                          {fmt(log.createdAt)}
                        </td>
                        <td className="px-5 py-3 font-mono text-[12px] text-[var(--text-primary)] max-w-[160px] truncate">
                          {log.user?.email ?? <span className="text-[var(--text-tertiary)]">—</span>}
                        </td>
                        <td className="px-5 py-3">
                          {log.role
                            ? <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-semibold bg-[var(--surface-raised)] border border-[var(--border-strong)] text-[var(--text-secondary)]">{log.role.name}</span>
                            : <span className="text-[var(--text-tertiary)] text-[12px]">—</span>}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-bold border ${action.color}`}>
                            {action.label}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[12.5px] text-[var(--text-secondary)] max-w-[160px] truncate">
                          {log.document?.title ?? <span className="text-[var(--text-tertiary)]">—</span>}
                        </td>
                        <td className="px-5 py-3">
                          {log.allowed === null
                            ? <span className="text-[var(--text-tertiary)] text-[12px]">—</span>
                            : <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10.5px] font-bold border ${OUTCOME_META[String(log.allowed) as 'true' | 'false']}`}>
                                {log.allowed ? 'ALLOWED' : 'DENIED'}
                              </span>}
                        </td>
                        <td className="px-5 py-3 text-[12px] text-[var(--text-secondary)] max-w-[200px] truncate">
                          {log.reason ?? <span className="text-[var(--text-tertiary)]">—</span>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--bg-subtle)]">
                <p className="text-[12px] font-mono text-[var(--text-tertiary)] tabular-nums">
                  Page {page} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchLogs(page - 1)}
                    disabled={page <= 1}
                    className="px-3 py-1.5 rounded-md text-[12px] font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => fetchLogs(page + 1)}
                    disabled={page >= totalPages}
                    className="px-3 py-1.5 rounded-md text-[12px] font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
