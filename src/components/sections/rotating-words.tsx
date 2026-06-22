'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Headline word that cycles through a set of terms with a soft cross-fade and a
 * blinking caret. The visible stack is aria-hidden; a visually-hidden joined list
 * carries the meaning for assistive tech. Auto-rotation pauses entirely under
 * prefers-reduced-motion (a single term is shown, statically).
 */
export function RotatingWords({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="relative inline-grid">
        {words.map((word, i) => (
          <span
            key={word}
            className={cn(
              'col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              i === index
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-[0.3em] opacity-0',
            )}
          >
            {word}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="dh-caret" />
    </span>
  );
}
