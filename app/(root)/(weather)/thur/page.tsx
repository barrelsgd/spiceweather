import { wxfcsts } from '@/lib/weather/wxfcsts';

export default function WeatherThurPage() {
  const d = wxfcsts.evening.outlook.thursday;
  return (
    <section
      aria-labelledby="thur-title"
      className="mx-auto max-w-3xl space-y-6 p-4"
    >
      <h1 className="font-semibold text-2xl" id="thur-title">
        Thursday
      </h1>

      <article
        aria-label="Thursday outlook"
        className="rounded-xl border bg-card p-6 shadow"
      >
        <p className="text-muted-foreground text-sm">{d.date}</p>
        <p className="mt-2">{d.overview}</p>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Temperature</dt>
            <dd className="font-medium">
              {typeof d.temperature?.min_c === 'number'
                ? `${d.temperature.min_c}°C`
                : '--'}{' '}
              /{' '}
              {typeof d.temperature?.max_c === 'number'
                ? `${d.temperature.max_c}°C`
                : '--'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Marine</dt>
            <dd className="font-medium">
              {d.marine?.wind ?? '-'}; {d.marine?.seas ?? '-'}
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
