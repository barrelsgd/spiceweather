'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function AuthError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <main className="mx-auto mt-8 w-full max-w-md px-4">
      <h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
      <Alert role="alert" aria-live="assertive" variant="destructive" className="mb-4">
        {error.message || 'An unexpected error occurred.'}
      </Alert>
      <div className="flex gap-2">
        <Button type="button" onClick={() => reset()}>Try again</Button>
        <Button type="button" variant="secondary" onClick={() => (window.location.href = '/')}>Go home</Button>
      </div>
    </main>
  );
}
