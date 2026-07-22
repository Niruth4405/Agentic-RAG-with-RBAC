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
  const [confirming, setConfirming] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleRevoke() {
    setPending(true)
    await fetch('/api/admin/permissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, roleId }),
    })
    setPending(false)
    setConfirming(false)
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[11.5px] text-[var(--text-secondary)] mr-1">Sure?</span>
        <button
          onClick={handleRevoke}
          disabled={pending}
          className="px-2.5 py-1 rounded-md text-[11.5px] font-semibold text-white bg-[var(--danger)] hover:opacity-90 disabled:opacity-50 transition-opacity duration-150"
        >
          {pending ? '…' : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="px-2.5 py-1 rounded-md text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 rounded-md text-[11.5px] font-semibold text-[var(--danger)] border border-[color-mix(in_srgb,var(--danger)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] transition-colors duration-150"
    >
      Revoke
    </button>
  )
}
