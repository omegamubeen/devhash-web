'use client';

import { type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in ms (applied as transition-delay). */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance. Progressive enhancement only:
 * - Without JS, or with prefers-reduced-motion, content is always visible
 *   (the `.reveal-on` root class — added by an inline, motion-aware script in the
 *   root layout — is what arms the hidden state, so there is no flash and no
 *   invisible content if scripting is off).
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      data-shown={shown ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
