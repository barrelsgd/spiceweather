"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Climatology",
    href: "/climate",
    description: "Summary of Grenada climatology.",
  },
  {
    title: "Monthly Climate Bulletin",
    href: "/climate/bulletin",
    description: "Monthly Climate Bulletin.",
  },
  {
    title: "Hurricane Season",
    href: "/climate/hurricanes",
    description: "Learn about Hurricane Season.",
  },
  {
    title: "Learn",
    href: "/climate/learn",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Glossary",
    href: "/climate/glossary",
    description: "Glossary of weather terms.",
  },
  {
    title: "Forecast Tooltip",
    href: "/climate/forecast-tooltip",
    description: "Forecast Tooltip.",
  },
];

export function NavigationDesktop() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Alerts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/alerts/impact"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Impact-Based Warnings
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Latest warnings
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/alerts/marine" title="Marine Warning">
                Marine warning in effect!
              </ListItem>
              <ListItem href="/alerts/heat" title="Heat wave">
                Heat wave alert!
              </ListItem>
              <ListItem href="/alerts/tsunami" title="Tsunami monitoring!">
                Tsunami monitoring in effect!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Weather & Climate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Aviation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/aviation/metars">
                    <div className="font-medium">METARs & TAFs</div>
                    <div className="text-muted-foreground">
                      Latest METAR and TAFs
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/aviation/flight-folder">
                    <div className="font-medium">Flight Folder</div>
                    <div className="text-muted-foreground">
                      Latest Flight Folder
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/aviation/maps">
                    <div className="font-medium">Maps</div>
                    <div className="text-muted-foreground">
                      Latest Aviation maps
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products & Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products/heatindex">
                    <div className="font-medium">Heat Index</div>
                    <div className="text-muted-foreground">Heat Index</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/products/uvindex">
                    <div className="font-medium">UV Index</div>
                    <div className="text-muted-foreground">UV Index</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/products/health">
                    <div className="font-medium">Health Index</div>
                    <div className="text-muted-foreground">Health Index</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/news">News</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/staff">Staff</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/careers">Careers</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
