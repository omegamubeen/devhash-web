import type { ReactNode } from 'react';
import { LinkButton } from '@/components/primitives/button';
import { Reveal } from '@/components/primitives/reveal';
import type { StaticPathname } from '@/i18n/routing';

interface CtaBandProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  primary: { label: ReactNode; href: StaticPathname };
  secondary?: { label: ReactNode; href: StaticPathname };
}

/** Recurring contained CTA band with the fine technical grid motif. */
export function CtaBand({ eyebrow, title, body, primary, secondary }: CtaBandProps) {
  return (
    <section className="bg-[var(--color-paper)] py-10 sm:py-14">
      <div className="container-page">
        <div className="surface-ink relative overflow-hidden rounded-[var(--radius-3xl)] px-6 py-14 sm:px-10 lg:px-16">
          <div aria-hidden="true" className="grid-motif absolute inset-0" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal className="flex max-w-2xl flex-col gap-5">
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              <h2 className="max-w-[18ch] text-4xl font-semibold">{title}</h2>
              <p className="max-w-[52ch] text-lg text-[var(--color-muted)]">{body}</p>
            </Reveal>
            <Reveal className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <LinkButton href={primary.href} variant="primary" size="lg">
                {primary.label}
              </LinkButton>
              {secondary ? (
                <LinkButton
                  href={secondary.href}
                  variant="secondary"
                  size="lg"
                  icon="arrowRight"
                >
                  {secondary.label}
                </LinkButton>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
