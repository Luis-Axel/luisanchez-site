import * as React from "react";

export type OnThisPageItem = { id: string; label: string };

/**
 * Inline (non-sticky) anchor TOC — appears once near the top of the case study.
 * Plain anchor links rely on smooth scroll + scroll-padding from globals.css.
 */
export function OnThisPageNav({ items }: { items: OnThisPageItem[] }) {
  return (
    <nav
      aria-label="On this page"
      className="border-y border-[var(--color-border)] py-4"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
        <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
          On this page
        </span>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
