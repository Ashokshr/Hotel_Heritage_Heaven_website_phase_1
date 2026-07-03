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
 * hands the resulting public URL back via onUploaded.
 */
export default function ImageUploader({
  onUploaded,
  label = "Upload image",
  compact = false,
}: {
  onUploaded: (url: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Image is too large — please keep it under ${MAX_FILE_MB}MB.`);
      return;
    }

    setIsUploading(true);
    try {
      const result = await createUploadUrl(file.name);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        setError("Supabase isn't configured in this browser session.");
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .uploadToSignedUrl(result.path, result.token, file);

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      onUploaded(result.publicUrl);
    } catch {
      setError("Something went wrong uploading the image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
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
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
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
        {isUploading ? "Uploading..." : label}
      </button>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
