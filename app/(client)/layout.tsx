import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import Providers from "@/app/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className=""
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}