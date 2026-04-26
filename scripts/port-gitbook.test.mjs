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
