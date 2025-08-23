import type { Metadata } from "next";
import type { ReactNode } from "react";
import { appBaseUrl } from "@/lib/env";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { PopcornIcon } from "lucide-react";
import { AirQuality } from "@/components/weather/airquality";
import { UVIndex } from "@/components/weather/uvindex";
import { Highlights } from "@/components/weather/highlights";
import { WxNews } from "@/components/weather/wxnews";
import { WeatherSubnav } from "@/components/weather/subnav";
import { AdCard } from "@/components/ads/AdCard";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
};

type RootLayoutProps = {
  children: ReactNode;
};

const WeatherLayout = ({ children }: RootLayoutProps) => (
  <div className="grid grid-cols-1">
    <div className="mx-4">
      <div className="mx-auto max-w-4xl">
        <Alert>
          <PopcornIcon />
          <AlertTitle>There are no watches or warnings in effect!</AlertTitle>
        </Alert>
        {/* Top banner ad (sponsored) */}
        <div className="mt-4">
          <AdCard
            title="Fly Grenada: Limited-Time Fares"
            description="Book your next trip to Barbados, Trinidad, and New York with exclusive weekend fares."
            href="https://example.com/airlines"
            advertiser="IslandAir"
            imageSrc="/images/brand/brand-01.svg"
            imageAlt="IslandAir limited-time fares"
            aspectClass="aspect-[21/9] md:aspect-[63/9]"
          />
        </div>
      </div>
    </div>

    <div className="mx-4 mt-4">
      <div className="mx-auto max-w-5xl">
        {/* Two-column, two-row section (md+):
            Row 1 matches Wx Tabs height; Row 2 matches Content Card height */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] md:grid-rows-[auto_1fr] gap-0 items-stretch">
          {/* Left Row 1: Wx Tabs */}
          <div className="md:col-start-1 md:row-start-1">
            <WeatherSubnav />
          </div>

          {/* Left Row 2: Wx Content Card */}
          <div className="md:col-start-1 md:row-start-2 h-full">
            <Card className="h-full">
              <CardContent className="h-full py-4">{children}</CardContent>
            </Card>
          </div>

          {/* Right Row 1: Air Quality matches tabs height (graph-only) */}
          <div className="md:col-start-2 md:row-start-1 h-full">
            <Card className="h-full">
              <CardContent className="h-full py-4">
                <AirQuality
                  aqi={18}
                  category="Good"
                  pm25={6.2}
                  pm10={12.1}
                  o3={32}
                  no2={9}
                  so2={1}
                  co={0.3}
                  updatedIso={new Date().toISOString()}
                  variant="graph"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Row 2: Hotels (smaller on md+) + UV Index (content height) */}
          <div className="md:col-start-2 md:row-start-2 grid md:grid-rows-[auto_auto] grid-rows-2 gap-0 h-full">
            {/* Hotels Ad: smaller height on md+ */}
            <div className="md:h-28">
              <AdCard
                title="Beachfront Hotels from $99"
                description="Wake up to ocean views in Grand Anse. Flexible cancellation available."
                href="https://example.com/hotels"
                advertiser="SpiceBay Hotels"
                imageSrc="/images/brand/brand-03.svg"
                imageAlt="SpiceBay Hotels beachfront offers"
                fill
              />
            </div>
            {/* UV Index: auto height (content only) */}
            <Card>
              <CardContent className="py-4">
                <UVIndex
                  uv={5}
                  maxToday={7}
                  sunriseIso={new Date(
                    new Date().setHours(5, 55, 0, 0)
                  ).toISOString()}
                  sunsetIso={new Date(
                    new Date().setHours(18, 29, 0, 0)
                  ).toISOString()}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full-width section for highlights and news */}
        <div className="mt-4 grid grid-cols-1 gap-0">
          <Card>
            <CardContent className="py-4">
              <Highlights
                title="Met Office Highlights"
                items={[
                  {
                    id: "h1",
                    title: "Tropical wave approaching Windward Islands",
                    summary:
                      "Showers and isolated thunderstorms likely this afternoon and evening. Monitor official advisories.",
                    href: "/blog/tropical-wave-update",
                    dateIso: new Date().toISOString(),
                    source: "Met Office",
                  },
                  {
                    id: "h2",
                    title: "Heat advisory for low-lying areas",
                    summary:
                      "Feels-like temperatures may exceed 38°C at peak hours. Stay hydrated and limit outdoor activities.",
                    href: "/blog/heat-advisory",
                    dateIso: new Date(
                      Date.now() - 6 * 3600 * 1000
                    ).toISOString(),
                    source: "Met Office",
                  },
                  {
                    id: "h3",
                    title: "Small craft caution in effect",
                    summary:
                      "Moderate seas with occasional gusts near squalls. Mariners should exercise caution.",
                    href: "/blog/marine-caution",
                    dateIso: new Date(
                      Date.now() - 12 * 3600 * 1000
                    ).toISOString(),
                    source: "Met Office",
                  },
                ]}
              />
            </CardContent>
          </Card>
          {/* Latest Weather News with right-rail ad on md+; stacked on small */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] gap-0 items-stretch">
            <Card>
              <CardContent className="py-4">
                <WxNews
                  title="Latest Weather News"
                  items={[
                    {
                      id: "n1",
                      title: "Morning forecast issued",
                      summary:
                        "Partly cloudy becoming cloudy at times with a few brief showers mainly over the windward side.",
                      href: "/blog/morning-forecast",
                      dateIso: new Date().toISOString(),
                      category: "Update",
                    },
                    {
                      id: "n2",
                      title: "Heat advisory remains in effect",
                      summary:
                        "High humidity and light winds will elevate feels-like temperatures. Stay hydrated and take breaks in the shade.",
                      href: "/blog/heat-advisory",
                      dateIso: new Date(
                        Date.now() - 3 * 3600 * 1000
                      ).toISOString(),
                      category: "Advisory",
                    },
                    {
                      id: "n3",
                      title: "Marine bulletin: moderate seas",
                      summary:
                        "Waves 1.5–2.0m in open waters and 0.5–1.0m in sheltered areas. Small craft should exercise caution.",
                      href: "/blog/marine-bulletin",
                      dateIso: new Date(
                        Date.now() - 9 * 3600 * 1000
                      ).toISOString(),
                      category: "Bulletin",
                    },
                  ]}
                />
              </CardContent>
            </Card>
            {/* Sponsored: SpiceMart (right rail on md+, stacked on mobile) */}
            <AdCard
              title="Weekly Grocery Specials"
              description="Fresh produce, bakery, and pantry staples on sale. Click to view this week's flyer."
              href="https://example.com/supermarket-deals"
              advertiser="SpiceMart"
              imageSrc="/images/brand/brand-04.svg"
              imageAlt="SpiceMart weekly grocery specials"
              aspectClass="aspect-[16/9] md:aspect-[21/9]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WeatherLayout;
