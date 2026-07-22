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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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

      {/* Drawer — slides in from left */}
      <aside
        aria-label="Mobile navigation"
        aria-modal={open}
        role="dialog"
        aria-hidden={!open}
        className="fixed top-[2px] left-0 bottom-0 w-[240px] z-50 flex flex-col bg-[var(--bg-subtle)] border-r border-[var(--border)] shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-transform duration-250 ease-out"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close navigation menu"
          className="absolute top-3 right-3 w-[30px] h-[30px] flex items-center justify-center rounded-md text-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors duration-150 z-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Force lg: classes visible inside drawer (always expanded) */}
        <div className="flex flex-col h-full [&_.hidden.lg\\:block]:block [&_.hidden.lg\\:inline]:inline">
          <SidebarNav
            initials={initials}
            name={name}
            email={email}
            onNavClick={() => setOpen(false)}
          />
        </div>
      </aside>

      {/* Hidden trigger button — Topbar calls click() on this */}
      <button
        id="mobile-menu-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="sr-only"
      />
    </>
  )
}
