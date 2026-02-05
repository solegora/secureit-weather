import { formatDateLabel } from "../services/utils/hooks/formatDateLabel";
type Props = {
  data: { date: string; temp: number; condition: string; icon: string };
};

export default function CurrentWeather({ data }: Props) {
  console.log(data,'current weather data === olly');
  return (
    <div className="card current">
      <div className="icon">
        <img src={data.icon} alt="weather icon" style={{ width: '64px', height: '64px' }} />
      </div>
      <div className="details">
        <h2>{data.temp}°</h2>
        <p>{data.condition}</p>
        <small>{formatDateLabel(data.date)}</small>
      </div>
    </div>
  );
}
