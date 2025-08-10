import { resetPasswordAction } from "@/app/(auth)/reset/actions";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; token?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";
  const token = sp?.token || "";
  const next = sp?.next || "/";

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">
          {error}
        </Alert>
      ) : null}

      <form action={resetPasswordAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <Label htmlFor="token">Reset token</Label>
          <Input id="token" name="token" type="text" defaultValue={token} required />
        </div>

        <div>
          <Label htmlFor="new_password">New password</Label>
          <Input id="new_password" name="new_password" type="password" autoComplete="new-password" required />
        </div>

        <Button type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new password using your reset token.",
  alternates: { canonical: "/reset" },
};
