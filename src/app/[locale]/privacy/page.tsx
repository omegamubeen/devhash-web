import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll } from '@/lib/seo';
import { company } from '@/config/company';
import { contact } from '@/config/contact';
import { LAUNCH_READY } from '@/config/confirmable';
import { Container } from '@/components/primitives/layout';
import { PageHeader } from '@/components/sections/page-header';
import { FactText } from '@/components/primitives/fact';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' });
  return {
    ...buildMetadata({
      locale,
      hrefByLocale: sameHrefForAll('/privacy'),
      title: t('title'),
      description: t('description'),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  const p = await getTranslations('legal.privacy');

  return (
    <>
      <PageHeader
        eyebrow="Datenschutz / Privacy"
        title={p('heading')}
        intro={p('intro')}
        breadcrumb={[{ label: 'DevHash', href: '/' }, { label: p('heading') }]}
      />
      <section className="section-sm">
        <Container>
          {!LAUNCH_READY ? (
            <p className="mb-10 max-w-[68ch] rounded-[var(--radius-md)] border border-[var(--color-warning)]/40 bg-[color-mix(in_oklab,var(--color-warning)_8%,transparent)] p-4 text-sm text-[var(--color-warning)]">
              {t('draftNotice')}
            </p>
          ) : null}

          <div className="prose-legal">
            <h2>{p('controllerHeading')}</h2>
            <p>
              <strong>{company.brand.value}</strong>
              <br />
              <FactText fact={contact.address.street} fallback={t('pendingField')} />,{' '}
              <FactText fact={contact.address.postalCode} fallback={t('pendingField')} />{' '}
              <FactText fact={contact.address.city} fallback={t('pendingField')} />,{' '}
              {contact.address.country.value[locale]}
              <br />
              E-Mail: <FactText fact={contact.email} fallback={t('pendingField')} />
            </p>

            <h2>{p('dataHeading')}</h2>
            <p>{p('dataText')}</p>

            <h2>{p('contactFormHeading')}</h2>
            <p>{p('contactFormText')}</p>

            <h2>{p('cookiesHeading')}</h2>
            <p>{p('cookiesText')}</p>

            <h2>{p('rightsHeading')}</h2>
            <p>{p('rightsText')}</p>
            <p>
              <a href="https://www.dsb.gv.at" rel="noopener noreferrer" target="_blank">
                {p('rightsAuthority')}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
