import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Renamed from Ben's "How Might We" chips — Luis's are framed as
 * the constraints / design rules that shaped the build.
 */
export function ConstraintChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-3 py-1.5 text-[13px] font-medium leading-[1.4]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ConstraintChipRow({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, i) => (
        <ConstraintChip key={i}>{item}</ConstraintChip>
      ))}
    </div>
  );
}
