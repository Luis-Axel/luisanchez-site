import * as React from "react";
import { cn } from "@/lib/utils";

export type BeforeAfterItem = {
  caption: string;
  /** TODO label describing the visual */
  todo: string;
};

export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: BeforeAfterItem;
  after: BeforeAfterItem;
  className?: string;
}) {
  return (
    <figure className={cn("grid gap-6 md:grid-cols-2", className)}>
      {[
        { item: before, tag: "Before" },
        { item: after, tag: "After" },
      ].map(({ item, tag }) => (
        <div key={tag} className="flex flex-col gap-3">
          <div className="aspect-[4/3] bg-black/10 dark:bg-white/[0.04] rounded-[12px] grid place-items-center p-6 text-center border border-[var(--color-border)]">
            <span className="text-xs md:text-sm text-[var(--color-text-muted)] font-mono leading-relaxed">
              [Visual placeholder — TODO: {item.todo}]
            </span>
          </div>
          <figcaption className="flex items-baseline gap-2 text-[14px] text-[var(--color-text-secondary)]">
            <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-accent)]">
              {tag}
            </span>
            <span>{item.caption}</span>
          </figcaption>
        </div>
      ))}
    </figure>
  );
}
