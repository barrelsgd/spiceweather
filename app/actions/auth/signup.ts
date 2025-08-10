"use server";

import { redirect } from "next/navigation";
import { loginWithPassword } from "@/lib/auth";
import { usersApi } from "@/lib/api";

export async function signupAction(formData: FormData) {
  const full_nameRaw = String(formData.get("full_name") || "").trim();
  const full_name = full_nameRaw.length ? full_nameRaw : null;
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const remember = String(formData.get("remember") || "") === "on";
  const next = String(formData.get("next") || "/") || "/";

  try {
    if (!email || !password) throw new Error("Missing credentials");
    console.info("[signupAction] Registering user", { email, full_name, next });

    await usersApi().registerUser({ email, password, full_name });

    console.info("[signupAction] Registration success, logging in", {
      email,
      remember,
    });

    await loginWithPassword(email, password, { remember });
    console.info("[signupAction] Login after signup success, redirecting", {
      email,
      next,
    });
  } catch (e) {
    const anyErr = e as {
      response?: { status?: number; data?: any; statusText?: string };
      message?: string;
    };
    const detailRaw = anyErr.response?.data;
    const detailText =
      typeof detailRaw === "string"
        ? detailRaw
        : detailRaw?.detail
          ? JSON.stringify(detailRaw.detail)
          : undefined;

    const message = detailText || anyErr.message || "Signup failed";
    console.warn("[signupAction] Signup failed", { email, message, next });

    const url = new URL(
      "/auth/signup",
      process.env.VERCEL_PROJECT_PRODUCTION_URL as string
    );
    url.searchParams.set("error", message);
    if (next && next !== "/") url.searchParams.set("next", next);
    redirect(url.toString());
  }

  redirect(next);
}
