"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

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
  {
    href: "/login",
    label: "Login",
    active: (pathname: string) => pathname.startsWith("/login"),
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row md:items-center md:gap-1">
      {links.map(({ href, label, active }) => (
        <li key={href}>
          <Link
            className={cn(
              "block rounded-md px-3 py-2 text-sm hover:bg-muted",
              active(pathname) ? "text-primary" : "border-none"
            )}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
