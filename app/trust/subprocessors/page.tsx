import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';
import '../../(home)/landing.css';
import '../trust.css';

export const metadata: Metadata = {
  title: 'Sub-processors',
  description:
    'Sub-processors VectorFlow Cloud uses to deliver the service. 30-day advance notice required before adding any new sub-processor.',
};

interface Row {
  processor: string;
  purpose: string;
  location: string;
  dpa: string;
}

const rows: Row[] = [
  {
    processor: 'Amazon Web Services (AWS)',
    purpose: 'Hosting, RDS, KMS, S3, ECS — primary infrastructure',
    location: 'eu-west-2 (London) by default; us-east-1 on request',
    dpa: 'AWS Data Processing Addendum + Standard Contractual Clauses',
  },
  {
    processor: 'Stripe',
    purpose: 'Subscription billing, invoicing, tax',
    location: 'United States (Stripe DPA)',
    dpa: 'Stripe Data Processing Agreement',
  },
  {
    processor: 'Resend',
    purpose: 'Transactional email (magic links, billing receipts, alerts)',
    location: 'United States',
    dpa: 'Resend Data Processing Agreement',
  },
  {
    processor: 'Sentry',
    purpose:
      'Server error tracking — PII scrubbed in `beforeSend` before transmission',
    location: 'United States',
    dpa: 'Sentry Data Processing Agreement',
  },
  {
    processor: 'Cloudflare',
    purpose: 'DNS, edge routing, DDoS protection',
    location: 'Global',
    dpa: 'Cloudflare Data Processing Addendum',
  },
];

export default function SubprocessorsPage() {
  return (
    <>
      <Nav />
      <main className="trust">
        <header className="trust-hero wrap">
          <h1>Sub-processors</h1>
          <p className="lede">
            These are the third parties VectorFlow Cloud entrusts with customer
            data to deliver the service. We give existing customers{' '}
            <strong>30 days&rsquo; advance notice</strong> before adding any new
            sub-processor to this list.
          </p>
          <p className="trust-meta">
            Last updated: 2026-05-17. Subscribe to changes by emailing{' '}
            <a href="mailto:trust@vectorflow.sh" className="link">
              trust@vectorflow.sh
            </a>
            .
          </p>
        </header>

        <section className="wrap trust-section">
          <table className="trust-table">
            <thead>
              <tr>
                <th>Processor</th>
                <th>Purpose</th>
                <th>Location</th>
                <th>DPA</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.processor}>
                  <td>
                    <strong>{row.processor}</strong>
                  </td>
                  <td>{row.purpose}</td>
                  <td>{row.location}</td>
                  <td>{row.dpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="wrap trust-section">
          <h2>What we do not process through third parties</h2>
          <ul className="trust-list">
            <li>
              <strong>Raw log data</strong> never reaches our control plane and
              therefore never reaches any sub-processor.
            </li>
            <li>
              <strong>Customer secrets in plaintext</strong> never leave the
              encrypted Postgres column. Sub-processors that touch the database
              only see ciphertext.
            </li>
            <li>
              <strong>Analytics on customer behaviour</strong> beyond
              error-tracking telemetry. We do not use third-party product
              analytics that ship identifiable usage data off-platform.
            </li>
          </ul>
        </section>

        <section className="wrap trust-section">
          <p>
            Return to{' '}
            <Link href="/trust" className="link">
              Trust &amp; Security overview
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
