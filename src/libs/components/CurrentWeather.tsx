import { formatDateLabel } from "../services/utils/hooks/formatDateLabel";

type Props = {
  data: { date: string; temp: number; condition: string; icon: string };
};

export default function CurrentWeather({ data }: Props) {
  return (
    <div className="card current">
      <div className="icon">
        <img src={data.icon} alt={data.condition} />
      </div>
      <div className="details">
        <h2>{Math.round(data.temp)}°</h2>
        <p>{data.condition}</p>
        <small>{formatDateLabel(data.date)}</small>
      </div>
    </div>
  );
}
