import { type Fact } from './confirmable';
import type { Localized } from '@/lib/types';
import type { StaticPathname } from '@/i18n/routing';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Pricing & engagement
 * ─────────────────────────────────────────────────────────────────────────────
 * Pricing display has three modes:
 *   • 'hidden'       — show no price at all
 *   • 'startingFrom' — show an approved "from €X" price (requires a real price)
 *   • 'consultation' — show no number; invite a consultation (DEFAULT)
 *
 * We default to 'consultation' and ship NO invented numbers. To switch to
 * 'startingFrom', set PRICING_MODE below and add an approved `startingFrom`
 * price to each engagement model (see the commented example). Until then, any
 * model without an approved price falls back to consultation display.
 *
 * No fake discounts, countdowns, urgency, "most popular" badges or struck-through
 * prices are used anywhere — by design.
 */
export type PricingMode = 'hidden' | 'startingFrom' | 'consultation';

export const PRICING_MODE: PricingMode = 'consultation';

export interface Price {
  amount: number;
  currency: 'EUR';
  /** e.g. "ab" + "pro Monat"; rendered around the amount. */
  unit: Localized;
}

export interface EngagementModel {
  id: string;
  name: Localized;
  tagline: Localized;
  /** Who this option is suitable for. */
  bestFor: Localized;
  /** What is included. */
  includes: Localized<string[]>;
  /** The normal engagement model (how we work and bill). */
  engagementModel: Localized;
  /** What affects the final price. */
  priceFactors: Localized<string[]>;
  /** The appropriate next action. */
  nextAction: { label: Localized; href: StaticPathname };
  /**
   * Approved starting price — leave undefined until a real price is signed off.
   * Example (do NOT enable without approval):
   *   startingFrom: confirmed<Price>('packages.fixed.price', 'pricing', {
   *     amount: 4900, currency: 'EUR',
   *     unit: { de: 'ab', en: 'from' },
   *   }),
   */
  startingFrom?: Fact<Price>;
}

export const engagementModels: EngagementModel[] = [
  {
    id: 'fixed-project',
    name: { de: 'Projekt zum Festrahmen', en: 'Fixed-scope project' },
    tagline: {
      de: 'Ein klar umrissenes Vorhaben mit definiertem Ergebnis.',
      en: 'A clearly defined initiative with a defined outcome.',
    },
    bestFor: {
      de: 'Für Vorhaben mit absehbarem Umfang – etwa eine neue Website oder eine erste Version einer Anwendung.',
      en: 'For initiatives with a foreseeable scope — such as a new website or the first version of an application.',
    },
    includes: {
      de: [
        'Gemeinsame Umfangsklärung vor Angebotslegung',
        'Festgelegter Funktions‑ und Lieferumfang',
        'Lieferung in nachvollziehbaren Schritten',
        'Übergabe inklusive Quellcode und Dokumentation',
      ],
      en: [
        'Joint scope clarification before we quote',
        'A defined set of features and deliverables',
        'Delivery in transparent steps',
        'Handover including source code and documentation',
      ],
    },
    engagementModel: {
      de: 'Nach einer kurzen Klärungsphase erhalten Sie ein konkretes Angebot mit festem Rahmen. Abgerechnet wird projektbezogen entlang vereinbarter Schritte.',
      en: 'After a short clarification phase you receive a concrete quote with a fixed frame. Billing is project-based along agreed steps.',
    },
    priceFactors: {
      de: [
        'Umfang und Komplexität der Funktionen',
        'Anzahl und Tiefe der Integrationen',
        'Stand der Inhalte und Vorlagen',
        'Gewünschte Designtiefe',
      ],
      en: [
        'Scope and complexity of features',
        'Number and depth of integrations',
        'Readiness of content and assets',
        'Desired depth of design',
      ],
    },
    nextAction: {
      label: { de: 'Umfang besprechen', en: 'Discuss scope' },
      href: '/contact',
    },
  },
  {
    id: 'care-retainer',
    name: { de: 'Laufende Betreuung', en: 'Ongoing care' },
    tagline: {
      de: 'Wartung, Support und kleine Weiterentwicklungen – verlässlich.',
      en: 'Maintenance, support and small improvements — dependably.',
    },
    bestFor: {
      de: 'Für Websites und Systeme, die dauerhaft sicher, aktuell und betreut bleiben sollen.',
      en: 'For websites and systems that need to stay secure, current and cared for over time.',
    },
    includes: {
      de: [
        'Updates, Sicherheits‑Patches und Monitoring',
        'Regelmäßige Backups mit Kontrolle',
        'Fester Ansprechpartner',
        'Vereinbartes Kontingent für kleine Anpassungen',
      ],
      en: [
        'Updates, security patches and monitoring',
        'Regular backups with verification',
        'A named point of contact',
        'An agreed allowance for small changes',
      ],
    },
    engagementModel: {
      de: 'Laufende Betreuung mit vereinbartem Umfang, in der Regel monatlich. Der Rahmen wird vor Beginn schriftlich festgehalten.',
      en: 'Ongoing care with an agreed scope, usually monthly. The frame is put in writing before we start.',
    },
    priceFactors: {
      de: [
        'Umfang und Kritikalität der Systeme',
        'Gewünschte Reaktionszeiten',
        'Umfang laufender Anpassungen',
        'Monitoring‑ und Backup‑Anforderungen',
      ],
      en: [
        'Scope and criticality of the systems',
        'Desired response times',
        'Volume of ongoing changes',
        'Monitoring and backup requirements',
      ],
    },
    nextAction: {
      label: { de: 'Betreuung anfragen', en: 'Ask about care' },
      href: '/contact',
    },
  },
  {
    id: 'dedicated-capacity',
    name: { de: 'Dedizierte Entwicklung', en: 'Dedicated development' },
    tagline: {
      de: 'Kontinuierliche Weiterentwicklung mit fester Kapazität.',
      en: 'Continuous development with reserved capacity.',
    },
    bestFor: {
      de: 'Für Produkte, die über längere Zeit Schritt für Schritt wachsen sollen.',
      en: 'For products that should grow step by step over a longer period.',
    },
    includes: {
      de: [
        'Reservierte Entwicklungs‑Kapazität',
        'Priorisierung entlang Ihres Backlogs',
        'Regelmäßige, sichtbare Lieferungen',
        'Enge Abstimmung statt Black Box',
      ],
      en: [
        'Reserved development capacity',
        'Prioritisation along your backlog',
        'Regular, visible deliveries',
        'Close coordination instead of a black box',
      ],
    },
    engagementModel: {
      de: 'Fortlaufende Zusammenarbeit mit reservierter Kapazität in vereinbarten Intervallen. Umfang und Schwerpunkte werden regelmäßig gemeinsam priorisiert.',
      en: 'Continuous collaboration with reserved capacity in agreed intervals. Scope and focus are prioritised together on a regular basis.',
    },
    priceFactors: {
      de: [
        'Umfang der reservierten Kapazität',
        'Dauer der Zusammenarbeit',
        'Technische Komplexität des Produkts',
        'Erforderliche Spezialisierung',
      ],
      en: [
        'Amount of reserved capacity',
        'Duration of the engagement',
        'Technical complexity of the product',
        'Specialisation required',
      ],
    },
    nextAction: {
      label: { de: 'Zusammenarbeit besprechen', en: 'Discuss collaboration' },
      href: '/contact',
    },
  },
];

export function getEngagementModel(id: string): EngagementModel | undefined {
  return engagementModels.find((m) => m.id === id);
}
