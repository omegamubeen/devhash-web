/**
 * External integrations. Privacy-first by default: NO analytics, NO third-party
 * scripts and NO trackers ship unless explicitly enabled here via environment
 * variables. This keeps the bundle lean and the privacy notice honest.
 */
export const integrations = {
  /** Transactional email for the enquiry form (server-only). */
  email: {
    provider: 'resend' as const,
    apiKey: process.env.RESEND_API_KEY ?? '',
    inbox: process.env.CONTACT_INBOX ?? '',
    from: process.env.CONTACT_FROM ?? 'DevHash Website <noreply@example.com>',
    /** When false, the form validates + logs but does not send (safe default). */
    get enabled() {
      return Boolean(this.apiKey && this.inbox);
    },
  },

  /** Privacy-friendly, cookieless analytics. Disabled unless a domain is set. */
  analytics: {
    provider: 'plausible' as const,
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '',
    get enabled() {
      return Boolean(this.domain);
    },
  },

  /** Anti-spam shared secret for the enquiry form (optional). */
  formSecret: process.env.CONTACT_FORM_SECRET ?? '',
} as const;
