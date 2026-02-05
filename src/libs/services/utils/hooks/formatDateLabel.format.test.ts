import { describe, expect, it } from 'vitest';
import { formatDateLabel } from './formatDateLabel';

describe('formatDateLabel', () => {
  it('formats a date string and returns a non-empty label', () => {
    const label = formatDateLabel('2026-02-05');
    expect(typeof label).toBe('string');
    expect(label.length).toBeGreaterThan(0);
  });

  it('accepts Date objects', () => {
    const d = new Date('2026-02-05T12:00:00Z');
    const label = formatDateLabel(d);
    expect(typeof label).toBe('string');
    expect(label.length).toBeGreaterThan(0);
  });
});
