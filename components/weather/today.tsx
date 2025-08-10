"use client";

import { wxfcsts } from "@/lib/weather/wxfcsts";

export const TodayWeather = () => {
  const f = wxfcsts.morning;

  return (
    <div
      role="region"
      aria-label="Today's weather"
      className="mx-auto max-w-md space-y-6 md:max-w-2xl lg:max-w-4xl"
    >
      {/* Summary pill */}
      <div className="flex w-full justify-center">
        <div
          role="status"
          aria-live="polite"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-4 py-1.5"
        >
          <span className="text-sm font-medium">
            Today’s Forecast • {f.report_date}
          </span>
        </div>
      </div>

      {/* Overview */}
      <section aria-labelledby="today-overview" className="space-y-4">
        <h2 id="today-overview" className="text-xl font-medium">
          Overview
        </h2>
        <article
          className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
          aria-label="Forecast overview"
        >
          <p className="text-sm text-muted-foreground">
            Valid {f.forecast.valid_from}–{f.forecast.valid_to}
          </p>
          <p className="mt-2 text-base">{f.forecast.overview}</p>
          {f.forecast.warning && f.forecast.warning.toLowerCase() !== "none" ? (
            <p className="mt-3 text-sm font-medium text-amber-700 dark:text-amber-400">
              Warning: {f.forecast.warning}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No warnings</p>
          )}
        </article>
      </section>

      {/* Marine */}
      <section aria-labelledby="today-marine" className="space-y-4">
        <h2 id="today-marine" className="text-xl font-medium">
          Marine
        </h2>
        <article
          className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
          aria-label="Marine conditions"
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">Wind</dt>
              <dd className="text-base font-medium">{f.marine.wind}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">Seas</dt>
              <dd className="text-base font-medium">{f.marine.seas}</dd>
            </div>
          </dl>
        </article>
      </section>

      {/* Temperature */}
      <section aria-labelledby="today-temps" className="space-y-4">
        <h2 id="today-temps" className="text-xl font-medium">
          Temperature
        </h2>
        <article
          className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
          aria-label="Temperatures"
        >
          <p className="text-base">
            Max: <span className="font-medium">{f.temperature.max_c}°C</span>
          </p>
        </article>
      </section>

      {/* Astronomy & Tides */}
      <section aria-labelledby="today-astro-tides" className="space-y-4">
        <h2 id="today-astro-tides" className="text-xl font-medium">
          Astronomy & Tides
        </h2>
        <article
          className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
          aria-label="Astronomy and tides"
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">Sunset (today)</dt>
              <dd className="text-base font-medium">{f.astronomy.sunset_today}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">Sunrise (tomorrow)</dt>
              <dd className="text-base font-medium">{f.astronomy.sunrise_tomorrow}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">Low Tide</dt>
              <dd className="text-base font-medium">{f.tides.low_time}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm text-muted-foreground">High Tide</dt>
              <dd className="text-base font-medium">{f.tides.high_time}</dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  );
};
