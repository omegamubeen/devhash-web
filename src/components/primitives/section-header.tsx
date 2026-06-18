import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('eyebrow', className)}>{children}</span>;
}

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Render heading visually large (h1-scale) regardless of tag. */
  display?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Tag = 'h2',
  className,
  display,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          'max-w-[20ch] font-semibold',
          display ? 'text-4xl' : 'text-3xl',
          align === 'center' && 'max-w-[24ch]',
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p
          className={cn(
            'max-w-[58ch] text-lg text-[var(--color-muted)]',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
