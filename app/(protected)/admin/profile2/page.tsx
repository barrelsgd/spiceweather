import type { Metadata } from "next";
import {
  updatePasswordAction,
  updateProfileAction,
} from "@/app/(protected)/admin/profile2/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usersApi } from "@/lib/api";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";
  const success = sp?.success || "";

  const me = await usersApi().readUserMe();
  const user = me?.data;

  return (
    <main className="mx-auto mt-8 w-full max-w-2xl px-4">
      <h1 className="mb-6 font-semibold text-3xl">Profile</h1>

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

      <section className="mb-8 rounded border p-4">
        <h2 className="mb-3 font-medium text-xl">Account</h2>
        <form action={updateProfileAction} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              defaultValue={user?.email}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="full_name">Full name</Label>
            <Input
              autoComplete="name"
              defaultValue={user?.full_name ?? ""}
              id="full_name"
              name="full_name"
              type="text"
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-3 font-medium text-xl">Change password</h2>
        <form action={updatePasswordAction} className="space-y-4">
          <div>
            <Label htmlFor="current_password">Current password</Label>
            <Input
              autoComplete="current-password"
              id="current_password"
              name="current_password"
              required
              type="password"
            />
          </div>
          <div>
            <Label htmlFor="new_password">New password</Label>
            <Input
              autoComplete="new-password"
              id="new_password"
              name="new_password"
              required
              type="password"
            />
          </div>
          <Button type="submit">Update password</Button>
        </form>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account and password.",
  alternates: { canonical: "/profile" },
};
