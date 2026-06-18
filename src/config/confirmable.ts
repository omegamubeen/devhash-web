/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Confirmable facts
 * ─────────────────────────────────────────────────────────────────────────────
 * Every business fact, contact detail, legal field, price and support promise
 * flows through this module. A fact is either:
 *
 *   • confirmed()  — a real, approved value that may render publicly, or
 *   • placeholder() — a stand-in that is shown ONLY in development (clearly
 *     marked) and is hidden in production until a human replaces it with a real,
 *     approved value.
 *
 * This guarantees we never publish invented customers, prices, credentials,
 * addresses or legal information. Outstanding placeholders are aggregated for the
 * pre-launch checklist and the dev-only /preflight page, and are asserted absent
 * from production output by the test suite.
 */

export type ConfirmationStatus = 'confirmed' | 'placeholder';

export type FactCategory =
  | 'company'
  | 'contact'
  | 'legal'
  | 'pricing'
  | 'support'
  | 'seo'
  | 'integration'
  | 'social';

export interface Fact<T> {
  /** Stable, unique id used by the pre-launch checklist. */
  readonly id: string;
  readonly value: T;
  readonly status: ConfirmationStatus;
  readonly category: FactCategory;
  /** What a human must do before this can go live (placeholders only). */
  readonly note?: string;
}

const registry = new Map<string, Fact<unknown>>();

function register<T>(fact: Fact<T>): Fact<T> {
  if (registry.has(fact.id)) {
    // Surfacing duplicate ids early prevents the checklist from missing items.
    throw new Error(`Duplicate confirmable fact id: "${fact.id}"`);
  }
  registry.set(fact.id, fact as Fact<unknown>);
  return fact;
}

/** A real, approved value that is safe to show publicly. */
export function confirmed<T>(
  id: string,
  category: FactCategory,
  value: T,
): Fact<T> {
  return register({ id, value, status: 'confirmed', category });
}

/** A stand-in value. Visible only in development; hidden in production. */
export function placeholder<T>(
  id: string,
  category: FactCategory,
  value: T,
  note: string,
): Fact<T> {
  return register({ id, value, status: 'placeholder', category, note });
}

const isProd = process.env.NODE_ENV === 'production';

/**
 * Resolve a fact to a renderable value.
 * - confirmed  → always the value
 * - placeholder → the value in development, `null` in production
 */
export function reveal<T>(fact: Fact<T>): T | null {
  if (fact.status === 'confirmed') return fact.value;
  return isProd ? null : fact.value;
}

/** Like reveal(), but returns a fallback instead of null. */
export function revealOr<T>(fact: Fact<T>, fallback: T): T {
  const v = reveal(fact);
  return v === null ? fallback : v;
}

export function isPlaceholder<T>(fact: Fact<T>): boolean {
  return fact.status === 'placeholder';
}

/** True when a placeholder is currently being shown (development only). */
export function isVisiblePlaceholder<T>(fact: Fact<T>): boolean {
  return fact.status === 'placeholder' && !isProd;
}

export function getAllFacts(): ReadonlyArray<Fact<unknown>> {
  return [...registry.values()];
}

export function getUnconfirmedFacts(): ReadonlyArray<Fact<unknown>> {
  return getAllFacts().filter((f) => f.status === 'placeholder');
}

export function getUnconfirmedByCategory(): Record<
  FactCategory,
  ReadonlyArray<Fact<unknown>>
> {
  const out = {
    company: [],
    contact: [],
    legal: [],
    pricing: [],
    support: [],
    seo: [],
    integration: [],
    social: [],
  } as Record<FactCategory, Fact<unknown>[]>;
  for (const f of getUnconfirmedFacts()) out[f.category].push(f);
  return out;
}

/** Global launch flag. Informational + used by the dev preflight banner/tests. */
export const LAUNCH_READY = process.env.NEXT_PUBLIC_LAUNCH_READY === 'true';
