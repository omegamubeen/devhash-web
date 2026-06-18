import { confirmed, placeholder } from './confirmable';
import type { Localized } from '@/lib/types';

/**
 * Contact details. Everything that a stranger could phone, email or post a
 * letter to is a confirmable fact — placeholders are hidden in production so we
 * never publish a fake address or number. The enquiry form (server action) is
 * the always-available channel and does not depend on these.
 */
export const contact = {
  email: placeholder(
    'contact.email',
    'contact',
    'hello@devhash.example',
    'Set the real, monitored contact mailbox and verify it can send/receive.',
  ),

  phone: placeholder(
    'contact.phone',
    'contact',
    '+43 1 0000000',
    'Confirm the real business phone number in international format (+43 …).',
  ),

  /** Postal / visiting address — also required for the legal notice. */
  address: {
    street: placeholder(
      'contact.address.street',
      'contact',
      'Musterstraße 1',
      'Confirm the registered business street + number.',
    ),
    postalCode: placeholder(
      'contact.address.postalCode',
      'contact',
      '1010',
      'Confirm the postal code.',
    ),
    city: placeholder(
      'contact.address.city',
      'contact',
      'Wien',
      'Confirm the city.',
    ),
    country: confirmed<Localized>('contact.address.country', 'contact', {
      de: 'Österreich',
      en: 'Austria',
    }),
    countryCode: confirmed('contact.address.countryCode', 'contact', 'AT'),
  },

  /** Social profiles render only when confirmed (placeholders stay hidden). */
  social: {
    linkedin: placeholder(
      'contact.social.linkedin',
      'social',
      'https://www.linkedin.com/company/devhash',
      'Confirm the real LinkedIn company URL, or remove the link.',
    ),
    github: placeholder(
      'contact.social.github',
      'social',
      'https://github.com/devhash',
      'Confirm the real GitHub org URL, or remove the link.',
    ),
  },

  /** How quickly we aim to reply — kept vague until a real commitment is set. */
  responsePromise: placeholder<Localized>(
    'contact.responsePromise',
    'support',
    {
      de: 'Wir melden uns in der Regel innerhalb eines Werktags.',
      en: 'We usually reply within one business day.',
    },
    'Confirm the response time you can actually commit to (or soften wording).',
  ),
} as const;
