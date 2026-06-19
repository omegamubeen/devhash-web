import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll, localizedUrl } from '@/lib/seo';
import { servicesInOrder } from '@/config/services';
import { staticKeywordMap } from '@/config/seo';
import { Section } from '@/components/primitives/layout';
import { Reveal } from '@/components/primitives/reveal';
import { ServiceCard } from '@/components/sections/service-card';
import { PageHeader } from '@/components/sections/page-header';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  const km = staticKeywordMap.find((k) => k.page === '/services');
  return buildMetadata({
    locale,
    hrefByLocale: sameHrefForAll('/services'),
    title: t('title'),
    description: t('description'),
    keywords: km ? [km.primaryKeyword[locale]] : undefined,
  });
}

export default async function ServicesPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const common = await getTranslations('common');

  const breadcrumb = [
    { name: 'durchX', url: localizedUrl('/', locale) },
    { name: t('heading'), url: localizedUrl('/services', locale) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        intro={t('intro')}
        breadcrumb={[{ label: 'durchX', href: '/' }, { label: t('heading') }]}
      />

      <Section size="sm">
        <div className="auto-grid">
          {servicesInOrder.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <ServiceCard
                service={service}
                locale={locale}
                index={i}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow={t('eyebrow')}
        title={t('ctaHeading')}
        body={t('ctaBody')}
        primary={{ label: common('startProject'), href: '/contact' }}
      />
    </>
  );
}
