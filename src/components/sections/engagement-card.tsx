import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { type EngagementModel, PRICING_MODE } from '@/config/packages';
import { reveal } from '@/config/confirmable';
import { LinkButton } from '@/components/primitives/button';
import { Icon } from '@/components/icons/icon-set';

/**
 * Renders one engagement model with price display governed by PRICING_MODE.
 * 'consultation' (default) shows no number; 'startingFrom' shows an approved
 * price if one exists, else falls back to consultation; 'hidden' omits price.
 * No fake "most popular" badge, discount or struck-through price — by design.
 */
export function EngagementCard({
  model,
  locale,
  index,
}: {
  model: EngagementModel;
  locale: Locale;
  index: number;
}) {
  const t = useTranslations('pricing');
  const price = model.startingFrom ? reveal(model.startingFrom) : null;

  const showFrom = PRICING_MODE === 'startingFrom' && price;
  const showConsultation = PRICING_MODE === 'consultation' || (PRICING_MODE === 'startingFrom' && !price);

  return (
    <div className="card flex h-full flex-col gap-6 p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-semibold">{model.name[locale]}</h3>
          <p className="text-sm text-[var(--color-muted)]">{model.tagline[locale]}</p>
        </div>
        <span className="font-mono text-xs text-[var(--color-slate-400)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Price block */}
      {PRICING_MODE !== 'hidden' ? (
        <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-sand-50)] px-4 py-3">
          {showFrom && price ? (
            <p className="flex items-baseline gap-1.5">
              <span className="text-sm text-[var(--color-muted)]">{t('fromLabel')}</span>
              <span className="text-2xl font-semibold">
                €{price.amount.toLocaleString(locale === 'de' ? 'de-AT' : 'en-US')}
              </span>
              <span className="text-sm text-[var(--color-muted)]">{price.unit[locale]}</span>
            </p>
          ) : showConsultation ? (
            <div className="flex flex-col">
              <span className="font-semibold">{t('consultationLabel')}</span>
              <span className="text-sm text-[var(--color-muted)]">{t('consultationHint')}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      <Detail label={t('bestForLabel')}>
        <p className="text-sm text-[var(--color-muted)]">{model.bestFor[locale]}</p>
      </Detail>

      <Detail label={t('includesLabel')}>
        <ul className="flex flex-col gap-2">
          {model.includes[locale].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <Icon
                name="check"
                size={16}
                className="mt-0.5 shrink-0 text-[var(--color-accent-strong)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Detail>

      <Detail label={t('modelLabel')}>
        <p className="text-sm text-[var(--color-muted)]">{model.engagementModel[locale]}</p>
      </Detail>

      <Detail label={t('factorsLabel')}>
        <ul className="flex flex-wrap gap-1.5">
          {model.priceFactors[locale].map((item, i) => (
            <li key={i} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </Detail>

      <div className="mt-auto pt-2">
        <LinkButton href={model.nextAction.href} variant="secondary" icon="arrowRight" block>
          {model.nextAction.label[locale]}
        </LinkButton>
      </div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-5">
      <span className="font-mono text-xs tracking-[0.12em] text-[var(--color-slate-400)] uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}
