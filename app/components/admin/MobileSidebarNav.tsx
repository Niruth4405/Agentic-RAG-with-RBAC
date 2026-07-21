'use client'
import { useState } from 'react'
import SidebarNav from './SidebarNav'

interface Props {
  initials: string
  name: string
  email: string
  logoutForm: React.ReactNode
}

export default function MobileSidebar({ initials, name, email, logoutForm }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="menu-btn"
        style={{
          display: 'none', width: 34, height: 34,
          borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--surface)', color: 'var(--text-secondary)',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 20 }}
        />
      )}

      {/* Drawer */}
      <aside
        style={{
          position: 'fixed', top: 3, left: 0, bottom: 0, width: 240,
          zIndex: 30,
          background: 'var(--bg-subtle)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          padding: '24px 16px',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          boxShadow: 'var(--shadow-lg)',
        }}
        className="mobile-drawer"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 28 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 6, flexShrink: 0,
            background: 'linear-gradient(155deg, var(--accent) 0%, #8a6a24 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-contrast)', fontWeight: 800, fontSize: 14,
            boxShadow: 'var(--shadow-sm)',
          }}>R</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, letterSpacing: '-0.01em' }}>RAG Admin</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', fontFamily: 'var(--font-ibm-mono)', letterSpacing: '0.02em', marginTop: 1 }}>RBAC_PLATFORM</div>
          </div>
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.09em', color: 'var(--text-tertiary)', padding: '0 10px', margin: '10px 0 8px', textTransform: 'uppercase' }}>
          Management
        </div>
        <div onClick={() => setOpen(false)}>
          <SidebarNav />
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(155deg, var(--role-editor), #5a4fc9)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-ibm-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</div>
            </div>
            {logoutForm}
          </div>
        </div>
      </aside>
    </>
  )
}