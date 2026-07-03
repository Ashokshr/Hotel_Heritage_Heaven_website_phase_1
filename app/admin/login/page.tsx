import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-6">
      <div className="w-full max-w-sm rounded-md bg-white p-8 shadow-elevated">
        <p className="eyebrow text-center">Heritage Heaven</p>
        <h1 className="mt-1 text-center text-2xl text-charcoal">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-charcoal/60">Sign in to manage enquiries and properties.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
