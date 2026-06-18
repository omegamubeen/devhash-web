import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll } from '@/lib/seo';
import { servicesInOrder } from '@/config/services';
import { engagementModels } from '@/config/packages';
import { Section } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { LinkButton, TextLink } from '@/components/primitives/button';
import { ServiceCard } from '@/components/sections/service-card';
import { CtaBand } from '@/components/sections/cta-band';
import { HeroDiagram } from '@/components/sections/hero-diagram';
import { Icon } from '@/components/icons/icon-set';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
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

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="surface-ink relative overflow-hidden">
        <div aria-hidden="true" className="grid-motif absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-24 size-[40rem] rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-accent-bright) 28%, transparent), transparent 64%)',
          }}
        />
        <div className="container-page relative grid items-center gap-12 pt-16 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-24 lg:pb-28">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow animate-rise">{t('hero.eyebrow')}</span>
            <h1
              className="animate-rise max-w-[16ch] text-5xl font-semibold tracking-[-0.025em]"
              style={{ animationDelay: '60ms' }}
            >
              {t('hero.headline')}
            </h1>
            <p
              className="animate-rise max-w-[52ch] text-lg text-[var(--color-muted)]"
              style={{ animationDelay: '120ms' }}
            >
              {t('hero.subhead')}
            </p>
            <div
              className="animate-rise flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '180ms' }}
            >
              <LinkButton href="/contact" variant="primary" size="lg">
                {t('hero.primaryCta')}
              </LinkButton>
              <LinkButton href="/services" variant="secondary" size="lg" icon="arrowRight">
                {t('hero.secondaryCta')}
              </LinkButton>
            </div>
            <p
              className="animate-rise flex items-center gap-2 text-sm text-[var(--color-muted)]"
              style={{ animationDelay: '240ms' }}
            >
              <Icon name="check" size={16} className="text-[var(--color-accent-bright)]" />
              {t('hero.note')}
            </p>
          </div>

          <div
            className="animate-rise relative mx-auto w-full max-w-md lg:max-w-none"
            style={{ animationDelay: '160ms' }}
          >
            <HeroDiagram
              labels={{
                web: capabilities[0]!,
                software: capabilities[1]!,
                automation: capabilities[2]!,
                support: capabilities[3]!,
              }}
            />
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
          />
        </Reveal>
        <div className="auto-grid mt-12">
          {servicesInOrder.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <ServiceCard service={service} locale={locale} index={i} className="h-full" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <TextLink href="/services" withArrow>
            {t('services.cta')}
          </TextLink>
        </Reveal>
      </Section>

      {/* ── Principles ───────────────────────────────────────────────────── */}
      <Section className="bg-[var(--color-sand-50)]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={t('principles.eyebrow')}
              title={t('principles.heading')}
              intro={t('principles.intro')}
            />
          </Reveal>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {principleKeys.map((key, i) => (
              <Reveal key={key} delay={i * 60} className="flex flex-col gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] font-mono text-sm text-[var(--color-accent-strong)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold">{t(`principles.items.${key}.title`)}</h3>
                <p className="text-[var(--color-muted)]">{t(`principles.items.${key}.body`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={t('process.eyebrow')}
            title={t('process.heading')}
            intro={t('process.intro')}
            align="center"
            className="mx-auto"
          />
        </Reveal>
        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {processKeys.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 70} className="relative flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--color-carbon)] font-mono text-xs text-[var(--color-accent-bright)]">
                  {i + 1}
                </span>
                <span aria-hidden="true" className="rule-soft hidden flex-1 sm:block" />
              </div>
              <h3 className="text-lg font-semibold">{t(`process.steps.${key}.title`)}</h3>
              <p className="text-sm text-[var(--color-muted)]">{t(`process.steps.${key}.body`)}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Engagement teaser ────────────────────────────────────────────── */}
      <Section className="bg-[var(--color-sand-50)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={t('engagement.eyebrow')}
              title={t('engagement.heading')}
              intro={t('engagement.intro')}
            />
            <div className="mt-8">
              <LinkButton href="/pricing" variant="primary" icon="arrowRight">
                {t('engagement.cta')}
              </LinkButton>
            </div>
          </Reveal>
          <div className="flex flex-col gap-3">
            {engagementModels.map((model, i) => (
              <Reveal key={model.id} delay={i * 70}>
                <div className="card flex items-start gap-4 p-5">
                  <span className="mt-0.5 font-mono text-xs text-[var(--color-slate-400)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold">{model.name[locale]}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{model.tagline[locale]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="DevHash"
        title={t('cta.heading')}
        body={t('cta.body')}
        primary={{ label: t('cta.primary'), href: '/contact' }}
        secondary={{ label: t('cta.secondary'), href: '/services' }}
      />
    </>
  );
}
