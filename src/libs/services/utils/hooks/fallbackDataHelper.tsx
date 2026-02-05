// Default fallback icon URL (when icon is unavailable)
export const DEFAULT_ICON_URL = 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png';

// fallback mock data (7 days: 3 past + 1 current + 3 future)
export const mockWeatherData = [
  { date: '2026-02-02', temp: 20, condition: 'Cloudy', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_cloudy.png' },
  { date: '2026-02-03', temp: 19, condition: 'Rain', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0009_light_rain.png' },
  { date: '2026-02-04', temp: 21, condition: 'Sunny', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png' },
  { date: '2026-02-05', temp: 22, condition: 'Sunny', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png' }, // today
  { date: '2026-02-06', temp: 25, condition: 'Clear', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png' },
  { date: '2026-02-07', temp: 24, condition: 'Cloudy', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_cloudy.png' },
  { date: '2026-02-08', temp: 18, condition: 'Storm', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0037_thunder_storm.png' },
];


