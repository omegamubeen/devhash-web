import 'server-only';
import { integrations } from '@/config/integrations';

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message: string;
  locale: string;
}

export interface SendResult {
  ok: boolean;
  delivered: boolean;
}

/**
 * Deliver an enquiry. If no email provider is configured (the safe default),
 * the enquiry is logged server-side and reported as a success so the form is
 * fully usable in preview/dev. In production, configure RESEND_API_KEY +
 * CONTACT_INBOX to enable real delivery via Resend (called over fetch — no SDK).
 */
export async function sendEnquiry(payload: EnquiryPayload): Promise<SendResult> {
  const subject = `New enquiry — ${payload.topic} (${payload.name})`;
  const text = [
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Topic:   ${payload.topic}`,
    `Locale:  ${payload.locale}`,
    '',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n');

  if (!integrations.email.enabled) {
    // eslint-disable-next-line no-console
    console.info(
      `[contact] Enquiry received (email delivery disabled — set RESEND_API_KEY + CONTACT_INBOX):\n${text}`,
    );
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${integrations.email.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: integrations.email.from,
        to: [integrations.email.inbox],
        reply_to: payload.email,
        subject,
        text,
      }),
    });
    return { ok: res.ok, delivered: res.ok };
  } catch {
    return { ok: false, delivered: false };
  }
}
