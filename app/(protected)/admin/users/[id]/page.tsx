import Link from "next/link";
import type { Metadata } from "next";
import { usersApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { updateUserAction, deleteUserAction } from "@/app/(protected)/admin/users/actions";

export default async function AdminUserDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; success?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const error = sp?.error || "";
  const success = sp?.success || "";

  const resp = await usersApi().readUserById(id);
  const user = resp?.data as any;

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">User</h1>
        <Button asChild variant="link" className="p-0 h-auto"><Link href="/admin/users">Back to users</Link></Button>
      </div>

      {error ? <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert> : null}
      {success ? <Alert role="status" aria-live="polite" variant="success" className="mb-4">{success}</Alert> : null}

      <form action={updateUserAction} className="space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={user.email} />
        </div>
        <div>
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" name="full_name" type="text" defaultValue={user.full_name ?? ""} />
        </div>
        <div>
          <Label htmlFor="password">New password (optional)</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="true" defaultChecked={user.is_active} /> Active</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_superuser" value="true" defaultChecked={user.is_superuser} /> Superuser</label>
        </div>
        <Button type="submit">Save</Button>
      </form>

      <form action={deleteUserAction} className="mt-4">
        <input type="hidden" name="id" value={user.id} />
        <Button type="submit" variant="destructive">Delete</Button>
      </form>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "User",
    description: "View and manage a user (superuser only).",
    alternates: { canonical: `/admin/users/${id}` },
  };
}
