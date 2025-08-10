"use server";

import { redirect } from "next/navigation";
import { usersApi } from "@/lib/api";
import { appBaseUrl } from "@/lib/env";

export async function updateProfileAction(formData: FormData) {
  const full_name = String(formData.get("full_name") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const base = appBaseUrl;

  try {
    await usersApi().updateMe({ full_name, email });
    const url = new URL("/profile", base);
    url.searchParams.set("success", "Profile updated");
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL("/profile", base);
    url.searchParams.set("error", anyErr.message || "Failed to update profile");
    redirect(url.toString());
  }
}

export async function updatePasswordAction(formData: FormData) {
  const current_password = String(formData.get("current_password") ?? "");
  const new_password = String(formData.get("new_password") ?? "");
  const base = appBaseUrl;

  try {
    if (!current_password) {
      throw new Error("Current password is required");
    }
    if (!new_password) {
      throw new Error("New password is required");
    }

    await usersApi().updatePasswordMe({ current_password, new_password });

    const url = new URL("/profile", base);
    url.searchParams.set("success", "Password updated");
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL("/profile", base);
    url.searchParams.set(
      "error",
      anyErr.message || "Failed to update password"
    );
    redirect(url.toString());
  }
}
