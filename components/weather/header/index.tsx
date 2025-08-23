"use client";

import Image from "next/image";
import { Link } from "@/components/root/link";
import { NavigationDesktop } from "@/components/root/nav-desktop";
import { NavigationMobileButton } from "@/components/root/nav-mobile";
import spicewx from "./spicewx.png";
import { ThemeToggleButton } from "@/components/admin/common/ThemeToggleButton";

export const Header = () => {
  return (
    <>
      <div className="sticky top-0 z-50 mx-auto mt-4 flex h-16 max-w-7xl items-center justify-between bg-background p-4">
        <Link className="flex items-center gap-4" href="/">
          <Image
            alt="SpiceWeather logo"
            className="size-12 rounded-full"
            height={229}
            placeholder="blur"
            priority
            src={spicewx}
            width={299}
          />
          <WeatherHeader appName="SpiceWeather" />
        </Link>
        {/* Desktop navigation */}
        <div className="hidden md:block">
          <NavigationDesktop />
        </div>
        <div className="flex items-center gap-2">
          <Link
            className="rounded-full bg-muted px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/50"
            href="/contact"
          >
            Contact
          </Link>
          <div>
            <ThemeToggleButton />
          </div>
          {/* Mobile hamburger trigger */}
          <NavigationMobileButton />
        </div>
      </div>
    </>
  );
};

// Header
const WeatherHeader = ({ appName }: { appName: string }) => (
  <header className="mb-2 hidden md:block">
    <h1 className="text-2xl font-semibold">{appName}</h1>
  </header>
);
