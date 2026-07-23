import { prisma } from '@/app/lib/prisma'
import CreateUserForm from '@/app/components/admin/CreateUserForm'
import UsersTable from '@/app/components/admin/UsersTable'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const [users, roles] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
        role: { select: { name: true } },
      },
    }),
    prisma.role.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="flex flex-col gap-4 py-10">
      <CreateUserForm roles={roles} />
      <UsersTable users={users} />
    </div>
  )
}
