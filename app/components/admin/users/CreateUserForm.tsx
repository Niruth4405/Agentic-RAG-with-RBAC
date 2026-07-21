'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Role } from '@prisma/client'

export default function CreateUserForm({ roles }: { roles: Role[] }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setPending(true)

    const fd = new FormData(e.currentTarget)
    const body = {
      email: fd.get('email'),
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
      const data = await res.json()
      setError(data?.error?.message ?? 'Failed to create user.')
      return
    }

    setSuccess(true)
    ;(e.target as HTMLFormElement).reset()
    router.refresh() // revalidates the Server Component above
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] mb-6 overflow-hidden">
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-[var(--border)]">
        <h2 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Create new user</h2>
        <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Add a user and assign them a role.</p>
      </div>
      <form onSubmit={handleSubmit} className="px-[26px] py-[22px] pb-[26px]">

        {error && (
          <div className="mb-4 text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-[12.5px] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] border border-[color-mix(in_srgb,var(--success)_25%,transparent)] rounded-[6px] px-3 py-2.5">
            User created successfully.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-6">
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Email <span className="text-[var(--danger)]">*</span>
            </label>
            <input name="email" type="email" required placeholder="user@company.com"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">Full name</label>
            <input name="fullName" type="text" placeholder="Jane Doe"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Password <span className="text-[var(--danger)]">*</span>
            </label>
            <input name="password" type="password" required placeholder="Min. 6 characters"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
              Role <span className="text-[var(--danger)]">*</span>
            </label>
            <div className="relative">
              <select name="roleName" required
                className="w-full appearance-none bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150">
                <option value="">Select a role…</option>
                {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-[70%] w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-[var(--text-tertiary)] rotate-45" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-[22px] pt-[18px] border-t border-[var(--border)]">
          <button type="submit" disabled={pending}
            className="px-[18px] py-[10px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}>
            {pending ? 'Creating…' : 'Create user'}
          </button>
        </div>
      </form>
    </div>
  )
}