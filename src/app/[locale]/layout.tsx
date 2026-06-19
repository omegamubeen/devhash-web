import '@/styles/globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, htmlLang, ogLocale, isLocale } from '@/i18n/routing';
import type { LocaleParams } from '@/lib/types';
import { seo } from '@/config/seo';
import { SITE_URL } from '@/lib/url';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema, webSiteSchema } from '@/lib/structured-data';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.defaultTitle[locale],
      template: `%s | ${seo.siteName}`,
    },
    description: seo.defaultDescription[locale],
    applicationName: seo.siteName,
    referrer: 'strict-origin-when-cross-origin',
    formatDetection: { telephone: false, email: false, address: false },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      shortcut: ['/icon.svg'],
    },
    manifest: '/manifest.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      siteName: seo.siteName,
      locale: ogLocale[locale],
      title: seo.defaultTitle[locale],
      description: seo.defaultDescription[locale],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('common');

  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Arm scroll-reveals only when motion is welcome; prevents flashes and
            keeps content visible without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reveal-on')}}catch(e){}",
          }}
        />
        <a href="#main" className="dh-skip-link">
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        <JsonLd data={[organizationSchema(locale), webSiteSchema(locale)]} />
      </body>
    </html>
  );
}
