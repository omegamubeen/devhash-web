import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { servicesInOrder } from '@/config/services';
import { footerCompanyNav, footerLegalNav } from '@/config/navigation';
import { contact } from '@/config/contact';
import { company } from '@/config/company';
import { LAUNCH_READY } from '@/config/confirmable';
import { FactText, factVisible } from '@/components/primitives/fact';
import { Icon } from '@/components/icons/icon-set';
import { Logo } from './logo';

export function SiteFooter() {
  const locale = useLocale() as Locale;
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="surface-ink mt-auto">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo />
          <p className="text-sm text-[var(--color-muted)]">{t('blurb')}</p>
        </div>

        <nav aria-label={t('servicesHeading')} className="flex flex-col gap-3">
          <h2 className="font-mono text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
            {t('servicesHeading')}
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {servicesInOrder.map((s) => (
              <li key={s.id}>
                <Link
                  href={{
                    pathname: '/services/[slug]',
                    params: { slug: s.slug[locale] },
                  }}
                  className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-fg)]"
                >
                  {s.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('companyHeading')} className="flex flex-col gap-3">
          <h2 className="font-mono text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
            {t('companyHeading')}
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerCompanyNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-fg)]"
                >
                  {nav(item.labelKey)}
                </Link>
              </li>
            ))}
            {footerLegalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-fg)]"
                >
                  {nav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
            {t('contactHeading')}
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-muted)]">
            {factVisible(contact.email) ? (
              <li className="flex items-center gap-2">
                <Icon
                  name="mail"
                  size={16}
                  className="shrink-0 text-[var(--color-accent-bright)]"
                />
                <a
                  href={`mailto:${contact.email.value}`}
                  className="transition-colors hover:text-[var(--color-fg)]"
                >
                  <FactText fact={contact.email} />
                </a>
              </li>
            ) : null}
            {factVisible(contact.phone) ? (
              <li className="flex items-center gap-2">
                <Icon
                  name="phone"
                  size={16}
                  className="shrink-0 text-[var(--color-accent-bright)]"
                />
                <FactText fact={contact.phone} />
              </li>
            ) : null}
            <li className="flex items-start gap-2">
              <Icon
                name="pin"
                size={16}
                className="mt-0.5 shrink-0 text-[var(--color-accent-bright)]"
              />
              <span>{company.serviceArea.value[locale]}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.brand.value}. {t('rights')}
          </p>
          {!LAUNCH_READY ? (
            <p className="font-mono tracking-wide text-[var(--color-warning)]">
              {t('placeholderNotice')}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
