import { prisma } from '@/app/lib/prisma'
import CreateDocument from '@/app/components/admin/CreateDocument'
import DocumentsTable from '@/app/components/admin/DocumentsTable'

export const dynamic = 'force-dynamic'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      permissions: {
        select: { role: { select: { name: true } } },
      },
    },
  })

  return (
    <>
      <CreateDocument />
      <DocumentsTable documents={documents} />
    </>
  )
}
