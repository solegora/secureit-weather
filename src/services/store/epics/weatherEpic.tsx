import { combineEpics, ofType } from 'redux-observable';
import { delay, map, of, switchMap } from 'rxjs';
import { fetchWeather, fetchWeatherSuccess, fetchWeatherError } from '../../slices/weatherSlice';

// Mock data generator
const mockData = [
  { date: '2026-02-01', temp: 22, condition: 'Sunny' ,emoji: '☀️'},
  { date: '2026-02-02', temp: 24, condition: 'Cloudy', emoji: '☁️' },
  { date: '2026-02-03', temp: 19, condition: 'Rain', emoji: '🌧️' },
  { date: '2026-02-04', temp: 21, condition: 'Sunny', emoji: '☀️' },
  { date: '2026-02-05', temp: 18, condition: 'Storm', emoji: '⛈️' },
  { date: '2026-02-06', temp: 25, condition: 'Clear', emoji: '🌤️' },
];

const mockWeatherEpic = (action$: any) =>
  action$.pipe(
    ofType(fetchWeather.type),
    switchMap(() =>
      of(mockData).pipe(
        delay(800), // simulate API latency
        map((data) => fetchWeatherSuccess(data))
      )
    )
  );

export const rootEpic = combineEpics(mockWeatherEpic);
