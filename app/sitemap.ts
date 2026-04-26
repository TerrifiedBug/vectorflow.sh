import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

const SITE = 'https://vectorflow.sh';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `${SITE}${page.url}`,
    lastModified: new Date(),
  }));
  return [{ url: SITE, lastModified: new Date() }, ...docs];
}
