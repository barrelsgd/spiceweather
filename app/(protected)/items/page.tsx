import Link from "next/link";
import { itemsApi } from "@/lib/api";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ skip?: string; limit?: string; error?: string; success?: string }>;
}) {
  const sp = await searchParams;
  const skip = Number(sp?.skip ?? 0) || 0;
  const limit = Number(sp?.limit ?? 20) || 20;
  const error = sp?.error || "";
  const success = sp?.success || "";

  const resp = await itemsApi().readItems({ skip, limit });
  const items = resp?.data?.data ?? [];
  const count = resp?.data?.count ?? items.length;

  const prevSkip = Math.max(0, skip - limit);
  const nextSkip = skip + limit < count ? skip + limit : skip;

  return (
    <main className="mx-auto mt-8 w-full max-w-3xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Items</h1>
        <Button asChild size="sm">
          <Link href="/items/new">New item</Link>
        </Button>
      </div>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert>
      ) : null}
      {success ? (
        <Alert role="status" aria-live="polite" variant="success" className="mb-4">{success}</Alert>
      ) : null}

      <ul className="divide-y rounded border">
        {items.map((it: { id: string; title: string; description?: string | null }) => (
          <li key={it.id} className="p-4">
            <Link href={`/items/${it.id}`} className="block">
              <div className="font-medium">{it.title}</div>
              {it.description ? (
                <div className="text-sm text-muted-foreground">{it.description}</div>
              ) : null}
            </Link>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="p-4 text-sm text-muted-foreground">No items</li>
        ) : null}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <Link
          aria-disabled={skip === 0}
          className={`rounded px-3 py-2 text-sm ${skip === 0 ? "pointer-events-none opacity-50" : "underline"}`}
          href={`/items?skip=${prevSkip}&limit=${limit}`}
        >
          Previous
        </Link>
        <div className="text-sm">{skip + 1}–{Math.min(skip + limit, count)} of {count}</div>
        <Link
          aria-disabled={nextSkip === skip}
          className={`rounded px-3 py-2 text-sm ${nextSkip === skip ? "pointer-events-none opacity-50" : "underline"}`}
          href={`/items?skip=${nextSkip}&limit=${limit}`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Items",
  description: "Browse your items.",
  alternates: { canonical: "/items" },
};
