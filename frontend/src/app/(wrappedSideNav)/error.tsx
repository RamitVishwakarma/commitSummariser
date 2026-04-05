"use client";

interface WrappedSideNavErrorProps {
  error: Error;
  reset: () => void;
}

export default function WrappedSideNavError({ error, reset }: WrappedSideNavErrorProps): React.JSX.Element {
  return (
    <div className="flex-1 p-8">
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-text-primary">Unable to load this page</h2>
        <p className="mt-2 text-sm text-text-secondary">{error.message}</p>
        <button className="btn-primary mt-4" onClick={reset}>
          Retry
        </button>
      </div>
    </div>
  );
}
