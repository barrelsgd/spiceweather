export default function LoadingProtected() {
  return (
    <main className="mx-auto mt-8 w-full max-w-3xl px-4">
      <div className="space-y-3">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </main>
  );
}
