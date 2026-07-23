"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { RiUploadCloud2Line, RiFilePdfLine } from "react-icons/ri";

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

export default function DocumentUploadForm({ adminId }: { adminId: number }) {
  const router = useRouter();
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile]               = useState<File | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setLoading(true);
    setError("");
    setSuccess("");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title.trim());
    fd.append("description", description.trim());
    fd.append("ownerId", String(adminId));

    const res = await fetch("/api/admin/documents", { method: "POST", body: fd });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Upload failed. Try again.");
      return;
    }

    setSuccess("Document uploaded and indexed.");
    setTitle("");
    setDescription("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";

    // Re-run the server component's data fetching so the table
    // reflects the new document without a full page reload.
    router.refresh();
  }

  return (
    <div
      className="rounded-lg border p-5 space-y-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-center gap-2">
        <RiUploadCloud2Line size={18} style={{ color: "var(--accent)" }} />
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Upload Document
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Q4 Finance Report"
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Description{" "}
            <span style={{ color: "var(--text-tertiary)", textTransform: "none", fontSize: "0.65rem" }}>
              (optional)
            </span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description…"
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            PDF File
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors"
            style={{
              background: "var(--bg)",
              borderColor: file ? "var(--accent)" : "var(--border-strong)",
              color: file ? "var(--accent)" : "var(--text-tertiary)",
            }}
          >
            <RiFilePdfLine size={16} />
            <span className="truncate">{file ? file.name : "Choose PDF…"}</span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              required
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="sm:col-span-3 flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={loading || !file || !title.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--accent)", color: "#0d0d0e" }}
          >
            {loading ? "Uploading…" : "Upload & Index"}
          </button>
          {success && <span className="text-sm" style={{ color: "var(--success)" }}>✓ {success}</span>}
          {error   && <span className="text-sm" style={{ color: "var(--danger)" }}>{error}</span>}
        </div>
      </form>
    </div>
  );
}
