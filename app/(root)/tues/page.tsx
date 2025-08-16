import { ForecastTemplate } from '@/components/weather/today';
import { wxfcsts } from '@/lib/weather/wxfcsts';

export default function WeatherTuesPage() {
  return <ForecastTemplate f={wxfcsts.evening} />;
}
