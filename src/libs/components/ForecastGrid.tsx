import DayTile from './DayTile';

type Day = { date: string; temp: number; condition: string; icon: string };

type Props = {
  days: Day[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function ForecastGrid({ days, selectedIndex, onSelect }: Props) {
  return (
    <div className="grid">
      {days.map((data, index) => (
        <DayTile
          key={data.date}
          date={data.date}
          temp={data.temp}
          condition={data.condition}
          icon={data.icon}
          selected={index === selectedIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
