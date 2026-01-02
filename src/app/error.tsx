'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button href="/" variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
