import { describe, expect, it } from 'vitest';
import { localizedUrl, sameHrefForAll, buildMetadata } from './seo';

describe('localizedUrl', () => {
  it('builds locale-prefixed, localized paths', () => {
    expect(localizedUrl('/services', 'de')).toMatch(/\/de\/leistungen$/);
    expect(localizedUrl('/services', 'en')).toMatch(/\/en\/services$/);
  });

  it('maps dynamic service routes per locale', () => {
    const de = localizedUrl(
      { pathname: '/services/[slug]', params: { slug: 'webentwicklung' } },
      'de',
    );
    expect(de).toMatch(/\/de\/leistungen\/webentwicklung$/);
  });
});

describe('buildMetadata', () => {
  it('sets a self-referential canonical and full hreflang set', () => {
    const meta = buildMetadata({
      locale: 'de',
      hrefByLocale: sameHrefForAll('/pricing'),
      title: 'Preise',
      description: 'desc',
    });
    expect(String(meta.alternates?.canonical)).toMatch(/\/de\/preise$/);
    const langs = meta.alternates?.languages ?? {};
    expect(Object.keys(langs)).toEqual(
      expect.arrayContaining(['de-AT', 'en', 'x-default']),
    );
    expect(String(langs['en'])).toMatch(/\/en\/pricing$/);
  });

  it('applies the brand title template unless absolute', () => {
    const rel = buildMetadata({
      locale: 'en',
      hrefByLocale: sameHrefForAll('/about'),
      title: 'About',
      description: 'd',
    });
    expect(rel.title).toBe('About');
    const abs = buildMetadata({
      locale: 'en',
      hrefByLocale: sameHrefForAll('/about'),
      title: 'durchX – About',
      description: 'd',
      titleAbsolute: true,
    });
    expect(abs.title).toEqual({ absolute: 'durchX – About' });
  });
});
