export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
        Visual control plane for{' '}
        <span className="text-fd-primary">Vector</span> data pipelines
      </h1>
      <p className="max-w-2xl text-lg text-fd-muted-foreground">
        Build, deploy, and monitor Vector pipelines visually. Self-hosted,
        AGPL-3.0, agent-driven.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://demo.vectorflow.sh"
          className="inline-flex items-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          Try the live demo →
        </a>
        <a
          href="https://github.com/TerrifiedBug/vectorflow"
          className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium hover:bg-fd-muted"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}
