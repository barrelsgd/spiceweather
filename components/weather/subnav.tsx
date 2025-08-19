"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const items = [
  { href: "/", value: "hourly", label: "Hourly" },
  { href: "/today", value: "today", label: "Today" },
  { href: "/tues", value: "tues", label: "Tomorrow" },
  { href: "/wed", value: "wed", label: "2-Day" },
  { href: "/outlook", value: "outlook", label: "Outlook" },
  { href: "/marine", value: "marine", label: "Marine" },
] as const;

export function WeatherSubnav() {
  const pathname = usePathname();

  // Find the active tab based on current path. Prefer longest match.
  const active =
    items
      .slice()
      .sort((a, b) => b.href.length - a.href.length)
      .find((it) =>
        it.href === "/" ? pathname === "/" : pathname.startsWith(it.href)
      )?.value ?? items[0].value;

  return (
    <nav aria-label="Weather sections" className="w-full mt-4">
      <div className="mx-4">
        <div className="mx-auto w-full max-w-4xl">
          <Tabs value={active} className="w-full">
            <TabsList className="w-full">
              {items.map((item) => (
                <TabsTrigger key={item.value} value={item.value} asChild>
                  <Link
                    href={item.href}
                    aria-current={active === item.value ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </nav>
  );
}
