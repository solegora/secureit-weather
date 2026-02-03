import React from 'react';
import { formatDateLabel } from '../services/hooks/formatDateLabel';

type Props = {
  date: string;
  temp: number;
  condition: string;
  selected: boolean;
  onClick: () => void;
};

export default function DayTile({
  date,
  temp,
  condition,
  selected,
  onClick
}: Props) {
  return (
    <div
      className={`tile card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="small">{formatDateLabel(date)}</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>{temp}°</div>
      <div className="small">{condition}</div>
    </div>
  );
}
