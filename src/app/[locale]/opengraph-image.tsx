import { ImageResponse } from 'next/og';
import { isLocale, routing } from '@/i18n/routing';
import { seo } from '@/config/seo';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'DevHash';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0e15',
          color: '#eef0f4',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#13161d',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#36d99b',
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            #
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>DevHash</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, maxWidth: 960 }}>
            {seo.defaultTitle[locale].replace('DevHash – ', '')}
          </div>
          <div style={{ display: 'flex', marginTop: 18, color: '#36d99b', fontSize: 30 }}>
            {locale === 'de' ? 'Wien · Österreich · DACH' : 'Vienna · Austria · DACH'}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
