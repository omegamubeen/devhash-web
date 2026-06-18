import type { ReactNode } from 'react';
import { type Fact, isVisiblePlaceholder, reveal } from '@/config/confirmable';
import type { Locale } from '@/i18n/routing';
import type { Localized } from '@/lib/types';
import { cn } from '@/lib/cn';

function isLocalized(v: unknown): v is Localized {
  return typeof v === 'object' && v !== null && 'de' in v && 'en' in v;
}

interface FactTextProps {
  fact: Fact<string | number | Localized>;
  locale?: Locale;
  /** Rendered when the fact is hidden in production (placeholder). */
  fallback?: ReactNode;
  className?: string;
}

/**
 * Render a confirmable fact's value. Placeholders show (clearly marked) in
 * development and render the `fallback` (default: nothing) in production.
 */
export function FactText({ fact, locale, fallback = null, className }: FactTextProps) {
  const raw = reveal(fact);
  if (raw === null || raw === undefined || raw === '') return <>{fallback}</>;

  let value: ReactNode;
  if (isLocalized(raw)) {
    value = locale ? raw[locale] : raw.de;
  } else {
    value = raw;
  }
  if (value === '' || value === null || value === undefined) return <>{fallback}</>;

  const mark = isVisiblePlaceholder(fact);
  return (
    <span
      className={cn(mark && 'dh-placeholder', className)}
      data-placeholder={mark ? 'true' : undefined}
      title={mark ? `Placeholder — ${fact.note}` : undefined}
    >
      {value}
    </span>
  );
}

/** True if the fact will render anything in the current environment. */
export function factVisible(fact: Fact<string | number | Localized>): boolean {
  const raw = reveal(fact);
  return raw !== null && raw !== undefined && raw !== '';
}
