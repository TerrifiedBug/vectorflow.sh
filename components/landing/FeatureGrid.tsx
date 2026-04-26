import Link from 'next/link';

const FEATURES = [
  {
    title: 'Visual pipeline editor',
    body: 'Drag-and-drop sources, transforms, and sinks. VRL with autocomplete.',
    href: '/docs/user-guide/pipeline-editor',
  },
  {
    title: 'Fleet management',
    body: 'See every agent, push config updates, watch rollouts.',
    href: '/docs/user-guide/fleet',
  },
  {
    title: 'Alerts & anomaly detection',
    body: 'Catch broken pipelines and unusual log volumes before users do.',
    href: '/docs/user-guide/alerts',
  },
  {
    title: 'AI pipeline suggestions',
    body: 'Describe what you need in English. Get working YAML.',
    href: '/docs/user-guide/ai-suggestions',
  },
  {
    title: 'GitOps & SCIM',
    body: 'Pipelines as code, identity from your IdP. No bespoke admin UI.',
    href: '/docs/operations/gitops',
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="rounded-lg border border-fd-border p-6 transition-colors hover:bg-fd-muted"
          >
            <h3 className="mb-2 text-lg font-medium">{f.title}</h3>
            <p className="text-sm text-fd-muted-foreground">{f.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
