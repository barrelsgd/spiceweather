"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MenuIcon } from "lucide-react";

const links = [
  {
    href: "/",
    label: "Alerts",
    active: (pathname: string) => pathname === "/",
  },
  {
    href: "/weather",
    label: "Weather & Climate",
    active: (pathname: string) => pathname.startsWith("/weather"),
  },
  {
    href: "/products",
    label: "Products & Services",
    active: (pathname: string) => pathname.startsWith("/products"),
  },
  {
    href: "/news",
    label: "News",
    active: (pathname: string) => pathname.startsWith("/news"),
  },
  {
    href: "/about",
    label: "About",
    active: (pathname: string) => pathname.startsWith("/about"),
  },
];

function MobileNavContent({ pathname }: { pathname: string }) {
  return (
    <>
      <SheetHeader className="p-3">Logo</SheetHeader>
      <nav className="px-2 pb-6">
        <ul className="flex flex-col gap-1">
          {links.map(({ href, label, active }) => (
            <li key={href}>
              <SheetClose asChild>
                <Link
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-base hover:bg-muted",
                    active(pathname) ? "text-primary" : ""
                  )}
                  href={href}
                  aria-current={active(pathname) ? "page" : undefined}
                >
                  {label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export const NavigationMobile = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <div className="flex h-12 items-center justify-between border-b px-3">
            <Link href="/" className="font-semibold">
              SpiceWeather
            </Link>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MenuIcon className="size-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
          </div>

          <SheetContent side="left" className="p-0">
            <MobileNavContent pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export const NavigationMobileButton = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MenuIcon className="size-5" aria-hidden="true" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileNavContent pathname={pathname} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
