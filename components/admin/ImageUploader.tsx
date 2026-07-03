"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { createUploadUrl } from "@/lib/actions/admin-upload";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_FILE_MB = 10;
const BUCKET = "property-images";

/**
 * Drag-and-drop / click-to-browse image uploader. Uploads straight to
 * Supabase Storage using a signed upload URL (minted server-side), then
 * hands each resulting public URL back via onUploaded. When `multiple` is
 * set, several files can be selected/dropped at once — they upload one
 * after another and onUploaded fires once per successful file.
 */
export default function ImageUploader({
  onUploaded,
  label = "Upload image",
  compact = false,
  multiple = false,
}: {
  onUploaded: (url: string) => void;
  label?: string;
  compact?: boolean;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadOne(file: File): Promise<string | null> {
    if (!file.type.startsWith("image/")) {
      setError(`"${file.name}" isn't an image — skipped.`);
      return null;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`"${file.name}" is over ${MAX_FILE_MB}MB — skipped.`);
      return null;
    }

    const result = await createUploadUrl(file.name);
    if (!result.ok) {
      setError(result.error);
      return null;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase isn't configured in this browser session.");
      return null;
    }

    const { error: uploadError } = await supabase.storage.from(BUCKET).uploadToSignedUrl(result.path, result.token, file);
    if (uploadError) {
      setError(uploadError.message);
      return null;
    }

    return result.publicUrl;
  }

  async function handleFiles(files: File[]) {
    if (files.length === 0) return;
    setError(null);
    setIsUploading(true);
    setProgress({ done: 0, total: files.length });

    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadOne(files[i]);
        if (url) onUploaded(url);
        setProgress({ done: i + 1, total: files.length });
      }
    } catch {
      setError("Something went wrong uploading. Please try again.");
    } finally {
      setIsUploading(false);
      setProgress(null);
    }
  }

  const buttonLabel = isUploading
    ? progress && progress.total > 1
      ? `Uploading ${progress.done}/${progress.total}...`
      : "Uploading..."
    : label;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) handleFiles(files);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const files = Array.from(e.dataTransfer.files || []);
          if (files.length) handleFiles(multiple ? files : files.slice(0, 1));
        }}
        disabled={isUploading}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-sm border border-dashed text-sm transition-colors",
          compact ? "px-3 py-2" : "px-4 py-6",
          isDragging ? "border-heritage-500 bg-heritage-50" : "border-charcoal/25 hover:border-heritage-400",
          isUploading && "opacity-60"
        )}
      >
        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {buttonLabel}
      </button>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
