import { loginAction } from "@/app/actions/auth/login";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || "";
  const next = sp?.next || "/";

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 text-2xl font-semibold">Log in</h1>

      {error ? (
        <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">
          {error}
        </Alert>
      ) : null}

      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input id="remember" name="remember" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="/signup" className="text-sm underline">
            Need an account? Sign up
          </a>
        </div>

        <div className="flex justify-end">
          <a href="/forgot" className="text-sm underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Log in",
  description: "Access your account.",
  alternates: { canonical: "/login" },
};
