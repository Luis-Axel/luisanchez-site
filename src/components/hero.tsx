import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StickyCard } from "./sticky-card";
import { VideoCard } from "./video-block";
import { CASE_STUDIES } from "@/content/case-studies";

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
function CompanyBadge({ name, href }: { name: string; href?: string }) {
  const inner = (
    <>
      {/* Tiny dot placeholder for the logo slot. Swap to <Image> once we have art. */}
      <span
        aria-hidden
        className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] align-middle"
      />
      <span className="align-middle">{name}</span>
    </>
  );
  const cls =
    "mx-0.5 inline-block whitespace-nowrap rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2 py-[2px] align-[1px] font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
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
    <header className={cn("hero-dots flex w-full min-w-0 flex-col gap-8 md:gap-10", className)}>
      {/* Headline */}
      <h1 className="min-w-0 font-display font-semibold text-[var(--color-primary)] text-[40px] sm:text-[52px] md:text-[72px] lg:text-[84px] leading-[1.02] tracking-[-0.035em]">
        I build data and ML systems for messy real-world operations.
      </h1>

      {/* Subtitle */}
      <p className="min-w-0 max-w-[820px] text-[16px] md:text-[20px] leading-[1.6] text-[var(--color-text-primary)] break-words">
        I&apos;m a supply-chain operator turned data builder, currently leading
        data and analytics at{" "}
        <CompanyBadge name="Genpro" href="https://genproinc.com/" />. My work
        turns fragmented workflows into pricing platforms, automation systems,
        and decision tools teams rely on.
      </p>

      {/* Sticky-note row (Card 2 is the introduction video) */}
      <StickyRow />
    </header>
  );
}

function StickyRow() {
  /*
    Per-card isolation hover:
    - Each card has only a direct :hover transform — lifts, scales, straightens
      its tilt, bumps z-index. The OTHER cards do not move when this one is
      hovered. Result: hovering a card "pulls it forward" cleanly while the
      siblings stay calm.
    - No row-level group-hover transform — that's what made the previous
      version feel jittery when the cursor crossed between cards.
    - Video reveal + handwritten caption are paused until Lui drops the real
      `/public/hero/lui-video.mp4` and we decide on the right placement. The
      VideoSlot component is kept in the file (just unused) so we can wire it
      back in cleanly later.
  */
  const cardWrapper =
    "relative z-10 shrink-0 snap-start transition-transform duration-300 ease-out " +
    "hover:scale-[1.06] hover:-translate-y-3 hover:!rotate-0 hover:z-30 hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]";

  return (
    <div className="relative mt-2 md:mt-4">
      {/* Mobile: horizontal scroll-snap row so the three cards sit side by
          side and the user can swipe through them instead of seeing them
          stacked vertically. Desktop: standard centered flex row. */}
      <div className="relative flex flex-row items-start gap-4 md:gap-6 md:justify-center px-4 md:px-2 py-6 md:py-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Card 1 — Recent work. Wrapped in `group/recent` so 3 mini case-study
            thumbnails can fan out from behind the card on hover. */}
        <div className={cn(cardWrapper, "group/recent")}>
          <ProjectThumbsFan />
          <StickyCard
            tone="orange"
            label="Recent work"
            description="See how I turn messy operation problems into shipped solutions."
            cta="Read case studies →"
            href="#selected-work"
            baseTilt="-rotate-2"
          />
        </div>

        {/* Card 2 — Introduction video. Opens a modal on click. Hover reveals
            the "In case you're tired of reading" caption above the card. */}
        <div className={cn(cardWrapper, "rotate-1")}>
          <VideoCard />
        </div>

        {/* Card 3 — Working with me */}
        <div className={cardWrapper}>
          <StickyCard
            tone="blue"
            label="Working with me"
            description="Notes from peers and mentees."
            cta="Read testimonials →"
            href="#working-with-me"
            baseTilt="-rotate-1"
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
        // Rounded portrait rectangle (matches benshih.design image (11))
        "h-[300px] w-[240px] md:h-[400px] md:w-[320px] rounded-[28px] overflow-hidden rotate-1",
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
        alt="Luis Sanchez speaking at a conference"
        width={640}
        height={800}
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

/* ===========================================================
   ProjectThumbsFan — 3 mini case-study chips that fan out from
   behind the Recent work card when it's hovered. Pure CSS;
   parent wrapper owns `group/recent`.
   =========================================================== */

const THUMB_TONES: Record<string, string> = {
  "pricing-intelligence-platform": "bg-gradient-to-br from-[#3a5b9a] to-[#1f2d52]",
  "enterprise-analytics-platform": "bg-gradient-to-br from-[#27695e] to-[#0f342f]",
  "causal-inference-evaluation-framework":
    "bg-gradient-to-br from-[#8a3b5d] to-[#3c1a29]",
};

function ProjectThumbsFan() {
  // Tailwind doesn't ship transform combinations in arbitrary properties at
  // runtime, so we list each thumb's resting offset/rotation + hover offset.
  // On hover they fan upward + outward, slightly fading in.
  const thumbs = CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
    title: cs.title,
    tone: THUMB_TONES[cs.slug] ?? "bg-[var(--color-surface)]",
  }));

  const slots = [
    // index 0: left, tilts further left, lifts up
    "left-[10%] top-1/2 -translate-x-[40%] -translate-y-1/2 rotate-[-6deg] group-hover/recent:-translate-x-[140%] group-hover/recent:-translate-y-[95%] group-hover/recent:rotate-[-14deg]",
    // index 1: center, lifts straight up
    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[2deg] group-hover/recent:-translate-y-[110%] group-hover/recent:rotate-[3deg]",
    // index 2: right, tilts further right
    "right-[10%] top-1/2 translate-x-[40%] -translate-y-1/2 rotate-[6deg] group-hover/recent:translate-x-[140%] group-hover/recent:-translate-y-[95%] group-hover/recent:rotate-[14deg]",
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {thumbs.map((t, i) => (
        <Link
          key={t.slug}
          href={`/case-studies/${t.slug}`}
          tabIndex={-1}
          className={cn(
            "group-hover/recent:pointer-events-auto absolute h-[110px] w-[140px] md:h-[120px] md:w-[160px] rounded-xl border border-white/10 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)]",
            t.tone,
            slots[i],
            "opacity-0 transition-all duration-500 ease-out",
            "group-hover/recent:opacity-100",
          )}
        >
          <div className="flex h-full flex-col justify-end p-3 text-[#fdf6ec]">
            <span className="font-mono uppercase tracking-[0.12em] text-[9px] opacity-70 mb-1">
              Case study
            </span>
            <span className="font-display text-[12px] md:text-[13px] leading-[1.15] text-[#fdf6ec]">
              {t.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
