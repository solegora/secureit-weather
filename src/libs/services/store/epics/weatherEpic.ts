import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { apiBase } from '../../environment/api';
import { fetchWeather, fetchWeatherSuccess } from '../../slices/weatherSlice';
import { DEFAULT_ICON_URL, mockWeatherData } from '../../utils/hooks/fallbackDataHelper';
import { generate7Days } from '../../utils/hooks/formatDateLabel';
import { weatherCache } from '../../utils/hooks/useCache';

const fetchWeatherEpic = (weatherAction$: any) =>
  weatherAction$.pipe(
    ofType(fetchWeather.type),
    debounceTime(500), // Prevent rapid successive requests
    distinctUntilChanged(),
    switchMap(() => {
      // Check if cached data exists and is valid
      const cachedData = weatherCache.get();
      if (cachedData) {
        return of(fetchWeatherSuccess(cachedData));
      }

      const weatherStackKey = (import.meta as any).env?.VITE_WEATHERSTACK_KEY;
      const targetLocation = (import.meta as any).env?.VITE_WEATHER_LOCATION || 'Johannesburg';

      if (!weatherStackKey) {
        // If No API key provided  fallback to mock data
        weatherCache.set(mockWeatherData);
        return of(fetchWeatherSuccess(mockWeatherData));
      }

      const apiUrl = `${apiBase}current?access_key=${weatherStackKey}&query=${encodeURIComponent(
        targetLocation
      )}`;

      return from(fetch(apiUrl)).pipe(
        switchMap((fetchResponse) => {
          // Check for rate limit error (429 Too Many Requests)
          if (fetchResponse.status === 429) {
            console.warn('WeatherStack API rate limited (429). Using fallback data.');
            weatherCache.set(mockWeatherData);
            return of(fetchWeatherSuccess(mockWeatherData));
          }

          if (!fetchResponse.ok) {
            throw new Error(`API error: ${fetchResponse.status} ${fetchResponse.statusText}`);
          }

          return from(fetchResponse.json()).pipe(
            map((weatherResponse: any) => {
              // Check if API returned an error response
              if (weatherResponse.error || weatherResponse.success === false) {
                console.warn('WeatherStack API error response:', weatherResponse.error);
                throw new Error(weatherResponse.error?.info || 'API returned an error');
              }

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

              // Store in cache
              weatherCache.set(sevenDayForecast);
              return fetchWeatherSuccess(sevenDayForecast);
            }),
            catchError((fetchError) => {
              console.error('Weather fetch error:', fetchError);
              console.log('Falling back to mock weather data...');
              
              // On ANY error, use and cache mock data
              weatherCache.set(mockWeatherData);
              return of(fetchWeatherSuccess(mockWeatherData));
            })
          );
        })
      );
    })
  );

export const rootEpic = combineEpics(fetchWeatherEpic);
