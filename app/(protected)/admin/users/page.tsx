import type { Metadata } from 'next';
import Link from 'next/link';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { usersApi } from '@/lib/api';
import type { UserPublic } from '@/lib/api/types.gen';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    skip?: string;
    limit?: string;
    error?: string;
    success?: string;
  }>;
}) {
  const sp = await searchParams;
  const skip = Number(sp?.skip ?? 0) || 0;
  const limit = Number(sp?.limit ?? 20) || 20;
  const error = sp?.error || '';
  const success = sp?.success || '';

  const resp = await usersApi().readUsers({ skip, limit });
  const users: UserPublic[] = resp?.data?.data ?? [];
  const count = resp?.data?.count ?? users.length;

  const prevSkip = Math.max(0, skip - limit);
  const nextSkip = skip + limit < count ? skip + limit : skip;

  return (
    <main className="mx-auto mt-8 w-full max-w-5xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Users</h1>
        <Button asChild size="sm">
          <Link href="/admin/users/new">New user</Link>
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

      <ul className="divide-y rounded border">
        {users.map((u) => (
          <li className="p-4" key={u.id}>
            <Link className="block" href={`/admin/users/${u.id}`}>
              <div className="font-medium">{u.full_name || u.email}</div>
              <div className="text-muted-foreground text-sm">{u.email}</div>
            </Link>
          </li>
        ))}
        {users.length === 0 ? (
          <li className="p-4 text-muted-foreground text-sm">No users</li>
        ) : null}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <Link
          aria-disabled={skip === 0}
          className={`rounded px-3 py-2 text-sm ${skip === 0 ? 'pointer-events-none opacity-50' : 'underline'}`}
          href={`/admin/users?skip=${prevSkip}&limit=${limit}`}
        >
          Previous
        </Link>
        <div className="text-sm">
          {skip + 1}–{Math.min(skip + limit, count)} of {count}
        </div>
        <Link
          aria-disabled={nextSkip === skip}
          className={`rounded px-3 py-2 text-sm ${nextSkip === skip ? 'pointer-events-none opacity-50' : 'underline'}`}
          href={`/admin/users?skip=${nextSkip}&limit=${limit}`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Admin Users',
  description: 'Manage users (superuser only).',
  alternates: { canonical: '/admin/users' },
};
