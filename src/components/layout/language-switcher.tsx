'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { type Locale, type StaticPathname } from '@/i18n/routing';
import { serviceSlugs } from '@/config/service-slugs';
import { cn } from '@/lib/cn';

/**
 * Switches locale while staying on the equivalent page. Static pages map
 * automatically via the internal pathname; the service detail route needs its
 * slug translated, which we resolve from the lightweight slug map.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('a11y');

  const other: Locale = locale === 'de' ? 'en' : 'de';

  const slugParam = typeof params?.slug === 'string' ? params.slug : undefined;
  // When not on the service detail route, `pathname` is a static internal path.
  const href = slugParam
    ? {
        pathname: '/services/[slug]' as const,
        params: {
          slug: serviceSlugs.find((s) => s[locale] === slugParam)?.[other] ?? slugParam,
        },
      }
    : (pathname as StaticPathname);

  return (
    <Link
      href={href}
      locale={other}
      hrefLang={other}
      aria-label={other === 'en' ? t('switchToEnglish') : t('switchToGerman')}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2.5 py-1.5 font-mono text-xs font-medium tracking-wide uppercase transition-colors duration-200 hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent-strong)]',
        className,
      )}
    >
      <span aria-hidden="true" className="text-[var(--color-muted)]">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-[var(--color-muted)]/50">
        /
      </span>
      <span aria-hidden="true">{other.toUpperCase()}</span>
    </Link>
  );
}
