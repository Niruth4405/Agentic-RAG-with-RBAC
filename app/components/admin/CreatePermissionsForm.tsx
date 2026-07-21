'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Doc = { id: number; title: string }
type Role = { id: number; name: string }

export default function GrantPermissionForm({
  documents,
  roles,
}: {
  documents: Doc[]
  roles: Role[]
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleGrant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setSuccess(null); setPending(true)

    const fd = new FormData(e.currentTarget)
    const documentId = parseInt(fd.get('documentId') as string)
    const roleId = parseInt(fd.get('roleId') as string)

    const res = await fetch('/api/admin/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, roleId }),
    })

    setPending(false)

    if (res.status === 409 || !res.ok) {
      const data = await res.json().catch(() => ({}))
      // Prisma unique constraint violation → already exists
      setError(data?.message ?? 'Permission already exists or request failed.')
      return
    }

    const doc = documents.find(d => d.id === documentId)
    const role = roles.find(r => r.id === roleId)
    setSuccess(`Granted: "${doc?.title}" → ${role?.name}`)
    ;(e.target as HTMLFormElement).reset()
    router.refresh()
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
        <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
          Grant access
        </h2>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
          Map a document to a role. All users with that role will be able to query it.
        </p>
      </div>

      <form onSubmit={handleGrant} className="px-[26px] py-[22px] pb-[26px]">
        {error && (
          <div className="mb-4 text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-[12.5px] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border border-[color-mix(in_srgb,var(--success)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            ✓ {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">
          {/* Document selector */}
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Document <span className="text-[var(--danger)]">*</span>
            </label>
            {documents.length === 0 ? (
              <p className="text-[12.5px] text-[var(--danger)]">No documents found. Seed documents first.</p>
            ) : (
              <div className="relative">
                <select name="documentId" required
                  className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150">
                  <option value="">Select a document…</option>
                  {documents.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
              </div>
            )}
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Role <span className="text-[var(--danger)]">*</span>
            </label>
            <div className="relative">
              <select name="roleId" required
                className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150">
                <option value="">Select a role…</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
          <button type="submit" disabled={pending || documents.length === 0}
            className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}>
            {pending ? 'Granting…' : 'Grant access'}
          </button>
        </div>
      </form>
    </div>
  )
}