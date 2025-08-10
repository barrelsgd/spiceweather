import { wxfcsts } from '@/lib/weather/wxfcsts';

export default function WeatherOutlookPage() {
  const outlook = wxfcsts.evening.outlook;
  const entries = Object.entries(outlook);

  return (
    <section
      aria-labelledby="outlook-title"
      className="mx-auto max-w-5xl space-y-6 p-4"
    >
      <h1 className="font-semibold text-2xl" id="outlook-title">
        Outlook
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map(([key, d]) => (
          <article
            aria-labelledby={`day-${key}`}
            className="rounded-xl border bg-card p-6 shadow"
            key={key}
          >
            <h2 className="font-medium text-lg capitalize" id={`day-${key}`}>
              {key}
            </h2>
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
        ))}
      </div>
    </section>
  );
}
