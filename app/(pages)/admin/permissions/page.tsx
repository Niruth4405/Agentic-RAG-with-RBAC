import { prisma } from '@/app/lib/prisma'
import CreatePermissionsForm from '@/app/components/admin/CreatePermissionsForm'
import PermissionsTable from '@/app/components/admin/PermissionsTable'

export const dynamic = 'force-dynamic'

export default async function PermissionsPage() {
  const [documents, roles, permissions] = await Promise.all([
    prisma.document.findMany({ orderBy: { title: 'asc' }, select: { id: true, title: true } }),
    prisma.role.findMany({ orderBy: { name: 'asc' } }),
    prisma.documentPermission.findMany({
      include: {
        document: { select: { id: true, title: true } },
        role:     { select: { id: true, name:  true } },
      },
      orderBy: { documentId: 'asc' },
    }),
  ])

  return (
    <>
      <CreatePermissionsForm documents={documents} roles={roles} />
      <PermissionsTable permissions={permissions} />
    </>
  )
}
