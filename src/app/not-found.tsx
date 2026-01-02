import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--text-primary)] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)] mb-6">
          Page Not Found
        </h2>
        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button href="/">Return Home</Button>
      </div>
    </div>
  );
}
