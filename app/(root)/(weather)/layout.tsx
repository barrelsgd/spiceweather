import type { Metadata } from "next";
import type { ReactNode } from "react";
import { appBaseUrl } from "@/lib/env";
import { WeatherSubnav } from "@/components/weather/subnav";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { PopcornIcon } from "lucide-react";
import { AirQuality } from "@/components/weather/airquality";
import { UVIndex } from "@/components/weather/uvindex";
import { Highlights } from "@/components/weather/highlights";
import { WxNews } from "@/components/weather/wxnews";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
};

type RootLayoutProps = {
  children: ReactNode;
};

const WeatherLayout = ({ children }: RootLayoutProps) => (
  <div>
    <div className="mx-4">
      <div className="mx-auto max-w-4xl">
        <Alert>
          <PopcornIcon />
          <AlertTitle>There are no watches or warnings in effect!</AlertTitle>
        </Alert>
      </div>
    </div>
    <WeatherSubnav />
    <div className="mx-4 mt-4">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardContent className="py-4">{children}</CardContent>
        </Card>
        <div className="mt-4 space-y-4">
          <Card>
            <CardContent className="py-4">
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
              />
            </CardContent>
          </Card>
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
        </div>
      </div>
    </div>
  </div>
);

export default WeatherLayout;
