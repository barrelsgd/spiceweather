"use client";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/weather/footer";
import { Header } from "@/components/weather/header";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section
    aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    className="space-y-4"
  >
    <h2
      className="font-medium text-xl mx-auto max-w-4xl"
      id={title.replace(/\s+/g, "-").toLowerCase()}
    >
      {title}
    </h2>
    {children}
  </section>
);

export type AlertItem = {
  id: string;
  title: string;
  severity: "minor" | "moderate" | "severe" | "extreme";
  startsAtIso?: string;
  endsAtIso?: string;
  description?: string;
  source?: string;
};

const alerts: AlertItem[] = [];

// Alerts
const AlertsPanel = ({ items }: { items: AlertItem[] }) => (
  <Section title="">
    <div className="mx-4">
      {" "}
      <div className="flex justify-center mx-auto max-w-4xl">
        <output
          aria-live="polite"
          className=" inline-flex w-full items-center rounded-full bg-muted px-4 py-2"
        >
          {items.length === 0 ? (
            <span className="text-muted-foreground text-sm">
              No active alerts
            </span>
          ) : (
            <span className="font-medium text-sm ">
              {items.length} active alert{items.length > 1 ? "s" : ""}
            </span>
          )}
        </output>
      </div>{" "}
    </div>

    {items.length > 0 ? (
      <ul className="mt-3 space-y-3">
        {items.map((a) => (
          <li key={a.id}>
            <article
              aria-labelledby={`alert-${a.id}`}
              className="rounded-lg border bg-card/60 p-3 backdrop-blur-sm"
            >
              <h3 className="font-medium text-base" id={`alert-${a.id}`}>
                {a.title}
              </h3>
              {a.severity ? (
                <p className="text-muted-foreground text-sm">
                  Severity: {a.severity}
                </p>
              ) : null}
              {a.startsAtIso ? (
                <p className="text-muted-foreground text-sm">
                  Starts:{" "}
                  <time dateTime={a.startsAtIso}>
                    {new Date(a.startsAtIso).toLocaleString()}
                  </time>
                </p>
              ) : null}
              {a.endsAtIso ? (
                <p className="text-muted-foreground text-sm">
                  Ends:{" "}
                  <time dateTime={a.endsAtIso}>
                    {new Date(a.endsAtIso).toLocaleString()}
                  </time>
                </p>
              ) : null}
              {a.description ? (
                <p className="text-sm">{a.description}</p>
              ) : null}
              {a.source ? (
                <p className="text-muted-foreground text-sm">
                  Source: {a.source}
                </p>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    ) : null}
  </Section>
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
    aria-label="Forecast range"
    className="rounded-full bg-muted mx-4"
    role="tablist"
  >
    {segments.map((s) => (
      <button
        aria-selected={value === s}
        className={`rounded-full px-2 py-1.5 text-sm transition-colors ${
          value === s
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground hover:text-foreground"
        }`}
        key={s}
        onClick={() => onChange?.(s)}
        role="tab"
        type="button"
      >
        {s}
      </button>
    ))}
  </div>
);

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = (() => {
    if (!pathname) {
      return "Hourly";
    }
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "weather" || parts.length === 1) {
      return "Hourly";
    }
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
  })();

  return (
    <>
      <Header />
      <AlertsPanel items={alerts} />
      <div className="mt-5 max-w-4xl mx-auto">
        <SegmentedControl
          onChange={(s) => {
            if (s === "Hourly") {
              router.push("/");
              return;
            }
            const slug = s.toLowerCase();
            router.push(`/${slug}`);
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
          value={activeTab}
        />
      </div>
      <div>{children}</div>

      <RadarMap />
      <Footer />
    </>
  );
}

const RadarMap = () => (
  <div className="m-4">
    <div className="rounded-xl border bg-card/60 p-3 backdrop-blur-sm mx-auto max-w-4xl">
      <figure className="grid aspect-video w-full place-content-center overflow-hidden rounded-lg bg-muted">
        <svg aria-labelledby="radar-title" className="h-full w-full" role="img">
          <title id="radar-title">Radar placeholder</title>
          <rect
            className="text-muted-foreground/20"
            fill="currentColor"
            height="100%"
            width="100%"
            x="0"
            y="0"
          />
        </svg>
        <figcaption className="sr-only">
          Radar preview will appear here.
        </figcaption>
      </figure>
    </div>
  </div>
);
