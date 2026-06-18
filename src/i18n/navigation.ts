import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Always import `Link`, `redirect`,
 * `usePathname`, `useRouter` and `getPathname` from here — never from `next/*` —
 * so that every link resolves to the correct localised pathname.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
