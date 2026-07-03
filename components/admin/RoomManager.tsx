"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import { upsertRoom, deleteRoom } from "@/lib/actions/admin-properties";
import { formatINR } from "@/lib/utils";
import type { Room } from "@/lib/types";

export default function RoomManager({ propertyId, rooms }: { propertyId: string; rooms: Room[] }) {
  const [editing, setEditing] = useState<Room | null | "new">(null);

  return (
    <div className="rounded-md bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-charcoal">Rooms</h2>
        <button onClick={() => setEditing("new")} className="btn-secondary text-sm">
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="space-y-3">
        {rooms.length === 0 && <p className="text-sm text-charcoal/50">No rooms added yet.</p>}
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center justify-between rounded-sm border border-charcoal/10 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-charcoal">{room.name}</p>
              <p className="text-xs text-charcoal/50">
                {room.occupancy} guests · {room.price_per_night ? formatINR(room.price_per_night) : "No rate set"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(room)} className="rounded-sm p-2 text-charcoal/60 hover:bg-cream-100">
                <Pencil size={15} />
              </button>
              <DeleteRoomButton propertyId={propertyId} roomId={room.id} />
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <RoomFormModal
          propertyId={propertyId}
          room={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function DeleteRoomButton({ propertyId, roomId }: { propertyId: string; roomId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm("Delete this room?")) startTransition(() => deleteRoom(propertyId, roomId));
      }}
      className="rounded-sm p-2 text-red-500 hover:bg-red-50"
    >
      {isPending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
    </button>
  );
}

function RoomFormModal({ propertyId, room, onClose }: { propertyId: string; room: Room | null; onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const amenitiesText = room?.amenities?.join("\n") || "";
  const imagesText = room?.images?.map((i) => `${i.url} | ${i.alt}`).join("\n") || "";

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await upsertRoom(propertyId, room?.id || null, formData);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md bg-white p-6 shadow-elevated">
        <h3 className="mb-4 text-lg text-charcoal">{room ? "Edit Room" : "Add Room"}</h3>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Room Name</label>
            <input name="name" required defaultValue={room?.name} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Description</label>
            <textarea name="description" defaultValue={room?.description || ""} rows={2} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Size (sq.ft)</label>
              <input name="size_sqft" type="number" defaultValue={room?.size_sqft ?? ""} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Occupancy</label>
              <input name="occupancy" type="number" defaultValue={room?.occupancy ?? 2} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Bed Type</label>
              <input name="bed_type" defaultValue={room?.bed_type || ""} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">View</label>
              <input name="room_view" defaultValue={room?.room_view || ""} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Price / night (₹)</label>
              <input name="price_per_night" type="number" defaultValue={room?.price_per_night ?? ""} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Sort Order</label>
              <input name="sort_order" type="number" defaultValue={room?.sort_order ?? 0} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Amenities (one per line)</label>
            <textarea name="amenities" defaultValue={amenitiesText} rows={3} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 font-mono text-xs" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Images — one per line: url | alt text</label>
            <textarea name="images" defaultValue={imagesText} rows={3} className="w-full rounded-sm border border-charcoal/15 px-3.5 py-2.5 font-mono text-xs" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="btn-primary">
              {isPending ? <Loader2 size={16} className="animate-spin" /> : "Save Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
