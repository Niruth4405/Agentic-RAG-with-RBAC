import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/admin/SidebarNav'
import Topbar from '@/app/components/admin/Topbar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Brand colour strip */}
      <div className="h-[3px] w-full shrink-0"
        style={{ background: 'linear-gradient(90deg, var(--role-editor) 0%, var(--accent) 55%, var(--role-viewer) 100%)' }} />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — 260px desktop, 76px tablet, hidden mobile */}
        <div className="hidden md:flex w-[76px] lg:w-[260px] shrink-0 sticky top-[3px] h-[calc(100vh-3px)]">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar />
          <main className="flex-1 px-7 py-8 max-w-[1200px] w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}