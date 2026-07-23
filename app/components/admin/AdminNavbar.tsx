"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiShieldKeyholeLine } from "react-icons/ri";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/users",       label: "Users" },
  { href: "/documents",   label: "Documents" },
  { href: "/permissions", label: "Permissions" },
  { href: "/audit-logs",  label: "Audit Logs" },
];

export default function AdminNavbar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <RiShieldKeyholeLine size={22} style={{ color: "var(--accent)" }} />
          <span
            className="font-mono text-sm font-semibold tracking-tight hidden sm:block"
            style={{ color: "var(--accent)" }}
          >
            RAG Admin
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm rounded-md transition-colors"
                style={{
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--accent-soft)" : "transparent",
                  borderBottom: active
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
              }}
            >
              {initials}
            </div>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {userName}
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="hidden sm:block text-xs px-3 py-1.5 rounded-md border transition-colors"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-strong)",
            }}
          >
            Sign out
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-md"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm rounded-md transition-colors"
                style={{
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--accent-soft)" : "transparent",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div
            className="pt-2 mt-1 border-t flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {userName}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs px-3 py-1.5 rounded-md border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border-strong)",
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}