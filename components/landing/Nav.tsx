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

export function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Wordmark />
        <div className="nav-links">
          <a href="#features" className="has-chev">Product</a>
          <a href="#compare" className="has-chev">Compare</a>
          <Link href="/docs" className="has-chev">Docs</Link>
          <a href="https://github.com/TerrifiedBug/vectorflow" className="has-chev">GitHub</a>
        </div>
        <div className="nav-cta">
          <ThemeToggle />
          <Link href="/docs" className="btn ghost">Docs</Link>
          <a href="https://demo.vectorflow.sh/login?prefill=demo" className="btn primary">
            Try the demo <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
