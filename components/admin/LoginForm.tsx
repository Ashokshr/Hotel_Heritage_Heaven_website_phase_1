"use client";

import { useState, useTransition } from "react";
import { Loader2, LogIn } from "lucide-react";
import { loginAdmin } from "@/lib/actions/admin-auth";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAdmin(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={isPending} className="btn-primary w-full">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
