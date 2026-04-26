import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          VectorFlow is licensed under{' '}
          <Link
            className="underline"
            href="https://github.com/TerrifiedBug/vectorflow/blob/main/LICENSE"
          >
            AGPL-3.0
          </Link>
          .
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/docs">Docs</Link>
          <Link href="https://demo.vectorflow.sh">Demo</Link>
          <Link href="https://github.com/TerrifiedBug/vectorflow">GitHub</Link>
          <Link href="/docs/operations/telemetry">Telemetry</Link>
        </nav>
      </div>
    </footer>
  );
}
