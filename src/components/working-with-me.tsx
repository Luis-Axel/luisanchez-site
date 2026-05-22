import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * "What's it like working with me?" showcase — Luis cutout centered, six
 * testimonial cards arranged around him in three distinct visual styles:
 *
 * 1) LinkedIn-dark posts: real LinkedIn recommendations rebuilt in React
 *    (Chris McGinley, Timothy Park). Whole card links to the source.
 * 2) Cream "review quote" card: the Genpro manager performance review,
 *    sitting bottom-center BEHIND the cutout so the image's bottom edge
 *    visually meets the card instead of cutting off into the bg.
 * 3) Clean white "endorsement" cards: press quote + draft testimonials
 *    Luis can either confirm-and-keep or swap with real content.
 *
 * The cutout has a soft mask-image fade at its bottom so legs/feet
 * blend smoothly into the background instead of showing a hard cutoff.
 */

/* ----------------------------------------------------------------------------
   LinkedIn-style posts
---------------------------------------------------------------------------- */

type LinkedInPost = {
  name: string;
  title: string;
  avatar: string;
  connection?: string;
  verified?: boolean;
  meta: string;
  body: string[];
  href?: string;
  positionMd: string;
  widthMd?: string;
};

const POSTS: LinkedInPost[] = [
  {
    name: "Chris McGinley",
    title: "Logistics Co-op, United States Cold Storage",
    avatar: "/img/chris-mcginley.jpg",
    connection: "1st",
    verified: true,
    meta: "July 2024 · Chris worked with Luis at USCS",
    body: [
      "I am grateful for the opportunity to have been mentored by Luis Sanchez. His guidance and the way he invested in my development shaped how I approach problems and grow on the job.",
    ],
    href: "https://www.linkedin.com/posts/chrismcginly_i-am-grateful-for-the-opportunity-to-have-ugcPost-7211080013817724929-LN_x",
    positionMd:
      "absolute top-[1%] left-[1%] -rotate-3 z-20 md:w-[300px] lg:w-[330px]",
  },
  {
    name: "Timothy Park",
    title: "Technology Account Executive · Rutgers classmate",
    avatar: "/img/timothy-park.jpg",
    connection: "1st",
    verified: true,
    meta: "March 24, 2021 · Timothy and Luis studied together",
    body: [
      "On our semester-long supply chain project, Luis worked through complex logistical problems most of our group couldn't crack — then explained the math so simply that the team could confidently present it.",
    ],
    href: "https://www.linkedin.com/in/luissanchez000/details/recommendations/",
    positionMd:
      "absolute top-[36%] right-[-2%] rotate-2 z-20 md:w-[300px] lg:w-[330px]",
  },
];

/* ----------------------------------------------------------------------------
   White endorsement cards (press quotes + drafts)
---------------------------------------------------------------------------- */

type WhiteCard = {
  /** Top eyebrow label, e.g. "Press · USCS The Shield, Q2 2024" */
  source: string;
  /** Headline quote, large display */
  quote: string;
  /** Person's name */
  name: string;
  /** Title under name */
  title: string;
  /** Optional photo path */
  avatar?: string;
  /** Optional link to source */
  href?: string;
  /** If true, render a "DRAFT" badge so it's clear this still needs review */
  draft?: boolean;
  positionMd: string;
  widthMd?: string;
};

const WHITES: WhiteCard[] = [
  {
    source: "USCS · The Shield, Q2 2024",
    quote:
      "USCS's new SmartMove platform — the tool Luis led product dev and rollout of — has been a game changer for LTL load planning.",
    name: "Keith Mowery",
    title: "USCS · The Shield article",
    avatar: "/img/keith-mowery.jpg",
    href: "https://www.linkedin.com/posts/united-states-cold-storage-inc-_bestincold-bestinpeople-bestinlogistics-activity-7241601204802179072-6dev/",
    positionMd:
      "absolute top-[1%] right-[1%] rotate-2 z-20 md:w-[300px] lg:w-[330px]",
  },
  {
    source: "DRAFT · Data team peer, USCS",
    quote:
      "Working with Luis meant the analytics actually worked. He shipped the data layer the team relied on, then made sure the rest of us understood what we were looking at.",
    name: "[TODO: name]",
    title: "Data team peer · USCS",
    draft: true,
    positionMd:
      "absolute top-[36%] left-[-1%] -rotate-2 z-10 md:w-[290px] lg:w-[320px]",
  },
  {
    source: "DRAFT · Cross-functional partner",
    quote:
      "Luis treats data quality like reliability engineering — non-negotiable. The dashboards he built were the first I could trust without re-checking.",
    name: "[TODO: name]",
    title: "Operations / Finance partner",
    draft: true,
    positionMd:
      "absolute bottom-[12%] left-[2%] -rotate-1 z-10 md:w-[290px] lg:w-[320px]",
  },
];

