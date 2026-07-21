'use client'
import { useActionState, useEffect, useRef } from 'react'
import { createUserAction, type CreateUserState } from '@/app/lib/actions/user.actions'

const ROLES = ['admin', 'hr', 'finance', 'engineering'] as const
const initialState: CreateUserState = {}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--bg-subtle)',
  border: '1px solid var(--border-strong)', borderRadius: 6,
  padding: '10px 12px', fontSize: 13.5,
  fontFamily: 'var(--font-ibm-mono)', color: 'var(--text-primary)',
  outline: 'none', transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--text-tertiary)', marginBottom: 7,
}

function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = 'var(--accent)'
  e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)'
}
function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = 'var(--border-strong)'
  e.target.style.boxShadow = 'none'
}

export default function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => { if (state.success) formRef.current?.reset() }, [state.success])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, boxShadow: 'var(--shadow-md)', marginBottom: 24, overflow: 'hidden' }}>
      <div style={{ padding: '22px 26px 18px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Create new user</h2>
        <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginTop: 3 }}>Add a user and assign them a role.</p>
      </div>

      <div style={{ padding: '22px 26px 26px' }}>
        {state.error && (
          <div style={{ marginBottom: 16, padding: '11px 14px', borderRadius: 8, background: 'color-mix(in srgb, var(--danger) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)', fontSize: 13, color: 'var(--danger)', marginTop: 0 }}>
            {state.error}
          </div>
        )}
        {state.success && (
          <div style={{ marginBottom: 16, padding: '11px 14px', borderRadius: 8, background: 'color-mix(in srgb, var(--success) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--success) 30%, transparent)', fontSize: 13, color: 'var(--success)' }}>
            ✓ User created successfully.
          </div>
        )}

        <form ref={formRef} action={formAction}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }} className="form-grid">
            <div>
              <label style={labelStyle}>Email <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span></label>
              <input name="email" type="email" required placeholder="user@company.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              {state.fieldErrors?.email && <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 5 }}>{state.fieldErrors.email[0]}</p>}
            </div>

            <div>
              <label style={labelStyle}>Full name</label>
              <input name="fullName" type="text" placeholder="Jane Doe" style={{ ...inputStyle, fontFamily: 'var(--font-sans)' }} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={labelStyle}>Password <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span></label>
              <input name="password" type="password" required placeholder="Min. 6 characters" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              {state.fieldErrors?.password && <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 5 }}>{state.fieldErrors.password[0]}</p>}
            </div>

            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Role <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span></label>
              <select name="roleName" required defaultValue="" style={{ ...inputStyle, fontFamily: 'var(--font-sans)', cursor: 'pointer', appearance: 'none' }} onFocus={handleFocus} onBlur={handleBlur}>
                <option value="" disabled>Select a role…</option>
                {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 12, top: '62%', width: 8, height: 8, borderRight: '1.5px solid var(--text-tertiary)', borderBottom: '1.5px solid var(--text-tertiary)', transform: 'translateY(-70%) rotate(45deg)', pointerEvents: 'none' }} />
              {state.fieldErrors?.roleName && <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 5 }}>{state.fieldErrors.roleName[0]}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
            <button type="submit" disabled={isPending}
              style={{ background: 'linear-gradient(155deg, var(--accent-strong), var(--accent))', color: 'var(--accent-contrast)', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.6 : 1, boxShadow: 'var(--shadow-sm)', transition: 'filter 0.15s ease' }}>
              {isPending ? 'Creating…' : 'Create user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}