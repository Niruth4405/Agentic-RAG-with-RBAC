'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateDocumentForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setSuccess(false); setPending(true)

    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
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
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
        <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Seed a document</h2>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
          Add a document record. No file upload needed for MVP — content is seeded for RBAC testing.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="px-[26px] py-[22px] pb-[26px]">

        {error && (
          <div className="mb-4 text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-[12.5px] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border border-[color-mix(in_srgb,var(--success)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            Document created.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Title <span className="text-[var(--danger)]">*</span>
            </label>
            <input name="title" type="text" required placeholder="e.g. HR Policy 2025"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Description
            </label>
            <input name="description" type="text" placeholder="Optional summary"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150" />
          </div>
        </div>

        <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
          <button type="submit" disabled={pending}
            className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}>
            {pending ? 'Creating…' : 'Create document'}
          </button>
        </div>
      </form>
    </div>
  )
}