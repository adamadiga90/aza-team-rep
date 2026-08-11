import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config';
import { docs } from '@/lib/docs';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const staticPaths = ['', 'docs', 'join'];
  for (const locale of locales) {
    for (const path of staticPaths) {
      const suffix = path ? `/${path}` : '';
      urls.push({
        url: `${SITE_URL}/${locale}${suffix}/`,
        lastModified: new Date(),
      });
    }
    for (const doc of docs) {
      urls.push({ url: `${SITE_URL}/${locale}/docs/${doc.id}/`, lastModified: new Date(doc.updated) });
    }
  }
  return urls;
}
