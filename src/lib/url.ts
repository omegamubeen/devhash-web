/**
 * Canonical site origin. Falls back to localhost in development. Configure via
 * NEXT_PUBLIC_SITE_URL in production (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${SITE_URL}${path}`;
}