/* ----------------------------------------------------------------------------
   Manager review (cream "paper" quote, sits bottom-center under the cutout)
---------------------------------------------------------------------------- */

type ReviewQuote = {
  source: string;
  attribution: string;
  quote: string;
  positionMd: string;
  widthMd?: string;
};

const REVIEW: ReviewQuote = {
  source: "Performance review",
  attribution: "Manager · Genpro",
  quote:
    "Luis is a strong catalyst for building scalable workflows, improving pricing operations, and turning complex process challenges into better systems.",
  // Bottom-center, wide — sits as a foundation card under the cutout.
  positionMd:
    "absolute bottom-[2%] left-1/2 -translate-x-1/2 rotate-[-1deg] z-30 md:w-[440px] lg:w-[500px]",
};

/* ============================================================================
   Component
============================================================================ */

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

      {/* Desktop showcase */}
      <div className="relative hidden md:block min-h-[760px] lg:min-h-[820px]">
        {/* Cutout — bottom-centered, faded out at the bottom so legs blend
            smoothly into the page bg instead of cutting off abruptly. */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pointer-events-none select-none">
          <div className="relative h-[440px] lg:h-[500px] aspect-[447/558]">
            <Image
              src="/img/luis-cutout.png"
              alt="Luis Sanchez"
              fill
              sizes="(min-width: 1024px) 400px, 350px"
              className={cn(
                "object-contain object-bottom",
                "drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]",
                // Soft mask-image fade at bottom — bottom 25% fades to transparent.
                "[mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]",
                "[-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]",
              )}
            />
          </div>
        </div>

        {/* Cards */}
        {POSTS.map((post, i) => (
          <LinkedInPostCard
            key={`p-${i}`}
            post={post}
            className={cn(post.positionMd, post.widthMd)}
          />
        ))}
        {WHITES.map((w, i) => (
          <WhiteEndorsementCard
            key={`w-${i}`}
            card={w}
            className={cn(w.positionMd, w.widthMd)}
          />
        ))}
        <ReviewQuoteCard
          quote={REVIEW}
          className={cn(REVIEW.positionMd, REVIEW.widthMd)}
        />
      </div>

      {/* Mobile stack */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="relative h-[240px]">
          <Image
            src="/img/luis-cutout.png"
            alt="Luis Sanchez"
            fill
            className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]"
            sizes="280px"
          />
        </div>
        <div className="flex flex-col gap-4">
          {POSTS.map((p, i) => (
            <LinkedInPostCard key={`mp-${i}`} post={p} />
          ))}
          {WHITES.map((w, i) => (
            <WhiteEndorsementCard key={`mw-${i}`} card={w} />
          ))}
          <ReviewQuoteCard quote={REVIEW} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   Card components
============================================================================ */

function VerifiedDot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 1.667 12.5 0l1.667 2.5L17 3.333l-.833 3.334L17 10l-2.833 1.667L13.333 15l-3.333-1L6.667 15l-.833-3.333L3 10l1.667-3.333L4 3.333 6.667 2.5 8.333 0 10 1.667Z" />
    </svg>
  );
}

function LinkedInPostCard({
  post,
  className,
}: {
  post: LinkedInPost;
  className?: string;
}) {
  const cardBase = cn(
    "block rounded-[14px] overflow-hidden transition-transform duration-300 ease-out",
    "bg-[#1b1f23] border border-white/[0.08]",
    "shadow-[0_24px_60px_-22px_rgba(0,0,0,0.75),0_2px_4px_rgba(0,0,0,0.25)]",
    "hover:!rotate-0 hover:scale-[1.03] hover:z-40",
    className,
  );

  const inner = (
    <>
      <div className="flex items-start gap-3 px-4 pt-4">
        <span className="relative shrink-0 h-12 w-12 rounded-full overflow-hidden bg-[#2a2f34] ring-1 ring-white/[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.avatar} alt={post.name} className="h-full w-full object-cover" loading="lazy" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[15px] font-semibold text-white leading-tight">{post.name}</span>
            {post.verified ? <VerifiedDot className="h-3.5 w-3.5 text-white/70" /> : null}
            {post.connection ? (
              <span className="text-[12px] text-white/45 leading-tight">· {post.connection}</span>
            ) : null}
          </div>
          <span className="block text-[12.5px] text-white/65 leading-tight mt-0.5">{post.title}</span>
          <span className="block text-[11.5px] text-white/45 leading-tight mt-1">{post.meta}</span>
        </div>
      </div>
      <div className="px-4 pt-3 pb-3 flex flex-col gap-2.5">
        {post.body.map((p, i) => (
          <p key={i} className="text-[13px] md:text-[13.5px] text-white/85 leading-[1.55]">{p}</p>
        ))}
      </div>
      <div className="flex items-center gap-4 px-4 pb-3 text-white/45 text-[11px]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M14 9V5a3 3 0 0 0-3-3l-1 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4Z" />
          </svg>
          Like
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a8 8 0 1 1-3.2-6.4L21 3v6h-6" />
          </svg>
          Comment
        </span>
        <span className="ml-auto text-[10px] font-medium text-white/50 uppercase tracking-[0.08em]">
          {post.href ? "View on LinkedIn ↗" : "LinkedIn"}
        </span>
      </div>
    </>
  );

  return post.href ? (
    <a href={post.href} target="_blank" rel="noreferrer" className={cardBase} aria-label={`${post.name} on LinkedIn`}>
      {inner}
    </a>
  ) : (
    <article className={cardBase}>{inner}</article>
  );
}

