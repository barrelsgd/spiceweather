import type { Metadata } from 'next';
import Link from 'next/link';
import { createItemAction } from '@/app/(protected)/items/actions';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function NewItemPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || '';

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">New item</h1>
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

      <form action={createItemAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required type="text" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            className="w-full rounded-md border px-3 py-2"
            id="description"
            name="description"
            rows={4}
          />
        </div>
        <Button type="submit">Create item</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'New item',
  description: 'Create a new item.',
  alternates: { canonical: '/items/new' },
};
