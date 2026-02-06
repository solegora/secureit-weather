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
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
    >
      <img src={icon} alt={condition} />
      <div className="small">{formatDateLabel(date)}</div>
      <div className="tile-temp">{Math.round(temp)}°</div>
      <div className="tile-condition">{condition}</div>
    </div>
  );
}
