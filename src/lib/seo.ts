import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, routing, ogLocale, type Locale } from '@/i18n/routing';
import { seo } from '@/config/seo';
import { absoluteUrl } from './url';

type Href = Parameters<typeof getPathname>[0]['href'];

/** Absolute, locale-prefixed URL for a given href in a given locale. */
export function localizedUrl(href: Href, locale: Locale): string {
  return absoluteUrl(getPathname({ locale, href }));
}

/** Map a single internal href (static pages) to one href per locale. */
export function sameHrefForAll(href: Href): Record<Locale, Href> {
  return { de: href, en: href };
}

interface BuildMetadataArgs {
  locale: Locale;
  /** The page's href per locale (differs only for dynamic routes). */
  hrefByLocale: Record<Locale, Href>;
  title: string;
  description: string;
  /** Title already includes the brand; skip the "| DevHash" template. */
  titleAbsolute?: boolean;
  ogImage?: string;
  keywords?: string[];
}

/**
 * Build per-page metadata with a self-referencing canonical URL and complete
 * hreflang alternates (de-AT, en, x-default). Open Graph + Twitter included.
 */
export function buildMetadata({
  locale,
  hrefByLocale,
  title,
  description,
  titleAbsolute,
  ogImage,
  keywords,
}: BuildMetadataArgs): Metadata {
  const urls: Record<Locale, string> = {
    de: localizedUrl(hrefByLocale.de, 'de'),
    en: localizedUrl(hrefByLocale.en, 'en'),
  };
  const canonical = urls[locale];

  const languages: Record<string, string> = {
    'de-AT': urls.de,
    en: urls.en,
    'x-default': urls[routing.defaultLocale],
  };

  // og:image / twitter:image are produced by the opengraph-image file convention
  // (a build-time 1200×630 PNG). Pages may override with an explicit `ogImage`.
  const imageOverride = ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      siteName: seo.siteName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: canonical,
      title,
      description,
      ...(imageOverride ? { images: imageOverride } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageOverride ? { images: imageOverride.map((i) => i.url) } : {}),
      ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
    },
  };
}
