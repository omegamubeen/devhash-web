import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll, localizedUrl } from '@/lib/seo';
import { company } from '@/config/company';
import { Section } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { PageHeader } from '@/components/sections/page-header';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/structured-data';
import { Icon } from '@/components/icons/icon-set';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.about' });
  return buildMetadata({
    locale,
    hrefByLocale: sameHrefForAll('/about'),
    title: t('title'),
    description: t('description'),
  });
}

export default async function AboutPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const common = await getTranslations('common');
  const home = await getTranslations('home');

  const valueKeys = ['ownership', 'transparency', 'craft', 'continuity'] as const;
  const stepKeys = ['understand', 'shape', 'build', 'operate'] as const;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'durchX', url: localizedUrl('/', locale) },
          { name: t('heading'), url: localizedUrl('/about', locale) },
        ])}
      />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        intro={t('intro')}
        breadcrumb={[{ label: 'durchX', href: '/' }, { label: t('eyebrow') }]}
      />

      {/* Story */}
      <Section size="sm">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <SectionHeader eyebrow={t('eyebrow')} title={t('storyHeading')} as="h2" />
            <p className="text-lg text-[var(--color-muted)]">{t('story1')}</p>
            <p className="text-lg text-[var(--color-muted)]">{t('story2')}</p>
          </Reveal>
          <Reveal>
            <div className="card flex flex-col gap-5 p-7">
              <p className="text-balance">{company.shortDescription[locale]}</p>
              <div aria-hidden="true" className="rule-soft" />
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-center gap-3">
                  <Icon
                    name="pin"
                    size={18}
                    className="text-[var(--color-accent-strong)]"
                  />
                  <span>
                    <span className="block text-[var(--color-muted)]">
                      {company.region.value[locale]}
                    </span>
                    <span className="font-medium">
                      {company.serviceArea.value[locale]}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon
                    name="globe"
                    size={18}
                    className="text-[var(--color-accent-strong)]"
                  />
                  <span>
                    <span className="block text-[var(--color-muted)]">
                      {locale === 'de' ? 'Sprachen' : 'Languages'}
                    </span>
                    <span className="font-medium">Deutsch · English</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-[var(--color-sand-50)]">
        <Reveal>
          <SectionHeader
            eyebrow={t('valuesHeading')}
            title={t('valuesHeading')}
            as="h2"
          />
        </Reveal>
        <div className="mt-10 auto-grid">
          {valueKeys.map((key, i) => (
            <Reveal key={key} delay={i * 60}>
              <div className="card flex h-full flex-col gap-2.5 p-6">
                <span className="mb-1 grid size-10 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] font-mono text-sm text-[var(--color-accent-strong)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold">{t(`values.${key}.title`)}</h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {t(`values.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Approach (reuses the shared process) */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={home('process.eyebrow')}
            title={t('approachHeading')}
            intro={home('process.intro')}
            as="h2"
          />
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stepKeys.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 60} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--color-carbon)] font-mono text-xs text-[var(--color-accent-bright)]">
                  {i + 1}
                </span>
                {i < stepKeys.length - 1 ? (
                  <span aria-hidden="true" className="hidden rule-soft flex-1 sm:block" />
                ) : null}
              </div>
              <h3 className="font-semibold">{home(`process.steps.${key}.title`)}</h3>
              <p className="text-sm text-[var(--color-muted)]">
                {home(`process.steps.${key}.body`)}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        eyebrow="durchX"
        title={t('ctaHeading')}
        body={t('ctaBody')}
        primary={{ label: common('startProject'), href: '/contact' }}
        secondary={{ label: common('allServices'), href: '/services' }}
      />
    </>
  );
}
