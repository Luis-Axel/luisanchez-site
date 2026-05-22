import * as React from "react";
import Link from "next/link";

export type MoreCaseStudyItem = {
  href: string;
  title: string;
  tag: string;
  todo: string;
};

export function MoreCaseStudies({ items }: { items: MoreCaseStudyItem[] }) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[36px] tracking-[-0.015em]">
          More case studies
        </h2>
        <Link
          href="/"
          className="text-[14px] text-[var(--color-primary)] hover:underline underline-offset-4"
        >
          All work →
        </Link>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-3 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-black/90 dark:bg-black/60 grid place-items-center p-4 text-center">
              <span className="text-[11px] md:text-xs text-white/40 font-mono leading-relaxed">
                [TODO: {item.todo}]
              </span>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                {item.tag}
              </span>
              <h3 className="font-display text-[18px] text-[var(--color-text-strong)] group-hover:text-[var(--color-primary)] transition-colors">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
