"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";

export default function DeleteDocumentButton({ docId }: { docId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this document and all its chunks? This cannot be undone.")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/documents/${docId}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to delete document.");
      return;
    }

    toast.success("Document deleted successfully.");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Delete document"
      className="p-1.5 rounded-md transition-colors disabled:opacity-40"
      style={{ color: "var(--danger)" }}
    >
      <RiDeleteBinLine size={15} />
    </button>
  );
}