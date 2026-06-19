import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isLocale } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { Section } from '@/components/primitives/layout';
import { SectionHeader } from '@/components/primitives/section-header';
// Importing the config barrel ensures every confirmable fact is registered.
import '@/config';
import { getUnconfirmedByCategory, getUnconfirmedFacts } from '@/config/confirmable';

export const metadata = { robots: { index: false, follow: false } };

/**
 * Development-only pre-launch dashboard. Lists every unconfirmed placeholder
 * grouped by category. Returns 404 in production so it never ships.
 */
export default async function PreflightPage({ params }: { params: LocaleParams }) {
  if (process.env.NODE_ENV === 'production') notFound();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('preflight');

  const total = getUnconfirmedFacts().length;
  const byCategory = getUnconfirmedByCategory();
  const categories = Object.entries(byCategory).filter(([, facts]) => facts.length > 0);

  return (
    <Section>
      <SectionHeader
        eyebrow={`${total} ${t('count')}`}
        title={t('heading')}
        intro={t('intro')}
      />
      {total === 0 ? (
        <p className="mt-8 text-[var(--color-accent-strong)]">{t('allConfirmed')}</p>
      ) : (
        <div className="mt-12 flex flex-col gap-10">
          {categories.map(([category, facts]) => (
            <div key={category} className="flex flex-col gap-4">
              <h2 className="font-mono text-sm tracking-[0.14em] text-[var(--color-accent-strong)] uppercase">
                {category} ({facts.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-strong)] text-left">
                      <th className="py-2 pr-4 font-medium">{t('idLabel')}</th>
                      <th className="py-2 pr-4 font-medium">{t('valueLabel')}</th>
                      <th className="py-2 font-medium">{t('noteLabel')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facts.map((fact) => (
                      <tr
                        key={fact.id}
                        className="border-b border-[var(--color-border)] align-top"
                      >
                        <td className="py-3 pr-4 font-mono text-xs">{fact.id}</td>
                        <td className="py-3 pr-4 text-[var(--color-muted)]">
                          {typeof fact.value === 'object'
                            ? JSON.stringify(fact.value)
                            : String(fact.value)}
                        </td>
                        <td className="py-3 text-[var(--color-muted)]">{fact.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
