"use client";

import { useState } from "react";

type Role = { id: number; name: string };

const ROLE_COLORS: Record<string, string> = {
  admin:       "var(--accent)",
  hr:          "var(--role-editor)",
  finance:     "var(--role-editor)",
  engineering: "var(--role-viewer)",
};

export default function InlinePermissionToggle({
  documentId,
  role,
  granted: initial,
}: {
  documentId: number;
  role: Role;
  granted: boolean;
}) {
  const [granted, setGranted] = useState(initial);
  const [busy, setBusy]       = useState(false);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const res = await fetch("/api/admin/permissions", {
      method: granted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, roleId: role.id }),
    });
    if (res.ok) setGranted((v) => !v);
    setBusy(false);
  }

  const color = ROLE_COLORS[role.name] ?? "var(--accent)";

  return (
    <button
      onClick={toggle}
      disabled={busy}
      title={`${granted ? "Revoke" : "Grant"} ${role.name} access`}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-all disabled:opacity-40"
      style={{
        border: `1px solid ${granted ? color : "var(--border-strong)"}`,
        background: granted ? `color-mix(in srgb, ${color} 12%, transparent)` : "transparent",
        color: granted ? color : "var(--text-tertiary)",
        cursor: busy ? "wait" : "pointer",
      }}
    >
      {role.name}
    </button>
  );
}