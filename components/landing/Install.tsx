import Link from 'next/link';

const INSTALL_SNIPPET = `git clone https://github.com/TerrifiedBug/vectorflow.git
cd vectorflow/docker/server
docker compose up -d`;

export function Install() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h2 className="mb-6 text-2xl font-semibold">Run it locally</h2>
      <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-left text-sm">
        <code>{INSTALL_SNIPPET}</code>
      </pre>
      <p className="mt-4 text-sm text-fd-muted-foreground">
        Need more? See the{' '}
        <Link className="underline" href="/docs/getting-started/quick-start">
          full quick-start guide
        </Link>
        .
      </p>
    </section>
  );
}
