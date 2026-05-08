import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('home layout is a custom landing layout with scoped CSS', async () => {
  const layout = await read('app/(home)/layout.tsx');

  assert.match(layout, /import ['"]\.\/landing\.css['"]/);
  assert.doesNotMatch(layout, /HomeLayout/);
  assert.match(layout, /return\s+(?:\(\s*)?<>\s*\{children\}\s*<\/>\s*(?:\)\s*)?;/);
});

test('root layout exposes Inter and JetBrains Mono CSS variables', async () => {
  const layout = await read('app/layout.tsx');

  assert.match(layout, /Inter\(\{[\s\S]*variable:\s*['"]--font-inter['"]/);
  assert.match(layout, /JetBrains_Mono\(\{[\s\S]*variable:\s*['"]--font-jetbrains['"]/);
  assert.match(layout, /className=\{[\s\S]*inter\.variable[\s\S]*jetbrains\.variable/);
});

test('landing CSS carries editorial tokens and dark-mode selectors', async () => {
  const css = await read('app/(home)/landing.css');

  assert.match(css, /--bg:\s*#fafaf7/);
  assert.match(css, /--c-acc:\s*#7dd957/);
  assert.match(css, /html\.dark\s*\{/);
  assert.doesNotMatch(css, /data-theme/);

  for (const selector of [
    '.nav',
    '.hero',
    '.strip',
    '.pitch',
    '.preview-frame',
    '.features',
    '.compare',
    '.install',
    '.term',
    '.foot',
    '.theme-toggle',
  ]) {
    assert.match(css, new RegExp(selector.replace('.', '\\.') + '\\b'));
  }
});

test('home page composes all landing sections in order', async () => {
  const page = await read('app/(home)/page.tsx');
  const sequence = [
    '<Nav />',
    '<Hero />',
    '<FactStrip />',
    '<Pitch />',
    '<ProductPreview />',
    '<FeatureGrid />',
    '<CompareTable />',
    '<Install />',
    '<Footer />',
  ];

  let cursor = -1;
  for (const needle of sequence) {
    const next = page.indexOf(needle);
    assert.notEqual(next, -1, `${needle} missing`);
    assert.ok(next > cursor, `${needle} is out of order`);
    cursor = next;
  }
  assert.doesNotMatch(page, /Screenshot/);
});

test('landing components include required content from the editorial spec', async () => {
  const files = await Promise.all([
    read('components/landing/Nav.tsx'),
    read('components/landing/Hero.tsx'),
    read('components/landing/FactStrip.tsx'),
    read('components/landing/ProductPreview.tsx'),
    read('components/landing/FeatureGrid.tsx'),
    read('components/landing/CompareTable.tsx'),
    read('components/landing/Install.tsx'),
    read('components/landing/Footer.tsx'),
    read('components/landing/ThemeToggle.tsx'),
  ]);
  const source = files.join('\n');

  for (const text of [
    '›',
    'Your fleet,',
    'under',
    'one canvas',
    'Vector · vector.dev',
    'Drag, drop, deploy.',
    'datadog.reducer',
    'Self-hosted, agent-driven',
    'Vector-native, vendor-neutral.',
    'Side by side',
    'Five minutes,',
    'all systems operational',
  ]) {
    assert.ok(source.includes(text), `${text} missing`);
  }

  assert.match(source, /useTheme\(\)/);
  assert.match(source, /setTheme\(/);
});

test('footer source links use concise GitHub label without site repo', async () => {
  const footer = await read('components/landing/Footer.tsx');

  assert.ok(footer.includes('>GitHub</a>'), 'GitHub source label missing');
  assert.ok(!footer.includes('vectorflow on GitHub'), 'old verbose GitHub label remains');
  assert.ok(!footer.includes('site repo'), 'site repo footer link remains');
  assert.ok(!footer.includes('github.com/TerrifiedBug/vectorflow.sh'), 'site repo URL remains');
});

test('comparison table includes five competitors and seven capability rows', async () => {
  const source = await read('components/landing/CompareTable.tsx');
  const competitors = [
    'Cribl Stream',
    'Datadog OP',
    'Edge Delta',
    'Grafana Alloy',
    'Splunk Edge Processor',
  ];

  for (const competitor of competitors) {
    assert.ok(source.includes(competitor), `${competitor} missing`);
  }

  assert.match(source, /const ROWS = \[[\s\S]*\] as const;/);
  const rowLabels = [
    'Data engine',
    'Self-hosted control plane',
    'Open source',
    'Visual editor',
    'Vendor lock-in',
    'Pricing',
    'Runs on a laptop',
  ];
  for (const label of rowLabels) {
    assert.ok(source.includes(label), `${label} row missing`);
  }
});
