import EnquiriesTable from "@/components/admin/EnquiriesTable";
import { getEnquiries } from "@/lib/actions/admin-enquiries";

export default async function AdminDashboardPage() {
  const enquiries = await getEnquiries();

  const counts = {
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    confirmed: enquiries.filter((e) => e.status === "confirmed").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  };

  return (
    <div>
      <h1 className="text-2xl text-charcoal">Enquiries</h1>
      <p className="mt-1 text-sm text-charcoal/60">All leisure & direct enquiries submitted through the website.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(counts).map(([label, count]) => (
          <div key={label} className="rounded-md bg-white p-4 shadow-card">
            <p className="text-2xl font-serif text-charcoal">{count}</p>
            <p className="text-xs capitalize text-charcoal/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <EnquiriesTable enquiries={enquiries} />
      </div>
    </div>
  );
}
