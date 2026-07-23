"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/users");
    router.refresh();
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl border p-8 shadow-lg"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border-strong)",
        }}
      >
        {/* ── Brand ── */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--accent-soft)" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="RAG Admin logo">
              <path
                d="M3 17 L11 3 L19 17"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 12 H15.5"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            RAG Admin
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            Sign in to your workspace
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="rounded-md px-3 py-2 text-sm"
              style={{
                backgroundColor: "rgba(248,113,113,0.08)",
                color: "var(--danger)",
                border: "1px solid rgba(248,113,113,0.20)",
              }}
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-lg py-2.5 text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--accent)", color: "#0d0d0e" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                  <path d="M7 1.5 A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* ── Footer ── */}
        <p className="mt-6 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
          Access is role-restricted.{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            Contact your admin if you need an account.
          </span>
        </p>
      </div>
    </main>
  );
}