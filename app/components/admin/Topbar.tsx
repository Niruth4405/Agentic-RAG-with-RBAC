'use client'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const ROUTE_LABELS: Record<string, string> = {
  users:       'Users',
  documents:   'Documents',
  permissions: 'Permissions',
  'audit-logs':'Audit Logs',
}

interface Props {
  initials: string
  name: string
}

export default function Topbar({ initials, name }: Props) {
  const pathname = usePathname()
  const segments  = pathname.split('/').filter(Boolean)
  const lastSeg   = segments[segments.length - 1] ?? ''
  const pageLabel = ROUTE_LABELS[lastSeg] ?? 'Dashboard'

  return (
    <header className="h-14 flex items-center justify-between gap-4 px-5 lg:px-8 border-b border-[var(--border)] bg-[var(--bg-subtle)] sticky top-[2px] z-30 shrink-0">

      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="flex md:hidden w-[36px] h-[36px] items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] active:scale-95 transition-all duration-150 shrink-0"
          aria-label="Open navigation menu"
          onClick={() => {
            const trigger = document.getElementById('mobile-menu-trigger') as HTMLButtonElement | null
            trigger?.click()
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] min-w-0">
          <span className="text-[var(--text-tertiary)] hidden sm:inline">Admin</span>
          <svg className="w-3 h-3 text-[var(--text-tertiary)] hidden sm:inline shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="font-semibold text-[var(--text-primary)] truncate">{pageLabel}</span>
        </nav>
      </div>

      {/* Right: theme toggle + avatar */}
      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />

        {/* Avatar: solid bg, no gradient */}
        <div
          className="w-[32px] h-[32px] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold bg-[var(--accent)] cursor-default select-none"
          aria-label={`Logged in as ${name}`}
          title={name}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}
