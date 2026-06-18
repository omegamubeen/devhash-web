/**
 * Enquiry validation. Returns stable error *codes* (not messages) so it can be
 * unit-tested without i18n; the server action maps codes to localized strings.
 */
export const TOPICS = ['web', 'software', 'automation', 'support', 'maintenance', 'other'] as const;
export type Topic = (typeof TOPICS)[number];

export type FieldName = 'name' | 'email' | 'topic' | 'message' | 'consent';

export type FieldErrorCode =
  | 'nameRequired'
  | 'emailRequired'
  | 'emailInvalid'
  | 'topicRequired'
  | 'messageRequired'
  | 'messageTooShort'
  | 'consentRequired';

export type FieldErrors = Partial<Record<FieldName, FieldErrorCode>>;

export interface EnquiryInput {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message: string;
  consent: boolean;
}

// Pragmatic email check — intentionally lenient (real validation is delivery).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN = 10;

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name.trim()) errors.name = 'nameRequired';

  if (!input.email.trim()) errors.email = 'emailRequired';
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = 'emailInvalid';

  if (!input.topic || !TOPICS.includes(input.topic as Topic)) errors.topic = 'topicRequired';

  if (!input.message.trim()) errors.message = 'messageRequired';
  else if (input.message.trim().length < MESSAGE_MIN) errors.message = 'messageTooShort';

  if (!input.consent) errors.consent = 'consentRequired';

  return errors;
}
