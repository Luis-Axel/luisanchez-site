import * as React from "react";
import { cn } from "@/lib/utils";

export type Stat = {
  value: string;
  label: string;
  caption?: string;
};

type Props = {
  stats: Stat[];
  className?: string;
};

export function StatCallout({ stats, className }: Props) {
  return (
    <div
      className={cn(
        "grid gap-8 md:gap-10",
        stats.length === 3
          ? "grid-cols-1 md:grid-cols-3"
          : stats.length === 4
            ? "grid-cols-2 md:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2",
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-6"
        >
          <div className="font-display tabular text-[var(--color-accent)] text-[40px] md:text-[56px] lg:text-[64px] leading-[1] tracking-[-0.025em]">
            {s.value}
          </div>
          <div className="text-[15px] font-medium text-[var(--color-text-strong)]">
            {s.label}
          </div>
          {s.caption ? (
            <div className="text-[13px] text-[var(--color-text-muted)] leading-[1.5]">
              {s.caption}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
