import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CurrentWeather from './libs/components/CurrentWeather';
import ForecastGrid from './libs/components/ForecastGrid';
import Loader from './libs/components/Loader';
import { fetchWeather, selectDay } from './libs/services/slices/weatherSlice';
import type { RootState } from './libs/services/store/store';

export default function App() {
  const dispatch = useDispatch();
  const { days, selectedIndex, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!days.length) return <div>No weather data yet.</div>;

  const selected = days[selectedIndex];

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Weather App 🌨️</h1>
        </header>

        <CurrentWeather data={selected} />
      <div className="section">
        <h3>Forecast</h3>
          <ForecastGrid
            days={days}
            selectedIndex={selectedIndex}
            onSelect={(i) => dispatch(selectDay(i))}
          />
        </div>
      </div>
      );
}
