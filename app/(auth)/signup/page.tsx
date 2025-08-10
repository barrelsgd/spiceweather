import type { Metadata } from 'next';
import { signupAction } from '@/app/actions/auth/signup';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || '';
  const next = sp?.next || '/';

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 font-semibold text-2xl">Create your account</h1>

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

      <form action={signupAction} className="space-y-4">
        <input name="next" type="hidden" value={next} />

        <div>
          <Label htmlFor="full_name">Full name (optional)</Label>
          <Input
            autoComplete="name"
            id="full_name"
            name="full_name"
            type="text"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            id="email"
            name="email"
            required
            type="email"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            id="password"
            name="password"
            required
            type="password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input id="remember" name="remember" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a className="text-sm underline" href="/login">
            Already have an account? Log in
          </a>
        </div>

        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create a new account.',
  alternates: { canonical: '/signup' },
};
