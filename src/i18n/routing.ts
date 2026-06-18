import { defineRouting } from 'next-intl/routing';

/**
 * Single source of truth for locales and localised pathnames.
 *
 * Folder structure under `app/[locale]` uses the *internal* (canonical) segment
 * names below (the keys). next-intl rewrites the localised, public-facing URLs
 * (the values) to those internal paths via middleware. This lets German visitors
 * see real German URLs (`/de/leistungen`) while we keep one set of page files.
 */
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

/** BCP-47 tags used for <html lang>, hreflang and Open Graph locale. */
export const htmlLang: Record<Locale, string> = {
  de: 'de-AT',
  en: 'en',
};

export const ogLocale: Record<Locale, string> = {
  de: 'de_AT',
  en: 'en_US',
};

export const pathnames = {
  '/': '/',
  '/services': { de: '/leistungen', en: '/services' },
  '/services/[slug]': { de: '/leistungen/[slug]', en: '/services/[slug]' },
  '/pricing': { de: '/preise', en: '/pricing' },
  '/about': { de: '/ueber-uns', en: '/about' },
  '/contact': { de: '/kontakt', en: '/contact' },
  '/legal-notice': { de: '/impressum', en: '/legal-notice' },
  '/privacy': { de: '/datenschutz', en: '/privacy' },
} as const;

export type AppPathname = keyof typeof pathnames;

/** Pathnames that take no params — safe to pass to <Link> as a bare string. */
export type StaticPathname = Exclude<AppPathname, '/services/[slug]'>;

/** Runtime locale guard (own helper; avoids depending on next-intl exports). */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames,
});
