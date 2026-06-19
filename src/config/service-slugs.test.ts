import { describe, expect, it } from 'vitest';
import { services } from './services';
import { serviceSlugs } from './service-slugs';
import { locales } from '@/i18n/routing';

describe('service-slugs stays in sync with services.ts', () => {
  it('has one entry per service', () => {
    expect(serviceSlugs).toHaveLength(services.length);
  });

  it('matches every service id and localized slug', () => {
    for (const service of services) {
      const entry = serviceSlugs.find((s) => s.id === service.id);
      expect(entry, `missing slug entry for ${service.id}`).toBeDefined();
      for (const locale of locales) {
        expect(entry?.[locale]).toBe(service.slug[locale]);
      }
    }
  });

  it('has globally unique slugs per locale', () => {
    for (const locale of locales) {
      const slugs = services.map((s) => s.slug[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
