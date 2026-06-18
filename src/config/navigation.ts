import type { StaticPathname } from '@/i18n/routing';

/**
 * Navigation structure (which routes appear and in what order) lives here.
 * Human-readable labels live in messages/{de,en}.json under `nav` and are looked
 * up by `labelKey`, so structure and translations each have a single source.
 */
export interface NavItem {
  href: StaticPathname;
  /** Key under the `nav` namespace in the message catalogues. */
  labelKey: string;
}

export const primaryNav: NavItem[] = [
  { href: '/services', labelKey: 'services' },
  { href: '/pricing', labelKey: 'pricing' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

/** Primary call-to-action shown in the header. */
export const headerCta: NavItem = { href: '/contact', labelKey: 'startProject' };

export const footerCompanyNav: NavItem[] = [
  { href: '/about', labelKey: 'about' },
  { href: '/pricing', labelKey: 'pricing' },
  { href: '/contact', labelKey: 'contact' },
];

export const footerLegalNav: NavItem[] = [
  { href: '/legal-notice', labelKey: 'legalNotice' },
  { href: '/privacy', labelKey: 'privacy' },
];
