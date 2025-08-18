"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Hourly" },
  { href: "/today", label: "Today" },
  { href: "/tues", label: "Tommorow" },
  { href: "/wed", label: "2-Day" },
  { href: "/outlook", label: "Outlook" },
  { href: "/marine", label: "Marine" },
] as const;

export function WeatherSubnav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Weather sections" className="w-full">
      <ul
        className={
          "mx-auto flex w-full max-w-5xl items-center gap-2 overflow-x-auto rounded-full  p-1 text-sm text-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-[rgb(10,26,46)]/30"
        }
      >
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "block rounded-full px-4 py-2 text-center font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                  active
                    ? "bg-[rgb(40,97,153)] text-white"
                    : "text-slate-200 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
