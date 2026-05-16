import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';
import '../(home)/landing.css';
import './trust.css';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description:
    'How VectorFlow Cloud protects customer data: per-org KMS-wrapped encryption, no-operator-decrypt boundary, audit chain, retention defaults, and compliance posture.',
};

export default function TrustPage() {
  return (
    <>
      <Nav />
      <main className="trust">
        <header className="trust-hero wrap">
          <h1>Trust &amp; Security</h1>
          <p className="lede">
            VectorFlow Cloud is a control plane. Customer log data never leaves
            the customer&rsquo;s network. The control-plane data we do hold
            (pipeline configs, fleet metadata, secret references, audit logs)
            is encrypted with a per-organization data encryption key that
            VectorFlow operators cannot read.
          </p>
          <p className="trust-meta">
            Threat model (source of truth):{' '}
            <a
              href="https://github.com/TerrifiedBug/vectorflow/blob/main/docs/cloud/threat-model.md"
              className="link"
            >
              docs/cloud/threat-model.md
            </a>{' '}
            on GitHub.
          </p>
        </header>

        <section className="wrap trust-section">
          <h2>Data we hold</h2>
          <ul className="trust-list">
            <li>
              <strong>Pipeline configurations.</strong> The YAML graphs you
              author in the visual editor. Encrypted at rest.
            </li>
            <li>
              <strong>Fleet metadata.</strong> Node hostnames, heartbeat state,
              pipeline-to-node assignment. Not your log payloads.
            </li>
            <li>
              <strong>Bounded metrics &amp; samples.</strong> Numerical rollups
              for the dashboards, and capped event samples for the live preview.
              Default retention: 90 days.
            </li>
            <li>
              <strong>Notification channel credentials.</strong> Webhook URLs,
              Slack tokens, PagerDuty integration keys. Encrypted with the
              per-org DEK and never logged.
            </li>
            <li>
              <strong>Audit log.</strong> Every control-plane action, hash-
              chained for tamper evidence. Customer-visible from the dashboard.
            </li>
          </ul>
          <p className="muted">
            What we explicitly <em>do not</em> hold: raw customer log payloads,
            event stream contents, anything that flows through the Vector
            pipelines themselves.
          </p>
        </section>

        <section className="wrap trust-section">
          <h2>Encryption</h2>
          <p>
            Every organization gets its own data-encryption key (DEK), generated
            at signup and wrapped with the cloud KMS customer master key (AWS
            KMS). Field-level encryption uses AES-256-GCM with the DEK and an
            Additional Authenticated Data (AAD) tag bound to{' '}
            <code>orgId + domain + rowKey</code>. A ciphertext from one
            organization cannot be lifted into another organization&rsquo;s row
            and decrypt cleanly &mdash; the AAD mismatch is detected and the
            decrypt fails.
          </p>
          <p>
            DEK rotation re-wraps existing ciphertexts in the background; old
            and new ciphertexts both decrypt during the rotation window.
            Bring-your-own-key (BYOK) is on the roadmap for paying tiers.
          </p>
        </section>

        <section className="wrap trust-section">
          <h2>Operator access model</h2>
          <p>
            VectorFlow operators cannot read your data in the normal course of
            running the service. Concretely:
          </p>
          <ul className="trust-list">
            <li>
              The application runs against a non-owner Postgres role
              (<code>vectorflow_app</code>) with{' '}
              <code>NOBYPASSRLS</code>. Row-Level Security policies block
              cross-org reads at the database layer.
            </li>
            <li>
              Operators sign in to a separate operator subdomain with WebAuthn.
              Their role grants list-and-suspend, not decrypt.
            </li>
            <li>
              Decrypting a customer&rsquo;s data requires an explicit{' '}
              <strong>break-glass grant</strong>: the operator opens a request,
              the customer admin is emailed, the grant is time-bound, and every
              decrypt is written to two independent audit logs (the customer
              audit chain and an operator-only{' '}
              <code>PlatformAuditLog</code> shipped to S3 with Object Lock).
            </li>
          </ul>
        </section>

        <section className="wrap trust-section">
          <h2>Audit chain</h2>
          <p>
            Each <code>AuditLog</code> row carries a SHA-256 hash linking it to
            the previous row in the organization&rsquo;s chain. A break in the
            chain is detectable by anyone with the audit export. Customers can
            export their audit log at any time and verify the chain offline
            with the bundled{' '}
            <a
              href="https://github.com/TerrifiedBug/vectorflow/blob/main/scripts/verify-audit-chain.ts"
              className="link"
            >
              <code>verify-audit-chain.ts</code>
            </a>{' '}
            tool.
          </p>
        </section>

        <section className="wrap trust-section">
          <h2>Egress &amp; SSRF protection</h2>
          <p>
            Every outbound URL submitted to the control plane (webhook
            destinations, OIDC discovery, channel endpoints, BYOK KMS) is
            validated against a public-IP allowlist before any request is made.
            We reject private RFC 1918 ranges, link-local addresses (including
            AWS IMDS <code>169.254.169.254</code> and the IPv6 metadata range
            <code>fd00:ec2::254</code>), loopback, Teredo, and IPv4-mapped IPv6
            tunnels through to the same set.
          </p>
        </section>

        <section className="wrap trust-section">
          <h2>Retention defaults</h2>
          <table className="trust-table">
            <thead>
              <tr>
                <th>Data type</th>
                <th>Default retention</th>
                <th>Customer override</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pipeline configurations &amp; versions</td>
                <td>Lifetime of organization</td>
                <td>Delete on demand</td>
              </tr>
              <tr>
                <td>Audit log</td>
                <td>7 years</td>
                <td>Read-only by design</td>
              </tr>
              <tr>
                <td>Metrics rollups (1h, 1d)</td>
                <td>90 days</td>
                <td>Plan-tier dependent</td>
              </tr>
              <tr>
                <td>Event samples (live preview cache)</td>
                <td>15 minutes</td>
                <td>Disable per-pipeline</td>
              </tr>
              <tr>
                <td>Operator decrypt audit (S3 Object Lock)</td>
                <td>7 years</td>
                <td>Cannot be overridden</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="wrap trust-section">
          <h2>Compliance posture</h2>
          <ul className="trust-list">
            <li>
              <strong>GDPR.</strong> Article 20 data export is supported per
              organization. Article 17 right-to-erasure is supported via org
              deletion (90-day cool-off then crypto-shredding the DEK).
            </li>
            <li>
              <strong>SOC 2 Type II.</strong> Audit underway; readiness
              statement on request during the readiness window.
            </li>
            <li>
              <strong>Sub-processors.</strong> Listed at{' '}
              <Link href="/trust/subprocessors" className="link">
                /trust/subprocessors
              </Link>{' '}
              with 30-day advance notice for additions.
            </li>
            <li>
              <strong>DPA.</strong> Customer-signable template at{' '}
              <Link href="/trust/dpa" className="link">
                /trust/dpa
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="wrap trust-section">
          <h2>Incident response</h2>
          <p>
            Security incidents that may affect customer data are disclosed to
            affected customers within 72 hours of confirmation, per the DPA. A
            post-mortem is published to <em>this</em> page within 14 days of
            the incident being resolved. Reach us at{' '}
            <a href="mailto:security@vectorflow.sh" className="link">
              security@vectorflow.sh
            </a>{' '}
            with PGP key on request.
          </p>
        </section>

        <section className="wrap trust-section">
          <h2>Self-hosted edition</h2>
          <p>
            VectorFlow OSS (AGPL-3.0) is the same control plane without the
            multi-tenant boundary &mdash; you are your own operator. The
            cryptography defaults to <code>v2</code> single-master-key mode and
            does not require AWS KMS. If you adopt the v3 envelope flow you
            can plug in HashiCorp Vault Transit; the interface is identical to
            the AWS provider Cloud uses.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
