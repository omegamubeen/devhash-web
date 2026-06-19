import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll, localizedUrl } from '@/lib/seo';
import { engagementModels } from '@/config/packages';
import { Section, Container } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { Accordion } from '@/components/primitives/accordion';
import { PageHeader } from '@/components/sections/page-header';
import { EngagementCard } from '@/components/sections/engagement-card';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import { Icon } from '@/components/icons/icon-set';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.pricing' });
  return buildMetadata({
    locale,
    hrefByLocale: sameHrefForAll('/pricing'),
    title: t('title'),
    description: t('description'),
  });
}

export default async function PricingPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('pricing');
  const common = await getTranslations('common');

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
  ];
  const breadcrumb = [
    { name: 'durchX', url: localizedUrl('/', locale) },
    { name: t('heading'), url: localizedUrl('/pricing', locale) },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), faqSchema(faqs)]} />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        intro={t('intro')}
        breadcrumb={[{ label: 'durchX', href: '/' }, { label: t('heading') }]}
      />

      <Section size="sm">
        <div className="grid gap-6 lg:grid-cols-3">
          {engagementModels.map((model, i) => (
            <Reveal key={model.id} delay={i * 70}>
              <EngagementCard model={model} locale={locale} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honesty / no dark patterns */}
      <Section className="bg-[var(--color-sand-50)]" size="sm">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-14">
          <Reveal>
            <SectionHeader eyebrow={t('eyebrow')} title={t('noHiddenHeading')} as="h2" />
          </Reveal>
          <Reveal className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
            >
              <Icon name="shield" size={22} />
            </span>
            <p className="text-lg text-[var(--color-muted)]">{t('noHidden')}</p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl px-0">
          <Reveal>
            <SectionHeader eyebrow={common('faq')} title={t('faqHeading')} />
          </Reveal>
          <Reveal className="mt-8">
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        eyebrow="durchX"
        title={t('heading')}
        body={t('intro')}
        primary={{ label: common('startProject'), href: '/contact' }}
        secondary={{ label: common('allServices'), href: '/services' }}
      />
    </>
  );
}
