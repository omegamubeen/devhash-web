import { cn } from '@/lib/cn';

/**
 * durchX brand mark — the "X" as a junction: four arms converging on a luminous
 * core. It reads as throughput / transformation (durch = "through") and ties to
 * the product's "capability system" motif. Uses currentColor-friendly tokens so
 * it stays crisp on ink and paper alike.
 */
export function BrandMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid shrink-0 place-items-center rounded-[9px] bg-[var(--color-carbon)] shadow-[var(--shadow-xs)]',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.66}
        height={size * 0.66}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="var(--color-accent-bright)" strokeWidth="2.4" strokeLinecap="round">
          <path d="M9 9 4.6 4.6" />
          <path d="M15 9 19.4 4.6" />
          <path d="M9 15 4.6 19.4" />
          <path d="M15 15 19.4 19.4" />
        </g>
        {/* luminous core diamond */}
        <rect
          x="8.6"
          y="8.6"
          width="6.8"
          height="6.8"
          rx="1.4"
          transform="rotate(45 12 12)"
          fill="#ffffff"
        />
        <rect
          x="8.6"
          y="8.6"
          width="6.8"
          height="6.8"
          rx="1.4"
          transform="rotate(45 12 12)"
          fill="none"
          stroke="var(--color-accent-bright)"
          strokeOpacity="0.55"
        />
      </svg>
    </span>
  );
}

/** Full wordmark: the mark + "durchX", with the X carrying the accent. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark size={32} />
      <span className="text-[1.2rem] leading-none font-semibold tracking-[-0.03em]">
        durch
        <span className="text-[var(--color-accent-strong)] [.surface-ink_&]:text-[var(--color-accent-bright)]">
          X
        </span>
      </span>
    </span>
  );
}
