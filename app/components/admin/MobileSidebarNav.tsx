'use client'
import { useState, useEffect } from 'react'
import SidebarNav from './SidebarNav'

interface Props {
  initials: string
  name: string
  email: string
}

export default function MobileSidebarNav({ initials, name, email }: Props) {
  const [open, setOpen] = useState(false)

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* Drawer */}
      <aside
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className="fixed top-[2px] left-0 bottom-0 w-[240px] z-50 flex flex-col bg-[var(--bg-subtle)] border-r border-[var(--border)] shadow-[var(--shadow-lg-val)] transition-transform duration-250 ease-out"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Reuse SidebarNav — always expanded in drawer */}
        <div className="flex flex-col h-full [&_.hidden.lg\\:block]:block [&_.hidden.lg\\:inline]:inline">
          <SidebarNav
            initials={initials}
            name={name}
            email={email}
            onNavClick={() => setOpen(false)}
          />
        </div>
      </aside>

      {/* Hamburger trigger — rendered into Topbar via a portal-like slot */}
      {/* Exported so Topbar can call setOpen */}
      <button
        id="mobile-menu-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="flex md:hidden w-[36px] h-[36px] items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors duration-150"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </>
  )
}
