import Link from 'next/link';

const FEATURES = [
  {
    num: '01 · EDITOR',
    title: 'Visual pipeline editor',
    body: 'Drag-and-drop sources, transforms, and sinks onto a canvas. The editor generates valid Vector config; VRL gets autocomplete and a live preview.',
    more: 'Open the editor docs',
    href: '/docs/user-guide/pipeline-editor',
  },
  {
    num: '02 · FLEET',
    title: 'Fleet management',
    body: "Enroll nodes, push pipeline updates, watch the rollout. See which agents are online, what they're running, and roll back instantly.",
    more: 'Read the fleet guide',
    href: '/docs/user-guide/fleet',
  },
  {
    num: '03 · OBSERVE',
    title: 'Alerts & anomaly detection',
    body: 'Catch broken pipelines and unusual log volumes before users do. Throughput, error rates, p95 — observed continuously, not on demand.',
    more: 'See alert rules',
    href: '/docs/user-guide/alerts',
  },
  {
    num: '04 · ASSISTANT',
    title: 'AI pipeline suggestions',
    body: 'Describe what you need in English. Get working YAML — generated, validated, ready to drop on the canvas. AI is a quiet helper, not a marketing surface.',
    more: 'How the assistant works',
    href: '/docs/user-guide/ai-suggestions',
  },
  {
    num: '05 · GITOPS',
    title: 'GitOps & SCIM',
    body: 'Pipelines as code. Identity from your IdP. No bespoke admin UI to babysit — your existing review and provisioning flows stay in charge.',
    more: 'Wire up GitOps',
    href: '/docs/operations/gitops',
  },
  {
    num: '06 · DEPLOY',
    title: 'Self-hosted, agent-driven',
    body: 'Server runs on Docker. Agents are zero-dep Go binaries that sit beside Vector. Your data never leaves your network. AGPL-3.0.',
    more: 'Architecture overview',
    href: '/docs/operations/architecture',
  },
];

export function FeatureGrid() {
  return (
    <section className="block" id="features">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// what&apos;s in it</span>
          <h2>One canvas. Every Vector node.</h2>
          <p className="lede">
            Six things you stop doing by hand. Each lifts cleanly to the docs —
            no marketing fluff between you and the actual pages.
          </p>
        </div>

        <div className="features">
          {FEATURES.map((feature) => (
            <Link className="feat" href={feature.href} key={feature.num}>
              <div className="num">{feature.num}</div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <span className="more">{feature.more}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
