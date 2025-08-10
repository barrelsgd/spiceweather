import type { Metadata } from 'next';
import { forgotPasswordAction } from '@/app/actions/auth/forgot';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || '';
  const success = sp?.success || '';
  const next = sp?.next || '/';

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 font-semibold text-2xl">Forgot password</h1>

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

      <form action={forgotPasswordAction} className="space-y-4">
        <input name="next" type="hidden" value={next} />

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

        <Button className="w-full" type="submit">
          Send reset link
        </Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Request a password reset link.',
  alternates: { canonical: '/forgot' },
};
