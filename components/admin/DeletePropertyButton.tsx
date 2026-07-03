"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteProperty } from "@/lib/actions/admin-properties";

export default function DeletePropertyButton({ propertyId, propertyName }: { propertyId: string; propertyName: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = confirm(
      `Delete "${propertyName}"? This removes the property and all of its rooms permanently. This can't be undone.`
    );
    if (!confirmed) return;

    setError(null);
    startTransition(async () => {
      const result = await deleteProperty(propertyId);
      if (!result.ok) setError(result.error || "Couldn't delete this property.");
    });
  }

  return (
    <div className="inline-flex flex-col items-end">
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        Delete
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
