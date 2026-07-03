"use client";

import Image from "next/image";
import { Maximize, Users, BedDouble, Mountain } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";
import type { Room } from "@/lib/types";

export default function RoomCard({ room, propertyId, propertyName }: { room: Room; propertyId: string; propertyName: string }) {
  const { open } = useEnquiryModal();

  return (
    <div className="grid overflow-hidden rounded-md bg-white shadow-card sm:grid-cols-5">
      <div className="relative h-56 sm:col-span-2 sm:h-full">
        <Image
          src={room.images?.[0]?.url || "/images/placeholder-room.jpg"}
          alt={room.images?.[0]?.alt || room.name}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 40vw, 100vw"
        />
      </div>

      <div className="flex flex-col justify-between p-6 sm:col-span-3">
        <div>
          <h3 className="text-xl text-charcoal">{room.name}</h3>
          {room.description && <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{room.description}</p>}

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal/70">
            {room.size_sqft && (
              <span className="flex items-center gap-1.5">
                <Maximize size={15} className="text-heritage-500" /> {room.size_sqft} sq.ft
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Users size={15} className="text-heritage-500" /> Fits {room.occupancy}
            </span>
            {room.bed_type && (
              <span className="flex items-center gap-1.5">
                <BedDouble size={15} className="text-heritage-500" /> {room.bed_type}
              </span>
            )}
            {room.room_view && (
              <span className="flex items-center gap-1.5">
                <Mountain size={15} className="text-heritage-500" /> {room.room_view}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
          <div>
            {room.price_per_night ? (
              <>
                <span className="text-xs text-charcoal/50">Per night</span>
                <p className="font-serif text-lg text-charcoal">{formatINR(room.price_per_night)}</p>
              </>
            ) : (
              <span className="text-sm text-charcoal/60">Enquire for rates</span>
            )}
          </div>
          <button
            onClick={() => open({ propertyId, propertyName: `${propertyName} — ${room.name}` })}
            className="btn-primary"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
