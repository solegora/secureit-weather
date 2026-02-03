import React, { useState } from 'react';
import Loader from './components/Loader';
import CurrentWeather from './components/CurrentWeather';
import ForecastGrid from './components/ForecastGrid';
import './App.css';

export default function App() {

  const [selectedDay, setSelectedDay] = useState(0);
  const [loading] = useState(false);

    const mockDays = [
      { date: '2026-02-01', temp: 22, condition: 'Sunny' },
      { date: '2026-02-02', temp: 24, condition: 'Partly Cloudy' },
      { date: '2026-02-03', temp: 19, condition: 'Rain' },
      { date: '2026-02-04', temp: 21, condition: 'Sunny' },
      { date: '2026-02-05', temp: 18, condition: 'Storm' },
      { date: '2026-02-06', temp: 25, condition: 'Clear' }
    ];

  const selected = mockDays[selectedDay];

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Weather App 🌨️</h1>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <>
           <CurrentWeather data={selected} />
          <div className="section-forecast">
            <h3>Forecast</h3>   
              <ForecastGrid
              days={mockDays}
              selectedIndex={selectedDay}
              onSelect={setSelectedDay}
            /> 
          </div>
        </>
      )}
    </div>
  );
}
