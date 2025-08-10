import type { Metadata } from 'next';
import Link from 'next/link';
import {
  deleteUserAction,
  updateUserAction,
} from '@/app/(protected)/admin/users/actions';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usersApi } from '@/lib/api';
import type { UserPublic } from '@/lib/api/types.gen';

export default async function AdminUserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const error = sp?.error || '';
  const success = sp?.success || '';

  const resp = await usersApi().readUserById(id);
  const user = resp?.data as UserPublic;

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">User</h1>
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
      {success ? (
        <output
          aria-live="polite"
          className="mb-4 block rounded border bg-card px-4 py-3 text-foreground"
        >
          {success}
        </output>
      ) : null}

      <form action={updateUserAction} className="space-y-4">
        <input name="id" type="hidden" value={user.id} />
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={user.email}
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="full_name">Full name</Label>
          <Input
            defaultValue={user.full_name ?? ''}
            id="full_name"
            name="full_name"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="password">New password (optional)</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              defaultChecked={user.is_active}
              name="is_active"
              type="checkbox"
              value="true"
            />{' '}
            Active
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              defaultChecked={user.is_superuser}
              name="is_superuser"
              type="checkbox"
              value="true"
            />{' '}
            Superuser
          </label>
        </div>
        <Button type="submit">Save</Button>
      </form>

      <form action={deleteUserAction} className="mt-4">
        <input name="id" type="hidden" value={user.id} />
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
    title: 'User',
    description: 'View and manage a user (superuser only).',
    alternates: { canonical: `/admin/users/${id}` },
  };
}
