import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { Service } from '@/config/services';
import { Icon } from '@/components/icons/icon-set';
import { cn } from '@/lib/cn';

interface ServiceCardProps {
  service: Service;
  locale: Locale;
  index: number;
  className?: string;
}

export function ServiceCard({ service, locale, index, className }: ServiceCardProps) {
  const t = useTranslations('services');
  const num = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={{ pathname: '/services/[slug]', params: { slug: service.slug[locale] } }}
      className={cn(
        'group card card-hover relative flex flex-col gap-5 p-6 focus-visible:outline-2',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white"
          aria-hidden="true"
        >
          <Icon name={service.icon} size={24} />
        </span>
        <span className="font-mono text-xs tracking-[0.18em] text-[var(--color-slate-400)]">
          {num}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
        <p className="text-[var(--color-muted)]">{service.summary[locale]}</p>
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-[var(--color-accent-strong)]">
        {t('viewService')}
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
