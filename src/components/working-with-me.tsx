import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * "What's it like working with me?" showcase — Luis cutout centered with
 * authentic LinkedIn-post cards arranged around him.
 *
 * Each card is a React-built LinkedIn post (not a screenshot): real avatar
 * photo, real name + verified glyph + connection level, real role, real
 * date + relation line, real quote text. The whole card links to the
 * original LinkedIn post URL. Mirrors LinkedIn's dark-mode visual language
 * so the cards stand cleanly against the site's dark teal background.
 *
 * When Luis collects more LinkedIn recommendations, drop the recommender's
 * profile photo into /public/img/<slug>.jpg and add a new POSTS entry.
 */

type LinkedInPost = {
  /** Author's name */
  name: string;
  /** Job title shown under the name */
  title: string;
  /** Author's profile photo path under /public */
  avatar: string;
  /** Connection level shown next to the name (e.g. "1st") */
  connection?: string;
  /** Whether to render the small verified checkmark next to the name */
  verified?: boolean;
  /** Date + relation line (e.g. "March 24, 2021, Timothy and Luis studied together") */
  meta: string;
  /** Quote — paragraphs */
  body: string[];
  /** Optional link to the LinkedIn post itself */
  href?: string;
  /** Desktop absolute-position + rotation classes */
  positionMd: string;
  /** Desktop width override */
  widthMd?: string;
};

const POSTS: LinkedInPost[] = [
  {
    name: "Chris McGinley",
    title: "Logistics Co-op, United States Cold Storage",
    avatar: "/img/chris-mcginley.jpg",
    connection: "1st",
    verified: true,
    meta: "July 2024 · Chris worked with Luis at United States Cold Storage",
    body: [
      "I am grateful for the opportunity to have been mentored by Luis Sanchez. His guidance and the way he invested in my development shaped how I approach problems and grow on the job.",
    ],
    href: "https://www.linkedin.com/posts/chrismcginly_i-am-grateful-for-the-opportunity-to-have-ugcPost-7211080013817724929-LN_x",
    positionMd:
      "absolute top-[1%] left-[1%] -rotate-3 z-20 md:w-[320px] lg:w-[360px]",
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
      "absolute bottom-[2%] right-[1%] rotate-3 z-20 md:w-[320px] lg:w-[360px]",
  },
  // DRAFT entries — content Luis should review/edit before launch. Marked
  // visually with a "DRAFT" badge in place of the verified glyph so it's
  // obvious which still need a green light.
  {
    name: "Former teammate",
    title: "Reported to Luis at United States Cold Storage",
    avatar: "",
    meta: "DRAFT · Confirm voice, name, and consent before launch",
    body: [
      "Luis built an environment where my work mattered. He handed me hard problems, taught me how to think through them, and trusted me to ship. I grew more in the year he led our team than in any role since.",
    ],
    positionMd:
      "absolute top-[4%] right-[3%] rotate-2 z-10 md:w-[320px] lg:w-[350px]",
  },
  {
    name: "Cross-functional partner",
    title: "Operations / Finance partner, USCS",
    avatar: "",
    meta: "DRAFT · Confirm voice, name, and consent before launch",
    body: [
      "Working with Luis meant I stopped having to translate between Operations and Engineering. He spoke both languages, shipped what we asked for, and pushed back honestly when we were asking for the wrong thing.",
    ],
    positionMd:
      "absolute top-[42%] right-[-1%] rotate-1 z-10 md:w-[280px] lg:w-[300px]",
  },
];

// A separate quote-style card variant for endorsements that aren't LinkedIn
// posts (e.g. performance review excerpts, internal Slack quotes). Stays
// visually distinct so the showcase doesn't read as five identical chips.
type QuoteCard = {
  /** Short attribution shown under the quote */
  attribution: string;
  /** Source label shown above the quote (e.g. "Performance review · USCS") */
  source: string;
  /** Quote text */
  quote: string;
  positionMd: string;
  widthMd?: string;
};

