'use client'
import { useActionState } from 'react'
import { loginAction } from '@/app/lib/actions/auth.actions'

const initialState = { error: '' }

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  return (
    <>
      <div style={{ height: 3, width: '100%', background: 'linear-gradient(90deg, var(--role-editor,#8b7ff2) 0%, var(--accent,#c9a24b) 55%, var(--role-viewer,#5fa8d3) 100%)', position: 'fixed', top: 0, left: 0, zIndex: 40 }} />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '0 16px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(155deg, var(--accent) 0%, #8a6a24 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-contrast)', fontWeight: 800, fontSize: 18, marginBottom: 16, boxShadow: 'var(--shadow-md)' }}>R</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Welcome back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, marginTop: 5 }}>Sign in to the admin console</p>
          </div>

          {/* Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, boxShadow: 'var(--shadow-md)', padding: '28px 26px' }}>

            {state?.error && (
              <div style={{ marginBottom: 20, padding: '11px 14px', borderRadius: 8, background: 'color-mix(in srgb, var(--danger) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)', fontSize: 13, color: 'var(--danger)' }}>
                {state.error}
              </div>
            )}

            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 7 }}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  placeholder="admin@company.com"
                  style={{ width: '100%', background: 'var(--bg-subtle)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '10px 12px', fontSize: 13.5, fontFamily: 'var(--font-ibm-mono)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.15s ease, box-shadow 0.15s ease' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 7 }}>Password</label>
                <input id="password" name="password" type="password" required autoComplete="current-password"
                  placeholder="••••••••"
                  style={{ width: '100%', background: 'var(--bg-subtle)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '10px 12px', fontSize: 13.5, fontFamily: 'var(--font-ibm-mono)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.15s ease, box-shadow 0.15s ease' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button type="submit" disabled={isPending}
                style={{ marginTop: 4, background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))', color: 'var(--accent-contrast)', border: 'none', borderRadius: 6, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.6 : 1, boxShadow: 'var(--shadow-sm)', transition: 'filter 0.15s ease', width: '100%' }}>
                {isPending ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 24, fontFamily: 'var(--font-ibm-mono)' }}>
            RBAC_PLATFORM · ADMIN_ONLY
          </p>
        </div>
      </div>
    </>
  )
}