import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import SidebarNav from "@/app/components/admin/SidebarNav";
import MobileSidebarNav from "@/app/components/admin/MobileSidebarNav";
import ThemeScript from "@/app/components/admin/ThemeScript";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") redirect("/login");

  const user = session.user as any;
  const name: string = user?.name ?? "Admin";
  const email: string = user?.email ?? "";
  const initials: string = name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <ThemeScript />
      <div id="main-div" className="w-full h-screen flex">
        <div className='w-87.5'>
          <SidebarNav initials={initials} name={name} email={email} />
        </div>

        <div
          id="Topbar + children"
          className="w-full flex flex-col h-screen py-10 px-5"
        >
          {children}
        </div>
      </div>
      <div className="md:hidden">
        <MobileSidebarNav initials={initials} name={name} email={email} />
      </div>
    </>
  );
}
