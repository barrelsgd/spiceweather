import type { Metadata } from 'next';
import Link from 'next/link';
import { createUserAction } from '@/app/(protected)/admin/users/actions';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function AdminUsersNewPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || '';
  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">New user</h1>
        <Button asChild className="h-auto p-0" variant="link">
          <Link href="/admin/users">Back to users</Link>
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
      <form action={createUserAction} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" required type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" required type="password" />
        </div>
        <div>
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" name="full_name" type="text" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input name="is_active" type="checkbox" value="true" /> Active
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="is_superuser" type="checkbox" value="true" /> Superuser
          </label>
        </div>
        <Button type="submit">Create user</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'New User',
  description: 'Create a new user (superuser only).',
  alternates: { canonical: '/admin/users/new' },
};
