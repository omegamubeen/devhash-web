import { describe, expect, it, vi } from 'vitest';
import {
  confirmed,
  placeholder,
  reveal,
  isPlaceholder,
  getUnconfirmedFacts,
} from './confirmable';

describe('confirmable facts', () => {
  it('confirmed facts reveal their value', () => {
    const fact = confirmed('test.confirmed', 'company', 'real');
    expect(fact.status).toBe('confirmed');
    expect(reveal(fact)).toBe('real');
    expect(isPlaceholder(fact)).toBe(false);
  });

  it('placeholder facts are flagged and listed as unconfirmed', () => {
    const fact = placeholder('test.placeholder', 'contact', 'stand-in', 'replace me');
    expect(fact.status).toBe('placeholder');
    expect(isPlaceholder(fact)).toBe(true);
    expect(getUnconfirmedFacts().some((f) => f.id === 'test.placeholder')).toBe(true);
  });

  it('throws on duplicate ids', () => {
    confirmed('test.dupe', 'company', 1);
    expect(() => confirmed('test.dupe', 'company', 2)).toThrow(/Duplicate/);
  });

  it('hides placeholders in production but keeps confirmed values', async () => {
    vi.resetModules();
    vi.stubEnv('NODE_ENV', 'production');
    const mod = await import('./confirmable');
    const ph = mod.placeholder('prod.placeholder', 'legal', 'secret', 'note');
    const ok = mod.confirmed('prod.confirmed', 'legal', 'public');
    expect(mod.reveal(ph)).toBeNull();
    expect(mod.reveal(ok)).toBe('public');
    vi.unstubAllEnvs();
    vi.resetModules();
  });
});
