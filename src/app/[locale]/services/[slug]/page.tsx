import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing, type Locale } from '@/i18n/routing';
import { buildMetadata, localizedUrl } from '@/lib/seo';
import { getServiceBySlug, services, getServiceById } from '@/config/services';
import { Section, Container } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { LinkButton } from '@/components/primitives/button';
import { Accordion } from '@/components/primitives/accordion';
import { PageHeader } from '@/components/sections/page-header';
import { ServiceCard } from '@/components/sections/service-card';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/structured-data';
import { Icon } from '@/components/icons/icon-set';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug[locale as Locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const service = getServiceBySlug(slug, locale);
  if (!service) return {};

  return buildMetadata({
    locale,
    hrefByLocale: {
      de: { pathname: '/services/[slug]', params: { slug: service.slug.de } },
      en: { pathname: '/services/[slug]', params: { slug: service.slug.en } },
    },
    title: service.seo.title[locale],
    description: service.seo.description[locale],
    titleAbsolute: true,
    keywords: [service.seo.primaryKeyword[locale]],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('common');
  const servicesT = await getTranslations('services');

  const url = localizedUrl(
    { pathname: '/services/[slug]', params: { slug: service.slug[locale] } },
    locale,
  );
  const breadcrumb = [
    { name: 'durchX', url: localizedUrl('/', locale) },
    { name: servicesT('heading'), url: localizedUrl('/services', locale) },
    { name: service.title[locale], url },
  ];
  const related = service.related
    .map((id) => getServiceById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title[locale],
            description: service.summary[locale],
            url,
            locale,
          }),
          breadcrumbSchema(breadcrumb),
          faqSchema(
            service.faqs.map((f) => ({
              question: f.question[locale],
              answer: f.answer[locale],
            })),
          ),
        ]}
      />

      <PageHeader
        eyebrow={servicesT('eyebrow')}
        title={service.title[locale]}
        intro={service.tagline[locale]}
        breadcrumb={[
          { label: 'durchX', href: '/' },
          { label: servicesT('heading'), href: '/services' },
          { label: service.title[locale] },
        ]}
        aside={
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <span
              aria-hidden="true"
              className="grid size-16 place-items-center rounded-[var(--radius-lg)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
            >
              <Icon name={service.icon} size={32} />
            </span>
            <LinkButton href="/contact" variant="primary" icon="arrowRight">
              {t('discussScope')}
            </LinkButton>
          </div>
        }
      />

      {/* Lead + challenge */}
      <Section size="sm">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xl leading-relaxed text-balance">
              {service.intro[locale]}
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow">{t('theChallenge')}</span>
            <ul className="flex flex-col gap-3">
              {service.problems[locale].map((problem, i) => (
                <li key={i} className="flex gap-3 text-[var(--color-muted)]">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  {problem}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What's included */}
      <Section className="bg-[var(--color-sand-50)]">
        <Reveal>
          <SectionHeader eyebrow={t('included')} title={service.title[locale]} />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {service.includes.map((feature, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="card flex h-full flex-col gap-2 p-6">
                <div className="mb-1 flex items-center gap-2 text-[var(--color-accent-strong)]">
                  <Icon name="check" size={18} />
                </div>
                <h3 className="font-semibold">{feature.title[locale]}</h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {feature.description[locale]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow={t('howWeWork')} title={service.tagline[locale]} />
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--color-carbon)] font-mono text-xs text-[var(--color-accent-bright)]">
                  {i + 1}
                </span>
                {i < service.process.length - 1 ? (
                  <span aria-hidden="true" className="hidden rule-soft flex-1 sm:block" />
                ) : null}
              </div>
              <h3 className="font-semibold">{step.title[locale]}</h3>
              <p className="text-sm text-[var(--color-muted)]">
                {step.description[locale]}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Who it's for + outcomes */}
      <Section className="bg-[var(--color-sand-50)]">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow">{t('whoFor')}</span>
            <ul className="flex flex-col gap-3">
              {service.forWhom[locale].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Icon
                    name="arrowRight"
                    size={18}
                    className="mt-1 shrink-0 text-[var(--color-accent-strong)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow">{t('results')}</span>
            <ul className="flex flex-col gap-3">
              {service.outcomes[locale].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Icon
                    name="check"
                    size={18}
                    className="mt-1 shrink-0 text-[var(--color-accent-strong)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl px-0">
          <Reveal>
            <SectionHeader eyebrow={t('faq')} title={service.title[locale]} />
          </Reveal>
          <Reveal className="mt-8">
            <Accordion
              items={service.faqs.map((f) => ({
                question: f.question[locale],
                answer: f.answer[locale],
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section className="bg-[var(--color-sand-50)]" size="sm">
          <Reveal>
            <SectionHeader
              eyebrow={t('relatedServices')}
              title={servicesT('heading')}
              as="h2"
            />
          </Reveal>
          <div className="mt-10 auto-grid">
            {related.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <ServiceCard
                  service={s}
                  locale={locale}
                  index={s.order - 1}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="durchX"
        title={service.tagline[locale]}
        body={service.summary[locale]}
        primary={{ label: t('startProject'), href: '/contact' }}
        secondary={{ label: t('allServices'), href: '/services' }}
      />
    </>
  );
}
