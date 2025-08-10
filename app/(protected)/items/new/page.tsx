import Link from "next/link";
import { createItemAction } from "@/app/(protected)/items/actions";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default async function NewItemPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">New item</h1>
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href="/items">Back to items</Link>
        </Button>
      </div>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert>
      ) : null}

      <form action={createItemAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" rows={4} className="w-full rounded-md border px-3 py-2" />
        </div>
        <Button type="submit">Create item</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "New item",
  description: "Create a new item.",
  alternates: { canonical: "/items/new" },
};
