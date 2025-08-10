import type { Metadata } from 'next';
import { resetPasswordAction } from '@/app/actions/auth/reset';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; token?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const error = sp?.error || '';
  const token = sp?.token || '';
  const next = sp?.next || '/';

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 font-semibold text-2xl">Reset password</h1>

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

      <form action={resetPasswordAction} className="space-y-4">
        <input name="next" type="hidden" value={next} />

        <div>
          <Label htmlFor="token">Reset token</Label>
          <Input
            defaultValue={token}
            id="token"
            name="token"
            required
            type="text"
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

        <Button className="w-full" type="submit">
          Reset password
        </Button>
      </form>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Set a new password using your reset token.',
  alternates: { canonical: '/reset' },
};
