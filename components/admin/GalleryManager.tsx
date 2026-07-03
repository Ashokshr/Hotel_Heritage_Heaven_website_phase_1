"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, ChevronUp, ChevronDown, Star, Pencil, Check } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryImage } from "@/lib/types";

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`;
}

type GalleryImageWithId = GalleryImage & { id: string };

/**
 * Full visual editor for a property's categorised gallery — mirrors what a
 * premium hotel site (e.g. Lemon Tree) shows publicly: admin manages the
 * category list (Facade, Lobby, Rooms, ...) and assigns each photo to one.
 * State is serialised into hidden inputs so it submits with the rest of
 * PropertyForm's FormData, matching the project's existing pattern.
 */
export default function GalleryManager({
  initialCategories,
  initialImages,
}: {
  initialCategories: GalleryCategory[];
  initialImages: GalleryImage[];
}) {
  const [categories, setCategories] = useState<GalleryCategory[]>(
    initialCategories.length > 0
      ? initialCategories
      : [
          { id: newId(), name: "Facade", sortOrder: 1 },
          { id: newId(), name: "Rooms", sortOrder: 2 },
          { id: newId(), name: "Restaurant", sortOrder: 3 },
        ]
  );
  const [images, setImages] = useState<GalleryImageWithId[]>(
    initialImages.map((img) => ({ ...img, id: img.id || newId() }))
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  function addCategory() {
    const name = newCategoryName.trim();
    if (!name) return;
    setCategories((prev) => [...prev, { id: newId(), name, sortOrder: prev.length + 1 }]);
    setNewCategoryName("");
  }

  function deleteCategory(id: string) {
    if (!confirm("Delete this category? Photos in it will move to Uncategorized.")) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setImages((prev) => prev.map((img) => (img.categoryId === id ? { ...img, categoryId: undefined } : img)));
  }

  function moveCategory(id: string, direction: -1 | 1) {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.sortOrder - b.sortOrder);
      const idx = sorted.findIndex((c) => c.id === id);
      const swapWith = idx + direction;
      if (swapWith < 0 || swapWith >= sorted.length) return prev;
      [sorted[idx], sorted[swapWith]] = [sorted[swapWith], sorted[idx]];
      return sorted.map((c, i) => ({ ...c, sortOrder: i + 1 }));
    });
  }

  function saveRename(id: string) {
    const name = renameValue.trim();
    if (name) setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
    setRenamingId(null);
  }

  function addImages(url: string) {
    setImages((prev) => [
      ...prev,
      { id: newId(), url, alt: "New photo", categoryId: categories[0]?.id, isFeatured: false, sortOrder: prev.length + 1 },
    ]);
  }

  function updateImage(id: string, patch: Partial<GalleryImage>) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...patch } : img)));
  }

  function deleteImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function moveImage(id: string, direction: -1 | 1) {
    setImages((prev) => {
      const sorted = [...prev].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      const idx = sorted.findIndex((img) => img.id === id);
      const swapWith = idx + direction;
      if (swapWith < 0 || swapWith >= sorted.length) return prev;
      [sorted[idx], sorted[swapWith]] = [sorted[swapWith], sorted[idx]];
      return sorted.map((img, i) => ({ ...img, sortOrder: i + 1 }));
    });
  }

  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
  const sortedImages = [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <div className="space-y-6">
      <input type="hidden" name="gallery_categories" value={JSON.stringify(categories)} />
      <input type="hidden" name="gallery_images" value={JSON.stringify(images)} />

      {/* Categories */}
      <div>
        <label className="mb-2 block text-sm font-medium text-charcoal/80">Gallery Categories</label>
        <div className="flex flex-wrap gap-2">
          {sortedCategories.map((cat, idx) => (
            <div key={cat.id} className="flex items-center gap-1 rounded-full border border-charcoal/15 bg-cream-50 py-1 pl-3 pr-1.5 text-sm">
              {renamingId === cat.id ? (
                <>
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveRename(cat.id)}
                    className="w-24 border-b border-heritage-400 bg-transparent text-sm outline-none"
                  />
                  <button type="button" onClick={() => saveRename(cat.id)} className="rounded-full p-1 text-heritage-600 hover:bg-heritage-100">
                    <Check size={13} />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-charcoal">{cat.name}</span>
                  <button
                    type="button"
                    onClick={() => moveCategory(cat.id, -1)}
                    disabled={idx === 0}
                    className="rounded-full p-1 text-charcoal/40 hover:bg-charcoal/5 disabled:opacity-30"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCategory(cat.id, 1)}
                    disabled={idx === sortedCategories.length - 1}
                    className="rounded-full p-1 text-charcoal/40 hover:bg-charcoal/5 disabled:opacity-30"
                  >
                    <ChevronDown size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRenamingId(cat.id);
                      setRenameValue(cat.name);
                    }}
                    className="rounded-full p-1 text-charcoal/40 hover:bg-charcoal/5"
                  >
                    <Pencil size={12} />
                  </button>
                  <button type="button" onClick={() => deleteCategory(cat.id)} className="rounded-full p-1 text-red-400 hover:bg-red-50">
                    <X size={13} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
            placeholder="e.g. Deluxe Room, Terrace, Washroom"
            className="w-full max-w-xs rounded-sm border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-heritage-400"
          />
          <button type="button" onClick={addCategory} className="btn-secondary shrink-0 px-3 py-2 text-sm">
            <Plus size={15} /> Add Category
          </button>
        </div>
      </div>

      {/* Upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Add Photos</label>
        <ImageUploader label="Upload gallery photos (select multiple)" onUploaded={addImages} multiple />
      </div>

      {/* Image list */}
      {sortedImages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedImages.map((img, idx) => (
            <div key={img.id} className="overflow-hidden rounded-md border border-charcoal/10 bg-white">
              <div className="relative h-36 w-full bg-cream-100">
                <Image src={img.url} alt={img.alt} fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => updateImage(img.id, { isFeatured: !img.isFeatured })}
                  title="Set as featured"
                  className={cn(
                    "absolute right-2 top-2 rounded-full p-1.5 backdrop-blur-sm transition-colors",
                    img.isFeatured ? "bg-gold-500 text-white" : "bg-white/80 text-charcoal/50 hover:text-gold-500"
                  )}
                >
                  <Star size={14} className={img.isFeatured ? "fill-white" : ""} />
                </button>
              </div>
              <div className="space-y-2 p-3">
                <input
                  value={img.alt}
                  onChange={(e) => updateImage(img.id, { alt: e.target.value })}
                  placeholder="Alt text / caption"
                  className="w-full rounded-sm border border-charcoal/15 px-2.5 py-1.5 text-xs outline-none focus:border-heritage-400"
                />
                <select
                  value={img.categoryId || ""}
                  onChange={(e) => updateImage(img.id, { categoryId: e.target.value || undefined })}
                  className="w-full rounded-sm border border-charcoal/15 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-heritage-400"
                >
                  <option value="">Uncategorized</option>
                  {sortedCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(img.id, -1)}
                      disabled={idx === 0}
                      className="rounded-sm p-1 text-charcoal/40 hover:bg-cream-100 disabled:opacity-30"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(img.id, 1)}
                      disabled={idx === sortedImages.length - 1}
                      className="rounded-sm p-1 text-charcoal/40 hover:bg-cream-100 disabled:opacity-30"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <button type="button" onClick={() => deleteImage(img.id)} className="rounded-sm p-1 text-red-500 hover:bg-red-50">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
