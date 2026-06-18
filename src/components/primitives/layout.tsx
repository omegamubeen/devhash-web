import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  wide?: boolean;
  children: ReactNode;
}

export function Container({ as: Tag = 'div', wide, className, children, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn('container-page', wide && 'max-w-[var(--container-wide)]', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  ink?: boolean;
  size?: 'default' | 'sm';
  containerClassName?: string;
  wide?: boolean;
  children: ReactNode;
}

/** A vertical-rhythm section with an inner Container. Set `ink` for dark bands. */
export function Section({
  as: Tag = 'section',
  ink,
  size = 'default',
  className,
  containerClassName,
  wide,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(size === 'sm' ? 'section-sm' : 'section', ink && 'surface-ink', className)}
      {...props}
    >
      <Container wide={wide} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}
