"use client";

import { useId } from "react";
import { usePathname, useRouter } from "next/navigation";

// Types
export type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type CurrentConditions = {
  temperatureC: number;
  windKts: number;
  humidityPct: number;
  pressureHpa: number;
  description: string;
};

export type HourlyForecastItem = {
  timeIso: string;
  temperatureC: number;
  precipitationMm?: number;
  precipPct?: number;
  icon?: string;
  summary?: string;
};

export type DailyForecastItem = {
  dateIso: string;
  minC: number;
  maxC: number;
  icon?: string;
  summary?: string;
};

export type AlertItem = {
  id: string;
  title: string;
  severity: "minor" | "moderate" | "severe" | "extreme";
  startsAtIso?: string;
  endsAtIso?: string;
  description?: string;
  source?: string;
};

export type WeatherMetrics = {
  precipitationPct?: number;
  rainIn?: number;
  feelsLikeC?: number;
  pressureInHg?: number;
  dewPointC?: number;
  humidityPct?: number;
  uvIndex?: number;
  visibilityMi?: number;
  cloudCoverPct?: number;
  windText?: string;
  sunriseIso?: string;
  sunsetIso?: string;
  airQualityText?: string;
  aqi?: number;
};

// Small building blocks
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section
    aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    className="space-y-4"
  >
    <h2
      id={title.replace(/\s+/g, "-").toLowerCase()}
      className="text-xl font-medium"
    >
      {title}
    </h2>
    {children}
  </section>
);

const KeyValue = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="text-base font-medium">{value}</dd>
  </div>
);

// Top chips (Current Location | Selected | + Add)
const Chip = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="rounded-full border bg-secondary px-3 py-1 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
  >
    {label}
  </button>
);

const LocationChips = () => (
  <nav aria-label="Location quick actions" className="mt-2">
    <ul className="flex flex-wrap items-center gap-2">
      <li>
        <Chip label="Current Location" />
      </li>
      <li>
        <Chip label="St. George's" />
      </li>
      <li>
        <Chip label="+ Add Location" />
      </li>
    </ul>
  </nav>
);

const LocationTitle = ({ name }: { name: string }) => (
  <div className="text-center">
    <p className="text-sm text-muted-foreground">
      <strong className="font-medium text-foreground">{name}</strong>
    </p>
  </div>
);

const TemperatureSummary = ({
  tempC,
  minC,
  maxC,
  condition,
}: {
  tempC: number;
  minC: number;
  maxC: number;
  condition: string;
}) => (
  <section aria-label="Temperature summary" className="text-center space-y-2">
    <div
      aria-label="min-max"
      className="flex items-center justify-center gap-3 text-muted-foreground"
    >
      <span>{`${Math.round(minC)}°`}</span>
      <span aria-hidden>•</span>
      <span>{`${Math.round(maxC)}°`}</span>
    </div>
    <div>
      <p
        aria-live="polite"
        aria-atomic="true"
        aria-label="Current temperature"
        className="text-7xl font-semibold leading-none md:text-8xl"
      >
        {`${Math.round(tempC)}°`}
      </p>
      <p className="text-lg text-muted-foreground">{condition}</p>
    </div>
  </section>
);

const Narrative = ({ text }: { text: string }) => (
  <p className="text-sm text-muted-foreground md:text-base">
    <strong className="mr-2 text-foreground">Next 6 Hours</strong>
    {text}
  </p>
);

const SegmentedControl = ({
  value,
  onChange,
  segments,
}: {
  value: string;
  onChange?: (value: string) => void;
  segments: string[];
}) => (
  <div
    role="tablist"
    aria-label="Forecast range"
    className="mx-auto inline-flex rounded-full bg-muted p-1"
  >
    {segments.map((s) => (
      <button
        type="button"
        role="tab"
        aria-selected={value === s}
        key={s}
        onClick={() => onChange?.(s)}
        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
          value === s
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {s}
      </button>
    ))}
  </div>
);

