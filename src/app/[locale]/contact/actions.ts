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

  // Honeypot: a hidden field only bots fill. Drop silently (feign success).
  if (String(formData.get('company_url') ?? '').trim() !== '') {
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

  // Validate first so humans always get real feedback (never a fake success).
  const fieldErrors = validateEnquiry(input);
  if (Object.keys(fieldErrors).length > 0) {
    const localized: Partial<Record<keyof FieldErrors, string>> = {};
    for (const [field, code] of Object.entries(fieldErrors)) {
      localized[field as keyof FieldErrors] = t(`validation.${code}`);
    }
    return { status: 'error', errors: localized };
  }

  // Anti-spam traps apply only to otherwise-valid submissions: a complete form
  // filled in under ~1.2s, or a mismatched shared secret, is treated as a bot.
  const ts = Number(formData.get('ts') ?? 0);
  if (ts && Date.now() - ts < 1200) {
    return { status: 'success' };
  }
  if (
    integrations.formSecret &&
    String(formData.get('secret') ?? '') !== integrations.formSecret
  ) {
    return { status: 'success' };
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
