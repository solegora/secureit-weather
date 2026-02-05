import { formatDateLabel } from '../services/utils/hooks/formatDateLabel';

type Props = {
  date: string;
  temp: number;
  condition: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
};

export default function DayTile({
  date,
  temp,
  condition,
  selected,
  icon,
  onClick
}: Props) {
  return (
    <div
      className={`tile card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="small">
        <img src={icon} alt="weather icon" style={{ width: '32px', height: '32px' }} />
      </div>
      <div className="small">{formatDateLabel(date)}</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>{temp}°</div>
      <div className="small">{condition}</div>
    </div>
  );
}
