import { signupAction } from "@/app/actions/auth/signup";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";
  const next = sp?.next || "/";

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 text-2xl font-semibold">Create your account</h1>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">
          {error}
        </Alert>
      ) : null}

      <form action={signupAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <Label htmlFor="full_name">Full name (optional)</Label>
          <Input id="full_name" name="full_name" type="text" autoComplete="name" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input id="remember" name="remember" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="/login" className="text-sm underline">
            Already have an account? Log in
          </a>
        </div>

        <Button type="submit" className="w-full">Sign up</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account.",
  alternates: { canonical: "/signup" },
};
