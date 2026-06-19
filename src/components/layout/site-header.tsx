'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav, headerCta } from '@/config/navigation';
import { Icon } from '@/components/icons/icon-set';
import { cn } from '@/lib/cn';
import { Logo } from './logo';
import { LanguageSwitcher } from './language-switcher';
import { MobileMenu } from './mobile-menu';

export function SiteHeader() {
  const nav = useTranslations('nav');
  const a11y = useTranslations('a11y');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-header)] bg-[var(--color-bg)] transition-shadow duration-300',
        scrolled
          ? 'border-b border-[var(--color-border)] shadow-[var(--shadow-xs)]'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" aria-label={a11y('homeLink')} className="shrink-0 rounded-sm">
          <Logo />
        </Link>

        <nav aria-label={a11y('mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex items-center rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'text-[var(--color-fg)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]',
                    )}
                  >
                    {nav(item.labelKey)}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-px h-px origin-left bg-[var(--color-accent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <Link href={headerCta.href} className="btn btn-primary hidden lg:inline-flex">
            {nav(headerCta.labelKey)}
            <Icon name="arrowRight" size={17} />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
