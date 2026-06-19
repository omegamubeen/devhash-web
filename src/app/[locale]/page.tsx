import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll } from '@/lib/seo';
import { servicesInOrder } from '@/config/services';
import { engagementModels } from '@/config/packages';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { LinkButton } from '@/components/primitives/button';
import { CtaBand } from '@/components/sections/cta-band';
import { HomeHeroShowcase } from '@/components/sections/home-showcase';
import { Icon } from '@/components/icons/icon-set';
import { cn } from '@/lib/cn';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });
  return buildMetadata({
    locale,
    hrefByLocale: sameHrefForAll('/'),
    title: t('title'),
    description: t('description'),
    titleAbsolute: true,
  });
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const capabilities = [
    t('capabilities.web'),
    t('capabilities.software'),
    t('capabilities.automation'),
    t('capabilities.support'),
  ];

  const principleKeys = ['clarity', 'maintainable', 'reliable', 'honest'] as const;
  const processKeys = ['understand', 'shape', 'build', 'operate'] as const;
  const siteStats = [
    { value: servicesInOrder.length, label: locale === 'de' ? 'Leistungen' : 'Services' },
    { value: processKeys.length, label: locale === 'de' ? 'Schritte' : 'Steps' },
    { value: engagementModels.length, label: locale === 'de' ? 'Modelle' : 'Models' },
  ];
  const showcaseCard =
    locale === 'de'
      ? {
          badge: 'aktiv',
          title: ['Vernetzte Systeme.', 'Klare Verantwortung.'] as [string, string],
          action: 'Ablauf',
        }
      : {
          badge: 'live',
          title: ['Connected systems.', 'Clear ownership.'] as [string, string],
          action: 'Build flow',
        };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="circuit-motif relative overflow-hidden bg-[var(--color-sand-50)]">
        <div className="container-page relative grid items-center gap-12 pt-14 pb-10 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pt-24">
          <div className="flex flex-col items-start gap-6 lg:pb-10">
            <span className="eyebrow animate-rise">{t('hero.eyebrow')}</span>
            <h1
              className="max-w-[15ch] animate-rise text-5xl font-semibold tracking-[-0.025em] text-[var(--color-carbon)]"
              style={{ animationDelay: '60ms' }}
            >
              {t('hero.headline')}
            </h1>
            <p
              className="max-w-[52ch] animate-rise text-lg text-[var(--color-muted)]"
              style={{ animationDelay: '120ms' }}
            >
              {t('hero.subhead')}
            </p>
            <div
              className="flex animate-rise flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '180ms' }}
            >
              <LinkButton href="/contact" variant="primary" size="lg">
                {t('hero.primaryCta')}
              </LinkButton>
              <LinkButton
                href="/services"
                variant="secondary"
                size="lg"
                icon="arrowRight"
              >
                {t('hero.secondaryCta')}
              </LinkButton>
            </div>
            <p
              className="flex animate-rise items-center gap-2 text-sm text-[var(--color-muted)]"
              style={{ animationDelay: '240ms' }}
            >
              <Icon name="check" size={16} className="text-[var(--color-accent)]" />
              {t('hero.note')}
            </p>
          </div>

          <div className="relative animate-rise" style={{ animationDelay: '160ms' }}>
            <HomeHeroShowcase
              card={showcaseCard}
              labels={{
                web: capabilities[0]!,
                software: capabilities[1]!,
                automation: capabilities[2]!,
                support: capabilities[3]!,
              }}
            />
          </div>
        </div>

        <div className="container-page relative pb-14 lg:pb-20">
          <div className="grid overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, i) => (
              <div
                key={capability}
                className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] p-5 last:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0 sm:[&:nth-child(2n)]:border-l"
              >
                <span>
                  <span className="block font-mono text-xs text-[var(--color-accent-strong)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[var(--color-carbon)]">
                    {capability}
                  </span>
                </span>
                <Icon
                  name="plus"
                  size={18}
                  className="shrink-0 text-[var(--color-slate-400)]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={t('services.eyebrow')}
            title={t('services.heading')}
            intro={t('services.intro')}
            align="center"
            className="mx-auto"
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-border)] shadow-[var(--shadow-sm)] sm:grid-cols-2 lg:grid-cols-3">
          {servicesInOrder.map((service, i) => (
            <Link
              key={service.id}
              href={{
                pathname: '/services/[slug]',
                params: { slug: service.slug[locale] },
              }}
              className={cn(
                'group flex min-h-full flex-col gap-5 p-6 transition-colors duration-200 focus-visible:outline-2',
                i === 1
                  ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]'
                  : i === 3
                    ? 'surface-ink bg-[var(--color-ink)] hover:bg-[var(--color-ink-800)]'
                    : 'bg-white hover:bg-[var(--color-sand-50)]',
              )}
            >
              <span className="flex items-center justify-between gap-4">
                <span
                  className={cn(
                    'grid size-11 place-items-center rounded-[var(--radius-md)] transition-colors duration-200',
                    i === 1 || i === 3
                      ? 'bg-white/15 text-white'
                      : 'bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] group-hover:bg-[var(--color-accent)] group-hover:text-white',
                  )}
                  aria-hidden="true"
                >
                  <Icon name={service.icon} size={22} />
                </span>
                <span
                  className={cn(
                    'font-mono text-xs',
                    i === 1 || i === 3
                      ? 'text-white/70'
                      : 'text-[var(--color-slate-400)]',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <span className="flex flex-col gap-2">
                <span
                  className={cn(
                    'text-lg font-semibold',
                    i === 1 || i === 3 ? 'text-white' : 'text-[var(--color-carbon)]',
                  )}
                >
                  {service.title[locale]}
                </span>
                <span
                  className={cn(
                    'text-sm',
                    i === 1 || i === 3 ? 'text-white/75' : 'text-[var(--color-muted)]',
                  )}
                >
                  {service.summary[locale]}
                </span>
              </span>
              <span
                className={cn(
                  'mt-auto flex size-8 items-center justify-center rounded-full border transition-transform duration-200 group-hover:translate-x-1',
                  i === 1 || i === 3
                    ? 'border-white/35 text-white'
                    : 'border-[var(--color-border-strong)] text-[var(--color-accent-strong)]',
                )}
              >
                <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <LinkButton href="/services" variant="secondary" icon="arrowRight">
            {t('services.cta')}
          </LinkButton>
        </Reveal>
      </Section>

      {/* ── Principles ───────────────────────────────────────────────────── */}
      <Section className="circuit-motif bg-[var(--color-sand-50)]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={t('principles.eyebrow')}
              title={t('principles.heading')}
              intro={t('principles.intro')}
            />
            <div className="mt-8 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]">
              {processKeys.map((key, i) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] p-4 last:border-b-0"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-[var(--color-accent-soft)] font-mono text-xs text-[var(--color-accent-strong)]">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold">
                      {t(`process.steps.${key}.title`)}
                    </span>
                  </span>
                  <Icon name="check" size={16} className="text-[var(--color-accent)]" />
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {principleKeys.map((key, i) => (
              <div
                key={key}
                className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-xs)]"
              >
                <span className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--color-accent-strong)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon name="plus" size={16} className="text-[var(--color-slate-400)]" />
                </span>
                <h3 className="text-lg font-semibold">
                  {t(`principles.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {t(`principles.items.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section>
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            eyebrow={t('process.eyebrow')}
            title={t('process.heading')}
            intro={t('process.intro')}
          />
          <div className="grid grid-cols-3 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-sand-50)]">
            {siteStats.map((stat) => (
              <div
                key={stat.label}
                className="border-l border-[var(--color-border)] p-5 first:border-l-0"
              >
                <span className="block text-3xl font-semibold text-[var(--color-accent-strong)]">
                  {stat.value}
                </span>
                <span className="mt-1 block h-1.5 w-10 rounded-full bg-[var(--color-accent)]" />
                <span className="mt-3 block font-mono text-xs text-[var(--color-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <ol className="mt-14 grid overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] sm:grid-cols-2 lg:grid-cols-4">
          {processKeys.map((key, i) => (
            <li
              key={key}
              className="relative flex min-h-full flex-col gap-3 border-b border-[var(--color-border)] p-6 sm:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[var(--color-carbon)] font-mono text-xs text-[var(--color-accent-bright)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon name="plus" size={16} className="text-[var(--color-slate-400)]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                {t(`process.steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Engagement teaser ────────────────────────────────────────────── */}
      <Section className="bg-[var(--color-sand-50)]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal className="surface-ink grid rounded-[var(--radius-3xl)] p-8 lg:p-10">
            <SectionHeader
              eyebrow={t('engagement.eyebrow')}
              title={t('engagement.heading')}
              intro={t('engagement.intro')}
            />
            <div className="mt-10">
              <LinkButton href="/pricing" variant="primary" icon="arrowRight">
                {t('engagement.cta')}
              </LinkButton>
            </div>
          </Reveal>
          <div className="grid gap-3">
            {engagementModels.map((model, i) => (
              <div
                key={model.id}
                className="flex min-h-full items-start justify-between gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-xs)]"
              >
                <div>
                  <span className="font-mono text-xs text-[var(--color-accent-strong)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold">{model.name[locale]}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {model.tagline[locale]}
                  </p>
                </div>
                <Icon
                  name="arrowUpRight"
                  size={18}
                  className="mt-1 shrink-0 text-[var(--color-accent-strong)]"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="durchX"
        title={t('cta.heading')}
        body={t('cta.body')}
        primary={{ label: t('cta.primary'), href: '/contact' }}
        secondary={{ label: t('cta.secondary'), href: '/services' }}
      />
    </>
  );
}
