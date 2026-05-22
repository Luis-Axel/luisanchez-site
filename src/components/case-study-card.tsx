import * as React from "react";
import Link from "next/link";
import { Button, ArrowRight } from "./button";
import { cn } from "@/lib/utils";

export type CaseStudyCardProps = {
  href?: string;
  title: string;
  oneLiner: string;
  /** TODO label describing what visual goes here */
  visualTodo: string;
  /** Optional path under /public to a real image. When set, replaces the TODO placeholder. */
  heroImage?: string;
  /** Optional explicit aspect ratio class. Default 16/9-ish. */
  aspect?: string;
  tag?: string;
  cta?: string;
  size?: "hero" | "secondary";
};

export function CaseStudyCard({
  href,
  title,
  oneLiner,
  visualTodo,
  heroImage,
  aspect = "aspect-[1948/1080]",
  tag,
  cta = "Read the case study",
  size = "hero",
}: CaseStudyCardProps) {
  const isHero = size === "hero";
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 isolate",
        isHero ? "gap-6" : "gap-3",
      )}
    >
      {/* Title — sits ABOVE the media (per teardown spec) */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3
          className={cn(
            "font-display text-[var(--color-text-strong)] tracking-[-0.015em]",
            isHero ? "text-[28px] md:text-[34px]" : "text-[20px] md:text-[22px]",
          )}
        >
          {title}
        </h3>
        {tag ? (
          <span className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {tag}
          </span>
        ) : null}
      </div>

      {/* Media frame — black background, rounded 12px (per teardown) */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[12px] bg-black/90 dark:bg-black/60",
          aspect,
        )}
      >
        {heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div className="text-xs md:text-sm text-white/40 font-mono leading-relaxed">
                [Visual placeholder — TODO: {visualTodo}]
              </div>
            </div>
            {/* Subtle gradient to suggest depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40" />
          </>
        )}
      </div>

      {/* Subtitle line */}
      <p
        className={cn(
          "text-[var(--color-text-primary)] leading-[1.55]",
          isHero ? "text-[17px] max-w-[680px]" : "text-[15px] max-w-[520px]",
        )}
      >
        {oneLiner}
      </p>

      {/* CTA — only show as button for hero size */}
      {isHero && href ? (
        <div className="mt-1">
          <Button href={href} size="md" trailingIcon={<ArrowRight />}>
            {cta}
          </Button>
        </div>
      ) : null}

      {/* Absolute overlay link covers the whole card */}
      {href ? (
        <Link
          href={href}
          aria-label={title}
          className="absolute inset-0 z-10 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
        />
      ) : null}
    </article>
  );
}
