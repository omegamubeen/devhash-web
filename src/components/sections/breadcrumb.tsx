import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { Icon } from '@/components/icons/icon-set';

export interface Crumb {
  label: string;
  href?: StaticPathname;
}

/** Accessible breadcrumb trail. The last item is the current page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const a11y = useTranslations('a11y');
  return (
    <nav aria-label={a11y('breadcrumb')}>
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-muted)]">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={last ? 'text-[var(--color-fg)]' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <Icon name="chevronDown" size={12} className="-rotate-90 opacity-50" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
