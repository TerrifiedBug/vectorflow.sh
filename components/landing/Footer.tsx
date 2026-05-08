import Link from 'next/link';
import { Wordmark } from './Nav';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-row">
          <div className="col about">
            <Wordmark label="vectorflow" />
            <p>
              The control plane Vector was missing. Self-hosted, AGPL-3.0,
              agent-driven. Your data never leaves your network.
            </p>
          </div>
          <div className="col">
            <h6>Product</h6>
            <a href="#features">Features</a>
            <a href="#compare">Compare</a>
            <a href="https://demo.vectorflow.sh">Live demo</a>
            <Link href="/docs/getting-started/quick-start">Quick start</Link>
          </div>
          <div className="col">
            <h6>Docs</h6>
            <Link href="/docs">Introduction</Link>
            <Link href="/docs/user-guide/pipeline-editor">Pipeline editor</Link>
            <Link href="/docs/user-guide/fleet">Fleet</Link>
            <Link href="/docs/operations/architecture">Architecture</Link>
            <Link href="/docs/reference/api">API reference</Link>
          </div>
          <div className="col">
            <h6>Source</h6>
            <a href="https://github.com/TerrifiedBug/vectorflow">GitHub</a>
            <a href="https://github.com/TerrifiedBug/vectorflow/blob/main/LICENSE">License (AGPL-3.0)</a>
            <Link href="/docs/operations/telemetry">Telemetry</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="fine">
            Licensed under{' '}
            <a href="https://github.com/TerrifiedBug/vectorflow/blob/main/LICENSE">AGPL-3.0</a>
            {' '}· maintained by{' '}
            <a href="https://github.com/TerrifiedBug">@TerrifiedBug</a>
          </span>
          <span className="status"><span className="dot pulse" />all systems operational</span>
        </div>
      </div>
    </footer>
  );
}
