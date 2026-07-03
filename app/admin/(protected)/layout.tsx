import AdminSidebar from "@/components/admin/AdminSidebar";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
