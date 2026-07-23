interface Stats {
  userCount: number;
  docCount: number;
  roleCount: number;
  queryCount: number;
}

const STATS = [
  { key: "userCount" as const,  label: "Users",     sub: "total registered" },
  { key: "docCount" as const,   label: "Documents", sub: "indexed" },
  { key: "roleCount" as const,  label: "Roles",     sub: "active" },
  { key: "queryCount" as const, label: "Queries",   sub: "all time" },
];

export default function AdminStatsBar({ stats }: { stats: Stats }) {
  return (
    <div
      className="w-full border-b"
      style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
          style={{ borderColor: "var(--border)" }}
        >
          {STATS.map((s) => (
            <div key={s.key} className="px-4 py-3 sm:px-6">
              <p
                className="font-mono text-xl font-semibold tabular-nums leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                {stats[s.key]}
              </p>
              <p
                className="text-xs mt-1 font-medium"
                style={{ color: "var(--accent)" }}
              >
                {s.label}
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}