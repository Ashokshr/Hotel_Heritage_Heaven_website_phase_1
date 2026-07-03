import AdminSidebar from "@/components/admin/AdminSidebar";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">{children}</div>
      </div>
    </div>
  );
}
