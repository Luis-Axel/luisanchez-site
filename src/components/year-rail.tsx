import * as React from "react";
import { cn } from "@/lib/utils";

type YearRailProps = {
  year: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Two-column layout with a year (or short label) in a thin left rail at 25% opacity.
 * Mobile collapses to a stacked label above the content.
 */
export function YearRail({ year, className, children }: YearRailProps) {
  return (
    <div
      className={cn(
        "grid gap-3 md:gap-8",
        "grid-cols-1 md:[grid-template-columns:120px_1fr] lg:[grid-template-columns:160px_1fr]",
        className,
      )}
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-text-strong)] opacity-25 md:pt-1">
        {year}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
