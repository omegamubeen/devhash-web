'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav, headerCta, footerLegalNav } from '@/config/navigation';
import { Icon } from '@/components/icons/icon-set';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/cn';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const nav = useTranslations('nav');
  const a11y = useTranslations('a11y');
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock + Escape + focus trap while open; restore focus on close.
  useEffect(() => {
    if (!open) return;
    const toggleButton = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const id = window.setTimeout(() => getFocusable()[0]?.focus(), 60);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(id);
      toggleButton?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? a11y('closeMenu') : a11y('openMenu')}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-fg)] transition-colors duration-200 hover:border-[var(--color-border-strong)]"
      >
        <Icon name={open ? 'close' : 'menu'} size={22} />
      </button>

      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-[var(--z-overlay)] bg-[rgba(11,14,21,0.45)] backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={a11y('mainNav')}
        inert={!open}
        className={cn(
          'surface-ink fixed inset-x-0 top-0 z-[var(--z-menu)] origin-top overflow-y-auto rounded-b-[var(--radius-2xl)] px-6 pt-5 pb-10 shadow-[var(--shadow-ink)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
            {a11y('languageLabel')}
          </span>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={a11y('closeMenu')}
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] transition-colors duration-200 hover:border-[var(--color-border-strong)]"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <nav aria-label={a11y('mainNav')}>
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-[var(--color-border)]">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-2xl font-medium transition-colors duration-200 hover:text-[var(--color-accent-bright)]"
                >
                  {nav(item.labelKey)}
                  <Icon name="arrowUpRight" size={20} className="text-[var(--color-muted)]" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <Link href={headerCta.href} className="btn btn-primary btn-lg btn-block">
            {nav(headerCta.labelKey)}
            <Icon name="arrowRight" size={19} />
          </Link>
        </div>

        <ul className="mt-8 flex gap-5 font-mono text-xs tracking-wide text-[var(--color-muted)] uppercase">
          {footerLegalNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-[var(--color-fg)]">
                {nav(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
