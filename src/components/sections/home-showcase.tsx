import { Icon } from '@/components/icons/icon-set';
import { HeroDiagram } from '@/components/sections/hero-diagram';

interface HomeHeroShowcaseProps {
  labels: { web: string; software: string; automation: string; support: string };
  card: { badge: string; title: [string, string]; action: string };
}

const metricWidths = ['74%', '86%', '68%', '78%'] as const;

function CapabilityMetric({
  index,
  label,
  width,
}: {
  index: number;
  label: string;
  width: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.65rem] text-[var(--color-accent-bright)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="min-w-0 text-right text-xs leading-tight font-medium text-white/78">
          {label}
        </span>
      </div>
      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/10">
        <span
          className="block h-full rounded-full bg-[var(--color-accent-bright)]"
          style={{ width }}
        />
      </span>
    </div>
  );
}

export function HomeHeroShowcase({ labels, card }: HomeHeroShowcaseProps) {
  const metrics = [labels.web, labels.software, labels.automation, labels.support];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle_at_68%_18%,rgba(54,217,155,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]"
      />
      <div className="relative overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--color-border-strong)] bg-white/95 p-3 shadow-[var(--shadow-lg)] sm:p-4">
        <div className="surface-ink relative overflow-hidden rounded-[calc(var(--radius-3xl)-0.55rem)] p-4 sm:p-5">
          <div aria-hidden="true" className="grid-motif absolute inset-0 opacity-75" />

          <div className="relative flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] border border-white/10 bg-white/[0.06] text-[var(--color-accent-bright)]">
                <Icon name="globe" size={20} />
              </span>
              <div>
                <p className="text-base leading-tight font-semibold text-white">
                  {card.title[0]} {card.title[1]}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] tracking-[0.18em] text-white/45 uppercase">
                  {labels.automation}
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[0.68rem] text-white/78">
              <span className="size-1.5 rounded-full bg-[var(--color-accent-bright)]" />
              {card.badge}
            </span>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <CapabilityMetric
                key={metric}
                index={index}
                label={metric}
                width={metricWidths[index]!}
              />
            ))}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-[#070c14] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <HeroDiagram labels={labels} />
          </div>

          <div className="relative mt-4 flex flex-col gap-3 rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.045] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-[var(--color-accent-bright)] text-[var(--color-ink)]">
                <Icon name="check" size={16} />
              </span>
              <span className="text-sm font-medium text-white/82">{labels.support}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent-bright)]">
              {card.action}
              <Icon name="arrowRight" size={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
