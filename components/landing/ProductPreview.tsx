export function ProductPreview() {
  return (
    <section className="block" id="preview">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// the canvas</span>
          <h2>Drag, drop, deploy.</h2>
          <p className="lede">
            Sources, transforms, sinks — wired on a canvas, not in a TOML file.
            The editor generates valid Vector configuration; the agent rolls it
            out.
          </p>
        </div>

        <div className="preview-frame" role="img" aria-label="VectorFlow pipeline editor preview">
          <div className="preview-bar">
            <div className="lights"><span /><span /><span /></div>
            <div className="crumb">
              acme-obs <span style={{ color: '#3a4049' }}>/</span> pipelines{' '}
              <span style={{ color: '#3a4049' }}>/</span> <b>datadog.reducer</b>{' '}
              <span style={{ color: '#3a4049' }}>·</span> v3.2.1
            </div>
            <div className="right">
              <span className="pill-c"><span className="dot-c" />healthy</span>
            </div>
          </div>

          <div className="preview-body">
            <aside className="pv-side">
              <div className="group">Workspace</div>
              <a><span style={{ color: 'var(--c-acc)' }}>›</span> Pipelines<span className="num">47</span></a>
              <a className="on">Fleet<span className="num">128</span></a>
              <a>Environments<span className="num">3</span></a>
              <a>Audit</a>
              <div className="group">Catalog</div>
              <a>Sources<span className="num">14</span></a>
              <a>Transforms<span className="num">22</span></a>
              <a>Sinks<span className="num">19</span></a>
              <div className="group">Workspace · acme-obs</div>
              <a>Settings</a>
            </aside>

            <div className="pv-canvas">
              <div className="pv-canvas-head">
                <span><span style={{ color: 'var(--c-acc)' }}>›</span> datadog.reducer</span>
                <span className="meta">2 sources · 4 transforms · 3 sinks · 12.4K events/s</span>
              </div>
              <svg className="pv-canvas-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.04)" />
                  </pattern>
                  <marker id="arrow-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#7dd957" />
                  </marker>
                  <marker id="arrow-tx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#5b9cff" />
                  </marker>
                  <marker id="arrow-snk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#c084fc" />
                  </marker>
                </defs>
                <rect width="800" height="500" fill="url(#grid)" />

                <g fill="none" strokeWidth="1.5">
                  <path d="M150 110 C 230 110, 250 220, 330 220" stroke="#7dd957" markerEnd="url(#arrow-acc)" />
                  <path d="M150 250 C 230 250, 250 220, 330 220" stroke="#7dd957" markerEnd="url(#arrow-acc)" />
                  <path d="M150 250 C 230 250, 250 360, 330 360" stroke="#7dd957" markerEnd="url(#arrow-acc)" />
                  <path d="M460 220 C 530 220, 530 140, 600 140" stroke="#5b9cff" markerEnd="url(#arrow-tx)" />
                  <path d="M460 220 C 530 220, 540 250, 600 250" stroke="#5b9cff" markerEnd="url(#arrow-tx)" />
                  <path d="M460 360 C 530 360, 540 360, 600 360" stroke="#5b9cff" markerEnd="url(#arrow-tx)" />
                </g>

                <circle r="3.5" fill="#7dd957">
                  <animateMotion dur="2.4s" repeatCount="indefinite" path="M150 110 C 230 110, 250 220, 330 220" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#7dd957">
                  <animateMotion dur="2.4s" begin="-0.8s" repeatCount="indefinite" path="M150 250 C 230 250, 250 220, 330 220" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="-0.8s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#5b9cff">
                  <animateMotion dur="2s" begin="-0.4s" repeatCount="indefinite" path="M460 220 C 530 220, 530 140, 600 140" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin="-0.4s" repeatCount="indefinite" />
                </circle>

                <Node x={40} y={84} width={110} color="#7dd957" kind="SOURCE" name="kubernetes_logs" meta="9.2K /s" />
                <Node x={40} y={224} width={110} color="#7dd957" kind="SOURCE" name="http_server" meta="3.2K /s" />
                <Node x={330} y={194} width={130} color="#5b9cff" kind="TRANSFORM · VRL" name="redact_pii" meta="12.4K /s · 1.2ms" />
                <Node x={330} y={334} width={130} color="#5b9cff" kind="TRANSFORM" name="sample_50pct" meta="1.6K /s" />
                <Node x={600} y={114} width={120} color="#c084fc" kind="SINK" name="datadog_logs" meta="us5 · 14ms" />
                <Node x={600} y={224} width={120} color="#c084fc" kind="SINK" name="s3_archive" meta="eu-west-1" />
                <Node x={600} y={334} width={120} color="#c084fc" kind="SINK" name="loki" meta="internal · 8ms" />
              </svg>
            </div>

            <aside className="pv-aside">
              <h5>Pipeline</h5>
              <div className="row"><span className="k">name</span><span className="v">datadog.reducer</span></div>
              <div className="row"><span className="k">version</span><span className="v" style={{ color: 'var(--c-acc)' }}>v3.2.1</span></div>
              <div className="row"><span className="k">env</span><span className="v">prod</span></div>
              <div className="row"><span className="k">owner</span><span className="v" style={{ fontFamily: 'var(--font-sans)' }}>platform</span></div>

              <h5>Throughput · 4h</h5>
              <svg className="pv-spark" width="208" height="42" viewBox="0 0 208 42">
                <defs>
                  <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#7dd957" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#7dd957" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 30 L13 26 L26 32 L39 28 L52 22 L65 26 L78 18 L91 22 L104 14 L117 22 L130 12 L143 18 L156 8 L169 16 L182 6 L195 14 L208 4 L208 42 L0 42 Z" fill="url(#sg)" />
                <path d="M0 30 L13 26 L26 32 L39 28 L52 22 L65 26 L78 18 L91 22 L104 14 L117 22 L130 12 L143 18 L156 8 L169 16 L182 6 L195 14 L208 4" fill="none" stroke="#7dd957" strokeWidth="1.5" />
              </svg>
              <div className="row no-border"><span className="k">events / s</span><span className="v">12.4K</span></div>
              <div className="row"><span className="k">p95</span><span className="v">14ms</span></div>
              <div className="row"><span className="k">errors</span><span className="v">0.00%</span></div>

              <h5>Fleet · 4 nodes</h5>
              <div className="row no-border"><span className="k">healthy</span><span className="v" style={{ color: 'var(--c-acc)' }}>4 / 4</span></div>
              <div className="fleet-dots"><span /><span /><span /><span /></div>
            </aside>
          </div>
        </div>

        <div className="preview-caption">
          <span className="l">datadog.reducer · prod · 4 nodes · 12.4K events/s</span>
          <span className="l">screenshot · canvas v3.2.1</span>
        </div>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  width,
  color,
  kind,
  name,
  meta,
}: {
  x: number;
  y: number;
  width: number;
  color: string;
  kind: string;
  name: string;
  meta: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="52" rx="3" fill="#14171c" stroke="#2a2f37" />
      <rect x={x} y={y} width="3" height="52" fill={color} />
      <text x={x + 15} y={y + 19} fontFamily="JetBrains Mono" fontSize="9" fill={color} letterSpacing="0.5">
        {kind}
      </text>
      <text x={x + 15} y={y + 36} fontFamily="JetBrains Mono" fontSize="11" fill="#e6e8ec" fontWeight="500">
        {name}
      </text>
      <text x={x + 15} y={y + 48} fontFamily="JetBrains Mono" fontSize="9.5" fill="#6b727d">
        {meta}
      </text>
    </g>
  );
}
