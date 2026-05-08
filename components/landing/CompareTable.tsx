import Link from 'next/link';

const ROWS = [
  ['Data engine', 'Vector', 'LogStream (proprietary)', 'DD Agent / Vector', 'Edge Delta agent', 'Alloy (OTel fork)', 'Splunk Edge Processor'],
  ['Self-hosted control plane', 'yes', 'yes', 'SaaS only', 'SaaS only', 'yes', 'yes'],
  ['Open source', 'AGPL-3.0', 'proprietary', 'proprietary', 'proprietary', 'Apache-2.0', 'proprietary'],
  ['Visual editor', 'yes', 'yes', 'yes', 'yes', 'config-as-code', 'yes'],
  ['Vendor lock-in', 'none', 'high', 'Datadog backend', 'Edge Delta agent', 'none', 'Splunk backend'],
  ['Pricing', 'free', 'per GB', 'per host + per GB', 'per GB', 'free', 'Splunk ingest'],
  ['Runs on a laptop', 'docker compose', 'free tier', 'no', 'no', 'yes', 'no'],
] as const;

const YES = new Set(['yes', 'AGPL-3.0', 'Apache-2.0', 'docker compose', 'free tier']);
const NO = new Set(['SaaS only', 'proprietary', 'config-as-code', 'no']);

function verdictClass(value: string, isUs: boolean) {
  const flags = [isUs ? 'us' : '', YES.has(value) ? 'yes' : '', NO.has(value) ? 'no' : ''];
  return flags.filter(Boolean).join(' ') || undefined;
}

export function CompareTable() {
  return (
    <section className="block" id="compare">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// where it fits</span>
          <h2>Vector-native, vendor-neutral.</h2>
          <p className="lede">
            VectorFlow is a self-hosted control plane for Vector. It is not an
            observability backend, not a SaaS, not a Vector replacement.
            Here&apos;s the honest line-up.
          </p>
        </div>

        <div className="compare">
          <div className="compare-head">
            <h3>Side by side</h3>
            <span className="meta">2026 · vendor websites and public docs</span>
          </div>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th className="us">VectorFlow</th>
                <th>Cribl Stream</th>
                <th>Datadog OP</th>
                <th>Edge Delta</th>
                <th>Grafana Alloy</th>
                <th>Splunk Edge Processor</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, us, cribl, datadog, edge, alloy, splunk]) => (
                <tr key={label}>
                  <td className="label">{label}</td>
                  {[us, cribl, datadog, edge, alloy, splunk].map((value, index) => (
                    <td className={verdictClass(value, index === 0)} key={`${label}-${value}-${index}`}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="compare-note">
          Honest read: pick the right tool. If you need a managed SaaS with
          vendor SLAs, VectorFlow is not it. If you&apos;re on Vector and tired
          of TOML across hosts, this is the natural next step.
          <br />
          <Link href="/docs/user-guide/migration-toolkit">Migration toolkit →</Link>
        </p>
      </div>
    </section>
  );
}
