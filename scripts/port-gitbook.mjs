const HINT_STYLE_TO_CALLOUT = {
  info: 'info',
  warning: 'warn',
  danger: 'error',
  success: 'info',
};

function withProtectedFences(source, fn) {
  const fences = [];
  const placeholderFor = (i) => ` FENCE${i} `;
  const protectedSrc = source.replace(/```[\s\S]*?```/g, (match) => {
    const idx = fences.length;
    fences.push(match);
    return placeholderFor(idx);
  });
  const transformed = fn(protectedSrc);
  return transformed.replace(/ FENCE(\d+) /g, (_, i) => fences[Number(i)]);
}

function transformHints(source) {
  return source.replace(
    /\{% hint style="(\w+)" %\}([\s\S]*?)\{% endhint %\}/g,
    (_match, style, body) => {
      const type = HINT_STYLE_TO_CALLOUT[style] ?? 'info';
      return `<Callout type="${type}">${body}</Callout>`;
    },
  );
}

function transformTabs(source) {
  return source.replace(
    /\{% tabs %\}([\s\S]*?)\{% endtabs %\}/g,
    (_match, body) => {
      const tabs = [...body.matchAll(/\{% tab title="([^"]+)" %\}([\s\S]*?)\{% endtab %\}/g)];
      const items = tabs.map(([, title]) => title);
      const inner = tabs
        .map(([, title, content]) => `<Tab value="${title}">${content}</Tab>`)
        .join('\n');
      return `<Tabs items={${JSON.stringify(items)}}>\n${inner}\n</Tabs>`;
    },
  );
}

function transformFigures(source) {
  return source.replace(
    /<figure>\s*<img\s+([^>]*?)\/?>(?:\s*<figcaption>[\s\S]*?<\/figcaption>)?\s*<\/figure>/g,
    (_match, attrs) => {
      const srcMatch = attrs.match(/src="([^"]+)"/);
      const altMatch = attrs.match(/alt="([^"]*)"/);
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      return `![${alt}](${src})`;
    },
  );
}

function transformFileEmbeds(source) {
  return source.replace(
    /\{% file src="([^"]+)" %\}/g,
    (_match, src) => `[Download](${src})`,
  );
}

function transformInternalMdLinks(source) {
  return source.replace(
    /\]\(([^)]+?)\.md(#[^)]*)?\)/g,
    (match, path, anchor) => {
      if (path.startsWith('http://') || path.startsWith('https://')) return match;
      return `](${path}${anchor ?? ''})`;
    },
  );
}

export function transform(source) {
  return withProtectedFences(source, (s) => {
    s = transformHints(s);
    s = transformTabs(s);
    s = transformFigures(s);
    s = transformFileEmbeds(s);
    s = transformInternalMdLinks(s);
    return s;
  });
}

import { fileURLToPath } from 'node:url';
import { resolve, dirname, join, relative, extname } from 'node:path';
import { mkdir, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function runCli(inDir, outDir) {
  await mkdir(outDir, { recursive: true });
  for await (const file of walk(inDir)) {
    const rel = relative(inDir, file);
    if (rel.startsWith('.gitbook/')) continue;
    if (rel === 'SUMMARY.md') continue;
    const ext = extname(rel);
    const target = join(outDir, ext === '.md' ? rel.replace(/\.md$/, '.mdx') : rel);
    await mkdir(dirname(target), { recursive: true });
    if (ext === '.md') {
      const src = await readFile(file, 'utf8');
      await writeFile(target, transform(src));
    } else {
      await copyFile(file, target);
    }
  }
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);
if (isCli) {
  const [inDir, outDir] = process.argv.slice(2);
  if (!inDir || !outDir) {
    console.error('Usage: node scripts/port-gitbook.mjs <inDir> <outDir>');
    process.exit(1);
  }
  await runCli(resolve(inDir), resolve(outDir));
}
