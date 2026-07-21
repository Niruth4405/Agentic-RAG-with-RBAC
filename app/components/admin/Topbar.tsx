import ThemeToggle from './ThemeToggle'

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-7 border-b border-[var(--border)] bg-[var(--bg-subtle)] sticky top-[3px] z-10">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-[6px] px-3 py-[7px] w-[280px] text-[var(--text-tertiary)] text-[12.5px] hidden sm:flex">
        <svg className="w-3.5 h-3.5 opacity-70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <span>Search users, roles, logs…</span>
        <span className="ml-auto font-mono text-[10px] bg-[var(--surface-hover)] border border-[var(--border-strong)] rounded px-[5px] py-0.5 text-[var(--text-tertiary)]">⌘K</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2.5 ml-auto">
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="w-[34px] h-[34px] rounded-[6px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors duration-150"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
      </div>
    </header>
  )
}