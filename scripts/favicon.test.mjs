import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const upstreamLogoLight = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="44" viewBox="0 0 280 44">
  <text x="140" y="35" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" letter-spacing="-0.5">
    <tspan font-weight="700" fill="#0a0a0a">Vector</tspan><tspan font-weight="300" fill="#0a0a0a">Flow</tspan>
  </text>
</svg>
`;

test('site favicon uses the upstream VectorFlow light logo', async () => {
  const icon = await readFile(new URL('../app/icon.svg', import.meta.url), 'utf8');

  assert.equal(icon, upstreamLogoLight);
});
