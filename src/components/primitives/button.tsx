import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from '@/components/icons/icon-set';

type Variant = 'primary' | 'secondary' | 'accent';
type Size = 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
};

function classes(variant: Variant, size: Size, block?: boolean, extra?: string) {
  return cn('btn', variantClass[variant], size === 'lg' && 'btn-lg', block && 'btn-block', extra);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: IconName;
}

export function Button({
  variant = 'primary',
  size = 'md',
  block,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={classes(variant, size, block, className)} {...props}>
      {children}
      {icon ? <Icon name={icon} size={size === 'lg' ? 19 : 17} /> : null}
    </button>
  );
}

type NextIntlLinkProps = ComponentProps<typeof Link>;

export interface LinkButtonProps extends Omit<NextIntlLinkProps, 'className'> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

/** A localized link styled as a button. Use for navigation CTAs. */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  block,
  icon = 'arrowRight',
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={classes(variant, size, block, className)} {...props}>
      {children}
      {icon ? <Icon name={icon} size={size === 'lg' ? 19 : 17} /> : null}
    </Link>
  );
}

export interface TextLinkProps extends NextIntlLinkProps {
  children: ReactNode;
  withArrow?: boolean;
}

/** Inline text link with the animated underline + optional trailing arrow. */
export function TextLink({ className, children, withArrow, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        'group inline-flex items-center gap-1 font-medium text-accent-strong',
        !withArrow && 'link-underline',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow ? (
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}
