"use server";

import { redirect } from "next/navigation";
import { usersApi } from "@/lib/api";
import { loginWithPassword } from "@/lib/auth";
import { appBaseUrl } from "@/lib/env";

export async function signupAction(formData: FormData) {
  const full_nameRaw = String(formData.get("full_name") || "").trim();
  const full_name = full_nameRaw.length ? full_nameRaw : null;
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const remember = String(formData.get("remember") || "") === "on";
  const next = String(formData.get("next") || "/") || "/";

  try {
    if (!(email && password)) {
      throw new Error("Missing credentials");
    }

    await usersApi().registerUser({ email, password, full_name });
    await loginWithPassword(email, password, { remember });
  } catch (e) {
    let message = "Signup failed";
    const err = e as unknown;
    // Extract a helpful message from known API error shapes
    if (typeof err === "object" && err && "response" in err) {
      const resp = (
        err as { response?: { data?: unknown; statusText?: string } }
      ).response;
      if (resp?.data) {
        const data = resp.data as unknown;
        if (typeof data === "string") {
          message = data || message;
        } else if (
          typeof data === "object" &&
          data &&
          "detail" in data &&
          data.detail
        ) {
          const detail = (data as { detail?: unknown }).detail;
          message =
            typeof detail === "string" ? detail : JSON.stringify(detail);
        } else if (resp.statusText) {
          message = resp.statusText;
        }
      } else if (resp?.statusText) {
        message = resp.statusText;
      }
    } else if (err instanceof Error && err.message) {
      message = err.message;
    }

    const url = new URL("/auth/signup", appBaseUrl);
    url.searchParams.set("error", message);
    if (next && next !== "/") {
      url.searchParams.set("next", next);
    }
    redirect(url.toString());
  }

  redirect(next);
}
