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

function transformStepper(source) {
  return source
    .replace(/\{% stepper %\}/g, '<Steps>')
    .replace(/\{% endstepper %\}/g, '</Steps>')
    .replace(/\{% step %\}/g, '<Step>')
    .replace(/\{% endstep %\}/g, '</Step>');
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

// Remap fenced-code language tags that Shiki doesn't ship with. Add entries
// here when a build error like "Language `X` not found" shows up. Picking a
// reasonable substitute (or `text` for "no highlighting") avoids a manual
// edit to the ported file that would regress on the next port run.
const SHIKI_LANG_REMAP = {
  caddy: 'text',
};

function transformFenceLanguages(source) {
  return source.replace(/```([a-zA-Z0-9_-]+)/g, (match, lang) => {
    return SHIKI_LANG_REMAP[lang] ? '```' + SHIKI_LANG_REMAP[lang] : match;
  });
}

// MDX treats `<` as the start of a JSX tag. In plain prose markdown, you can
// have `<-> Git` or `**<** (less than)` and the parser will choke. Escape any
// `<` that is NOT followed by a letter, `/`, or `!` (which start a real tag,
// closing tag, or HTML comment respectively).
function escapeOrphanAngleBrackets(source) {
  return source.replace(/<(?![a-zA-Z/!])/g, '\\<');
}

// Rewrite relative screenshot paths to absolute /screenshots/ — matches the
// destination layout where images move from docs-tree to /public/screenshots/.
function transformScreenshotPaths(source) {
  return source.replace(
    /\(((?:\.\.\/)*screenshots\/[^)]+)\)/g,
    (_match, path) => {
      const file = path.replace(/^(\.\.\/)+/, '');
      return `(/${file})`;
    },
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

// If the file has no frontmatter, lift the leading `# Title` line into a YAML
// frontmatter block (Fumadocs requires `title:`). Strip the H1 from the body —
// Fumadocs renders the title separately above page content.
function ensureFrontmatter(source) {
  if (source.startsWith('---\n')) return source;
  const match = source.match(/^#\s+(.+?)\s*\n+/);
  if (!match) return source;
  const title = match[1].trim();
  const body = source.slice(match[0].length);
  return `---\ntitle: ${JSON.stringify(title)}\n---\n\n${body}`;
}

export function transform(source) {
  // Fence language remap MUST run before the fence protector — once the
  // fences are placeholder-substituted, their language tags are out of reach.
  const withRemappedFences = transformFenceLanguages(source);
  const withFrontmatter = ensureFrontmatter(withRemappedFences);
  return withProtectedFences(withFrontmatter, (s) => {
    s = transformHints(s);
    s = transformTabs(s);
    s = transformStepper(s);
    s = transformFigures(s);
    s = transformFileEmbeds(s);
    s = transformInternalMdLinks(s);
    s = transformScreenshotPaths(s);
    s = escapeOrphanAngleBrackets(s);
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
