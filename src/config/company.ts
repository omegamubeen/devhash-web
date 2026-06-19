import { confirmed, placeholder } from './confirmable';
import type { Localized } from '@/lib/types';

/**
 * Company identity. Marketing copy (tagline, descriptions, positioning) is
 * authored and may render freely. "durchX" is the chosen brand name (confirmed);
 * the registered legal entity name, legal form and founding year still require
 * confirmation before launch.
 */
export const company = {
  /** Chosen brand/trade name. */
  brand: confirmed('company.brand', 'company', 'durchX'),

  /** Registered legal entity name. */
  legalName: placeholder(
    'company.legalName',
    'company',
    'durchX e.U.',
    'Confirm the registered legal name and legal form (e.U., GmbH, OG, …) once the business is registered. Verify "durchX" trade-name availability.',
  ),

  /** Year the business was founded — never claim experience we cannot prove. */
  foundingYear: placeholder(
    'company.foundingYear',
    'company',
    2024,
    'Confirm the real founding year, or remove any "since/founded" statements.',
  ),

  /** Primary working region — positioning, not a registered address. */
  region: confirmed<Localized>('company.region', 'company', {
    de: 'Wien & Österreich',
    en: 'Vienna & Austria',
  }),

  serviceArea: confirmed<Localized>('company.serviceArea', 'company', {
    de: 'Wien, Österreich und die DACH-Region',
    en: 'Vienna, Austria and the wider DACH region',
  }),

  tagline: {
    de: 'Websites, individuelle Software und verlässliche IT‑Betreuung aus Wien.',
    en: 'Websites, custom software and dependable IT care — built in Vienna.',
  } satisfies Localized,

  /** One-sentence value proposition for hero / meta descriptions. */
  valueProposition: {
    de: 'Wir planen, entwickeln und betreuen digitale Produkte für Unternehmen in Wien und der DACH‑Region – von der ersten Idee bis zum laufenden Betrieb.',
    en: 'We plan, build and maintain digital products for companies in Vienna and the DACH region — from the first idea to day-to-day operation.',
  } satisfies Localized,

  /** Short "about us" paragraph — honest, no invented metrics. */
  shortDescription: {
    de: 'durchX ist ein technisches Software‑ und IT‑Studio. Wir verbinden saubere Entwicklung mit klarer Beratung und langfristiger Betreuung, damit Technik im Hintergrund verlässlich funktioniert.',
    en: 'durchX is a technical software and IT studio. We combine careful engineering with clear advice and long-term support, so the technology behind your business simply works.',
  } satisfies Localized,
} as const;
