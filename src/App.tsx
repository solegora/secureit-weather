import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './services/store/store';
import { fetchWeather, selectDay } from './services/slices/weatherSlice';
import CurrentWeather from './components/CurrentWeather';
import ForecastGrid from './components/ForecastGrid';
import Loader from './components/Loader';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { days, selectedIndex, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  console.log(days,'days === olly');

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
