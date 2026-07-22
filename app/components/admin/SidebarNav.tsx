'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    href: '/admin/users',
    label: 'Users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/admin/documents',
    label: 'Documents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    href: '/admin/permissions',
    label: 'Permissions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    href: '/admin/audit-logs',
    label: 'Audit Logs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" />
      </svg>
    ),
  },
]

interface Props {
  initials: string
  name: string
  email: string
  onNavClick?: () => void
}

export default function SidebarNav({ initials, name, email, onNavClick }: Props) {
  const pathname = usePathname()

  return (
    <aside className="bg-[var(--bg-subtle)] border-r border-[var(--border)] flex flex-col w-full h-full px-3 py-5">

      {/* Brand mark */}
      <div className="flex items-center gap-3 px-2 pb-6">
        {/* Logo */}
        <div
          className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center font-extrabold text-[13px] text-[var(--accent-contrast)] shadow-sm"
          style={{ background: 'linear-gradient(140deg, var(--accent) 0%, var(--role-editor) 100%)' }}
          aria-hidden="true"
        >
          R
        </div>
        {/* Text — hidden on collapsed (md), shown on lg+ */}
        <div className="hidden lg:block min-w-0">
          <div className="font-semibold text-[13.5px] tracking-[-0.01em] text-[var(--text-primary)] leading-tight">
            RAG Admin
          </div>
          <div className="text-[10.5px] font-mono text-[var(--text-tertiary)] tracking-[0.06em] mt-0.5">
            RBAC_PLATFORM
          </div>
        </div>
      </div>

      {/* Section label */}
      <p className="hidden lg:block text-[10px] font-semibold tracking-[0.1em] text-[var(--text-tertiary)] px-2 mb-1.5 uppercase select-none">
        Management
      </p>

      {/* Nav links */}
      <nav className="flex flex-col gap-0.5" role="navigation" aria-label="Admin navigation">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex items-center gap-[10px] py-2 px-2.5 rounded-md text-[13px] font-medium transition-colors duration-150 min-h-[40px]',
                active
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              <span className={active ? 'text-[var(--accent)]' : ''}>{icon}</span>
              <span className="hidden lg:inline">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User chip — bottom */}
      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-[var(--surface-hover)] transition-colors duration-150 cursor-default">
          <div
            className="w-[28px] h-[28px] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
            style={{ background: 'linear-gradient(140deg, var(--role-editor), #4f46e5)' }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="hidden lg:block min-w-0">
            <div className="text-[12.5px] font-semibold leading-tight text-[var(--text-primary)] truncate">{name}</div>
            <div className="text-[11px] font-mono text-[var(--text-tertiary)] truncate">{email}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
