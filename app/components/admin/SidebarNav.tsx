'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    href: '/admin/users',
    label: 'Users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: '/admin/documents',
    label: 'Documents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
      </svg>
    ),
  },
  {
    href: '/admin/permissions',
    label: 'Permissions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    href: '/admin/audit-logs',
    label: 'Audit Logs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px] shrink-0">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M9 13h6M9 17h6"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-[var(--bg-subtle)] border-r border-[var(--border)] flex flex-col px-4 py-6 h-full">

      {/* Brand */}
      <div className="flex items-center gap-3 px-2 pb-7">
        <div className="w-[34px] h-[34px] rounded-[6px] shrink-0 flex items-center justify-center font-extrabold text-[14px] text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)]"
          style={{ background: 'linear-gradient(155deg, var(--accent) 0%, #8a6a24 100%)' }}>
          R
        </div>
        <div className="brand-text">
          <div className="font-bold text-[14.5px] tracking-[-0.01em] text-[var(--text-primary)]">RAG Admin</div>
          <div className="text-[11.5px] text-[var(--text-tertiary)] font-mono tracking-[0.02em] mt-px">RBAC_PLATFORM</div>
        </div>
      </div>

      {/* Nav */}
      <p className="nav-section-label text-[10.5px] font-semibold tracking-[0.09em] text-[var(--text-tertiary)] px-2.5 mb-2 uppercase">
        Management
      </p>

      <nav className="flex flex-col gap-0.5">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-[11px] py-[9px] px-3 rounded-[6px] text-[13.5px] font-medium transition-colors duration-150',
                active
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold border-l-2 border-[var(--accent)]'
                  : 'text-[var(--text-secondary)] border-l-2 border-transparent hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              <span className={active ? 'text-[var(--accent)]' : 'opacity-85'}>{icon}</span>
              <span className="nav-label">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer user chip */}
      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] hover:bg-[var(--surface-hover)] transition-colors duration-150 cursor-pointer">
          <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(155deg, var(--role-editor), #5a4fc9)' }}>
            A
          </div>
          <div className="user-info">
            <div className="text-[13px] font-semibold leading-tight text-[var(--text-primary)]">Admin</div>
            <div className="text-[11px] font-mono text-[var(--text-tertiary)]">admin@test.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}