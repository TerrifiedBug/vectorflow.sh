import Link from 'next/link';

const TERMINAL_LINES = [
  { prompt: '$', text: 'mkdir vectorflow && cd vectorflow', kind: 'cmd' },
  { prompt: '$', text: 'curl -sSfL -o docker-compose.yml \\', kind: 'cmd' },
  {
    prompt: ' ',
    text: '  https://raw.githubusercontent.com/TerrifiedBug/vectorflow/main/docker/server/docker-compose.yml',
    kind: 'cmd',
  },
  { prompt: '$', text: 'docker compose up -d', kind: 'cmd' },
  { text: '[+] Pulling 14/14', kind: 'out' },
  { text: '[+] Running  4/4', kind: 'out' },
  { text: ' ✔ Network  vectorflow_default        Created', kind: 'out' },
  { text: ' ✔ Volume   "vectorflow_pgdata"       Created', kind: 'out' },
] as const;

export function Install() {
  return (
    <section className="install" id="install">
      <div className="wrap">
        <div className="row">
          <div>
            <span className="eyebrow">// run it locally</span>
            <h2>
              Five minutes,<br />two containers.
            </h2>
            <p>
              Server and Postgres come up in Docker Compose. The agent is a
              zero-dep Go binary; drop it on a host and it phones home.
            </p>
            <p className="install-note">
              <span className="mark">›</span> requires docker · docker compose
              v2+ · 1 cpu · 1 GB RAM
            </p>
            <div className="install-actions">
              <Link href="/docs/getting-started/quick-start" className="btn primary">
                Full quick-start <span className="arrow">→</span>
              </Link>
              <Link href="/docs/getting-started/deploy-server" className="btn">
                Production deploy
              </Link>
            </div>
          </div>

          <div className="term">
            <div className="term-bar">
              <div className="lights"><span /><span /><span /></div>
              <span className="title">~/vectorflow · zsh</span>
            </div>
            <div className="term-body">
              {TERMINAL_LINES.map((line, index) => (
                <div className="line" key={`${line.text}-${index}`}>
                  {'prompt' in line ? <><span className="prompt">{line.prompt}</span> </> : null}
                  <span className={line.kind}>{line.text}</span>
                </div>
              ))}
              <div className="line">
                <span className="out"> ✔ Container vectorflow-postgres      </span>
                <span className="ok">Healthy</span>
              </div>
              <div className="line">
                <span className="out"> ✔ Container vectorflow-server        </span>
                <span className="ok">Started</span>
              </div>
              <div className="line"><span className="out"> </span></div>
              <div className="line">
                <span className="prompt">›</span>{' '}
                <span className="ok">vectorflow up at http://localhost:3000</span>
                <span className="term-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
