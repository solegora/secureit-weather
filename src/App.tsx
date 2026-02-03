import React, { useState } from 'react';
import Loader from './components/Loader';

export default function App() {

  const [loading] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Weather App </h1>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="section-forecast">
            <h3>Forecast</h3>    
          </div>
        </>
      )}
    </div>
  );
}
