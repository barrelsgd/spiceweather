import Link from "next/link";
import { itemsApi } from "@/lib/api";
import { deleteItemAction, updateItemAction } from "@/app/(protected)/items/actions";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

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
  const item = resp?.data as { id: string; title: string; description?: string | null };

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Item</h1>
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href="/items">Back to items</Link>
        </Button>
      </div>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert>
      ) : null}
      {success ? (
        <Alert role="status" aria-live="polite" variant="success" className="mb-4">{success}</Alert>
      ) : null}

      <form action={updateItemAction} className="space-y-4">
        <input type="hidden" name="id" value={item.id} />
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" defaultValue={item.title} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" rows={4} defaultValue={item.description ?? ""} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Save</Button>
        </div>
      </form>

      <form action={deleteItemAction} className="mt-4">
        <input type="hidden" name="id" value={item.id} />
        <Button type="submit" variant="destructive">Delete</Button>
      </form>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Item",
    description: "View and edit an item.",
    alternates: { canonical: `/items/${id}` },
  };
}
