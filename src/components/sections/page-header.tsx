import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/layout';
import { Breadcrumb, type Crumb } from './breadcrumb';
import { cn } from '@/lib/cn';

interface PageHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumb?: Crumb[];
  /** Optional content rendered to the right on wide screens (e.g. meta, actions). */
  aside?: ReactNode;
  className?: string;
}

/** Consistent inner-page header on the paper surface. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumb,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('relative pt-10 pb-2', className)}>
      <Container>
        {breadcrumb ? (
          <div className="mb-8">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : null}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="max-w-[18ch] text-5xl font-semibold tracking-[-0.025em]">
              {title}
            </h1>
            {intro ? (
              <p className="max-w-[56ch] text-lg text-[var(--color-muted)]">{intro}</p>
            ) : null}
          </div>
          {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
        </div>
        <div aria-hidden="true" className="mt-10 rule-soft" />
      </Container>
    </header>
  );
}
