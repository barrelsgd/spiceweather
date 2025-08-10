// lib/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginApi, usersApi } from "./api";
import type { Token } from "@/lib/api";

const COOKIE_NAME = "access_token";
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

type LoginOptions = {
  remember?: boolean;
};

export async function loginWithPassword(
  email: string,
  password: string,
  options: LoginOptions = {}
): Promise<Pick<Token, "access_token" | "token_type">> {
  const remember = options.remember === true;
  try {
    console.info("[auth] Attempting login", { email, remember });

    // transient retry (once) for network resets
    const isTransient = (err: unknown) => {
      const e = err as { code?: string; message?: string };
      const msg = (e?.message || "").toLowerCase();
      const code = (e?.code || "").toUpperCase();
      return (
        msg.includes("socket hang up") ||
        code === "ECONNRESET" ||
        code === "EAI_AGAIN" ||
        code === "ETIMEDOUT"
      );
    };

    let data: Token | undefined;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const resp = await loginApi().loginAccessToken({
          grant_type: "password",
          username: email,
          password,
          scope: "",
        });
        data = resp.data as Token;
        break;
      } catch (err) {
        if (attempt === 1 && isTransient(err)) {
          console.warn("[auth] Transient login error, retrying once", {
            email,
            attempt,
            message: (err as Error)?.message,
            code: (err as any)?.code ?? null,
          });
          await new Promise((r) => setTimeout(r, 300));
          continue;
        }
        throw err;
      }
    }

    if (!data) throw new Error("Login failed");

    const { access_token, token_type } = data;
    if (!access_token) throw new Error("No access token returned");

    const maxAge = remember
      ? 60 * 60 * 24 * 30 // 30 days
      : 60 * 60; // default 1h

    const jar = await cookies();
    jar.set(COOKIE_NAME, access_token, {
      ...COOKIE_OPTS,
      maxAge,
    });

    const masked = access_token.slice(0, 6) + "…" + access_token.slice(-4);
    console.info("[auth] Login success: token stored", {
      email,
      token_type: token_type ?? null,
      token_preview: masked,
      maxAge,
    });

    return { access_token, token_type: token_type ?? null } as const;
  } catch (err) {
    const jar = await cookies();
    jar.delete(COOKIE_NAME);

    const anyErr = err as {
      code?: string;
      response?: { status?: number; data?: any; statusText?: string };
      message?: string;
    };
    const status = anyErr.response?.status;
    const statusText = anyErr.response?.statusText;
    const detailRaw = anyErr.response?.data;
    const detailText =
      typeof detailRaw === "string"
        ? detailRaw
        : detailRaw?.detail
          ? JSON.stringify(detailRaw.detail)
          : undefined;

    console.error("[auth] Login failed", {
      email,
      status,
      statusText,
      detail: detailText,
      message: anyErr.message,
      code: anyErr.code ?? null,
    });

    throw new Error(
      detailText ||
        (status === 401 ? "Invalid email or password" : "Login failed")
    );
  }
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  try {
    return await usersApi().readUserMe();
  } catch {
    return null;
  }
}

export async function requireAuthOrRedirect(url = "/login") {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) {
    // Use Next.js redirect from server components. Returns never.
    redirect(url);
  }
}

export async function requireSuperuserOrRedirect(url = "/") {
  // Ensure logged in first
  await requireAuthOrRedirect("/login");
  try {
    const me = await usersApi().readUserMe();
    const user = me?.data as { is_superuser?: boolean } | undefined;
    if (!user?.is_superuser) {
      redirect(url);
    }
  } catch {
    redirect(url);
  }
}
