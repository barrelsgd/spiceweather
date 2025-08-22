"use client";

import React from "react";

export type HighlightItem = {
  id: string;
  title: string;
  summary: string;
  href?: string;
  dateIso?: string; // when the info was published/updated
  source?: string; // e.g., "Met Office"
};

export type HighlightsProps = {
  title?: string;
  items: HighlightItem[]; // will render up to 3 latest
};

export const Highlights = ({
  title = "Highlights",
  items,
}: HighlightsProps) => {
  const latest = items.slice(0, 3);

  return (
    <section aria-labelledby="highlights-title" className="space-y-4">
      <h2 id="highlights-title" className="font-medium text-xl">
        {title}
      </h2>
      {latest.length === 0 ? (
        <div className="rounded-xl border bg-card/60 p-4 text-muted-foreground backdrop-blur-sm">
          No recent updates available.
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-3">
          {latest.map((item) => {
            const content = (
              <article
                aria-label={item.title}
                className="h-full rounded-xl border bg-card/60 p-4 transition-colors hover:bg-card backdrop-blur-sm"
              >
                <header className="space-y-1">
                  <h3 className="line-clamp-2 font-medium text-base">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {item.source ?? "Met Office"}
                    {item.dateIso ? (
                      <>
                        {" • "}
                        <time dateTime={item.dateIso}>
                          {new Date(item.dateIso).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </>
                    ) : null}
                  </p>
                </header>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </span>
              </article>
            );

            return (
              <li key={item.id} className="h-full">
                {item.href ? (
                  <a
                    href={item.href}
                    className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    rel="noopener"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Highlights;
