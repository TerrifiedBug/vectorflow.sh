import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Wordmark } from '@/components/landing/Nav';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark label="vectorflow docs" />,
    },
    links: [
      { text: 'Docs', url: '/docs' },
      { text: 'Demo', url: 'https://demo.vectorflow.sh/login?prefill=demo', external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
