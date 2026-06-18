import type { Locale } from '@/i18n/routing';

/** A value provided in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/**
 * Route params for localized pages. Next.js types the dynamic `[locale]`
 * segment as `string`, so we accept `string` here and narrow with `isLocale`
 * at runtime (see each page).
 */
export type LocaleParams = Promise<{ locale: string }>;

/** Pick the value for a locale from a Localized record. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
