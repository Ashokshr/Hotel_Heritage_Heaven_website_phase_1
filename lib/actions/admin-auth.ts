"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase is not configured yet. Add your project keys to .env.local." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
