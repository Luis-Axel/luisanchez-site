"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * JourneyTimeline — diagonal staircase of pill-shaped role chips, each
 * cascading right + down from the previous. Hovering a pill reveals a
 * floating detail card (employment type, date range, summary, bullets,
 * tags) — matches the benshih.design "My journey" reference.
 *
 * Pure CSS hover (group-hover/pill) — no JS state. Mobile collapses to
 * a vertical stack with the detail card permanently visible below each
 * pill.
 */

export type JourneyEntry = {
  /** Short year/range shown in the pill (e.g. "25 ~", "22 - 24") */
  year: string;
  /** Org name shown bold in the pill */
  org: string;
  /** Role shown muted next to the org */
  role: string;
  /** Hover details */
  type: string;
  dateRange: string;
  summary: string;
  bullets: string[];
  tags?: string[];
};

// Discrete indent classes so the cascade only applies at md+ and resets to
// ml-0 on mobile. Tailwind can't see dynamic ml-[Npx] values, so we list them.
// Steps are sized so each pill begins roughly where the previous one ended
// horizontally — the cascade reads as a continuous staircase. Bounded so
// the final pill stays inside the section's content width.
const INDENT_CLASSES = [
  "md:ml-0 lg:ml-0",
  "md:ml-[150px] lg:ml-[180px]",
  "md:ml-[300px] lg:ml-[360px]",
  "md:ml-[450px] lg:ml-[540px]",
  "md:ml-[600px] lg:ml-[720px]",
  "md:ml-[750px] lg:ml-[900px]",
];

export function JourneyTimeline({
  entries,
  className,
}: {
  entries: JourneyEntry[];
  className?: string;
}) {
  return (
    <div className={cn("relative flex flex-col gap-5 md:gap-7", className)}>
      {entries.map((entry, i) => (
        <JourneyPill key={i} entry={entry} index={i} total={entries.length} />
      ))}
    </div>
  );
}

function JourneyPill({
  entry,
  index,
  total,
}: {
  entry: JourneyEntry;
  index: number;
  total: number;
}) {
  // Tooltip placement: open RIGHT for entries in the top half (pill is
  // closer to the left edge), open LEFT for entries deeper in the cascade.
  const openLeft = index >= Math.ceil(total / 2);
  const indentClass = INDENT_CLASSES[Math.min(index, INDENT_CLASSES.length - 1)];

  return (
    <div className={cn("group/pill relative w-fit", indentClass)}>
      {/* The pill. Hardcoded deep-teal #02594e (NOT the theme primary) so the
          pill stays dark in both light and dark mode and white text on top
          keeps WCAG-grade contrast. The theme primary's dark-mode bright
          mint reads poorly with white. */}
      <div
        className={cn(
          "inline-flex items-center gap-3 rounded-full px-5 py-2.5 cursor-default",
          "bg-[#02594e] text-white",
          "shadow-[0_12px_24px_-12px_rgba(0,0,0,0.4)]",
          "transition-transform duration-200 ease-out",
          "group-hover/pill:scale-[1.02] group-hover/pill:shadow-[0_18px_32px_-12px_rgba(0,0,0,0.5)]",
        )}
      >
        <span className="font-mono text-[12px] md:text-[13px] text-white/65 whitespace-nowrap">
          {entry.year}
        </span>
        <span className="h-4 w-px bg-white/25" aria-hidden />
        <span className="flex flex-col gap-0 leading-tight">
          <span className="font-semibold text-[14px] md:text-[15px] text-white">
            {entry.org}
          </span>
          <span className="text-[11.5px] md:text-[12.5px] text-white/65">
            {entry.role}
          </span>
        </span>
      </div>

      {/* Hover detail card — desktop only as a floating popover */}
      <div
        className={cn(
          "hidden md:block absolute z-30 top-1/2 -translate-y-1/2",
          openLeft ? "right-full mr-4" : "left-full ml-4",
          "w-[340px]",
          "opacity-0 invisible translate-y-1 transition-all duration-200 ease-out",
          "group-hover/pill:opacity-100 group-hover/pill:visible group-hover/pill:translate-y-0",
          "pointer-events-none",
        )}
      >
        <DetailCard entry={entry} />
      </div>

      {/* Mobile inline detail (always shown beneath the pill) */}
      <div className="md:hidden mt-2 max-w-[480px]">
        <DetailCard entry={entry} compact />
      </div>
    </div>
  );
}

function DetailCard({
  entry,
  compact,
}: {
  entry: JourneyEntry;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white text-[#1f2a26]",
        "border border-black/[0.06]",
        "shadow-[0_22px_44px_-18px_rgba(0,0,0,0.35),0_4px_8px_rgba(0,0,0,0.06)]",
        compact ? "p-4" : "p-5",
      )}
    >
      <div className="font-mono uppercase tracking-[0.12em] text-[10px] md:text-[11px] text-[#5d6c7a]">
        {entry.type} · {entry.dateRange}
      </div>
      <p className="mt-2 text-[14px] md:text-[14.5px] leading-[1.55] text-[#1f2a26]">
        {entry.summary}
      </p>
      {entry.bullets.length ? (
        <ul className="mt-3 flex flex-col gap-1.5">
          {entry.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13px] leading-[1.5] text-[#3f4f4a]"
            >
              {/* Deep teal #02594e dot (NOT theme primary). Theme primary
                  in dark mode is a bright mint that washes out on white. */}
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#02594e]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {entry.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#eef2f0] text-[#1f2a26] px-2.5 py-1 text-[11px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
