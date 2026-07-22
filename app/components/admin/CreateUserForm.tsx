'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Role } from '@prisma/client'

const inputCls = [
  'w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-md',
  'px-3 py-[10px] text-[13px] text-[var(--text-primary)]',
  'placeholder:text-[var(--text-tertiary)] outline-none',
  'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  'transition-colors duration-150',
].join(' ')

export default function CreateUserForm({ roles }: { roles: Role[] }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setSuccess(false); setPending(true)

    const fd   = new FormData(e.currentTarget)
    const body = {
      email:    fd.get('email'),
      password: fd.get('password'),
      fullName: fd.get('fullName') || undefined,
      roleName: fd.get('roleName'),
    }

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setPending(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data?.error?.message ?? 'Failed to create user.')
      return
    }

    setSuccess(true)
    ;(e.target as HTMLFormElement).reset()
    router.refresh()
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-[17px] font-bold tracking-[-0.015em] text-[var(--text-primary)]">Users</h1>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Manage users and their assigned roles.</p>
      </div>

      {/* Create user card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <h2 className="text-[13.5px] font-semibold text-[var(--text-primary)]">Create new user</h2>
          <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">Add a user and assign them a role.</p>
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
              User created successfully.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-email" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Email <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              <input
                id="user-email" name="email" type="email" required
                placeholder="user@company.com"
                className={`${inputCls} font-mono`}
              />
            </div>

            <div>
              <label htmlFor="user-fullname" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Full name
              </label>
              <input
                id="user-fullname" name="fullName" type="text"
                placeholder="Jane Doe"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="user-password" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Password <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              <input
                id="user-password" name="password" type="password" required
                placeholder="Min. 6 characters"
                className={`${inputCls} font-mono`}
              />
            </div>

            <div>
              <label htmlFor="user-role" className="block text-[10.5px] font-semibold tracking-[0.07em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Role <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select
                  id="user-role" name="roleName" required
                  className={`${inputCls} appearance-none cursor-pointer`}
                >
                  <option value="">Select a role…</option>
                  {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45 -translate-y-[65%]" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5 pt-4 border-t border-[var(--border)]">
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 rounded-md text-[13px] font-semibold text-[var(--accent-contrast)] bg-[var(--accent)] hover:bg-[var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {pending ? 'Creating…' : 'Create user'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
