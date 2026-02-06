# 🌦️ SecureIT Weather App

A modern, fully-typed weather application built with **React**, **TypeScript**, **Redux Toolkit**, and **RxJS**. Features a beautiful, interactive UI with smooth animations, glass-morphism design, and persistent caching.

---

##  Design & UX Features

### Visual Design
- **Modern Gradient Theme**: Beautiful purple and pink gradient color scheme with dark background
- **Glass-Morphism**: Frosted glass effect with backdrop blur on all cards
- **Smooth Animations**: 
  - Slide-down header animation on page load
  - Fade-in-up section animations
  - Bounce and sway animations on weather icons
  - Smooth hover transitions and transforms
  - Pop-in checkmark animation on selected tiles
  - Expand width animation on section underlines

### Interactive Elements
- **Hover Effects**: Cards lift up with enhanced shadows on hover
- **Active States**: Tiles scale and provide visual feedback on click
- **Selected Indicator**: Animated checkmark appears on selected day tiles
- **Responsive Glow**: Components glow with gradient colors on interaction
- **Loading Spinner**: Smooth rotating spinner with pulsing text

### Responsive Design
- Mobile-first approach with breakpoints for tablets (900px) and phones (700px, 480px)
- Touch-friendly tile sizes
- Adaptive grid layout that adjusts columns based on screen size
- Optimized typography for all screen sizes

---

##  Features Implemented

- **Live Weather Display**  
  Fetches current weather data from WeatherStack API and displays temperature, weather condition, and icon.

- **7-Day Forecast View**  
  Generates a 7-day forecast (3 past days + current + 3 future days) with selectable day tiles and detailed weather for each day.

- **Reactive Architecture with Redux Toolkit + RxJS**  
  Leverages `redux-observable` epics for handling async weather API calls with proper state management and side effects.

- **Smart Caching System**  
  Implements a 5-minute TTL cache to minimize redundant API requests and improve performance.

- **Fallback & Error Handling**  
  Gracefully handles missing API keys by falling back to mock data; includes styled error messages with retry buttons.

- **Fully Typed with TypeScript**  
  Strict typing throughout slices, epics, hooks, and components for type safety and better DX.

---

##  Tech Stack

| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **State Management** | Redux Toolkit + redux-observable |
| **Async/Side Effects** | RxJS |
| **Styling** | Modern CSS with Animations & Glass-morphism |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint + TypeScript ESLint |
| **API Source** | WeatherStack API |



### State Management Flow

App Component
    ↓
useDispatch(fetchWeather)
    ↓
Redux Slice (weatherSlice)
    ↓
RxJS Epic (weatherEpic)
    ↓
WeatherStack API / Fallback Data
    ↓
Cache Layer (5-min TTL)
    ↓
fetchWeatherSuccess Action
    ↓
Redux Store Update
    ↓
UI Re-render via useSelector


### Key Components

- **App.tsx**: Main component that dispatches `fetchWeather` on mount, manages loading/error/selected day states
- **CurrentWeather.tsx**: Displays the selected day's weather details (temperature, condition, formatted date, icon)
- **ForecastGrid.tsx**: Renders a grid of day tiles and handles day selection
- **DayTile.tsx**: Individual day forecast tile with click handler for day selection
- **Loader.tsx**: Simple loading indicator displayed while fetching data

### Redux Slice (weatherSlice.tsx)

Manages the weather state with the following actions:
- `fetchWeather`: Initiates the weather fetch (sets loading = true)
- `fetchWeatherSuccess`: Updates state with fetched 7-day forecast data
- `fetchWeatherError`: Captures any fetch errors
- `selectDay`: Updates the selected day index for detail view

### RxJS Epic (weatherEpic.ts)

Handles async operations using `weatherCache` utility:
1. **Listens** for `fetchWeather` actions
2. **Checks localStorage cache** via `weatherCache.get()` for valid data (within 5-minute TTL window)
3. **Returns cached data** immediately if valid, otherwise **fetches** from WeatherStack API
4. **Falls back** to mock data if no API key is configured
5. **Transforms** API response to a 7-day forecast format
6. **Updates localStorage cache** via `weatherCache.set()` on successful fetch
7. **Dispatches** success or error action accordingly

### Caching Strategy

- Cache TTL: **5 minutes** (300,000 ms)
- Stored persistently in **localStorage** via `weatherCache` utility from `useCache.ts`
- Cache stored under keys:
  - `weather_forecast_data`: Serialized weather forecast array
  - `weather_forecast_timestamp`: Timestamp of when cache was last updated
- Automatically expires and clears if TTL is exceeded
- Returns cached data without making API calls if within TTL window
- Survives browser session restarts (data persists across refreshes)

### Fallback Data

- If `VITE_WEATHERSTACK_KEY` is not provided, the app uses **mock weather data** (`mockWeatherData`) from `fallbackDataHelper.tsx`
- Mock data includes 7 days of sample weather with realistic temperatures and conditions
- Ensures the app remains functional without a valid API key


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/solegora/secureit-weather.git
cd secureit-weather
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
VITE_WEATHERSTACK_KEY=your_weatherstack_api_key_here
VITE_WEATHER_LOCATION=Johannesburg
```

**For free tier API keys:**
- Get a free API key from [WeatherStack](https://weatherstack.com/)
- Default location is `Johannesburg` if not specified
- Without the API key, the app will use mock data

### 4. Available Scripts

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linting
npm run lint
```

##  How It Works

1. **App boots up** → `App.tsx` renders with loading state
2. **useEffect dispatches** `fetchWeather()` action on component mount
3. **Redux epic** intercepts the action and:
   - Checks cache for valid data
   - If cache hit: returns cached data immediately
   - If cache miss: fetches from WeatherStack API (or returns mock data if no API key)
4. **API response** is transformed into 7-day forecast format
5. **Dispatch success** → State updates with weather data
6. **UI re-renders** with:
   - Current weather display (CurrentWeather component)
   - 7-day forecast grid (ForecastGrid component)
   - Selected day details from forecast
7. **User can click** day tiles to select different days and view their details


##  Testing

Tests are included for:

- **weatherSlice.test.ts**: Redux reducer and action tests
- **formatDateLabel.test.ts**: Date formatting utility tests
- **formatDateLabel.format.test.ts**: Additional format validation tests
- **cache.test.ts**: Cache behavior and TTL tests

Run tests with:

```bash
npx vitest run

