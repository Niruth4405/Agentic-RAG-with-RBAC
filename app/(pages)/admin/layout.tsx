import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import SidebarNav from '@/app/components/admin/SidebarNav'
import MobileSidebarNav from '@/app/components/admin/MobileSidebarNav'
// import Topbar from '@/app/components/admin/Topbar'
import ThemeScript from '@/app/components/admin/ThemeScript'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  const user = session.user as any
  const name: string = user?.name ?? 'Admin'
  const email: string = user?.email ?? ''
  const initials: string = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <>
      <ThemeScript />
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-primary)]">
        {/* Accent strip */}
        <div
          className="h-[2px] w-full shrink-0 z-50"
          style={{ background: 'linear-gradient(90deg, var(--role-editor) 0%, var(--accent) 50%, var(--role-viewer) 100%)' }}
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Desktop sidebar — visible md+ */}
          <div className="hidden md:flex w-[64px] lg:w-[240px] shrink-0 sticky top-[2px] h-[calc(100vh-2px)] z-40">
            <SidebarNav initials={initials} name={name} email={email} />
          </div>

          {/* Main column */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Topbar initials={initials} name={name} />
            <main className="flex-1 overflow-y-auto px-5 py-6 lg:px-8 lg:py-8">
              <div className="max-w-[1100px] w-full mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Mobile sidebar drawer — md and below */}
        <div className="md:hidden">
          <MobileSidebarNav initials={initials} name={name} email={email} />
        </div>
      </div>
    </>
  )
}
