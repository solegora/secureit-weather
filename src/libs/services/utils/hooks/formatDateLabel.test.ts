import { describe, expect, it } from 'vitest';
import { generate7Days } from './formatDateLabel';

describe('generate7Days', () => {
  it('returns 7 days and centers on provided current data', () => {
    const center = { temp: 20, condition: 'Clear', icon: 'icon.png' };
    const days = generate7Days(center);
    expect(days).toHaveLength(7);
    // middle element (index 3) should be the center/today
    expect(days[3].temp).toBe(Math.round(center.temp));
    expect(days[3].condition).toBe(center.condition);
    expect(days[3].icon).toBe(center.icon);
  });
  it('produces monotonically increasing dates and unique entries', () => {
    const center = { temp: 15, condition: 'Cloudy', icon: 'i.png' };
    const days = generate7Days(center);
    const dates = days.map((d) => d.date);
    // Ensure 7 unique dates
    const unique = new Set(dates);
    expect(unique.size).toBe(7);

    // Ensure dates are in ascending order
    for (let i = 1; i < dates.length; i++) {
      expect(new Date(dates[i]).getTime()).toBeGreaterThan(new Date(dates[i - 1]).getTime());
    }
  });

  it('temperature values are numbers and reasonably close to center', () => {
    const center = { temp: 10, condition: 'Snow', icon: 'i.png' };
    const days = generate7Days(center);
    days.forEach((d) => {
      expect(typeof d.temp).toBe('number');
      expect(d.temp).toBeGreaterThanOrEqual(center.temp - 6);
      expect(d.temp).toBeLessThanOrEqual(center.temp + 6);
    });
  });
});
