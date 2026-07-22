'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Doc  = { id: number; title: string }
type Role = { id: number; name: string }

const inputCls = [
  'w-full appearance-none',
  'bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-md',
  'px-3 py-[10px] text-[13px] text-[var(--text-primary)]',
  'outline-none cursor-pointer',
  'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  'transition-colors duration-150',
].join(' ')

export default function CreatePermissionsForm({
  documents,
  roles,
}: {
  documents: Doc[]
  roles: Role[]
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleGrant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setSuccess(null); setPending(true)

    const fd = new FormData(e.currentTarget)
    const documentId = parseInt(fd.get('documentId') as string)
    const roleId     = parseInt(fd.get('roleId')     as string)

    const res = await fetch('/api/admin/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, roleId }),
    })

    setPending(false)

    if (res.status === 409 || !res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data?.message ?? 'Permission already exists or request failed.')
      return
    }

    const doc  = documents.find(d => d.id === documentId)
    const role = roles.find(r => r.id === roleId)
    setSuccess(`Granted "${doc?.title}" → ${role?.name}`)
    ;(e.target as HTMLFormElement).reset()
    router.refresh()
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-[17px] font-bold tracking-[-0.015em] text-[var(--text-primary)]">Permissions</h1>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">
          Map documents to roles. All users with a role can query its documents.
        </p>
      </div>

      {/* Grant form */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">Grant access</h2>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">
            Select a document and a role to create a permission.
          </p>
        </div>

        <form onSubmit={handleGrant} className="px-6 py-5">
          {error && (
            <div role="alert" className="mb-4 flex items-start gap-2 text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] border border-[color-mix(in_srgb,var(--danger)_22%,transparent)] rounded-md px-3 py-2.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              {error}
            </div>
          )}
          {success && (
            <div role="status" className="mb-4 flex items-center gap-2 text-[12.5px] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] border border-[color-mix(in_srgb,var(--success)_22%,transparent)] rounded-md px-3 py-2.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="perm-doc" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Document <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              {documents.length === 0 ? (
                <p className="text-[12.5px] text-[var(--danger)]">No documents found. Seed documents first.</p>
              ) : (
                <div className="relative">
                  <select id="perm-doc" name="documentId" required className={inputCls}>
                    <option value="">Select a document…</option>
                    {documents.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45 translate-y-[-65%]" />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="perm-role" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Role <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select id="perm-role" name="roleId" required className={inputCls}>
                  <option value="">Select a role…</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45 translate-y-[-65%]" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5 pt-4 border-t border-[var(--border)]">
            <button
              type="submit"
              disabled={pending || documents.length === 0}
              className="px-4 py-2 rounded-md text-[13px] font-semibold text-[var(--accent-contrast)] bg-[var(--accent)] hover:bg-[var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {pending ? 'Granting…' : 'Grant access'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
