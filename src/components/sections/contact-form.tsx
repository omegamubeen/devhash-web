'use client';

import { useActionState, useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitEnquiry, type ContactState } from '@/app/[locale]/contact/actions';
import { TOPICS } from '@/lib/contact-schema';
import { Button } from '@/components/primitives/button';
import { Icon } from '@/components/icons/icon-set';
import { integrations } from '@/config/integrations';
import { cn } from '@/lib/cn';

const initialState: ContactState = { status: 'idle' };

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialState);
  const [done, setDone] = useState(false);
  const ids = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<number>(Date.now());

  useEffect(() => {
    if (state.status === 'success') setDone(true);
  }, [state]);

  if (done) {
    return (
      <div
        className="card flex flex-col items-start gap-4 p-8"
        role="status"
        aria-live="polite"
      >
        <span className="grid size-12 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]">
          <Icon name="check" size={26} />
        </span>
        <h3 className="text-2xl font-semibold">{t('success.heading')}</h3>
        <p className="text-[var(--color-muted)]">{t('success.body')}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setDone(false);
            tsRef.current = Date.now();
            formRef.current?.reset();
          }}
        >
          {t('success.again')}
        </Button>
      </div>
    );
  }

  const fieldError = (name: keyof NonNullable<ContactState['errors']>) =>
    state.errors?.[name];

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="ts" value={tsRef.current} readOnly />
      {/* Honeypot — hidden from users + assistive tech. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${ids}-company_url`}>Company URL</label>
        <input
          id={`${ids}-company_url`}
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${ids}-name`}
          name="name"
          label={t('form.name')}
          placeholder={t('form.namePlaceholder')}
          required
          autoComplete="name"
          error={fieldError('name')}
        />
        <Field
          id={`${ids}-email`}
          name="email"
          type="email"
          label={t('form.email')}
          placeholder={t('form.emailPlaceholder')}
          required
          autoComplete="email"
          error={fieldError('email')}
        />
      </div>

      <Field
        id={`${ids}-company`}
        name="company"
        label={t('form.company')}
        placeholder={t('form.companyPlaceholder')}
        autoComplete="organization"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${ids}-topic`} className="text-sm font-medium">
          {t('form.topic')} <Req label={t('form.required')} />
        </label>
        <div className="relative">
          <select
            id={`${ids}-topic`}
            name="topic"
            required
            defaultValue=""
            aria-invalid={fieldError('topic') ? true : undefined}
            aria-describedby={fieldError('topic') ? `${ids}-topic-error` : undefined}
            className="dh-input appearance-none pr-10"
          >
            <option value="" disabled>
              —
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {t(`form.topicOptions.${topic}`)}
              </option>
            ))}
          </select>
          <Icon
            name="chevronDown"
            size={18}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-muted)]"
          />
        </div>
        {fieldError('topic') ? (
          <ErrorText id={`${ids}-topic-error`}>{fieldError('topic')}</ErrorText>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${ids}-message`} className="text-sm font-medium">
          {t('form.message')} <Req label={t('form.required')} />
        </label>
        <textarea
          id={`${ids}-message`}
          name="message"
          rows={6}
          required
          placeholder={t('form.messagePlaceholder')}
          aria-invalid={fieldError('message') ? true : undefined}
          aria-describedby={fieldError('message') ? `${ids}-message-error` : undefined}
          className="dh-input resize-y"
        />
        {fieldError('message') ? (
          <ErrorText id={`${ids}-message-error`}>{fieldError('message')}</ErrorText>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={fieldError('consent') ? true : undefined}
            aria-describedby={fieldError('consent') ? `${ids}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span className="text-[var(--color-muted)]">{t('form.consent')}</span>
        </label>
        {fieldError('consent') ? (
          <ErrorText id={`${ids}-consent-error`}>{fieldError('consent')}</ErrorText>
        ) : null}
      </div>

      {integrations.formSecret ? (
        <input type="hidden" name="secret" value={integrations.formSecret} />
      ) : null}

      <div aria-live="assertive">
        {state.formError ? (
          <p className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-danger-soft)] px-4 py-3 text-sm text-[var(--color-danger)]">
            <Icon name="spark" size={16} />
            {state.formError}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        icon={isPending ? undefined : 'arrowRight'}
      >
        {isPending ? t('form.submitting') : t('form.submit')}
      </Button>

      {!integrations.email.enabled ? (
        <p className="text-xs text-[var(--color-muted)]">{t('devNotice')}</p>
      ) : null}
    </form>
  );
}

function Req({ label }: { label: string }) {
  return (
    <span className="text-[var(--color-danger)]" title={label}>
      *
    </span>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-sm text-[var(--color-danger)]">
      {children}
    </p>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}

function Field({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  required,
  autoComplete,
  error,
}: FieldProps) {
  const t = useTranslations('contact');
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <Req label={t('form.required')} /> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('dh-input', error && 'border-[var(--color-danger)]')}
      />
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}
