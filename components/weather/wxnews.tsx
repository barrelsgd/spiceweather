"use client";

import React from "react";

export type WxNewsItem = {
  id: string;
  title: string;
  summary?: string;
  href?: string;
  dateIso?: string;
  category?: string; // e.g., Advisory, Bulletin, Update
};

export type WxNewsProps = {
  title?: string;
  items: WxNewsItem[];
  maxItems?: number; // default 5
};

export const WxNews = ({
  title = "Weather News",
  items,
  maxItems = 5,
}: WxNewsProps) => {
  const list = items.slice(0, maxItems);

  return (
    <section aria-labelledby="wxnews-title" className="space-y-4">
      <h2 id="wxnews-title" className="font-medium text-xl">
        {title}
      </h2>

      {list.length === 0 ? (
        <div className="rounded-xl border bg-card/60 p-4 text-muted-foreground backdrop-blur-sm">
          No recent weather news.
        </div>
      ) : (
        <ul className="divide-y rounded-xl border bg-card/60 backdrop-blur-sm">
          {list.map((n) => {
            const Row = (
              <article className="flex w-full items-start gap-3 p-4 hover:bg-card transition-colors">
                <div
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {n.category ? (
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {n.category}
                      </span>
                    ) : null}
                    <h3 className="min-w-0 flex-1 truncate font-medium text-base">
                      {n.title}
                    </h3>
                    {n.dateIso ? (
                      <time
                        className="text-muted-foreground text-xs"
                        dateTime={n.dateIso}
                        aria-label="Published"
                        title={new Date(n.dateIso).toLocaleString()}
                      >
                        {new Date(n.dateIso).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    ) : null}
                  </header>
                  {n.summary ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {n.summary}
                    </p>
                  ) : null}
                </div>
                <span className="ml-auto inline-flex items-center text-sm font-medium text-primary">
                  Read
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
              <li key={n.id} className="first:rounded-t-xl last:rounded-b-xl">
                {n.href ? (
                  <a
                    href={n.href}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    rel="noopener"
                  >
                    {Row}
                  </a>
                ) : (
                  Row
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default WxNews;
