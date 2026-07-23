"use client";

import { useActionState, useRef } from "react";
import { createUserAction, type CreateUserState } from "@/app/lib/actions/user.actions";
import { RiUserAddLine } from "react-icons/ri";

const INITIAL: CreateUserState = {};

const ROLE_OPTIONS = [
  { value: "admin",       label: "Admin",       access: "admin"  },
  { value: "hr",          label: "HR",           access: "client" },
  { value: "finance",     label: "Finance",      access: "client" },
  { value: "engineering", label: "Engineering",  access: "client" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border-strong)",
  borderRadius: "0.5rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  color: "var(--text-primary)",
  outline: "none",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUserAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <div
      className="rounded-lg border p-5 space-y-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-center gap-2">
        <RiUserAddLine size={18} style={{ color: "var(--accent)" }} />
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Create User
        </h2>
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
      >
        <Field label="Full Name" error={state.fieldErrors?.fullName?.[0]}>
          <input name="fullName" type="text" placeholder="Jane Doe" style={inputStyle} />
        </Field>

        <Field label="Email" error={state.fieldErrors?.email?.[0]}>
          <input name="email" type="email" required placeholder="jane@company.com" style={inputStyle} />
        </Field>

        <Field label="Password" error={state.fieldErrors?.password?.[0]}>
          <input name="password" type="password" required placeholder="Min. 6 characters" style={inputStyle} />
        </Field>

        <Field label="Role / Access Type" error={state.fieldErrors?.roleName?.[0]}>
          <select name="roleName" required style={inputStyle}>
            <option value="">Select role…</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label} ({r.access})
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--accent)", color: "#0d0d0e" }}
          >
            {pending ? "Creating…" : "Create user"}
          </button>
          {state.success && (
            <span className="text-sm" style={{ color: "var(--success)" }}>
              ✓ User created successfully
            </span>
          )}
          {state.error && (
            <span className="text-sm" style={{ color: "var(--danger)" }}>
              {state.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}