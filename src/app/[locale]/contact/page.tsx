import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale, routing } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { buildMetadata, sameHrefForAll, localizedUrl } from '@/lib/seo';
import { contact } from '@/config/contact';
import { company } from '@/config/company';
import { Container } from '@/components/primitives/layout';
import { PageHeader } from '@/components/sections/page-header';
import { ContactForm } from '@/components/sections/contact-form';
import { FactText, factVisible } from '@/components/primitives/fact';
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
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });
  return buildMetadata({
    locale,
    hrefByLocale: sameHrefForAll('/contact'),
    title: t('title'),
    description: t('description'),
  });
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const hasEmail = factVisible(contact.email);
  const hasPhone = factVisible(contact.phone);
  const hasAddress = factVisible(contact.address.street);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'durchX', url: localizedUrl('/', locale) },
          { name: t('heading'), url: localizedUrl('/contact', locale) },
        ])}
      />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        intro={t('intro')}
        breadcrumb={[{ label: 'durchX', href: '/' }, { label: t('eyebrow') }]}
      />

      <section className="section-sm">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            {/* Direct details */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <h2 className="font-mono text-xs tracking-[0.16em] text-[var(--color-slate-400)] uppercase">
                  {t('directHeading')}
                </h2>
                <ul className="flex flex-col gap-5">
                  {hasEmail ? (
                    <ContactRow icon="mail" label={t('emailLabel')}>
                      <a
                        href={`mailto:${contact.email.value}`}
                        className="link-underline font-medium"
                      >
                        <FactText fact={contact.email} />
                      </a>
                    </ContactRow>
                  ) : null}
                  {hasPhone ? (
                    <ContactRow icon="phone" label={t('phoneLabel')}>
                      <span className="font-medium">
                        <FactText fact={contact.phone} />
                      </span>
                    </ContactRow>
                  ) : null}
                  {hasAddress ? (
                    <ContactRow icon="pin" label={t('addressLabel')}>
                      <span className="font-medium not-italic">
                        <FactText fact={contact.address.street} />,{' '}
                        <FactText fact={contact.address.postalCode} />{' '}
                        <FactText fact={contact.address.city} />
                      </span>
                    </ContactRow>
                  ) : null}
                  <ContactRow icon="globe" label={t('responseLabel')}>
                    <span className="font-medium">
                      {company.serviceArea.value[locale]}
                    </span>
                  </ContactRow>
                </ul>
              </div>

              {factVisible(contact.responsePromise) ? (
                <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sand-50)] p-4 text-sm text-[var(--color-muted)]">
                  <FactText fact={contact.responsePromise} locale={locale} />
                </p>
              ) : null}
            </div>

            {/* Form */}
            <div className="card p-7 sm:p-9">
              <h2 className="mb-6 text-2xl font-semibold">{t('formHeading')}</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: 'mail' | 'phone' | 'pin' | 'globe';
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]">
        <Icon name={icon} size={18} />
      </span>
      <span className="flex flex-col">
        <span className="text-xs text-[var(--color-muted)]">{label}</span>
        {children}
      </span>
    </li>
  );
}
