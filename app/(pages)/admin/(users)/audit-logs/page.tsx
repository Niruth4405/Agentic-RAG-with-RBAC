import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import AuditLogsTable from '@/app/components/admin/AuditLogsTable'

export default async function AuditLogsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Audit Logs</h1>
        <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">
          Every query, login, upload, and access denial — in order.
        </p>
      </div>

      <AuditLogsTable />
    </>
  )
}