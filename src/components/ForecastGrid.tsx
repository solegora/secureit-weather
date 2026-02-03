import React from 'react';
import DayTile from './DayTile';


type Day = { date: string; temp: number; condition: string };

type Props = {
  days: Day[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function ForecastGrid({ days, selectedIndex, onSelect }: Props) {
  return (
    <div className="grid">
      {days.map((d, i) => (
        <DayTile
          key={d.date}
          date={d.date}
          temp={d.temp}
          condition={d.condition}
          selected={i === selectedIndex}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
