import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * "What's it like working with me?" showcase — Luis cutout centered with
 * real social-post SCREENSHOTS framed as tilted cards arranged around him.
 *
 * Pattern from benshih.design: the cards are visually authentic because they
 * ARE authentic — they're actual LinkedIn / Slack / email screenshots, just
 * framed with rounded corners, a subtle border, and a slight rotation. Fake
 * avatar+initial chips never read as real.
 *
 * Currently 2 real screenshots ship + 3 TODO slots styled identically so the
 * grid stays full while Lui collects more screenshots. Once he sends the
 * photos/URLs for additional LinkedIn recommendations, drop a screenshot at
 * /public/press/<slug>.png and replace the corresponding TODO entry in
 * SHOWCASE below.
 *
 * Desktop: absolute-positioned cards around the cutout, varied tilts.
 * Mobile: stacks vertically with cutout on top.
 */

type Card = {
  /** Path under /public to the screenshot; falls back to TODO if missing */
  src?: string;
  /** Short label shown above the card (e.g. "LinkedIn — Chris McGinley") */
  label: string;
  /** Optional source URL clicked through */
  href?: string;
  /** TODO description if there's no real screenshot yet */
  todoNote?: string;
  /** Desktop absolute-position + rotation classes */
  positionMd: string;
  /** Override aspect ratio of the screenshot frame */
  aspect?: string;
  /** Desktop width override */
  widthMd?: string;
};

const SHOWCASE: Card[] = [
  {
    label: "LinkedIn · Chris McGinley",
    src: "/press/coop-thanks.png",
    href: "https://www.linkedin.com/posts/chrismcginly_i-am-grateful-for-the-opportunity-to-have-ugcPost-7211080013817724929-LN_x",
    aspect: "aspect-[4/5]",
    widthMd: "md:w-[280px] lg:w-[300px]",
    positionMd:
      "absolute top-[2%] left-[1%] -rotate-3 z-20",
  },
  {
    label: "LinkedIn · Bergen Community College",
    src: "/press/linkedin-review-from-college.png",
    aspect: "aspect-[4/5]",
    widthMd: "md:w-[270px] lg:w-[290px]",
    positionMd:
      "absolute bottom-[3%] right-[2%] rotate-3 z-20",
  },
  {
    label: "TODO · Engineering peer",
    todoNote:
      "Drop a LinkedIn recommendation or Slack screenshot at /public/press/<slug>.png and wire it in.",
    aspect: "aspect-[4/5]",
    widthMd: "md:w-[260px] lg:w-[280px]",
    positionMd:
      "absolute top-[4%] right-[3%] rotate-2 z-10",
  },
  {
    label: "TODO · Manager / Director",
    todoNote:
      "LinkedIn recommendation or written endorsement from a former manager.",
    aspect: "aspect-[4/5]",
    widthMd: "md:w-[260px] lg:w-[280px]",
    positionMd:
      "absolute bottom-[8%] left-[3%] -rotate-2 z-10",
  },
  {
    label: "TODO · Cross-functional partner",
    todoNote:
      "Finance / Sales / Ops partner who collaborated with you on a shipped project.",
    aspect: "aspect-[4/5]",
    widthMd: "md:w-[240px] lg:w-[260px]",
    positionMd:
      "absolute top-[42%] right-[-1%] rotate-1 z-10",
  },
];

