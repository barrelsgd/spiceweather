"use server";

import { redirect } from "next/navigation";
import { itemsApi } from "@/lib/api";

export async function createItemAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const descriptionRaw = formData.get("description");
  const description = descriptionRaw === null ? null : String(descriptionRaw);
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    if (!title) throw new Error("Title is required");
    await itemsApi().createItem({ title, description });
    const url = new URL("/items", base);
    url.searchParams.set("success", "Item created");
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL("/items/new", base);
    url.searchParams.set("error", anyErr.message || "Failed to create item");
    redirect(url.toString());
  }
}

export async function updateItemAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const titleRaw = formData.get("title");
  const descriptionRaw = formData.get("description");
  const title = titleRaw === null ? null : String(titleRaw);
  const description = descriptionRaw === null ? null : String(descriptionRaw);
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    if (!id) throw new Error("Item id is required");
    await itemsApi().updateItem(id, { title, description });
    const url = new URL(`/items/${id}`, base);
    url.searchParams.set("success", "Item updated");
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL(`/items/${id}`, base);
    url.searchParams.set("error", anyErr.message || "Failed to update item");
    redirect(url.toString());
  }
}

export async function deleteItemAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    if (!id) throw new Error("Item id is required");
    await itemsApi().deleteItem(id);
    const url = new URL("/items", base);
    url.searchParams.set("success", "Item deleted");
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL(`/items/${id}`, base);
    url.searchParams.set("error", anyErr.message || "Failed to delete item");
    redirect(url.toString());
  }
}
