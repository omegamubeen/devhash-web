import { cn } from '@/lib/cn';

/**
 * DevHash wordmark. A compact monogram tile (a precise "#" — the "hash") paired
 * with the wordmark, where the hash glyph carries the accent. Uses currentColor
 * so it inverts cleanly on ink surfaces.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-[var(--color-carbon)] text-[var(--color-accent-bright)] shadow-[var(--shadow-xs)]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M7.1 2.5 5.6 15.5M12.4 2.5 10.9 15.5M3 6.4h12M2.4 11.6h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[1.18rem] leading-none font-semibold tracking-[-0.02em]">
        Dev<span className="text-[var(--color-accent-strong)] [.surface-ink_&]:text-[var(--color-accent-bright)]">Hash</span>
      </span>
    </span>
  );
}
