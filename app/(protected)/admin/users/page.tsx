import Link from "next/link";
import type { Metadata } from "next";
import { usersApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ skip?: string; limit?: string; error?: string; success?: string }> }) {
  const sp = await searchParams;
  const skip = Number(sp?.skip ?? 0) || 0;
  const limit = Number(sp?.limit ?? 20) || 20;
  const error = sp?.error || "";
  const success = sp?.success || "";

  const resp = await usersApi().readUsers({ skip, limit });
  const users = resp?.data?.data ?? [];
  const count = resp?.data?.count ?? users.length;

  const prevSkip = Math.max(0, skip - limit);
  const nextSkip = skip + limit < count ? skip + limit : skip;

  return (
    <main className="mx-auto mt-8 w-full max-w-5xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Users</h1>
        <Button asChild size="sm"><Link href="/admin/users/new">New user</Link></Button>
      </div>

      {error ? <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert> : null}
      {success ? <Alert role="status" aria-live="polite" variant="success" className="mb-4">{success}</Alert> : null}

      <ul className="divide-y rounded border">
        {users.map((u: any) => (
          <li key={u.id} className="p-4">
            <Link href={`/admin/users/${u.id}`} className="block">
              <div className="font-medium">{u.full_name || u.email}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
            </Link>
          </li>
        ))}
        {users.length === 0 ? <li className="p-4 text-sm text-muted-foreground">No users</li> : null}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <Link aria-disabled={skip === 0} className={`rounded px-3 py-2 text-sm ${skip === 0 ? "pointer-events-none opacity-50" : "underline"}`} href={`/admin/users?skip=${prevSkip}&limit=${limit}`}>Previous</Link>
        <div className="text-sm">{skip + 1}–{Math.min(skip + limit, count)} of {count}</div>
        <Link aria-disabled={nextSkip === skip} className={`rounded px-3 py-2 text-sm ${nextSkip === skip ? "pointer-events-none opacity-50" : "underline"}`} href={`/admin/users?skip=${nextSkip}&limit=${limit}`}>Next</Link>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Admin Users",
  description: "Manage users (superuser only).",
  alternates: { canonical: "/admin/users" },
};
