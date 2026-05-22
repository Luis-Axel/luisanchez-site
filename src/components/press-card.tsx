import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type PressCardProps = {
  outlet: string;
  title: string;
  date: string;
  blurb: string;
  url: string;
  image?: string;
  tag?: "Recognition" | "Press" | "Talk";
  className?: string;
};

/**
 * Compact horizontal press card. Image (square thumbnail) on the left,
 * tag + title + blurb stacked on the right. Designed to keep the Press
 * & Recognition section flat horizontally rather than tall vertically.
 * Mobile collapses to image-on-top.
 */
export function PressCard({
  outlet,
  title,
  date,
  blurb,
  url,
  image,
  tag,
  className,
}: PressCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4",
        "rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]/40",
        "p-3 sm:p-4 transition-colors duration-200",
        "hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]",
        className,
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${outlet}: ${title}`}
        className="absolute inset-0 z-10"
      />

      {/* Thumbnail (or initial placeholder) — fixed size, doesn't grow */}
      <div className="shrink-0 w-full sm:w-[120px] sm:h-[120px] aspect-[16/9] sm:aspect-square overflow-hidden rounded-[12px] bg-[var(--color-bg-elev)] border border-[var(--color-border)]">
        {image ? (
          <Image
            src={image}
            alt={`${outlet}: ${title}`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            sizes="(min-width: 640px) 120px, 100vw"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[var(--color-primary-soft)]">
            <span className="font-display text-[22px] text-[var(--color-accent)]">
              {outlet[0]}
            </span>
          </div>
        )}
      </div>

      {/* Text content — grows */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-[var(--color-text-muted)]">
            {tag ?? "Press"} · {date}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] truncate max-w-full">
            {outlet} ↗
          </span>
        </div>

        <h3 className="font-display text-[16px] md:text-[17px] text-[var(--color-text-strong)] tracking-[-0.005em] leading-[1.25] line-clamp-2">
          {title}
        </h3>

        <p className="text-[13px] leading-[1.5] text-[var(--color-text-primary)] line-clamp-3">
          {blurb}
        </p>
      </div>
    </article>
  );
}