export function WorkingWithMeShowcase() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {/* Heading */}
      <header className="flex flex-col gap-3 items-center text-center max-w-[760px] mx-auto">
        <h2 className="font-display text-[var(--color-text-strong)] text-[34px] md:text-[52px] tracking-[-0.02em] leading-[1.05]">
          What&apos;s it like working with me?
        </h2>
        <p className="text-[16px] md:text-[19px] text-[var(--color-text-primary)] leading-[1.55] max-w-[600px]">
          I believe in working hard and being kind. Amazing things tend to
          follow.
        </p>
      </header>

      {/* Desktop showcase — cutout + absolutely positioned screenshot cards */}
      <div className="relative hidden md:block min-h-[680px] lg:min-h-[760px]">
        {/* Cutout image — bottom-centered, behind the cards */}
        <div className="absolute inset-x-0 bottom-0 z-0 flex justify-center pointer-events-none select-none">
          <div className="relative h-[540px] lg:h-[620px] aspect-[3/4]">
            <Image
              src="/img/luis-cutout.png"
              alt="Luis Sanchez"
              fill
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              sizes="(min-width: 1024px) 465px, 405px"
              priority={false}
            />
          </div>
        </div>

        {/* Cards */}
        {SHOWCASE.map((card, i) => (
          <ScreenshotCard
            key={i}
            card={card}
            className={cn(card.positionMd, card.widthMd)}
          />
        ))}
      </div>

      {/* Mobile stack */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="relative h-[300px]">
          <Image
            src="/img/luis-cutout.png"
            alt="Luis Sanchez"
            fill
            className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            sizes="320px"
          />
        </div>
        <div className="flex flex-col gap-4">
          {SHOWCASE.map((card, i) => (
            <ScreenshotCard key={i} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenshotCard({
  card,
  className,
}: {
  card: Card;
  className?: string;
}) {
  const aspect = card.aspect ?? "aspect-[4/5]";
  const cardClasses = cn(
    "group/card block rounded-2xl overflow-hidden",
    "bg-[var(--color-surface)] border border-[var(--color-border-strong)]",
    "shadow-[0_22px_50px_-22px_rgba(0,0,0,0.65),0_2px_6px_rgba(0,0,0,0.20)]",
    "transition-transform duration-300 ease-out",
    "hover:!rotate-0 hover:scale-[1.03] hover:z-40",
    className,
  );

  // If real screenshot — render the image card
  if (card.src) {
    const Inner = (
      <>
        <div className={cn("w-full bg-black/[0.04] dark:bg-white/[0.04]", aspect)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={card.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="block px-3 py-2 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-text-muted)] truncate">
          {card.label}
        </span>
      </>
    );
    return card.href ? (
      <a
        href={card.href}
        target="_blank"
        rel="noreferrer"
        className={cardClasses}
        aria-label={card.label}
      >
        {Inner}
      </a>
    ) : (
      <article className={cardClasses}>{Inner}</article>
    );
  }

  // TODO placeholder — styled to look like the real cards
  return (
    <article className={cn(cardClasses, "opacity-95")}>
      <div
        className={cn(
          aspect,
          "relative grid place-items-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-cream)] border-b border-[var(--color-border)]",
        )}
      >
        {/* Skeleton "LinkedIn post" layout */}
        <div className="absolute inset-0 p-4 flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <div className="h-9 w-9 rounded-full bg-[var(--color-border-strong)]" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-2.5 w-2/3 rounded bg-[var(--color-border-strong)]" />
              <div className="h-2 w-1/3 rounded bg-[var(--color-border)]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="h-2 w-full rounded bg-[var(--color-border)]" />
            <div className="h-2 w-[92%] rounded bg-[var(--color-border)]" />
            <div className="h-2 w-[85%] rounded bg-[var(--color-border)]" />
            <div className="h-2 w-[70%] rounded bg-[var(--color-border)]" />
          </div>
          <div className="mt-auto flex items-center gap-3 text-[var(--color-text-muted)]">
            <span className="inline-block h-3 w-3 rounded-full bg-[var(--color-border-strong)]" />
            <span className="inline-block h-3 w-3 rounded-full bg-[var(--color-border-strong)]" />
            <span className="ml-auto inline-block h-2 w-10 rounded bg-[var(--color-border)]" />
          </div>
        </div>
        <span className="absolute top-3 right-3 font-mono uppercase tracking-[0.12em] text-[9px] text-[var(--color-text-muted)] bg-[var(--color-bg-elev)]/80 rounded-full px-2 py-0.5 border border-[var(--color-border)]">
          TODO
        </span>
      </div>
      <span className="block px-3 py-2 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-text-muted)] truncate">
        {card.label}
      </span>
    </article>
  );
}
