"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/root/link";

export type AdCardProps = {
  title: string;
  description: string;
  href: string;
  advertiser: string;
  imageSrc?: string;
  imageAlt?: string;
  aspectClass?: string; // Tailwind aspect utility, e.g., "aspect-[16/9]", "aspect-[21/9]"
  fill?: boolean; // If true, make the card/image fill the parent's height
};

export const AdCard = ({
  title,
  description,
  href,
  advertiser,
  imageSrc,
  imageAlt,
  aspectClass,
  fill = false,
}: AdCardProps) => (
  <Card role="region" aria-label={`Advertisement: ${advertiser || title}`} className={fill ? "h-full" : undefined}>
    <CardContent className={fill ? "p-0 h-full" : "p-0"}>
      <Link
        href={href}
        aria-label={`${title} – Sponsored by ${advertiser}`}
        className={fill ? "group relative block h-full overflow-hidden rounded-md" : "group relative block overflow-hidden rounded-md"}
      >
        {imageSrc ? (
          <>
            <div className={fill ? "relative h-full w-full bg-muted" : `relative ${aspectClass ? `${aspectClass} ` : ""}w-full bg-muted`}>
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className={fill
                  ? "absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  : `${aspectClass ? "absolute inset-0 h-full w-full" : "block w-full h-auto"} object-contain sm:object-cover transition-transform duration-300 group-hover:scale-[1.02]`}
                loading="lazy"
              />
              <div className="pointer-events-none absolute left-2 top-2 rounded bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground shadow">
                Sponsored by {advertiser}
              </div>
            </div>
            <span className="sr-only">{title}</span>
            <span className="sr-only">{description}</span>
          </>
        ) : (
          <div className="p-4">
            <p className="text-xs text-muted-foreground" aria-label="Sponsored">
              Sponsored by {advertiser}
            </p>
            <h3 className="mt-1 font-medium text-base leading-snug">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{description}</p>
          </div>
        )}
      </Link>
    </CardContent>
  </Card>
);
