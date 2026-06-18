import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/primitives/layout';
import { LinkButton } from '@/components/primitives/button';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <Section className="flex min-h-[60vh] items-center">
      <div className="flex max-w-xl flex-col items-start gap-5">
        <span className="eyebrow">404</span>
        <h1 className="text-4xl font-semibold">{t('heading')}</h1>
        <p className="text-lg text-[var(--color-muted)]">{t('body')}</p>
        <LinkButton href="/" variant="primary" icon="arrowRight">
          {t('cta')}
        </LinkButton>
      </div>
    </Section>
  );
}
