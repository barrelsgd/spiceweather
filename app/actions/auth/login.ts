"use server";

import { redirect } from "next/navigation";
import { loginWithPassword } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const remember = String(formData.get("remember") || "") === "on";
  const next = String(formData.get("next") || "/") || "/";

  try {
    if (!email || !password) throw new Error("Missing credentials");
    console.info("[loginAction] Submitting credentials", {
      email,
      remember,
      next,
    });
    await loginWithPassword(email, password, { remember });
    console.info("[loginAction] Login success, redirecting", { email, next });
  } catch (e) {
    const message =
      e instanceof Error && e.message ? e.message : "Login failed";
    console.warn("[loginAction] Login failed", { email, message, next });
    const url = new URL("/login", process.env.VERCEL_PROJECT_PRODUCTION_URL);
    url.searchParams.set("error", message);
    if (next && next !== "/") url.searchParams.set("next", next);
    redirect(url.toString());
  }

  // Success: perform redirect after try/catch so it's not caught
  redirect(next);
}
