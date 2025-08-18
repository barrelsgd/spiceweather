import type { Metadata } from "next";
import type { ReactNode } from "react";
import { appBaseUrl } from "@/lib/env";
import { WeatherSubnav } from "@/components/weather/subnav";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { PopcornIcon } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
};

type RootLayoutProps = {
  children: ReactNode;
};

const WeatherLayout = ({ children }: RootLayoutProps) => (
  <div className="mx-2">
    <div className="mx-auto max-w-4xl">
      <Alert>
        <PopcornIcon />
        <AlertTitle>There are no watches or warnings in effect!</AlertTitle>
      </Alert>
    </div>
    <WeatherSubnav />
    <div className="mx-auto max-w-4xl mt-4">
      <Card>
        <CardContent className="py-4">
          {children}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default WeatherLayout;
