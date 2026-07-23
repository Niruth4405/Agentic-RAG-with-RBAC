type RoleName = "admin" | "hr" | "finance" | "engineering";

const ROLE_STYLES: Record<RoleName, { color: string; bg: string }> = {
  admin:       { color: "var(--role-admin)",  bg: "rgba(201,162,75,0.12)" },
  hr:          { color: "var(--role-editor)", bg: "rgba(139,127,242,0.12)" },
  finance:     { color: "var(--role-viewer)", bg: "rgba(95,168,211,0.12)" },
  engineering: { color: "var(--success)",     bg: "rgba(52,211,153,0.12)" },
};

export default function RoleBadge({ role }: { role: string }) {
  const styles = ROLE_STYLES[role as RoleName] ?? {
    color: "var(--text-secondary)",
    bg: "var(--surface-raised)",
  };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize"
      style={{ color: styles.color, background: styles.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
        style={{ background: styles.color }}
      />
      {role}
    </span>
  );
}