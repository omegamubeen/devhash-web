'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/primitives/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="section flex min-h-[60vh] items-center">
      <div className="container-page flex max-w-xl flex-col items-start gap-5">
        <span className="eyebrow">Error</span>
        <h1 className="text-4xl font-semibold">{t('heading')}</h1>
        <p className="text-lg text-[var(--color-muted)]">{t('body')}</p>
        <Button variant="primary" onClick={reset} icon="arrowRight">
          {t('retry')}
        </Button>
      </div>
    </div>
  );
}