function WhiteEndorsementCard({
  card,
  className,
}: {
  card: WhiteCard;
  className?: string;
}) {
  const base = cn(
    "block rounded-[16px] overflow-hidden transition-transform duration-300 ease-out",
    "bg-white text-[#101828] border border-[#e5e7eb]",
    "shadow-[0_22px_50px_-22px_rgba(0,0,0,0.55),0_2px_4px_rgba(0,0,0,0.10)]",
    "hover:!rotate-0 hover:scale-[1.03] hover:z-40",
    card.draft && "opacity-95",
    className,
  );

  const inner = (
    <div className="flex flex-col gap-3 p-4 md:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-[#5d6c7a]">
          {card.source}
        </span>
        {card.draft ? (
          <span className="font-mono uppercase tracking-[0.12em] text-[9px] text-[#b54708] bg-[#fef0c7] rounded-full px-2 py-0.5">
            DRAFT
          </span>
        ) : null}
      </div>
      <p className="text-[14px] md:text-[15px] leading-[1.5] text-[#1f2a37]">
        “{card.quote}”
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-[#eef2f5]">
        <span className="relative shrink-0 h-9 w-9 rounded-full overflow-hidden bg-[#eef2f5]">
          {card.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.avatar} alt={card.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <span className="grid h-full w-full place-items-center text-[10px] font-mono uppercase tracking-wider text-[#5d6c7a]">
              {card.draft ? "?" : card.name[0]}
            </span>
          )}
        </span>
        <div className="flex-1 min-w-0">
          <span className="block text-[13px] font-semibold leading-tight text-[#101828]">
            {card.name}
          </span>
          <span className="block text-[11.5px] text-[#5d6c7a] leading-tight mt-0.5">
            {card.title}
          </span>
        </div>
        {card.href ? (
          <span className="ml-auto text-[10px] font-medium text-[#5d6c7a] uppercase tracking-[0.08em] whitespace-nowrap">
            Read ↗
          </span>
        ) : null}
      </div>
    </div>
  );

  return card.href ? (
    <a href={card.href} target="_blank" rel="noreferrer" className={base} aria-label={card.name}>
      {inner}
    </a>
  ) : (
    <article className={base}>{inner}</article>
  );
}

function ReviewQuoteCard({
  quote,
  className,
}: {
  quote: ReviewQuote;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "block rounded-[18px] p-5 md:p-6 transition-transform duration-300 ease-out",
        "bg-[#f5efe3] dark:bg-[#f5efe3] text-[#2a3530]",
        "border border-[#d8cdb6]",
        "shadow-[0_24px_60px_-22px_rgba(0,0,0,0.65),0_2px_4px_rgba(0,0,0,0.20)]",
        "hover:!rotate-0 hover:scale-[1.03] hover:z-40",
        className,
      )}
    >
      <span className="font-mono uppercase tracking-[0.14em] text-[10px] md:text-[11px] text-[#7a8a82]">
        {quote.source}
      </span>
      <div className="relative mt-3">
        <span
          aria-hidden
          className="font-display absolute -top-3 -left-1 text-[64px] leading-none text-[#02594e]/25 select-none pointer-events-none"
        >
          “
        </span>
        <p className="relative font-display text-[17px] md:text-[19px] leading-[1.4] tracking-[-0.005em] text-[#1f2a26]">
          {quote.quote}
        </p>
      </div>
      <span className="block mt-4 pt-3 border-t border-[#d8cdb6] text-[12px] md:text-[13px] text-[#5a6b66]">
        — {quote.attribution}
      </span>
    </article>
  );
}
