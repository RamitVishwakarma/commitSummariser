"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-card max-w-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-text-primary">Something went wrong</h2>
        <p className="mt-2 text-sm text-text-secondary">{error.message}</p>
        <button className="btn-primary mt-4" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
