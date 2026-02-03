import React from 'react';
import { formatDateLabel } from '../services/utils/hooks/formatDateLabel';

type Props = {
  data: { date: string; temp: number; condition: string ; emoji: string;};
};

export default function CurrentWeather({ data }: Props) {
  return (
    <div className="card current">
      <div className="icon">
        <span role="img" aria-label="weather">
          {data.emoji}

        </span>
      </div>
      <div className="details">
        <h2>{data.temp}°</h2>
        <p>{data.condition}</p>
        <small>{formatDateLabel(data.date)}</small>
      </div>
    </div>
  );
}
