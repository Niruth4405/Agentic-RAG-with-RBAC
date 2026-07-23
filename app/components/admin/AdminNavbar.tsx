"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  RiDashboardLine,
  RiUserLine,
  RiFileTextLine,
  RiShieldCheckLine,
  RiHistoryLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/dashboard",   label: "Overview",    Icon: RiDashboardLine   },
  { href: "/users",       label: "Users",       Icon: RiUserLine        },
  { href: "/documents",   label: "Documents",   Icon: RiFileTextLine    },
  { href: "/permissions", label: "Permissions", Icon: RiShieldCheckLine },
  { href: "/audit-logs",  label: "Audit Logs",  Icon: RiHistoryLine     },
];

export default function AdminNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const adminName =
    (session?.user as any)?.fullName ??
    session?.user?.name ??
    session?.user?.email?.split("@")[0] ??
    "Admin";

  return (
    <>
      {/* ── Top navbar ── */}
      <header
        className="w-full flex items-center justify-between px-6 h-14 border-b shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-6">
          <span className="font-bold text-sm tracking-tight" style={{ color: "var(--accent)" }}>
            RAG Admin
          </span>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={{
                    background: active ? "var(--accent-soft)" : "transparent",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: admin name + theme toggle + sign out */}
        <div className="flex items-center gap-3">
          {/* Admin identity */}
          <div className="hidden sm:flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              {adminName[0].toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                {adminName}
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {session?.user?.email ?? ""}
              </p>
            </div>
          </div>

          <ThemeToggle />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <RiLogoutBoxLine size={14} />
            Sign out
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-primary)" }}
          >
            {open ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown menu ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col"
          onClick={() => setOpen(false)}
        >
          <nav
            className="border-b px-4 py-3 space-y-1"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 pb-3 border-b mb-2" style={{ borderColor: "var(--border)" }}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                {adminName[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{adminName}</p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{session?.user?.email}</p>
              </div>
            </div>

            {NAV_LINKS.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    background: active ? "var(--accent-soft)" : "transparent",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 px-3 py-2 w-full text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <RiLogoutBoxLine size={14} />
              Sign out
            </button>
          </nav>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />
        </div>
      )}
    </>
  );
}