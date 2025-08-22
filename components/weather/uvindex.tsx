"use client";

import React from "react";

export type UVIndexProps = {
  uv: number; // 0+
  category?: string;
  maxToday?: number;
  nextUpdateIso?: string;
  sunriseIso?: string;
  sunsetIso?: string;
};

const bandForUV = (
  uv: number
): { label: string; color: string; advice: string } => {
  if (uv <= 2)
    return {
      label: "Low",
      color: "bg-emerald-500",
      advice: "Minimal protection required.",
    };
  if (uv <= 5)
    return {
      label: "Moderate",
      color: "bg-yellow-500",
      advice: "Wear sunglasses, use SPF 30+ if outside.",
    };
  if (uv <= 7)
    return {
      label: "High",
      color: "bg-orange-500",
      advice: "Reduce time in the sun 10am–4pm, SPF 30+, hat & shade.",
    };
  if (uv <= 10)
    return {
      label: "Very High",
      color: "bg-red-500",
      advice: "Minimize sun exposure, seek shade, protective clothing.",
    };
  return {
    label: "Extreme",
    color: "bg-fuchsia-600",
    advice: "Avoid sun exposure. Essential protection required.",
  };
};

export const UVIndex = ({
  uv,
  category,
  maxToday,
  nextUpdateIso,
  sunriseIso,
  sunsetIso,
}: UVIndexProps) => {
  const band = bandForUV(uv);
  const label = category ?? band.label;

  return (
    <section aria-labelledby="uv-index" className="space-y-4">
      <h2 id="uv-index" className="font-medium text-xl">
        UV Index
      </h2>
      <article
        aria-label="UV index summary"
        className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">WHO scale</p>
            <div className="flex items-baseline gap-3">
              <p
                aria-live="polite"
                aria-atomic="true"
                className="font-semibold text-5xl leading-none"
              >
                {uv.toFixed(0)}
              </p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${band.color}`}
              >
                {label}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">{band.advice}</p>
          </div>
          <figure className="sr-only">
            <svg role="img" aria-labelledby="uv-title">
              <title id="uv-title">UV index indicator</title>
            </svg>
          </figure>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {typeof maxToday === "number" && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Max Today</dt>
              <dd className="font-medium text-base">{maxToday.toFixed(0)}</dd>
            </div>
          )}
          {sunriseIso && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Sunrise</dt>
              <dd className="font-medium text-base">
                {new Date(sunriseIso).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          )}
          {sunsetIso && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Sunset</dt>
              <dd className="font-medium text-base">
                {new Date(sunsetIso).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          )}
          {nextUpdateIso && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Next Update</dt>
              <dd className="font-medium text-base">
                {new Date(nextUpdateIso).toLocaleTimeString([], {
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

export default UVIndex;
