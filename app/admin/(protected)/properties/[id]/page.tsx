import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import RoomManager from "@/components/admin/RoomManager";
import { getAdminPropertyById } from "@/lib/actions/admin-properties";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);
  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl text-charcoal">Edit Property</h1>
      <p className="mt-1 text-sm text-charcoal/60">{property.name}</p>

      <div className="mt-8">
        <RoomManager propertyId={property.id} rooms={property.rooms || []} />
      </div>

      <div className="mt-8">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}
