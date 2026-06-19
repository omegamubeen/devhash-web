import type { MetadataRoute } from 'next';
import { seo } from '@/config/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'durchX — Web, Software & IT',
    short_name: seo.siteName,
    description: seo.defaultDescription.en,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf8',
    theme_color: '#0b0e15',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
