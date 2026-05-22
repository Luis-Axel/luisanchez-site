import * as React from "react";
import { cn } from "@/lib/utils";

export type MetadataCell = {
  label: string;
  value: React.ReactNode;
};

/**
 * 4-cell grid — adapted from Ben's Role/Team/Timeline (3) to
 * Stack / Scale / SLA / Outcome (4) for Lui's data work.
 */
export function MetadataGrid({
  cells,
  className,
}: {
  cells: MetadataCell[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-6 grid-cols-2 md:grid-cols-4",
        "border-y border-[var(--color-border)] py-8",
        className,
      )}
    >
      {cells.map((c, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <dt className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            {c.label}
          </dt>
          <dd className="text-[15px] text-[var(--color-text-strong)] leading-[1.5]">
            {c.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
