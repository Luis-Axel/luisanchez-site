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
        "relative flex flex-col gap-4 border-t border-[var(--color-border)] pt-6",
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

      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] md:text-[11px] text-[var(--color-text-muted)]">
          {tag ?? "Press"} · {date}
        </span>
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          {outlet} ↗
        </span>
      </div>

      <h3 className="font-display text-[20px] md:text-[24px] text-[var(--color-text-strong)] tracking-[-0.01em] max-w-[680px]">
        {title}
      </h3>

      <p className="text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-primary)] max-w-[680px]">
        {blurb}
      </p>

      {image ? (
        <div className="mt-2 rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-black/[0.03] dark:bg-white/[0.04]">
          <Image
            src={image}
            alt={`${outlet}: ${title}`}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : null}
    </article>
  );
}
