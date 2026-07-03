import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl text-charcoal">Add Property</h1>
      <p className="mt-1 text-sm text-charcoal/60">Create a new hotel listing.</p>
      <div className="mt-8">
        <PropertyForm />
      </div>
    </div>
  );
}
