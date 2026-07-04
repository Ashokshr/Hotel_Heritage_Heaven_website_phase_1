import HomeContentForm from "@/components/admin/HomeContentForm";
import { getAdminHomeContent } from "@/lib/actions/admin-content";

export default async function AdminHomeContentPage() {
  const content = await getAdminHomeContent();

  return (
    <div>
      <h1 className="text-2xl text-charcoal">Homepage Content</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Edit the hero banner, About Us story, Why Choose Us cards, and closing call-to-action shown on the
        homepage — no code changes needed.
      </p>
      <div className="mt-8 max-w-3xl">
        <HomeContentForm content={content} />
      </div>
    </div>
  );
}
