'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, []);

  const router = useRouter();

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 font-semibold text-2xl">Something went wrong</h1>
      <Alert
        aria-live="assertive"
        className="mb-4"
        role="alert"
        variant="destructive"
      >
        {error.message || 'An unexpected error occurred.'}
      </Alert>
      <div className="flex gap-2">
        <Button onClick={() => reset()} type="button">
          Try again
        </Button>
        <Button
          onClick={() => router.push('/')}
          type="button"
          variant="secondary"
        >
          Go home
        </Button>
      </div>
    </main>
  );
}
