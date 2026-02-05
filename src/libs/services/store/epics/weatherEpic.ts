import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { apiBase } from '../../environment/api';
import { fetchWeather, fetchWeatherError, fetchWeatherSuccess } from '../../slices/weatherSlice';
import { DEFAULT_ICON_URL, mockWeatherData } from '../../utils/hooks/fallbackDataHelper';
import { generate7Days } from '../../utils/hooks/formatDateLabel';


let cachedWeatherData: any[] | null = null;
let cachedWeatherTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; 

const fetchWeatherEpic = (weatherAction$: any) =>
  weatherAction$.pipe(
    ofType(fetchWeather.type),
    switchMap(() => {
      const currentTimestamp = Date.now();
      if (cachedWeatherData && currentTimestamp - cachedWeatherTimestamp < CACHE_TTL_MS) {
        return of(fetchWeatherSuccess(cachedWeatherData));
      }

      const weatherStackKey = (import.meta as any).env?.VITE_WEATHERSTACK_KEY;
      const targetLocation = (import.meta as any).env?.VITE_WEATHER_LOCATION || 'Johannesburg';

      if (!weatherStackKey) {
        // If No API key provided  fallback to mock data
        cachedWeatherTimestamp = Date.now();
        cachedWeatherData = mockWeatherData;
        return of(fetchWeatherSuccess(mockWeatherData));
      }

      const apiUrl = `${apiBase}current?access_key=${weatherStackKey}&query=${encodeURIComponent(
        targetLocation
      )}`;

      return from(fetch(apiUrl)).pipe(
        switchMap((fetchResponse) => from(fetchResponse.json())),
        map((weatherResponse: any) => {
          let currentWeatherData: any = null;

          // Extract current weather data from API response
          if (weatherResponse.current) {
            const currentWeather = weatherResponse.current;
            currentWeatherData = {
              temp: currentWeather.temperature ?? currentWeather.temp ?? weatherResponse.temperature ?? 0,
              condition:
                currentWeather.weather_descriptions?.[0] || weatherResponse.weather_descriptions?.[0] || '',
              icon: currentWeather.weather_icons?.[0] || weatherResponse.weather_icons?.[0] || DEFAULT_ICON_URL,
            };
          } else if (weatherResponse.forecast && typeof weatherResponse.forecast === 'object') {
            // Try to use first forecast entry as base
            const firstForecastDate = Object.keys(weatherResponse.forecast)[0];
            const forecastData = weatherResponse.forecast[firstForecastDate];
            currentWeatherData = {
              temp: (forecastData.avgtemp ?? forecastData.avgtempC ?? forecastData.avgtempF ?? forecastData.avgtemp) || 0,
              condition: forecastData.condition ?? forecastData.weather_descriptions?.[0] ?? '',
              icon: forecastData.icon || (forecastData.weather_icons && forecastData.weather_icons[0]) || DEFAULT_ICON_URL,
            };
          } else {
            currentWeatherData = {
              temp: weatherResponse.temperature ?? weatherResponse.temp ?? 0,
              condition:
                (weatherResponse.weather_descriptions && weatherResponse.weather_descriptions[0]) ||
                weatherResponse.condition ||
                '',
              icon:
                (weatherResponse.weather_icons && weatherResponse.weather_icons[0]) ||
                weatherResponse.weather_icon ||
                DEFAULT_ICON_URL,
            };
          }

          // Improvise 7-day forecast based on current weather (since free API doesn't provide forecast)
          const sevenDayForecast = generate7Days(currentWeatherData);

          cachedWeatherData = sevenDayForecast;
          cachedWeatherTimestamp = Date.now();
          return fetchWeatherSuccess(sevenDayForecast);
        }),
        catchError((fetchError) => of(fetchWeatherError(fetchError?.message || 'Failed to fetch weather data')))
      );
    })
  );

export const rootEpic = combineEpics(fetchWeatherEpic);
