import { signIn } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

async function loginAction(formData: FormData) {
  'use server'
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin/users',
    })
  } catch (e) {
    if (e instanceof AuthError) return redirect('/login?error=invalid')
    throw e
  }
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-[380px]">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div
            className="w-9 h-9 rounded-[6px] flex items-center justify-center font-extrabold text-sm text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)]"
            style={{ background: 'linear-gradient(155deg, var(--accent) 0%, #8a6a24 100%)' }}
          >
            R
          </div>
          <div>
            <div className="font-bold text-[14.5px] tracking-[-0.01em] text-[var(--text-primary)]">RAG Admin</div>
            <div className="text-[11px] font-mono text-[var(--text-tertiary)] tracking-[0.02em]">RBAC_PLATFORM</div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-md-val)] overflow-hidden">
          <div className="px-7 pt-6 pb-5 border-b border-[var(--border)]">
            <h1 className="text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">Sign in</h1>
            <p className="text-[12.5px] text-[var(--text-tertiary)] mt-0.5">Admin access only</p>
          </div>

          <form action={loginAction} className="px-7 py-6 flex flex-col gap-4">

            {searchParams.error && (
              <div className="text-[12.5px] text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_25%,transparent)] rounded-[6px] px-3 py-2.5">
                Invalid email or password.
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@test.com"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--text-tertiary)] mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] rounded-[6px] px-3 py-[10px] text-[13.5px] font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--accent-soft)] transition-all duration-150"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full py-[11px] rounded-[6px] text-[13px] font-bold text-[var(--accent-contrast)] shadow-[var(--shadow-sm-val)] hover:brightness-110 active:translate-y-px transition-all duration-150"
              style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))' }}
            >
              Sign in
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}