import { confirmed, placeholder } from './confirmable';
import type { Localized } from '@/lib/types';

/**
 * Support & maintenance commitments. We describe HOW we work honestly, but any
 * concrete service-level promise (response/uptime/restore times) is a
 * placeholder until it is a real, contractual commitment.
 */
export const support = {
  channels: confirmed<Localized<string[]>>('support.channels', 'support', {
    de: ['E‑Mail', 'Telefon nach Vereinbarung', 'Gemeinsames Ticket‑/Aufgabenboard'],
    en: ['Email', 'Phone by arrangement', 'Shared ticket / task board'],
  }),

  /** Plain-language description of the maintenance approach (safe to show). */
  approach: {
    de: 'Wartung bedeutet bei uns: Updates und Sicherheits‑Patches, Monitoring, regelmäßige Backups sowie ein fester Ansprechpartner. Umfang und Reaktionszeiten halten wir schriftlich fest, bevor etwas live geht.',
    en: 'For us, maintenance means: updates and security patches, monitoring, regular backups and a named point of contact. Scope and response times are agreed in writing before anything goes live.',
  } satisfies Localized,

  /** Concrete SLA — placeholders, hidden in production until contractual. */
  sla: {
    responseTime: placeholder<Localized>(
      'support.sla.responseTime',
      'support',
      {
        de: 'Reaktionszeit innerhalb eines Werktags',
        en: 'Response within one business day',
      },
      'Confirm the response time you can contractually guarantee.',
    ),
    criticalResponse: placeholder<Localized>(
      'support.sla.criticalResponse',
      'support',
      {
        de: 'Bei kritischen Störungen schnellere Reaktion nach Vereinbarung',
        en: 'Faster response for critical incidents by agreement',
      },
      'Confirm the critical-incident response commitment (or remove).',
    ),
    uptimeTarget: placeholder(
      'support.sla.uptimeTarget',
      'support',
      '',
      'Only state an uptime target if it is monitored and contractually backed.',
    ),
  },
} as const;
