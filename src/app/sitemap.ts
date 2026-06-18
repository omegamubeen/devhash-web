import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { services } from '@/config/services';
import { absoluteUrl } from '@/lib/url';

type Href = Parameters<typeof getPathname>[0]['href'];

const staticHrefs: Href[] = [
  '/',
  '/services',
  '/pricing',
  '/about',
  '/contact',
  '/legal-notice',
  '/privacy',
];

function entry(href: Href, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc === 'de' ? 'de-AT' : 'en'] = absoluteUrl(getPathname({ locale: loc, href }));
  }
  return locales.map((loc: Locale) => ({
    url: absoluteUrl(getPathname({ locale: loc, href })),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticHrefs.flatMap((href) =>
    entry(href, href === '/' ? 1 : 0.8, href === '/' ? 'weekly' : 'monthly'),
  );

  const servicePages = services.flatMap((s) => {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[loc === 'de' ? 'de-AT' : 'en'] = absoluteUrl(
        getPathname({ locale: loc, href: { pathname: '/services/[slug]', params: { slug: s.slug[loc] } } }),
      );
    }
    return locales.map((loc) => ({
      url: absoluteUrl(
        getPathname({ locale: loc, href: { pathname: '/services/[slug]', params: { slug: s.slug[loc] } } }),
      ),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages },
    }));
  });

  return [...pages, ...servicePages];
}
