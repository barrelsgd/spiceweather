import type { Metadata } from "next";
import Link from "next/link";
import {
  deleteItemAction,
  updateItemAction,
} from "@/app/(protected)/admin/items/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { itemsApi } from "@/lib/api";

export default async function ItemDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const error = sp?.error || "";
  const success = sp?.success || "";

  const resp = await itemsApi().readItem(id);
  const item = resp?.data as {
    id: string;
    title: string;
    description?: string | null;
  };

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Item</h1>
        <Button asChild className="h-auto p-0" variant="link">
          <Link href="/items">Back to items</Link>
        </Button>
      </div>

      {error ? (
        <Alert
          aria-live="assertive"
          className="mb-4"
          role="alert"
          variant="destructive"
        >
          {error}
        </Alert>
      ) : null}
      {success ? (
        <output
          aria-live="polite"
          className="mb-4 block rounded border bg-card px-4 py-3 text-foreground"
        >
          {success}
        </output>
      ) : null}

      <form action={updateItemAction} className="space-y-4">
        <input name="id" type="hidden" value={item.id} />
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            defaultValue={item.title}
            id="title"
            name="title"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            className="w-full rounded-md border px-3 py-2"
            defaultValue={item.description ?? ""}
            id="description"
            name="description"
            rows={4}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Save</Button>
        </div>
      </form>

      <form action={deleteItemAction} className="mt-4">
        <input name="id" type="hidden" value={item.id} />
        <Button type="submit" variant="destructive">
          Delete
        </Button>
      </form>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Item",
    description: "View and edit an item.",
    alternates: { canonical: `/items/${id}` },
  };
}