const HourlyStrip = ({ items }: { items: HourlyForecastItem[] }) => (
  <Section title="Hourly">
    <ul
      aria-label="Hourly forecast strip"
      className="flex gap-3 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none]"
    >
      {items.map((h) => (
        <li
          key={h.timeIso}
          className="min-w-[72px] rounded-lg border bg-card/60 p-2 text-center backdrop-blur-sm"
        >
          <div>
            <span className="text-lg font-medium">{`${Math.round(h.temperatureC)}°`}</span>
          </div>
          <div>
            <time
              className="text-xs text-muted-foreground"
              dateTime={h.timeIso}
            >
              {new Date(h.timeIso).toLocaleTimeString([], { hour: "numeric" })}
            </time>
          </div>
          <div>
            {typeof h.precipPct === "number" ? (
              <span className="text-xs text-blue-600 dark:text-blue-400">{`${Math.round(h.precipPct)}%`}</span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="text-base font-medium">{value}</dd>
  </div>
);

const MetricsCard = ({ m }: { m: WeatherMetrics }) => (
  <Section title="">
    <article
      className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
      aria-label="Current details"
    >
      <h3 className="mb-2 text-base font-medium">Fair</h3>
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {typeof m.precipitationPct === "number" && (
          <MetricRow
            label="Precipitation"
            value={`${Math.round(m.precipitationPct)}%`}
          />
        )}
        {typeof m.rainIn === "number" && (
          <MetricRow label="Rain" value={`${m.rainIn.toFixed(1)} in`} />
        )}
        {typeof m.feelsLikeC === "number" && (
          <MetricRow
            label="Feels Like"
            value={`${Math.round(m.feelsLikeC)}°`}
          />
        )}
        {typeof m.pressureInHg === "number" && (
          <MetricRow
            label="Pressure"
            value={`${m.pressureInHg.toFixed(2)} inHg`}
          />
        )}
        {typeof m.dewPointC === "number" && (
          <MetricRow label="Dew Point" value={`${Math.round(m.dewPointC)}°`} />
        )}
        {typeof m.humidityPct === "number" && (
          <MetricRow label="Humidity" value={`${Math.round(m.humidityPct)}%`} />
        )}
        {typeof m.uvIndex === "number" && (
          <MetricRow label="UV Index" value={`${m.uvIndex}`} />
        )}
        {typeof m.visibilityMi === "number" && (
          <MetricRow label="Visibility" value={`${m.visibilityMi} mi`} />
        )}
        {typeof m.cloudCoverPct === "number" && (
          <MetricRow
            label="Cloud Cover"
            value={`${Math.round(m.cloudCoverPct)}%`}
          />
        )}
        {m.windText && <MetricRow label="Wind" value={m.windText} />}
        {m.sunriseIso && (
          <MetricRow
            label="Sunrise"
            value={new Date(m.sunriseIso).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          />
        )}
        {m.sunsetIso && (
          <MetricRow
            label="Sunset"
            value={new Date(m.sunsetIso).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          />
        )}
        {m.airQualityText && (
          <MetricRow label="Air Quality" value={m.airQualityText} />
        )}
        {typeof m.aqi === "number" && (
          <MetricRow label="AQI" value={`${m.aqi}`} />
        )}
      </dl>
    </article>
  </Section>
);

// Location selector
const LocationSelector = ({
  locations,
  selectedId,
  onChange,
}: {
  locations: Location[];
  selectedId?: string;
  onChange: (id: string) => void;
}) => {
  const selectId = useId();
  return (
    <form aria-label="Select location">
      <label htmlFor={selectId}>Location</label>
      <select
        id={selectId}
        name="location"
        value={selectedId ?? locations[0]?.id ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
    </form>
  );
};

// Current conditions card
const CurrentConditionsCard = ({ data }: { data: CurrentConditions }) => (
  <article aria-label="Current conditions">
    <h3>Now</h3>
    <p>{data.description}</p>
    <dl>
      <KeyValue
        label="Temperature"
        value={`${data.temperatureC.toFixed(1)}°C`}
      />
      <KeyValue label="Wind" value={`${data.windKts.toFixed(0)} kt`} />
      <KeyValue label="Humidity" value={`${data.humidityPct.toFixed(0)}%`} />
      <KeyValue label="Pressure" value={`${data.pressureHpa.toFixed(0)} hPa`} />
    </dl>
  </article>
);

// Hourly forecast
const HourlyForecast = ({ items }: { items: HourlyForecastItem[] }) => (
  <Section title="Hourly forecast">
    <ul>
      {items.map((h) => (
        <li key={h.timeIso}>
          <time dateTime={h.timeIso}>
            {new Date(h.timeIso).toLocaleTimeString()}
          </time>
          <span>{`${h.temperatureC.toFixed(0)}°C`}</span>
          {typeof h.precipitationMm === "number" ? (
            <span>{`${h.precipitationMm.toFixed(1)} mm`}</span>
          ) : null}
          {h.summary ? <span>{h.summary}</span> : null}
        </li>
      ))}
    </ul>
  </Section>
);

// Daily forecast
const DailyForecast = ({ items }: { items: DailyForecastItem[] }) => (
  <Section title="Daily forecast">
    <ul>
      {items.map((d) => (
        <li key={d.dateIso}>
          <time dateTime={d.dateIso}>
            {new Date(d.dateIso).toLocaleDateString()}
          </time>
          <span>{`${d.minC.toFixed(0)}° / ${d.maxC.toFixed(0)}°`}</span>
          {d.summary ? <span>{d.summary}</span> : null}
        </li>
      ))}
    </ul>
  </Section>
);

// Alerts
const AlertsPanel = ({ items }: { items: AlertItem[] }) => (
  <Section title="Alerts">
    {items.length === 0 ? (
      <p>No active alerts.</p>
    ) : (
      <ul>
        {items.map((a) => (
          <li key={a.id}>
            <article aria-labelledby={`alert-${a.id}`}>
              <h3 id={`alert-${a.id}`}>{a.title}</h3>
              {a.severity ? <p>Severity: {a.severity}</p> : null}
              {a.startsAtIso ? (
                <p>
                  Starts:{" "}
                  <time dateTime={a.startsAtIso}>
                    {new Date(a.startsAtIso).toLocaleString()}
                  </time>
                </p>
              ) : null}
              {a.endsAtIso ? (
                <p>
                  Ends:{" "}
                  <time dateTime={a.endsAtIso}>
                    {new Date(a.endsAtIso).toLocaleString()}
                  </time>
                </p>
              ) : null}
              {a.description ? <p>{a.description}</p> : null}
              {a.source ? <p>Source: {a.source}</p> : null}
            </article>
          </li>
        ))}
      </ul>
    )}
  </Section>
);

// Radar / map placeholder
const RadarMap = () => (
  <Section title="Radar">
    <div className="rounded-xl border bg-card/60 p-3 backdrop-blur-sm">
      <figure className="grid aspect-video w-full place-content-center overflow-hidden rounded-lg bg-muted">
        <svg role="img" aria-labelledby="radar-title" className="h-full w-full">
          <title id="radar-title">Radar placeholder</title>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="currentColor"
            className="text-muted-foreground/20"
          />
        </svg>
        <figcaption className="sr-only">
          Radar preview will appear here.
        </figcaption>
      </figure>
    </div>
  </Section>
);

// Footer notes
const WeatherFooter = () => (
  <footer className="py-4 text-center">
    <small className="text-xs text-muted-foreground">
      Data sources and disclaimers go here.
    </small>
  </footer>
);

// Main composition
export const Weather = () => {
  // Placeholder demo data so the layout renders without backend wiring.
  const locations: Location[] = [
    { id: "gnd", name: "Grenada", latitude: 12.05, longitude: -61.75 },
    { id: "carriacou", name: "Carriacou", latitude: 12.48, longitude: -61.46 },
  ];

  const current: CurrentConditions = {
    temperatureC: 27.2,
    windKts: 11,
    humidityPct: 74,
    pressureHpa: 1012,
    description: "Fair",
  };

  const minC = 26;
  const maxC = 31;
  const narrative = "Partly cloudy. Lows overnight in the upper 70s.";

  const hourly: HourlyForecastItem[] = Array.from({ length: 8 }).map((_, i) => {
    const now = new Date();
    now.setHours(now.getHours() + i);
    return {
      timeIso: now.toISOString(),
      temperatureC: 27 + (i > 2 ? -1 : 0),
      precipPct: [1, 7, 6, 8, 9, 2, 1, 1][i],
    };
  });

  const metrics: WeatherMetrics = {
    precipitationPct: 0,
    rainIn: 0.0,
    feelsLikeC: 31.6,
    pressureInHg: 29.98,
    dewPointC: 24,
    humidityPct: 83,
    uvIndex: 0,
    visibilityMi: 6.0,
    cloudCoverPct: 59,
    windText: "ESE 13 mph",
    sunriseIso: new Date(new Date().setHours(5, 55, 0, 0)).toISOString(),
    sunsetIso: new Date(new Date().setHours(18, 29, 0, 0)).toISOString(),
    airQualityText: "Good",
    aqi: 1,
  };

  const alerts: AlertItem[] = [];

  const router = useRouter();
  const pathname = usePathname();

  // Derive active tab from pathname
  const tabFromPath = () => {
    if (!pathname) return "Hourly";
    const parts = pathname.split("/").filter(Boolean);
    // Expecting paths like /weather, /weather/today, /weather/tues, ...
    if (parts[0] !== "weather" || parts.length === 1) return "Hourly";
    const slug = parts[1]?.toLowerCase();
    switch (slug) {
      case "today":
        return "Today";
      case "tues":
        return "Tues";
      case "wed":
        return "Wed";
      case "thur":
        return "Thur";
      case "outlook":
        return "Outlook";
      case "marine":
        return "Marine";
      default:
        return "Hourly";
    }
  };

  const activeTab = tabFromPath();

  return (
    <div
      role="region"
      aria-label="Weather layout"
      className="mx-auto max-w-md space-y-6 md:max-w-2xl lg:max-w-4xl"
    >
      <AlertsPanel items={alerts} />
      <div className="flex justify-center">
        <SegmentedControl
          value={activeTab}
          onChange={(s) => {
            if (s === "Hourly") {
              router.push("/weather");
              return;
            }
            const slug = s.toLowerCase();
            router.push(`/weather/${slug}`);
          }}
          segments={[
            "Hourly",
            "Today",
            "Tues",
            "Wed",
            "Thur",
            "Outlook",
            "Marine",
          ]}
        />
      </div>

      {/* <LocationChips /> */}
      <LocationTitle name={"St. George's, Grenada"} />

      <TemperatureSummary
        tempC={current.temperatureC}
        minC={minC}
        maxC={maxC}
        condition={current.description}
      />

      <Narrative text={narrative} />

      {/* <HourlyStrip items={hourly} /> */}

      <MetricsCard m={metrics} />

      <RadarMap />

      <WeatherFooter />
    </div>
  );
};
