'use client';

import { type ReactNode, useId, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons/icon-set';

export interface AccordionItem {
  question: ReactNode;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once. */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const triggerId = `${baseId}-t-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i} className="border-b border-[var(--color-border)]">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium transition-colors duration-200 hover:text-[var(--color-accent-strong)]"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full border border-[var(--color-border)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isOpen && 'rotate-45 border-[var(--color-accent)] text-[var(--color-accent-strong)]',
                  )}
                >
                  <Icon name="plus" size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-5 text-[var(--color-muted)]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
