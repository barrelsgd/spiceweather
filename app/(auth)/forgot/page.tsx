import { forgotPasswordAction } from "@/app/actions/auth/forgot";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";
  const success = sp?.success || "";
  const next = sp?.next || "/";

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 text-2xl font-semibold">Forgot password</h1>

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

      <form action={forgotPasswordAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a password reset link.",
  alternates: { canonical: "/forgot" },
};
