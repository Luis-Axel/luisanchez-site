import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * "What's it like working with me?" showcase — Luis cutout centered with
 * testimonial chips arranged around him at varied tilts and pastel tones.
 * Inspired by benshih.design's same-named section.
 *
 * Desktop: absolute-positioned chips around the centerpiece.
 * Mobile: stacks vertically with the cutout on top and chips below.
 *
 * Chips data is hand-positioned inline (rather than data-driven) so each
 * card's tilt + screen position can be tuned individually. Two chips have
 * real quotes (Chris McGinley + the Bergen student awaiting transcription);
 * the rest are TODO placeholders styled identically so the visual stays
 * full while we collect real testimonials.
 */

type Chip = {
  name: string;
  context: string;
  quote: string;
  // Visual: which pastel color theme
  tone: "rose" | "amber" | "sky" | "violet" | "emerald";
  // Desktop position (Tailwind absolute classes + rotation)
  positionMd: string;
  // Optional initial for the avatar circle
  initial?: string;
  // Width override on desktop
  widthMd?: string;
  // Marker for TODO chips
  todo?: boolean;
};

const TONE_STYLES: Record<Chip["tone"], { card: string; avatar: string }> = {
  rose: {
    card: "border-rose-300/60 bg-rose-50 dark:border-rose-400/30 dark:bg-rose-900/15",
    avatar: "bg-rose-400 text-rose-50",
  },
  amber: {
    card: "border-amber-300/70 bg-amber-50 dark:border-amber-400/30 dark:bg-amber-900/15",
    avatar: "bg-amber-400 text-amber-50",
  },
  sky: {
    card: "border-sky-300/60 bg-sky-50 dark:border-sky-400/30 dark:bg-sky-900/15",
    avatar: "bg-sky-400 text-sky-50",
  },
  violet: {
    card: "border-violet-300/60 bg-violet-50 dark:border-violet-400/30 dark:bg-violet-900/15",
    avatar: "bg-violet-400 text-violet-50",
  },
  emerald: {
    card: "border-emerald-300/60 bg-emerald-50 dark:border-emerald-400/30 dark:bg-emerald-900/15",
    avatar: "bg-emerald-400 text-emerald-50",
  },
};

const CHIPS: Chip[] = [
  {
    name: "Chris McGinley",
    context: "Logistics Co-op, USCS",
    quote:
      "I am grateful for the opportunity to have been mentored by Luis Sanchez. His guidance and the way he invested in my development shaped how I approach problems and grow on the job.",
    tone: "rose",
    initial: "C",
    positionMd:
      "absolute top-[6%] left-[2%] -rotate-3 md:w-[300px] lg:w-[320px]",
  },
  {
    name: "[TODO: peer name]",
    context: "Engineering peer",
    quote:
      "[TODO — paste a peer's quote about working with Luis. Slack screenshot, LinkedIn recommendation, or written endorsement all work.]",
    tone: "amber",
    initial: "•",
    todo: true,
    positionMd:
      "absolute top-[2%] right-[4%] rotate-2 md:w-[280px] lg:w-[300px]",
  },
  {
    name: "[TODO: leadership name]",
    context: "Manager or director",
    quote:
      "[TODO — quote from a former manager or executive sponsor on what it was like to have Luis on the team.]",
    tone: "sky",
    initial: "•",
    todo: true,
    positionMd:
      "absolute bottom-[8%] left-[4%] -rotate-2 md:w-[300px] lg:w-[320px]",
  },
  {
    name: "[TODO: name]",
    context: "Bergen Community College",
    quote:
      "[TODO: paste the actual recommendation text from public/press/linkedin-review-from-college.png.]",
    tone: "violet",
    initial: "•",
    todo: true,
    positionMd:
      "absolute bottom-[2%] right-[2%] rotate-3 md:w-[290px] lg:w-[310px]",
  },
  {
    name: "[TODO: name]",
    context: "Cross-functional partner",
    quote:
      "[TODO — quote from Finance, Sales, Ops, or another team you partnered with at USCS or Genpro.]",
    tone: "emerald",
    initial: "•",
    todo: true,
    positionMd:
      "absolute top-[44%] right-[0%] rotate-1 md:w-[260px] lg:w-[280px]",
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

      {/* Desktop showcase — cutout + absolutely positioned chips */}
      <div className="relative hidden md:block min-h-[640px] lg:min-h-[720px]">
        {/* Cutout image — bottom-centered */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
          <div className="relative h-[520px] lg:h-[600px] aspect-[3/4]">
            <Image
              src="/img/luis-cutout.png"
              alt="Luis Sanchez"
              fill
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              sizes="(min-width: 1024px) 450px, 390px"
              priority={false}
            />
          </div>
        </div>

        {/* Chips */}
        {CHIPS.map((chip, i) => (
          <ChipCard key={i} chip={chip} className={chip.positionMd} />
        ))}
      </div>

      {/* Mobile stack — cutout above, chips below in a single column */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="relative h-[320px]">
          <Image
            src="/img/luis-cutout.png"
            alt="Luis Sanchez"
            fill
            className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            sizes="320px"
          />
        </div>
        <div className="flex flex-col gap-4">
          {CHIPS.map((chip, i) => (
            <ChipCard key={i} chip={chip} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipCard({ chip, className }: { chip: Chip; className?: string }) {
  const tone = TONE_STYLES[chip.tone];
  return (
    <article
      className={cn(
        "relative rounded-2xl border p-4 md:p-5 backdrop-blur-sm",
        "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45),0_2px_4px_rgba(0,0,0,0.10)]",
        tone.card,
        chip.todo && "opacity-90",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            "shrink-0 grid place-items-center h-8 w-8 rounded-full text-[13px] font-semibold leading-none",
            tone.avatar,
          )}
        >
          {chip.initial ?? chip.name[0]}
        </span>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-[14px] md:text-[15px] text-[var(--color-text-strong)] leading-tight">
              {chip.name}
            </span>
            {chip.todo ? (
              <span className="font-mono uppercase tracking-[0.12em] text-[9px] text-[var(--color-text-muted)]">
                TODO
              </span>
            ) : null}
          </div>
          <span className="text-[11px] md:text-[12px] text-[var(--color-text-muted)] block leading-tight">
            {chip.context}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[13px] md:text-[14px] text-[var(--color-text-primary)] leading-[1.55]">
        {chip.todo ? chip.quote : `“${chip.quote}”`}
      </p>
    </article>
  );
}
