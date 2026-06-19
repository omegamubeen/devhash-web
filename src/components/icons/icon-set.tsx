import type { ReactNode, SVGProps } from 'react';

/**
 * Bespoke line-icon language. One consistent grid (24×24), 1.6 stroke,
 * round joins, drawn with `currentColor` so icons inherit text colour and
 * adapt across light/ink surfaces. Intentionally hand-built (no icon pack) to
 * keep the visual language distinct and the bundle tiny.
 */
export type IconName =
  | 'browser'
  | 'code'
  | 'flow'
  | 'support'
  | 'shield'
  | 'mobile'
  | 'arrowRight'
  | 'arrowUpRight'
  | 'check'
  | 'chevronDown'
  | 'menu'
  | 'close'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'globe'
  | 'external'
  | 'spark'
  | 'plus';

const paths: Record<IconName, ReactNode> = {
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6.5 6.7h.01M9 6.7h.01" />
      <path d="M8 13l-1.8 1.8L8 16.6M13 13l1.8 1.8L13 16.6" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10 5.5h4" />
      <path d="M9.6 18.5h4.8" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 8.5 4.8 12l3.7 3.5M15.5 8.5 19.2 12l-3.7 3.5" />
      <path d="M13.2 6.2 10.8 17.8" />
    </>
  ),
  flow: (
    <>
      <rect x="3.5" y="4" width="6" height="5" rx="1.5" />
      <rect x="14.5" y="15" width="6" height="5" rx="1.5" />
      <path d="M6.5 9v4.5a2 2 0 0 0 2 2h6" />
      <path d="M12.5 13.5 14.7 15l-2.2 1.6" />
    </>
  ),
  support: (
    <>
      <path d="M5 12a7 7 0 0 1 14 0" />
      <rect x="3" y="12" width="3.5" height="6" rx="1.5" />
      <rect x="17.5" y="12" width="3.5" height="6" rx="1.5" />
      <path d="M19 18a3.5 3.5 0 0 1-3.5 3h-2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5.5 6v5.2c0 4 2.7 7.2 6.5 9 3.8-1.8 6.5-5 6.5-9V6L12 3.2Z" />
      <path d="m9.3 11.8 1.9 1.9 3.6-3.7" />
    </>
  ),
  arrowRight: <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  check: <path d="m4.5 12.5 4.5 4.5 10.5-11" />,
  chevronDown: <path d="m5.5 9 6.5 6.5L18.5 9" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7.5 8.2 5.5 8.2-5.5" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.4 4-2 1.4a11 11 0 0 0 5.7 5.7l1.4-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  ),
  pin: (
    <>
      <path d="M12 21c4.5-4.2 7-7.6 7-11A7 7 0 0 0 5 10c0 3.4 2.5 6.8 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M3.8 12h16.4M12 3.8c2.3 2.3 3.4 5.1 3.4 8.2 0 3.1-1.1 5.9-3.4 8.2-2.3-2.3-3.4-5.1-3.4-8.2 0-3.1 1.1-5.9 3.4-8.2Z" />
    </>
  ),
  external: (
    <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  ),
  spark: (
    <path d="M12 3.5c.4 4.3 1.7 5.6 6 6-4.3.4-5.6 1.7-6 6-.4-4.3-1.7-5.6-6-6 4.3-.4 5.6-1.7 6-6Z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
