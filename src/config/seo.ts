import type { Localized } from '@/lib/types';
import type { AppPathname } from '@/i18n/routing';
import { company } from './company';

/**
 * Global SEO defaults + the documented keyword map. Per-page SEO for services
 * lives alongside each service in services.ts; static pages map their primary
 * intent here. See docs/SEO_KEYWORD_MAP.md for the narrative version.
 */
export const seo = {
  siteName: 'DevHash',
  /** Default social-card image (1200×630) served from /public. */
  defaultOgImage: '/og/og-default.png',
  /** Optional X/Twitter handle — left empty until a real account exists. */
  twitterHandle: '',
  titleTemplate: {
    de: '%s | DevHash',
    en: '%s | DevHash',
  } satisfies Localized,
  defaultTitle: {
    de: 'DevHash – Webentwicklung, Software & IT‑Betreuung in Wien',
    en: 'DevHash – Web development, software & IT care in Vienna',
  } satisfies Localized,
  defaultDescription: company.valueProposition,
} as const;

/** One documented primary search intent per indexable static page. */
export interface KeywordEntry {
  page: AppPathname;
  primaryKeyword: Localized;
  intent: string;
}

export const staticKeywordMap: KeywordEntry[] = [
  {
    page: '/',
    primaryKeyword: {
      de: 'Webentwicklung & IT‑Dienstleister Wien',
      en: 'web development & IT services Vienna',
    },
    intent:
      'Brand + category entry point: a Vienna software/IT studio for web, software, automation, support and maintenance.',
  },
  {
    page: '/services',
    primaryKeyword: {
      de: 'IT‑Dienstleistungen Wien',
      en: 'IT services Vienna',
    },
    intent: 'Catalogue / navigational: overview of all services to route visitors to the right one.',
  },
  {
    page: '/pricing',
    primaryKeyword: {
      de: 'Webentwicklung Kosten / Zusammenarbeit',
      en: 'software project pricing & engagement',
    },
    intent: 'Commercial investigation: how engagements and pricing work before enquiring.',
  },
  {
    page: '/about',
    primaryKeyword: {
      de: 'Softwarestudio Wien',
      en: 'software studio Vienna',
    },
    intent: 'Trust / brand: who we are and how we work, to support a decision to make contact.',
  },
  {
    page: '/contact',
    primaryKeyword: {
      de: 'IT‑Dienstleister kontaktieren Wien',
      en: 'contact an IT service provider Vienna',
    },
    intent: 'Transactional: make an enquiry / start a project.',
  },
];
