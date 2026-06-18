import type { Locale } from '@/i18n/routing';
import { company } from '@/config/company';
import { contact } from '@/config/contact';
import { seo } from '@/config/seo';
import { reveal } from '@/config/confirmable';
import { absoluteUrl, SITE_URL } from './url';

/**
 * JSON-LD builders. We only include fields backed by confirmed facts — e.g.
 * email/phone/address appear only once confirmed (reveal() returns null for
 * unconfirmed placeholders in production). We use `Organization` rather than
 * `LocalBusiness`/`ProfessionalService` until a real address is verified, to
 * avoid implying an unverified physical presence (see PRE_LAUNCH_CHECKLIST).
 */
export function organizationSchema(locale: Locale) {
  const email = reveal(contact.email);
  const phone = reveal(contact.phone);

  const sameAs = [reveal(contact.social.linkedin), reveal(contact.social.github)].filter(
    (v): v is string => Boolean(v),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.brand.value,
    legalName: reveal(company.legalName) ?? undefined,
    url: SITE_URL,
    logo: absoluteUrl('/icon.svg'),
    description: company.shortDescription[locale],
    areaServed: company.serviceArea.value[locale],
    knowsLanguage: ['de-AT', 'en'],
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: seo.siteName,
    url: SITE_URL,
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    areaServed: company.serviceArea.value[opts.locale],
    provider: { '@id': `${SITE_URL}/#organization` },
    inLanguage: opts.locale === 'de' ? 'de-AT' : 'en',
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
