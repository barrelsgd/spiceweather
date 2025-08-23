"use client";

import React from "react";

export type AirQualityProps = {
  aqi: number;
  category?: string;
  pm25?: number;
  pm10?: number;
  o3?: number;
  no2?: number;
  so2?: number;
  co?: number;
  source?: string;
  updatedIso?: string;
};

const bandForAQI = (
  aqi: number
): { label: string; color: string; desc: string } => {
  if (aqi <= 50)
    return {
      label: "Good",
      color: "bg-emerald-500",
      desc: "Air quality is satisfactory.",
    };
  if (aqi <= 100)
    return {
      label: "Moderate",
      color: "bg-yellow-500",
      desc: "Acceptable; some pollutants may be a concern for a small number of people.",
    };
  if (aqi <= 150)
    return {
      label: "Unhealthy for Sensitive Groups",
      color: "bg-orange-500",
      desc: "Members of sensitive groups may experience health effects.",
    };
  if (aqi <= 200)
    return {
      label: "Unhealthy",
      color: "bg-red-500",
      desc: "Everyone may begin to experience health effects.",
    };
  if (aqi <= 300)
    return {
      label: "Very Unhealthy",
      color: "bg-fuchsia-600",
      desc: "Health alert: everyone may experience more serious health effects.",
    };
  return {
    label: "Hazardous",
    color: "bg-purple-800",
    desc: "Emergency conditions: serious health effects for everyone.",
  };
};

export const AirQuality = ({
  aqi,
  category,
  pm25,
  pm10,
  o3,
  no2,
  so2,
  co,
  source = "AQI",
  updatedIso,
}: AirQualityProps) => {
  const band = bandForAQI(aqi);
  const label = category ?? band.label;

  return (
    <section aria-labelledby="air-quality" className="space-y-4">
      <h2 id="air-quality" className="font-medium text-xl">
        Air Quality
      </h2>
      <article aria-label="Air quality summary" className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{source}</p>
            <div className="flex items-baseline gap-3">
              <p
                aria-live="polite"
                aria-atomic="true"
                className="font-semibold text-5xl leading-none"
              >
                {aqi}
              </p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${band.color}`}
              >
                {label}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">{band.desc}</p>
          </div>
          <figure className="sr-only">
            <svg role="img" aria-labelledby="aqi-title">
              <title id="aqi-title">Air quality indicator</title>
            </svg>
          </figure>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {typeof pm25 === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">PM2.5</dt>
              <dd className="font-medium text-base">{pm25.toFixed(1)} µg/m³</dd>
            </div>
          )}
          {typeof pm10 === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">PM10</dt>
              <dd className="font-medium text-base">{pm10.toFixed(1)} µg/m³</dd>
            </div>
          )}
          {typeof o3 === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">O₃</dt>
              <dd className="font-medium text-base">{o3.toFixed(0)} ppb</dd>
            </div>
          )}
          {typeof no2 === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">NO₂</dt>
              <dd className="font-medium text-base">{no2.toFixed(0)} ppb</dd>
            </div>
          )}
          {typeof so2 === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">SO₂</dt>
              <dd className="font-medium text-base">{so2.toFixed(0)} ppb</dd>
            </div>
          )}
          {typeof co === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">CO</dt>
              <dd className="font-medium text-base">{co.toFixed(1)} ppm</dd>
            </div>
          )}
          {updatedIso && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Updated</dt>
              <dd className="font-medium text-base">
                {new Date(updatedIso).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          )}
        </dl>
      </article>
    </section>
  );
};

export default AirQuality;
