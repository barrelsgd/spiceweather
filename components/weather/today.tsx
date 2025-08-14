"use client";

import { wxfcsts } from "@/lib/weather/wxfcsts";

// Types inferred from wxfcsts usage
type Morning = typeof wxfcsts.morning;
type Evening = typeof wxfcsts.evening;
export type ForecastData = Morning | Evening;

type MorningView = {
  readonly report_date?: string;
  readonly forecaster?: string;
  readonly astronomy?: {
    readonly sunset_today?: string;
    readonly sunrise_tomorrow?: string;
  };
  readonly forecast?: {
    readonly valid_from?: string;
    readonly valid_to?: string;
    readonly overview?: string;
    readonly warning?: string;
  };
  readonly marine?: {
    readonly wind?: string;
    readonly seas?: string;
  };
  readonly temperature?: { readonly max_c?: number; readonly min_c?: number };
  readonly tides?: { readonly low_time?: string; readonly high_time?: string };
  readonly contact?: {
    readonly email?: string;
    readonly telephones?: readonly string[];
    readonly fax?: string;
    readonly website?: string;
  };
  readonly edition?: string;
  readonly likelihood?: string;
  readonly impact?: string;
  readonly response?: string;
};

export const ForecastTemplate = ({ f }: { f: MorningView }) => (
  <main className="font-sans antialiased">
    <section
      aria-labelledby="forecast-title"
      className="mx-auto max-w-5xl space-y-6 p-4"
    >
      <ForecastCard f={f} />

      {/* <LikelihoodImpactResponse f={f} /> */}
    </section>
    {/* <Header f={f} /> */}
  </main>
);

export const TodayWeather = () => {
  const f = wxfcsts.morning;

  return <ForecastTemplate f={f} />;
};

// Types inferred from wxfcsts.morning usage
type HeaderProps = { f: MorningView };
const Header = ({ f }: HeaderProps) => {
  const issuedText = f.report_date ?? "";
  const forecaster = f.forecaster ?? "";
  return (
    <header
      aria-labelledby="forecast-title"
      className="m-4 rounded-xl border bg-card p-6 shadow"
    >
      <div className="mx-auto flex max-w-5xl flex-row items-center gap-4">
        {/* Bulletin meta information */}
        <div className="grow text-center md:text-left">
          <p className="text-sm">For the State of Grenada</p>
          <p className="text-sm">
            Validity: {f.forecast?.valid_from} - {f.forecast?.valid_to}
          </p>
          <p className="text-sm">Issued: {issuedText}</p>
          {forecaster ? <p className="text-sm">By {forecaster}</p> : null}
        </div>
      </div>
    </header>
  );
};

type WarningsProps = { f: MorningView };
const Warnings = ({ f }: WarningsProps) => {
  const warning = f.forecast?.warning ?? "";
  const hasWarning = warning && warning.toLowerCase() !== "none";
  return (
    <article
      aria-labelledby="headline-warnings"
      className="gap-4 rounded-xl border bg-card p-6 shadow"
    >
      <span
        aria-label={f.marine?.seas ? "Marine conditions" : "No marine info"}
        className="items-center gap-1 rounded bg-muted px-3 py-1 text-foreground shadow"
        role="status"
      >
        🌊 {f.marine?.seas ?? "Seas information unavailable"}
      </span>
    </article>
  );
};

// Forecast summary card
type ForecastCardProps = { f: MorningView };
const ForecastCard = ({ f }: ForecastCardProps) => {
  return (
    <article
      aria-labelledby="headline-summary"
      className="rounded-xl border bg-card p-6 shadow"
    >
      {/* Headline summary */}
      <div className="mb-6 flex items-start gap-4 text-foreground">
        <div aria-hidden className="grid grid-cols-2 gap-2">
          <div className="grid h-14 w-14 place-content-center rounded bg-muted text-xl">
            🌤️
          </div>
        </div>
        <p className="text-balance text-lg leading-relaxed">
          {f.forecast?.overview}
        </p>
      </div>

      {/* Key stats */}

      <div>
        <dt className="text-muted-foreground text-sm">Air Temperature</dt>
        <dd className="font-medium text-xl">
          {typeof f.temperature?.min_c === "number"
            ? `${f.temperature.min_c}–${f.temperature.max_c ?? ""}°C`
            : typeof f.temperature?.max_c === "number"
              ? `${f.temperature.max_c}°C`
              : "—"}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-sm">Wind</dt>
        <dd className="font-medium text-xl">{f.marine?.wind ?? "—"}</dd>
      </div>

      {/* Marine & Tides */}

      <SunCard f={f} />
      <TideCard f={f} />

      <Warnings f={f} />
    </article>
  );
};

// Astro/Tide summary cards

type AstroTideProps = { f: MorningView };
const SunCard = ({ f }: AstroTideProps) => (
  <div className="grid grid-cols-2 items-center gap-4 rounded-lg border bg-card p-4 shadow">
    <figure className="text-center">
      <figcaption className="text-slate-600 text-xs">Sunset</figcaption>
      <div aria-label="sunset" className="text-2xl" role="img">
        �
      </div>
      <p className="font-medium text-lg">
        {f.astronomy?.sunset_today ?? f.astronomy?.sunset_today ?? "—"}
      </p>
    </figure>
    <figure className="text-center">
      <figcaption className="text-slate-600 text-xs">
        Sunrise (tomorrow)
      </figcaption>
      <div aria-label="sunrise" className="text-2xl" role="img">
        �
      </div>
      <p className="font-medium text-lg">
        {f.astronomy?.sunrise_tomorrow ?? f.astronomy?.sunrise_tomorrow ?? "—"}
      </p>
    </figure>
  </div>
);

const TideCard = ({ f }: AstroTideProps) => (
  <div className="grid grid-cols-2 items-center gap-4 rounded-lg border bg-card p-4 shadow">
    <figure className="text-center">
      <figcaption className="text-slate-600 text-xs">High Tide</figcaption>
      <div aria-label="high tide" className="text-2xl" role="img">
        🌊⬆️
      </div>
      <p className="font-medium text-lg">{f.tides?.high_time ?? "—"}</p>
    </figure>
    <figure className="text-center">
      <figcaption className="text-slate-600 text-xs">Low Tide</figcaption>
      <div aria-label="low tide" className="text-2xl" role="img">
        🌊⬇️
      </div>
      <p className="font-medium text-lg">{f.tides?.low_time ?? "—"}</p>
    </figure>
  </div>
);

// Likelihood, Impact, Response panels

type PanelProps = { title: string; items: string[] };
const InfoPanel = ({ title, items }: PanelProps) => (
  <div>
    <h3 className="rounded-t-md bg-muted px-4 py-2 font-bold text-foreground text-sm uppercase tracking-wider">
      {title}
    </h3>
    <ul className="list-inside list-disc rounded-b-md border bg-card px-6 py-3 text-foreground text-sm">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </div>
);

type LikelihoodImpactResponseProps = { f: MorningView };
const LikelihoodImpactResponse = ({ f }: LikelihoodImpactResponseProps) => {
  const likelihood = f.likelihood ?? "High";
  const impact = f.impact ?? "Minimal";
  const response = f.response ?? "No Action";
  return (
    <section
      aria-label="Likelihood, impact and recommended response"
      className="space-y-6 rounded-xl border bg-card p-6 shadow"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <InfoPanel items={[likelihood]} title="Likelihood" />
        <InfoPanel items={[impact]} title="Impact" />
        <InfoPanel items={[response]} title="Response" />
      </div>
    </section>
  );
};
