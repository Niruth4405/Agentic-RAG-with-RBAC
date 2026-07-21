'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RevokeButton({
  documentId,
  roleId,
}: {
  documentId: number
  roleId: number
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleRevoke() {
    if (!confirm('Revoke this permission?')) return
    setPending(true)

    await fetch('/api/admin/permissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, roleId }),
    })

    setPending(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleRevoke}
      disabled={pending}
      className="px-3 py-1.5 rounded-[5px] text-[11.5px] font-semibold text-[var(--danger)] border border-[color-mix(in_srgb,var(--danger)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
    >
      {pending ? 'Revoking…' : 'Revoke'}
    </button>
  )
}