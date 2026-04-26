import { test } from 'node:test';
import assert from 'node:assert/strict';
import { transform } from './port-gitbook.mjs';

test('hint info → Callout type info', () => {
  const input = `{% hint style="info" %}\nBe careful.\n{% endhint %}`;
  const expected = `<Callout type="info">\nBe careful.\n</Callout>`;
  assert.equal(transform(input), expected);
});

test('hint warning → Callout type warn', () => {
  const input = `{% hint style="warning" %}\nWatch out.\n{% endhint %}`;
  const expected = `<Callout type="warn">\nWatch out.\n</Callout>`;
  assert.equal(transform(input), expected);
});

test('hint danger → Callout type error', () => {
  const input = `{% hint style="danger" %}\nDo not do this.\n{% endhint %}`;
  const expected = `<Callout type="error">\nDo not do this.\n</Callout>`;
  assert.equal(transform(input), expected);
});

test('hint success → Callout type info (no native success)', () => {
  const input = `{% hint style="success" %}\nNice.\n{% endhint %}`;
  const expected = `<Callout type="info">\nNice.\n</Callout>`;
  assert.equal(transform(input), expected);
});

test('figure with img → markdown image', () => {
  const input = `<figure><img src="/img.png" alt="thing"/><figcaption>cap</figcaption></figure>`;
  const expected = `![thing](/img.png)`;
  assert.equal(transform(input), expected);
});

test('figure with bare img (no alt) → markdown image with empty alt', () => {
  const input = `<figure><img src="/img.png"/></figure>`;
  const expected = `![](/img.png)`;
  assert.equal(transform(input), expected);
});

test('tabs single tab → Tabs/Tab JSX', () => {
  const input = `{% tabs %}\n{% tab title="One" %}\nbody\n{% endtab %}\n{% endtabs %}`;
  const expected = `<Tabs items={["One"]}>\n<Tab value="One">\nbody\n</Tab>\n</Tabs>`;
  assert.equal(transform(input), expected);
});

test('tabs multiple tabs → Tabs/Tab JSX with all items', () => {
  const input = `{% tabs %}\n{% tab title="One" %}\nfirst\n{% endtab %}\n{% tab title="Two" %}\nsecond\n{% endtab %}\n{% endtabs %}`;
  const expected = `<Tabs items={["One","Two"]}>\n<Tab value="One">\nfirst\n</Tab>\n<Tab value="Two">\nsecond\n</Tab>\n</Tabs>`;
  assert.equal(transform(input), expected);
});

test('file embed → markdown link', () => {
  const input = `{% file src="/my.pdf" %}`;
  const expected = `[Download](/my.pdf)`;
  assert.equal(transform(input), expected);
});

test('internal .md link → Fumadocs route link', () => {
  const input = `See [the agent](../reference/agent.md) for details.`;
  const expected = `See [the agent](../reference/agent) for details.`;
  assert.equal(transform(input), expected);
});

test('relative .md link with anchor preserves anchor', () => {
  const input = `[setup](getting-started/quick-start.md#install)`;
  const expected = `[setup](getting-started/quick-start#install)`;
  assert.equal(transform(input), expected);
});

test('http link is untouched', () => {
  const input = `[Vector](https://vector.dev)`;
  assert.equal(transform(input), input);
});

test('code block contents are not transformed', () => {
  const input = '```yaml\n{% hint style="info" %}\nnot a hint\n{% endhint %}\n```';
  assert.equal(transform(input), input);
});

test('frontmatter is preserved untouched', () => {
  const input = `---\ntitle: Foo\ndescription: Bar\n---\n\n# Body`;
  assert.equal(transform(input), input);
});

test('leading H1 is lifted into frontmatter when none exists', () => {
  const input = `# Pipelines\n\nIntro paragraph.`;
  const expected = `---\ntitle: "Pipelines"\n---\n\nIntro paragraph.`;
  assert.equal(transform(input), expected);
});

test('H1 with trailing whitespace is trimmed when lifted', () => {
  const input = `#   Architecture   \n\nBody.`;
  const expected = `---\ntitle: "Architecture"\n---\n\nBody.`;
  assert.equal(transform(input), expected);
});

test('file without leading H1 and no frontmatter is left alone', () => {
  const input = `Just a paragraph.\n\n## A subhead but no top-level title.`;
  assert.equal(transform(input), input);
});

test('relative screenshot path → absolute /screenshots/ path', () => {
  const input = `![Pipelines](../screenshots/pipelines.png)`;
  const expected = `![Pipelines](/screenshots/pipelines.png)`;
  assert.equal(transform(input), expected);
});

test('deeper relative screenshot path is also normalised', () => {
  const input = `![X](../../screenshots/x.png)`;
  const expected = `![X](/screenshots/x.png)`;
  assert.equal(transform(input), expected);
});

test('non-screenshot relative path is untouched', () => {
  const input = `![X](../assets/x.png)`;
  assert.equal(transform(input), input);
});

test('stepper / step blocks → Steps / Step JSX', () => {
  const input = `{% stepper %}\n{% step %}\nbody one\n{% endstep %}\n{% step %}\nbody two\n{% endstep %}\n{% endstepper %}`;
  const expected = `<Steps>\n<Step>\nbody one\n</Step>\n<Step>\nbody two\n</Step>\n</Steps>`;
  assert.equal(transform(input), expected);
});

test('orphan < before space is escaped', () => {
  const input = `VectorFlow <-> Git`;
  const expected = `VectorFlow \\<-> Git`;
  assert.equal(transform(input), expected);
});

test('orphan < before * is escaped', () => {
  const input = `Use **<** for less-than`;
  const expected = `Use **\\<** for less-than`;
  assert.equal(transform(input), expected);
});

test('< followed by JSX tag name is left alone', () => {
  const input = `<Callout type="info">x</Callout>`;
  assert.equal(transform(input), input);
});

test('< followed by closing-slash is left alone', () => {
  const input = `<img src="x"/>`;
  assert.equal(transform(input), input);
});

test('caddy code fence is remapped to text', () => {
  const input = '```caddy\nblah\n```';
  const expected = '```text\nblah\n```';
  assert.equal(transform(input), expected);
});

test('known fence languages are untouched', () => {
  const input = '```yaml\nfoo: bar\n```';
  assert.equal(transform(input), input);
});
