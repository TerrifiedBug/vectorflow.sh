const CLOUD_SIGNUP_URL =
  process.env.NEXT_PUBLIC_CLOUD_SIGNUP_URL ?? 'https://cloud.vectorflow.sh/signup';

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-eyebrow">
          <span className="eyebrow">
            Self-hosted <span className="sep">·</span> AGPL-3.0{' '}
            <span className="sep">·</span> Agent-driven
          </span>
        </div>
        <h1>
          Your fleet,<br />
          under <span className="accent-line">one canvas</span>.
        </h1>
        <p className="sub">
          Build, deploy, and observe every Vector node from a single visual
          control plane. Drag-and-drop pipelines, fleet rollout, version
          history, rollback — without a deploy script.
        </p>
        <div className="hero-cta">
          <a href={CLOUD_SIGNUP_URL} className="btn primary lg">
            Start free on Cloud <span className="arrow">→</span>
          </a>
          <a href="https://demo.vectorflow.sh/login?prefill=demo" className="btn lg">
            Live demo
          </a>
          <a href="https://github.com/TerrifiedBug/vectorflow" className="btn ghost lg">
            View on GitHub ›
          </a>
        </div>
        <p className="hero-cta-note">
          Free plan: 3 nodes, 1 GB ingest/mo. Self-host the AGPL build any
          time from <a href="https://github.com/TerrifiedBug/vectorflow">GitHub</a>.
        </p>

        <div className="hero-meta">
          <div className="item">
            <div className="k">Data engine</div>
            <div className="v">vector.dev</div>
          </div>
          <div className="item">
            <div className="k">Agent</div>
            <div className="v">vf-agent · go · zero deps</div>
          </div>
          <div className="item">
            <div className="k">Backend</div>
            <div className="v">postgres · next.js · tRPC</div>
          </div>
          <div className="item">
            <div className="k">Status</div>
            <div className="v">
              <span className="dot pulse status-dot" />shipping{' '}
              <span className="acc-dot">v0.2.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
