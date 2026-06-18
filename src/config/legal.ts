import { confirmed, placeholder } from './confirmable';
import type { Localized } from '@/lib/types';

/**
 * Austrian legal-notice (Impressum) fields per §5 ECG, §14 UGB and §25 MedienG,
 * plus GDPR/DSGVO data-protection fields. ALL identity/registration fields are
 * placeholders until verified with the company's records and ideally a lawyer.
 * The legal pages render confirmed fields and clearly flag the rest as pending.
 */
export const legal = {
  /** Trade/legal form, e.g. "Einzelunternehmen (e.U.)" / "GmbH". */
  legalForm: placeholder<Localized>(
    'legal.legalForm',
    'legal',
    { de: 'Einzelunternehmen (e.U.)', en: 'Sole proprietorship (e.U.)' },
    'Confirm the legal form exactly as registered.',
  ),

  /** Company register number (Firmenbuchnummer), if registered. */
  companyRegisterNumber: placeholder(
    'legal.companyRegisterNumber',
    'legal',
    'FN 000000a',
    'Confirm the Firmenbuchnummer, or remove if not entered in the register.',
  ),

  /** Registry court (Firmenbuchgericht). */
  registerCourt: placeholder(
    'legal.registerCourt',
    'legal',
    'Handelsgericht Wien',
    'Confirm the competent Firmenbuchgericht.',
  ),

  /** VAT identification number (UID / USt-IdNr.). */
  vatId: placeholder(
    'legal.vatId',
    'legal',
    'ATU00000000',
    'Confirm the UID-Nummer, or state that the business is VAT-exempt (Kleinunternehmer).',
  ),

  /** Chamber membership (Wirtschaftskammer) — mandatory for most AT trades. */
  chamberMembership: placeholder<Localized>(
    'legal.chamberMembership',
    'legal',
    {
      de: 'Wirtschaftskammer Wien, Fachgruppe UBIT (IT-Dienstleistung)',
      en: 'Austrian Economic Chamber (WKO) Vienna, IT services division',
    },
    'Confirm the exact WKO membership and Fachgruppe.',
  ),

  /** Applicable trade regulations + RIS link. */
  tradeRegulations: confirmed<Localized & { url: string }>(
    'legal.tradeRegulations',
    'legal',
    {
      de: 'Gewerbeordnung (GewO)',
      en: 'Austrian Trade Act (Gewerbeordnung, GewO)',
      url: 'https://www.ris.bka.gv.at',
    },
  ),

  /** Supervisory authority (Aufsichtsbehörde / Gewerbebehörde). */
  supervisoryAuthority: placeholder<Localized>(
    'legal.supervisoryAuthority',
    'legal',
    {
      de: 'Magistratisches Bezirksamt des jeweiligen Bezirks, Wien',
      en: 'District municipal authority (Magistratisches Bezirksamt), Vienna',
    },
    'Confirm the competent Gewerbebehörde for the registered seat.',
  ),

  /** Professional title & awarding state (if a regulated profession). */
  professionalTitle: placeholder<Localized>(
    'legal.professionalTitle',
    'legal',
    {
      de: 'Berufsbezeichnung: IT-Dienstleister (verliehen in Österreich)',
      en: 'Professional title: IT service provider (awarded in Austria)',
    },
    'Confirm the official Berufsbezeichnung / Verleihungsstaat, or remove.',
  ),

  /** EU Online Dispute Resolution platform (consumer information duty). */
  odrPlatformUrl: confirmed(
    'legal.odrPlatformUrl',
    'legal',
    'https://ec.europa.eu/consumers/odr/',
  ),

  /** Person responsible for content per §25 MedienG. */
  responsibleForContent: placeholder(
    'legal.responsibleForContent',
    'legal',
    'Vorname Nachname',
    'Confirm the natural person responsible for the website content.',
  ),

  /** Whether a Datenschutzbeauftragte/r (DPO) is appointed. */
  dataProtectionOfficer: placeholder(
    'legal.dataProtectionOfficer',
    'legal',
    '',
    'State the DPO contact if one is appointed, otherwise leave intentionally empty.',
  ),

  /** Last review date of the legal texts. */
  lastReviewed: placeholder(
    'legal.lastReviewed',
    'legal',
    '2026-01-01',
    'Set the date the legal texts were last reviewed by a qualified person.',
  ),
} as const;
