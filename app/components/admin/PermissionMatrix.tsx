"use client";

import { useState, useTransition } from "react";
import RoleBadge from "../ui/RoleBadge";
import toast from "react-hot-toast";

type Document = { id: number; title: string };
type Role = { id: number; name: string };
type Permission = { id: number; documentId: number; roleId: number };

interface Props {
  documents: Document[];
  roles: Role[];
  permissions: Permission[];
}

export default function PermissionMatrix({
  documents,
  roles,
  permissions,
}: Props) {
  const [granted, setGranted] = useState<Set<string>>(
    new Set(permissions.map((p) => `${p.documentId}:${p.roleId}`))
  );
  const [pending, startTransition] = useTransition();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const toggle = async (documentId: number, roleId: number) => {
    const key = `${documentId}:${roleId}`;
    const isGranted = granted.has(key);
    setLoadingKey(key);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/permissions", {
          method: isGranted ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId, roleId }),
        });
        if (!res.ok) throw new Error("Request failed");

        setGranted((prev) => {
          const next = new Set(prev);
          isGranted ? next.delete(key) : next.add(key);
          return next;
        });
        toast.success(isGranted ? "Access revoked" : "Access granted");
      } catch {
        toast.error("Failed to update permission");
      } finally {
        setLoadingKey(null);
      }
    });
  };

  if (documents.length === 0) {
    return (
      <div
        className="rounded-lg border py-12 text-center"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          color: "var(--text-tertiary)",
        }}
      >
        <p className="text-sm">
          No documents indexed yet. Upload documents first.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop matrix */}
      <div
        className="hidden sm:block rounded-lg border overflow-x-auto"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-subtle)",
              }}
            >
              <th
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/2"
                style={{ color: "var(--text-tertiary)" }}
              >
                Document
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className="px-4 py-3 text-center text-xs font-medium"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <RoleBadge role={role.name} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, i) => (
              <tr
                key={doc.id}
                style={{
                  borderBottom:
                    i < documents.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {doc.title}
                </td>
                {roles.map((role) => {
                  const key = `${doc.id}:${role.id}`;
                  const isGranted = granted.has(key);
                  const isLoading = loadingKey === key && pending;
                  return (
                    <td key={role.id} className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggle(doc.id, role.id)}
                        disabled={isLoading}
                        aria-label={`${isGranted ? "Revoke" : "Grant"} ${role.name} access to ${doc.title}`}
                        className="w-8 h-8 rounded-md flex items-center justify-center mx-auto transition-colors text-base"
                        style={{
                          background: isGranted
                            ? "rgba(52,211,153,0.12)"
                            : "var(--surface-raised)",
                          color: isGranted
                            ? "var(--success)"
                            : "var(--text-tertiary)",
                          border: `1px solid ${
                            isGranted
                              ? "rgba(52,211,153,0.3)"
                              : "var(--border)"
                          }`,
                          opacity: isLoading ? 0.5 : 1,
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                      >
                        {isLoading ? "…" : isGranted ? "✓" : "✗"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards per document */}
      <div className="sm:hidden space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-lg border p-4"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <p
              className="font-medium text-sm mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {doc.title}
            </p>
            <div className="space-y-2">
              {roles.map((role) => {
                const key = `${doc.id}:${role.id}`;
                const isGranted = granted.has(key);
                const isLoading = loadingKey === key && pending;
                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between"
                  >
                    <RoleBadge role={role.name} />
                    <button
                      onClick={() => toggle(doc.id, role.id)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1 rounded-md border transition-colors"
                      style={{
                        background: isGranted
                          ? "rgba(52,211,153,0.12)"
                          : "var(--surface-raised)",
                        color: isGranted
                          ? "var(--success)"
                          : "var(--text-tertiary)",
                        borderColor: isGranted
                          ? "rgba(52,211,153,0.3)"
                          : "var(--border)",
                        opacity: isLoading ? 0.5 : 1,
                      }}
                    >
                      {isLoading ? "…" : isGranted ? "✓ Granted" : "✗ Revoked"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}