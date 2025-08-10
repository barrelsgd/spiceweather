// lib/api.ts
import { cookies } from "next/headers";
import {
  loginLoginAccessToken,
  loginRecoverPassword,
  loginResetPassword,
  usersReadUserMe,
  usersRegisterUser,
  usersUpdateUserMe,
  usersUpdatePasswordMe,
  usersReadUsers,
  usersCreateUser,
  usersReadUserById,
  usersUpdateUser,
  usersDeleteUser,
  itemsReadItems,
  itemsCreateItem,
  itemsReadItem,
  itemsUpdateItem,
  itemsDeleteItem,
  type BodyLoginLoginAccessToken,
  type NewPassword,
} from "@/lib/api/index"; // explicit index to avoid resolving this file
import { client as apiClient } from "@/lib/api/client.gen";

// Configure API base URL from env, defaulting to the live API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.barrels.gd";

// Dev-time validation: enforce HTTPS and call out missing envs
if (process.env.NODE_ENV !== "production") {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.warn(
      "[api] NEXT_PUBLIC_API_BASE_URL not set; using default https://api.barrels.gd. Set it in .env.local to avoid surprises."
    );
  }
  if (API_BASE_URL.startsWith("http://")) {
    throw new Error(
      "[api] In development, API baseURL must be HTTPS. Update NEXT_PUBLIC_API_BASE_URL to use https://"
    );
  }
}

apiClient.setConfig({ baseURL: API_BASE_URL });
console.info("[api] baseURL configured", { baseURL: API_BASE_URL });

async function authHeaders() {
  const jar = await cookies();
  const token = jar.get("access_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export function loginApi() {
  return {
    // Maintain the expected method name used in auth.ts
    loginAccessToken: (body: BodyLoginLoginAccessToken) =>
      loginLoginAccessToken({ client: apiClient, body, throwOnError: true }),
    recoverPassword: (email: string) =>
      loginRecoverPassword({
        client: apiClient,
        // path param substitution for {email}
        params: { path: { email } },
        throwOnError: true,
      }),
    resetPassword: (body: NewPassword) =>
      loginResetPassword({ client: apiClient, body, throwOnError: true }),
  } as const;
}

export function usersApi() {
  return {
    readUserMe: async () =>
      usersReadUserMe({ client: apiClient, headers: await authHeaders() }),
    registerUser: (body: {
      email: string;
      password: string;
      full_name?: string | null;
    }) => usersRegisterUser({ client: apiClient, body, throwOnError: true }),
    updateMe: async (body: {
      full_name?: string | null;
      email?: string | null;
    }) =>
      usersUpdateUserMe({
        client: apiClient,
        headers: await authHeaders(),
        body,
        throwOnError: true,
      }),
    updatePasswordMe: async (body: {
      current_password: string;
      new_password: string;
    }) =>
      usersUpdatePasswordMe({
        client: apiClient,
        headers: await authHeaders(),
        body,
        throwOnError: true,
      }),
    // Admin users
    readUsers: async (params?: { skip?: number; limit?: number }) =>
      usersReadUsers({
        client: apiClient,
        headers: await authHeaders(),
        params: { query: params ?? {} },
      }),
    createUser: async (body: {
      email: string;
      password: string;
      full_name?: string | null;
      is_active?: boolean | null;
      is_superuser?: boolean | null;
    }) =>
      usersCreateUser({
        client: apiClient,
        headers: await authHeaders(),
        body,
        throwOnError: true,
      }),
    readUserById: async (user_id: string) =>
      usersReadUserById({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { user_id } },
      }),
    updateUser: async (
      user_id: string,
      body: {
        email?: string | null;
        full_name?: string | null;
        is_active?: boolean | null;
        is_superuser?: boolean | null;
        password?: string | null;
      }
    ) =>
      usersUpdateUser({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { user_id } },
        body,
        throwOnError: true,
      }),
    deleteUser: async (user_id: string) =>
      usersDeleteUser({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { user_id } },
        throwOnError: true,
      }),
  } as const;
}

export function itemsApi() {
  return {
    readItems: async (params?: { skip?: number; limit?: number }) =>
      itemsReadItems({
        client: apiClient,
        headers: await authHeaders(),
        params: { query: params ?? {} },
      }),
    createItem: async (body: { title: string; description?: string | null }) =>
      itemsCreateItem({
        client: apiClient,
        headers: await authHeaders(),
        body,
        throwOnError: true,
      }),
    readItem: async (id: string) =>
      itemsReadItem({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { id } },
      }),
    updateItem: async (
      id: string,
      body: { title?: string | null; description?: string | null }
    ) =>
      itemsUpdateItem({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { id } },
        body,
        throwOnError: true,
      }),
    deleteItem: async (id: string) =>
      itemsDeleteItem({
        client: apiClient,
        headers: await authHeaders(),
        params: { path: { id } },
        throwOnError: true,
      }),
  } as const;
}
