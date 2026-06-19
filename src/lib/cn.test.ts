import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins truthy values and drops falsy ones', () => {
    expect(cn('a', false, 'b', null, undefined, 'c')).toBe('a b c');
  });

  it('flattens nested arrays', () => {
    expect(cn('a', ['b', false, ['c']])).toBe('a b c');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});
