import { usersApi } from "@/lib/api";
import { updatePasswordAction, updateProfileAction } from "@/app/(protected)/profile/actions";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

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
      <h1 className="mb-6 text-3xl font-semibold">Profile</h1>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">
          {error}
        </Alert>
      ) : null}
      {success ? (
        <Alert role="status" aria-live="polite" variant="success" className="mb-4">
          {success}
        </Alert>
      ) : null}

      <section className="mb-8 rounded border p-4">
        <h2 className="mb-3 text-xl font-medium">Account</h2>
        <form action={updateProfileAction} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" defaultValue={user?.email} />
          </div>
          <div>
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" name="full_name" type="text" autoComplete="name" defaultValue={user?.full_name ?? ""} />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-3 text-xl font-medium">Change password</h2>
        <form action={updatePasswordAction} className="space-y-4">
          <div>
            <Label htmlFor="current_password">Current password</Label>
            <Input id="current_password" name="current_password" type="password" autoComplete="current-password" required />
          </div>
          <div>
            <Label htmlFor="new_password">New password</Label>
            <Input id="new_password" name="new_password" type="password" autoComplete="new-password" required />
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
