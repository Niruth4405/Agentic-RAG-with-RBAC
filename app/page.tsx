// app/page.tsx
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await auth();
  if (!session) redirect("/login");
  const role = (session.user as any)?.role;
  if (role === "admin") redirect("/users");
  else return (
    <h1 className='flex justify-center items-center mt-87.5'>This is the home Page where the landing page is going to come</h1>
  )
  
}