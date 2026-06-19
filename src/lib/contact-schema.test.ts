import { describe, expect, it } from 'vitest';
import { validateEnquiry, MESSAGE_MIN, type EnquiryInput } from './contact-schema';

const valid: EnquiryInput = {
  name: 'Maria Muster',
  email: 'maria@example.at',
  company: 'Muster GmbH',
  topic: 'web',
  message: 'We need a new website for our company in Vienna.',
  consent: true,
};

describe('validateEnquiry', () => {
  it('accepts a fully valid enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('flags a missing name', () => {
    expect(validateEnquiry({ ...valid, name: '  ' }).name).toBe('nameRequired');
  });

  it('flags an invalid email', () => {
    expect(validateEnquiry({ ...valid, email: 'not-an-email' }).email).toBe(
      'emailInvalid',
    );
  });

  it('flags an unknown topic', () => {
    expect(validateEnquiry({ ...valid, topic: 'nope' }).topic).toBe('topicRequired');
  });

  it('flags a too-short message', () => {
    expect(validateEnquiry({ ...valid, message: 'hi' }).message).toBe('messageTooShort');
    expect('x'.repeat(MESSAGE_MIN).length).toBe(MESSAGE_MIN);
  });

  it('requires consent', () => {
    expect(validateEnquiry({ ...valid, consent: false }).consent).toBe('consentRequired');
  });
});
