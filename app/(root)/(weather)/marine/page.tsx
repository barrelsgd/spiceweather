import { marineBulletin } from '@/lib/weather/marine';

export default function WeatherMarinePage() {
  const m = marineBulletin;
  return (
    <section
      aria-labelledby="marine-title"
      className="mx-auto max-w-5xl space-y-6 p-4"
    >
      <h1 className="font-semibold text-2xl" id="marine-title">
        Marine Bulletin
      </h1>

      <article
        aria-label="Synopsis"
        className="rounded-xl border bg-card p-6 shadow"
      >
        <h2 className="font-medium text-lg">Synopsis</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Issued {m.issued_at} • Status {m.status_color}
        </p>
        <p className="mt-2">{m.synopsis}</p>
      </article>

      <article
        aria-label="Conditions"
        className="rounded-xl border bg-card p-6 shadow"
      >
        <h2 className="font-medium text-lg">Conditions</h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Weather</dt>
            <dd className="font-medium">{m.weather}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Wind</dt>
            <dd className="font-medium">{m.wind}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Sea State</dt>
            <dd className="font-medium">{m.sea_state}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Visibility</dt>
            <dd className="font-medium">{m.visibility}</dd>
          </div>
        </dl>
      </article>

      <article
        aria-label="Astronomy & Tides"
        className="rounded-xl border bg-card p-6 shadow"
      >
        <h2 className="font-medium text-lg">Astronomy & Tides</h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Sunrise</dt>
            <dd className="font-medium">{m.sun.sunrise}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Sunset</dt>
            <dd className="font-medium">{m.sun.sunset}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">High Tide</dt>
            <dd className="font-medium">{m.tide.high_time}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Low Tide</dt>
            <dd className="font-medium">{m.tide.low_time}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
