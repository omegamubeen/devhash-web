import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll } from '@/lib/seo';
import { LAUNCH_READY } from '@/config/confirmable';
import { Container } from '@/components/primitives/layout';
import { PageHeader } from '@/components/sections/page-header';
import { LegalNotice } from './legal-notice';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.legalNotice' });
  return {
    // Legal pages add little SEO value and should not compete for ranking.
    ...buildMetadata({
      locale,
      hrefByLocale: sameHrefForAll('/legal-notice'),
      title: t('title'),
      description: t('description'),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function LegalNoticePage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('legal');

  return (
    <>
      <PageHeader
        eyebrow="Impressum / Legal notice"
        title={t('legalNotice.heading')}
        intro={t('legalNotice.intro')}
        breadcrumb={[{ label: 'DevHash', href: '/' }, { label: t('legalNotice.heading') }]}
      />
      <section className="section-sm">
        <Container>
          {!LAUNCH_READY ? (
            <p className="mb-10 max-w-[68ch] rounded-[var(--radius-md)] border border-[var(--color-warning)]/40 bg-[color-mix(in_oklab,var(--color-warning)_8%,transparent)] p-4 text-sm text-[var(--color-warning)]">
              {t('draftNotice')}
            </p>
          ) : null}
          <LegalNotice locale={locale} />
        </Container>
      </section>
    </>
  );
}
