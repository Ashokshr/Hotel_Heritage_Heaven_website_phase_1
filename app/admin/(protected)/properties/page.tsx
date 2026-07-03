import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAdminProperties } from "@/lib/actions/admin-properties";
import { formatINR } from "@/lib/utils";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-charcoal">Properties</h1>
          <p className="mt-1 text-sm text-charcoal/60">Add and update hotels without touching any code.</p>
        </div>
        <Link href="/admin/properties/new" className="btn-primary">
          <Plus size={16} /> Add Property
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-md bg-white shadow-card">
        {properties.length === 0 ? (
          <p className="p-6 text-sm text-charcoal/50">
            No properties in the database yet. Run <code>supabase/seed.sql</code>, or click &ldquo;Add
            Property&rdquo; to create one.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal/10 bg-cream-50 text-xs uppercase tracking-wide text-charcoal/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Rooms</th>
                <th className="px-4 py-3">Starting Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-charcoal">{p.name}</td>
                  <td className="px-4 py-3 text-charcoal/70">{p.city}</td>
                  <td className="px-4 py-3 text-charcoal/70">{p.rooms?.length ?? 0}</td>
                  <td className="px-4 py-3 text-charcoal/70">{p.starting_price ? formatINR(p.starting_price) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${p.is_published ? "bg-emerald-50 text-emerald-700" : "bg-charcoal/10 text-charcoal/60"}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/properties/${p.id}`} className="inline-flex items-center gap-1.5 text-heritage-500 hover:underline">
                        <Pencil size={14} /> Edit
                      </Link>
                      <DeletePropertyButton propertyId={p.id} propertyName={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
