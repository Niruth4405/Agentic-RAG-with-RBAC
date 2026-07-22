'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const inputCls = [
  'w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-md',
  'px-3 py-[10px] text-[13px] text-[var(--text-primary)]',
  'placeholder:text-[var(--text-tertiary)] outline-none',
  'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  'transition-colors duration-150',
].join(' ')

export default function CreateDocument() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setSuccess(false); setPending(true)

    const fd  = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title:       fd.get('title'),
        description: fd.get('description') || undefined,
      }),
    })

    setPending(false)
    if (!res.ok) { setError('Failed to create document.'); return }

    setSuccess(true)
    ;(e.target as HTMLFormElement).reset()
    router.refresh()
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-[17px] font-bold tracking-[-0.015em] text-[var(--text-primary)]">Documents</h1>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
          Seed document records for RBAC testing. No file upload needed for MVP.
        </p>
      </div>

      {/* Create document card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">Add a document</h2>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">
            Creates a document record that can be assigned role-based access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {error && (
            <div role="alert" className="mb-4 flex items-start gap-2 text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] border border-[color-mix(in_srgb,var(--danger)_22%,transparent)] rounded-md px-3 py-2.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              {error}
            </div>
          )}
          {success && (
            <div role="status" className="mb-4 flex items-center gap-2 text-[12.5px] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] border border-[color-mix(in_srgb,var(--success)_22%,transparent)] rounded-md px-3 py-2.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              Document created successfully.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="doc-title" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Title <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              <input
                id="doc-title" name="title" type="text" required
                placeholder="e.g. HR Policy 2025"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="doc-description" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Description
              </label>
              <input
                id="doc-description" name="description" type="text"
                placeholder="Optional summary"
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex justify-end mt-5 pt-4 border-t border-[var(--border)]">
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 rounded-md text-[13px] font-semibold text-[var(--accent-contrast)] bg-[var(--accent)] hover:bg-[var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {pending ? 'Creating…' : 'Create document'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
