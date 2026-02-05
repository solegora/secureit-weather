import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { weatherCache } from './useCache';

describe('weatherCache', () => {
  const sample = [{ date: '2026-02-05', temp: 5 }];

  beforeEach(() => {
  });

  afterEach(() => {
    // restore
    vi.restoreAllMocks();
    // clear localStorage keys
    weatherCache.clear();
  });

  it('set and get returns stored data', () => {
    const now = 1700000000000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    // Ensure localStorage exists in the test environment (node). Provide a simple in-memory stub.
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => (store.has(k) ? (store.get(k) as string) : null),
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
      clear: () => store.clear(),
    } as any);

    weatherCache.set(sample);
    const got = weatherCache.get();
    expect(got).not.toBeNull();
    expect(got && got.length).toBe(1);
    expect(got && got[0].date).toBe(sample[0].date);
    expect(got && got[0].temp).toBe(sample[0].temp);
  });

  it('expires after TTL_MS', () => {
    const now = 1700000000000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    weatherCache.set(sample);

    // move time forward beyond TTL
    vi.spyOn(Date, 'now').mockImplementation(() => now + weatherCache.TTL_MS + 1000);
    const expired = weatherCache.get();
    expect(expired).toBeNull();
  });
});
