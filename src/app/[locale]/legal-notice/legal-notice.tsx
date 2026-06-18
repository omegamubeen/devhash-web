import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { company } from '@/config/company';
import { contact } from '@/config/contact';
import { legal } from '@/config/legal';
import { FactText } from '@/components/primitives/fact';

/**
 * Renders the Austrian Impressum from the legal config. Each confirmable field
 * shows in dev (clearly marked) and falls back to a "to be confirmed" label in
 * production until replaced — the draft banner on the page makes the status
 * explicit. This is a template pending legal review (see PRE_LAUNCH_CHECKLIST).
 */
export async function LegalNotice({ locale }: { locale: Locale }) {
  const t = await getTranslations('legal');
  const pending = t('pendingField');

  return (
    <div className="prose-legal">
      <h2>{t('legalNotice.companyHeading')}</h2>
      <Row>
        <strong>{company.brand.value}</strong> — <FactText fact={company.legalName} fallback={pending} />
      </Row>
      <Row>
        <FactText fact={legal.legalForm} locale={locale} fallback={pending} />
      </Row>
      <Row>
        <FactText fact={contact.address.street} fallback={pending} />,{' '}
        <FactText fact={contact.address.postalCode} fallback={pending} />{' '}
        <FactText fact={contact.address.city} fallback={pending} />,{' '}
        {contact.address.country.value[locale]}
      </Row>

      <h2>{t('legalNotice.contactHeading')}</h2>
      <Row>
        E-Mail: <FactText fact={contact.email} fallback={pending} />
      </Row>
      <Row>
        Tel.: <FactText fact={contact.phone} fallback={pending} />
      </Row>

      <h2>{t('legalNotice.registrationHeading')}</h2>
      <Row>
        Firmenbuchnummer: <FactText fact={legal.companyRegisterNumber} fallback={pending} />
      </Row>
      <Row>
        Firmenbuchgericht: <FactText fact={legal.registerCourt} fallback={pending} />
      </Row>
      <Row>
        <FactText fact={legal.chamberMembership} locale={locale} fallback={pending} />
      </Row>
      <Row>
        {legal.tradeRegulations.value[locale]} —{' '}
        <a href={legal.tradeRegulations.value.url} rel="noopener noreferrer" target="_blank">
          {legal.tradeRegulations.value.url}
        </a>
      </Row>
      <Row>
        {locale === 'de' ? 'Aufsichtsbehörde' : 'Supervisory authority'}:{' '}
        <FactText fact={legal.supervisoryAuthority} locale={locale} fallback={pending} />
      </Row>
      <Row>
        <FactText fact={legal.professionalTitle} locale={locale} fallback={pending} />
      </Row>
      <Row>
        {locale === 'de' ? 'Für den Inhalt verantwortlich' : 'Responsible for content'}:{' '}
        <FactText fact={legal.responsibleForContent} fallback={pending} />
      </Row>

      <h2>{t('legalNotice.vatHeading')}</h2>
      <Row>
        UID: <FactText fact={legal.vatId} fallback={pending} />
      </Row>

      <h2>{t('legalNotice.disputeHeading')}</h2>
      <p>
        {t('legalNotice.disputeText')}{' '}
        <a href={legal.odrPlatformUrl.value} rel="noopener noreferrer" target="_blank">
          {legal.odrPlatformUrl.value}
        </a>
      </p>
      <p>{t('legalNotice.disputeNote')}</p>

      <h2>{t('legalNotice.liabilityHeading')}</h2>
      <p>{t('legalNotice.liabilityText')}</p>

      <h2>{t('legalNotice.copyrightHeading')}</h2>
      <p>{t('legalNotice.copyrightText')}</p>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