const QUOTES: QuoteCard[] = [
  {
    source: "Performance review",
    attribution: "Manager · Genpro",
    quote:
      "Luis is a strong catalyst for building scalable workflows, improving pricing operations, and turning complex process challenges into better systems.",
    // Bottom-center, wide — sits like a foundation card UNDER the cutout so
    // the image's bottom edge appears to land on it instead of cutting off
    // abruptly into background.
    positionMd:
      "absolute bottom-[2%] left-1/2 -translate-x-1/2 rotate-[-1deg] z-30 md:w-[460px] lg:w-[520px]",
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

      {/* Desktop showcase */}
      <div className="relative hidden md:block min-h-[720px] lg:min-h-[780px]">
        {/*
          Cutout — bottom-centered, sized slightly smaller than before so it
          doesn't dominate, and sitting BEHIND the bottom-center quote card
          (which is z-30) so the image's bottom edge transitions onto the
          card instead of cutting off abruptly. Cutout is z-10.
        */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pointer-events-none select-none">
          <div className="relative h-[480px] lg:h-[540px] aspect-[3/4]">
            <Image
              src="/img/luis-cutout.png"
              alt="Luis Sanchez"
              fill
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              sizes="(min-width: 1024px) 405px, 360px"
            />
          </div>
        </div>

        {POSTS.map((post, i) => (
          <LinkedInPostCard
            key={i}
            post={post}
            className={cn(post.positionMd, post.widthMd)}
          />
        ))}
        {QUOTES.map((q, i) => (
          <ReviewQuoteCard
            key={`q-${i}`}
            quote={q}
            className={cn(q.positionMd, q.widthMd)}
          />
        ))}
      </div>

      {/* Mobile stack */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="relative h-[260px]">
          <Image
            src="/img/luis-cutout.png"
            alt="Luis Sanchez"
            fill
            className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            sizes="280px"
          />
        </div>
        <div className="flex flex-col gap-4">
          {POSTS.map((post, i) => (
            <LinkedInPostCard key={i} post={post} />
          ))}
          {QUOTES.map((q, i) => (
            <ReviewQuoteCard key={`q-${i}`} quote={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VerifiedDot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
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
  const isTodo = !post.avatar;
  const cardBase = cn(
    "block rounded-[14px] overflow-hidden transition-transform duration-300 ease-out",
    // LinkedIn dark-mode-ish surface so cards pop against the page bg.
    "bg-[#1b1f23] border border-white/[0.08]",
    "shadow-[0_24px_60px_-22px_rgba(0,0,0,0.75),0_2px_4px_rgba(0,0,0,0.25)]",
    "hover:!rotate-0 hover:scale-[1.03] hover:z-40",
    isTodo && "opacity-90",
    className,
  );

  const inner = (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-4">
        <span className="relative shrink-0 h-12 w-12 rounded-full overflow-hidden bg-[#2a2f34] ring-1 ring-white/[0.06]">
          {post.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.avatar}
              alt={post.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-[10px] font-mono uppercase tracking-wider text-white/40">
              TODO
            </span>
          )}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[15px] font-semibold text-white leading-tight">
              {post.name}
            </span>
            {post.verified ? (
              <VerifiedDot className="h-3.5 w-3.5 text-white/70" />
            ) : null}
            {post.connection ? (
              <span className="text-[12px] text-white/45 leading-tight">
                · {post.connection}
              </span>
            ) : null}
          </div>
          <span className="block text-[12.5px] text-white/65 leading-tight mt-0.5">
            {post.title}
          </span>
          <span className="block text-[11.5px] text-white/45 leading-tight mt-1">
            {post.meta}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-3 flex flex-col gap-2.5">
        {post.body.map((paragraph, i) => (
          <p
            key={i}
            className="text-[13px] md:text-[13.5px] text-white/85 leading-[1.55]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer (like / comment glyphs to read as LinkedIn) */}
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

  return post.href && !isTodo ? (
    <a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      className={cardBase}
      aria-label={`${post.name} on LinkedIn`}
    >
      {inner}
    </a>
  ) : (
    <article className={cardBase}>{inner}</article>
  );
}

function ReviewQuoteCard({
  quote,
  className,
}: {
  quote: QuoteCard;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "block rounded-[18px] p-5 md:p-6 transition-transform duration-300 ease-out",
        // Warm paper-feel surface that contrasts with the LinkedIn cards.
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
        <p className="relative font-display text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.005em] text-[#1f2a26]">
          {quote.quote}
        </p>
      </div>
      <span className="block mt-4 pt-3 border-t border-[#d8cdb6] text-[12px] md:text-[13px] text-[#5a6b66]">
        — {quote.attribution}
      </span>
    </article>
  );
}
