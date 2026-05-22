import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StickyCard } from "./sticky-card";

/* ===========================================================
   Generic Hero — declarative header used on inner pages (e.g. /about).
   Eyebrow + title + intro + children (CTA row).
   =========================================================== */

type HeroProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
};

export function Hero({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  children,
}: HeroProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-display text-[var(--color-text-strong)] text-[44px] leading-[1.05] tracking-[-0.025em] md:text-[72px] lg:text-[88px]">
        {title}
      </h1>
      {intro ? (
        <p className="max-w-[720px] text-[18px] md:text-[20px] leading-[1.55] text-[var(--color-text-primary)]">
          {intro}
        </p>
      ) : null}
      {children}
    </header>
  );
}

/* ===========================================================
   HomeHero — the Ben-Shih-style conversational hero used only
   on `/`. Headline + inline-badge subtitle + sticky-note row.
   =========================================================== */

/**
 * Inline company badge — text-only chip that sits in the subtitle line.
 * TODO(lui): drop SVG/PNG logos in `/public/badges/<slug>.svg` and render
 * an <Image> to the left of the wordmark when the assets land.
 */
function CompanyBadge({ name }: { name: string }) {
  return (
    <span className="mx-0.5 inline-block whitespace-nowrap rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2 py-[2px] align-[1px] font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-strong)]">
      {/* Tiny dot placeholder for the logo slot. Swap to <Image> once we have art. */}
      <span
        aria-hidden
        className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] align-middle"
      />
      <span className="align-middle">{name}</span>
    </span>
  );
}

/**
 * Homepage hero — Ben-Shih-style conversational headline + inline-badge
 * subtitle + sticky-note row that fans out on hover to reveal a circular
 * video placeholder.
 *
 * Pure CSS animation: the row container owns `group`; the cards use
 * `group-hover:` translate/rotate utilities; the video frame and caption
 * fade in via `group-hover:opacity-100`. No JS state.
 */
export function HomeHero({ className }: { className?: string }) {
  return (
    // min-w-0 + w-full on the flex children below prevent the long subtitle
    // line from forcing the column wider than the viewport on small screens.
    <header className={cn("flex w-full min-w-0 flex-col gap-8 md:gap-10", className)}>
      {/* Headline */}
      <h1 className="min-w-0 font-display font-semibold text-[var(--color-primary)] text-[44px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[1.0] tracking-[-0.035em]">
        Hi, I&apos;m Lui.
      </h1>

      {/* Subtitle with inline company badges */}
      <p className="min-w-0 max-w-[820px] text-[16px] md:text-[22px] leading-[1.6] text-[var(--color-text-primary)] break-words">
        Data engineer with a supply-chain background. Shipping data, analytics,
        and automation at <CompanyBadge name="Genpro" /> by day, building{" "}
        <CompanyBadge name="Macro" /> by night.
      </p>

      {/* Sticky-note row with hover-fan-out + video reveal */}
      <StickyRow />
    </header>
  );
}

function StickyRow() {
  return (
    <div className="relative mt-2 md:mt-4">
      {/*
        `group` lets all three cards + the center video respond to a single
        hover on the row container. Padding gives the cards room to translate
        outward without clipping at the edges. On mobile the cards stack
        vertically (no hover layer is sensible at touch widths).
      */}
      <div className="group relative flex flex-col items-center gap-5 md:flex-row md:items-start md:justify-center md:gap-6 px-2 py-6 md:py-10">
        {/* Center video / portrait placeholder — sits behind the cards at rest,
            fades in + scales up on hover. */}
        <VideoSlot />

        {/* Hand-written caption that appears above the video on hover. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2",
            "whitespace-nowrap font-hand text-[20px] md:text-[24px] text-[var(--color-primary)]",
            "opacity-0 transition-opacity duration-500 ease-out",
            "group-hover:opacity-100 group-hover:delay-150",
          )}
        >
          in case you got tired of reading
        </span>

        {/* Card 1 — orange, slides LEFT on hover */}
        <div className="relative z-10">
          <StickyCard
            tone="orange"
            label="Recent work"
            description="Three case studies — pricing intelligence, enterprise analytics, causal inference."
            cta="Read case studies →"
            href="#selected-work"
            baseTilt="-rotate-2"
            hoverTransform="group-hover:-translate-x-[120px] md:group-hover:-translate-x-[180px] group-hover:-rotate-[6deg]"
          />
        </div>

        {/* Card 2 — green, stays put (slight lift). */}
        <div className="relative z-10">
          <StickyCard
            tone="green"
            label="Currently building"
            description="Macro — a consumer-health AI product."
            cta="See Macro →"
            href="#more-work"
            baseTilt="rotate-1"
            hoverTransform="group-hover:-translate-y-1"
          />
        </div>

        {/* Card 3 — blue, slides RIGHT on hover */}
        <div className="relative z-10">
          <StickyCard
            tone="blue"
            label="Working with me"
            description="Notes from peers and mentees."
            cta="Read testimonials →"
            href="#working-with-me"
            baseTilt="-rotate-1"
            hoverTransform="group-hover:translate-x-[120px] md:group-hover:translate-x-[180px] group-hover:rotate-[6deg]"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The circular video frame that the cards fan out to reveal.
 * TODO(lui): replace the still portrait with an autoplay loop. Drop a file
 * at `/public/hero/lui-video.mp4` and swap the <Image> for a <video> with
 * muted/loop/playsInline.
 */
function VideoSlot() {
  return (
    <div
      className={cn(
        // Absolutely centered inside the row, behind the cards.
        "absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2",
        // Circle
        "h-[240px] w-[240px] md:h-[300px] md:w-[300px] rounded-full overflow-hidden",
        // Frame
        "border-4 border-[var(--color-surface)] bg-black",
        "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]",
        // Reveal animation
        "opacity-0 scale-95 transition-all duration-500 ease-out",
        "group-hover:opacity-100 group-hover:scale-100",
      )}
    >
      <Image
        src="/press/speech.png"
        alt="Lui Sanchez speaking at a conference"
        width={600}
        height={600}
        className="h-full w-full object-cover"
        priority={false}
      />
      {/* Subtle dark wash for play-button contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/15"
      />
      {/* Play overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            className="ml-1 fill-black"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
