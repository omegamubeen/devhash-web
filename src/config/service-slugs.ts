import type { Locale } from '@/i18n/routing';

/**
 * Minimal, client-safe slug map (no heavy content) so the language switcher can
 * resolve the equivalent service URL across locales without bundling all of
 * services.ts into the client. Keep in sync with services.ts.
 */
export const serviceSlugs: ReadonlyArray<Record<Locale, string> & { id: string }> = [
  { id: 'web-development', de: 'webentwicklung', en: 'web-development' },
  { id: 'custom-software', de: 'softwareentwicklung', en: 'custom-software' },
  { id: 'automation-integration', de: 'automatisierung-integration', en: 'automation-integration' },
  { id: 'it-support', de: 'it-support', en: 'it-support' },
  { id: 'maintenance', de: 'wartung-pflege', en: 'maintenance-care' },
];
