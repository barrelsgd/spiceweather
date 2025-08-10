import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { createUserAction } from "@/app/(protected)/admin/users/actions";

export default async function AdminUsersNewPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;
  const error = sp?.error || "";
  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">New user</h1>
        <Button asChild variant="link" className="p-0 h-auto"><Link href="/admin/users">Back to users</Link></Button>
      </div>
      {error ? <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">{error}</Alert> : null}
      <form action={createUserAction} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div>
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" name="full_name" type="text" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="true" /> Active</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_superuser" value="true" /> Superuser</label>
        </div>
        <Button type="submit">Create user</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "New User",
  description: "Create a new user (superuser only).",
  alternates: { canonical: "/admin/users/new" },
};
