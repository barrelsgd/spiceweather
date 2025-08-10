"use server";

import { redirect } from "next/navigation";
import { loginApi } from "@/lib/api";

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const next = String(formData.get("next") || "/");
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    if (!email) throw new Error("Email is required");

    await loginApi().recoverPassword(email);

    const url = new URL("/forgot", base);
    url.searchParams.set("success", "If that email exists, a reset link was sent.");
    if (next) url.searchParams.set("next", next);
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL("/forgot", base);
    url.searchParams.set("error", anyErr.message || "Failed to request password reset");
    if (next) url.searchParams.set("next", next);
    redirect(url.toString());
  }
}
