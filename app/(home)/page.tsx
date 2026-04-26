export default function HomePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">VectorFlow</h1>
      <p className="text-fd-muted-foreground">
        Visual control plane for Vector data pipelines.
      </p>
      <p className="text-sm text-fd-muted-foreground">
        Site under construction.{' '}
        <a
          className="underline"
          href="https://github.com/TerrifiedBug/vectorflow"
        >
          View on GitHub →
        </a>
      </p>
    </main>
  );
}
