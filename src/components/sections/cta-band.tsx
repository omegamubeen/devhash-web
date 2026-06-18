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

/** Recurring dark CTA band with the fine grid motif. */
export function CtaBand({ eyebrow, title, body, primary, secondary }: CtaBandProps) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div aria-hidden="true" className="grid-motif absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-accent-bright) 30%, transparent), transparent 65%)',
        }}
      />
      <div className="container-page relative section flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-5">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2 className="max-w-[18ch] text-4xl font-semibold">{title}</h2>
          <p className="max-w-[52ch] text-lg text-[var(--color-muted)]">{body}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={primary.href} variant="primary" size="lg">
              {primary.label}
            </LinkButton>
            {secondary ? (
              <LinkButton href={secondary.href} variant="secondary" size="lg" icon="arrowRight">
                {secondary.label}
              </LinkButton>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
