import { describe, expect, it } from 'vitest';
import { services } from './services';
import { engagementModels, PRICING_MODE } from './packages';
import { locales } from '@/i18n/routing';
import de from '../../messages/de.json';
import en from '../../messages/en.json';

function keyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe('message catalogues', () => {
  it('have identical key structure across locales', () => {
    const deKeys = new Set(keyPaths(de));
    const enKeys = new Set(keyPaths(en));
    const missingInEn = [...deKeys].filter((k) => !enKeys.has(k));
    const missingInDe = [...enKeys].filter((k) => !deKeys.has(k));
    expect(missingInEn, `missing in en: ${missingInEn.join(', ')}`).toEqual([]);
    expect(missingInDe, `missing in de: ${missingInDe.join(', ')}`).toEqual([]);
  });
});

describe('service content integrity', () => {
  it('provides every localized field in both locales', () => {
    for (const s of services) {
      for (const locale of locales) {
        expect(s.title[locale], `${s.id} title.${locale}`).toBeTruthy();
        expect(s.summary[locale]).toBeTruthy();
        expect(s.intro[locale]).toBeTruthy();
        expect(s.slug[locale]).toMatch(/^[a-z0-9-]+$/);
        expect(s.forWhom[locale].length).toBeGreaterThan(0);
        expect(s.includes.length).toBeGreaterThan(0);
        expect(s.faqs.length).toBeGreaterThan(0);
        expect(s.seo.title[locale]).toBeTruthy();
      }
    }
  });

  it('references only valid related service ids', () => {
    const ids = new Set(services.map((s) => s.id));
    for (const s of services) {
      for (const rel of s.related) expect(ids.has(rel)).toBe(true);
    }
  });
});

describe('pricing config', () => {
  it('defaults to consultation and ships no invented prices', () => {
    expect(PRICING_MODE).toBe('consultation');
    for (const m of engagementModels) {
      expect(m.startingFrom).toBeUndefined();
    }
  });
});
