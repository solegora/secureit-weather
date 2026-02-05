import { describe, expect, it } from 'vitest';
import reducer, { fetchWeather, fetchWeatherError, fetchWeatherSuccess, selectDay } from './weatherSlice';

describe('weatherSlice reducer', () => {
  it('has the correct initial state', () => {
    const state = reducer(undefined as any, { type: '@@INIT' } as any);
    expect(state.loading).toBe(false);
    expect(state.days).toEqual([]);
    expect(state.selectedIndex).toBe(3);
    expect(state.error).toBeUndefined();
  });

  it('fetchWeather sets loading true', () => {
    const state1 = reducer(undefined as any, fetchWeather());
    expect(state1.loading).toBe(true);
    expect(state1.error).toBeUndefined();
  });

  it('fetchWeatherSuccess stores days and clears loading', () => {
    const sample = [{ date: '2026-02-05', temp: 25, condition: 'Sunny', icon: 'i.png' }];
    let state = reducer(undefined as any, fetchWeather());
    state = reducer(state, fetchWeatherSuccess(sample));
    expect(state.loading).toBe(false);
    expect(state.days).toEqual(sample);
  });

  it('fetchWeatherError sets error and clears loading', () => {
    let state = reducer(undefined as any, fetchWeather());
    state = reducer(state, fetchWeatherError('network'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('network');
  });

  it('selectDay updates selectedIndex', () => {
    const state = reducer(undefined as any, selectDay(5));
    expect(state.selectedIndex).toBe(5);
  });
});
