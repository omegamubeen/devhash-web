'use server';

import { getTranslations } from 'next-intl/server';
import { routing, isLocale } from '@/i18n/routing';
import { integrations } from '@/config/integrations';
import {
  validateEnquiry,
  type FieldErrors,
  type EnquiryInput,
} from '@/lib/contact-schema';
import { sendEnquiry } from '@/lib/email';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  /** Localized, field-keyed errors for display. */
  errors?: Partial<Record<keyof FieldErrors, string>>;
  /** Localized form-level error (e.g. delivery failure). */
  formError?: string;
}

export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const rawLocale = String(formData.get('locale') ?? '');
  const locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'contact' });

  // Honeypot: bots fill this hidden field. Pretend success, drop silently.
  if (String(formData.get('company_url') ?? '').trim() !== '') {
    return { status: 'success' };
  }

  // Timing trap: a genuine human takes more than ~1.2s to fill the form.
  const ts = Number(formData.get('ts') ?? 0);
  if (ts && Date.now() - ts < 1200) {
    return { status: 'success' };
  }

  // Optional shared secret (extra anti-spam). When set, mismatches are dropped.
  if (integrations.formSecret && String(formData.get('secret') ?? '') !== integrations.formSecret) {
    return { status: 'success' };
  }

  const input: EnquiryInput = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    company: String(formData.get('company') ?? ''),
    topic: String(formData.get('topic') ?? ''),
    message: String(formData.get('message') ?? ''),
    consent: formData.get('consent') === 'on',
  };

  const fieldErrors = validateEnquiry(input);
  if (Object.keys(fieldErrors).length > 0) {
    const localized: Partial<Record<keyof FieldErrors, string>> = {};
    for (const [field, code] of Object.entries(fieldErrors)) {
      localized[field as keyof FieldErrors] = t(`validation.${code}`);
    }
    return { status: 'error', errors: localized };
  }

  const result = await sendEnquiry({
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company?.trim() || undefined,
    topic: input.topic,
    message: input.message.trim(),
    locale,
  });

  if (!result.ok) {
    return { status: 'error', formError: t('error.body') };
  }

  return { status: 'success' };
}
