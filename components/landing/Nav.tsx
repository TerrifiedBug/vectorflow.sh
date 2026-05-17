import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Wordmark({ label = 'vectorflow home' }: { label?: string }) {
  return (
    <Link href="/" className="wm" aria-label={label}>
      <span className="acc">›</span>
      <span className="a">vector</span>
      <span className="b">flow</span>
    </Link>
  );
}

const CLOUD_SIGNUP_URL =
  process.env.NEXT_PUBLIC_CLOUD_SIGNUP_URL ?? 'https://cloud.vectorflow.sh/signup';

export function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Wordmark />
        <div className="nav-links">
          <Link href="/#features" className="has-chev">Product</Link>
          <Link href="/#compare" className="has-chev">Compare</Link>
          <Link href="/docs" className="has-chev">Docs</Link>
          <Link href="/trust" className="has-chev">Trust</Link>
          <a href="https://github.com/TerrifiedBug/vectorflow" className="has-chev">GitHub</a>
        </div>
        <div className="nav-cta">
          <ThemeToggle />
          <a href="https://demo.vectorflow.sh/login?prefill=demo" className="btn ghost">
            Live demo
          </a>
          <a href={CLOUD_SIGNUP_URL} className="btn primary">
            Start free <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
