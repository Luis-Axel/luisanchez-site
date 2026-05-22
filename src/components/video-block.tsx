"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * VideoCard — sits as the middle sticky card in the hero row. Looks like the
 * other sticky cards (tilted, same size, drop shadow) but acts as the click
 * target for the introduction video. The "In case you're tired of reading"
 * caption + arrow only appear on hover.
 *
 * Clicking opens a centered modal. Today the modal shows /press/speech.png
 * as a placeholder. When Luis drops a real loop at /public/hero/lui-video.mp4
 * the <Image> inside the modal can be swapped for a <video> element (TODO in
 * the modal body).
 */
export function VideoCard({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  // Close modal on Escape; lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Watch Luis introduce himself"
        className={cn(
          // Sized to match StickyCard's footprint so the row stays balanced.
          "group/video relative w-[240px] h-[280px] md:w-[280px] md:h-[320px]",
          "overflow-visible rounded-2xl",
          // Focus ring for keyboard users
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]",
          className,
        )}
      >
        {/* The clickable card surface */}
        <span
          className={cn(
            "relative block h-full w-full overflow-hidden rounded-2xl",
            "border-4 border-[var(--color-surface)] bg-black",
            "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.25)]",
          )}
        >
          <Image
            src="/hero/lui-poster.jpg"
            alt="Luis Sanchez"
            width={720}
            height={1280}
            className="h-full w-full object-cover"
            priority
          />
          {/* Dark wash for play-button contrast */}
          <span className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
          {/* Play overlay */}
          <span
            className="pointer-events-none absolute inset-0 grid place-items-center"
            aria-hidden
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover/video:scale-110">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="ml-1 fill-black"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </span>

        {/* Hover-only caption + arrow, positioned above the card. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-14 md:-top-16 left-1/2 -translate-x-1/2 z-30",
            "flex flex-col items-center gap-0.5",
            "opacity-0 transition-opacity duration-300 ease-out",
            "group-hover/video:opacity-100 group-hover/video:delay-100",
          )}
        >
          <span className="whitespace-nowrap font-hand text-[18px] md:text-[22px] text-[var(--color-accent)] leading-none">
            Proof, not just paragraphs.
          </span>
          <svg
            width="34"
            height="28"
            viewBox="0 0 34 28"
            fill="none"
            className="text-[var(--color-accent)]"
            aria-hidden
          >
            <path
              d="M4 2 C 12 4, 22 6, 24 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M18 16 L 24 22 L 30 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Luis Sanchez introduction video"
        >
          <div
            className="relative w-full max-w-[460px] rounded-[28px] overflow-hidden bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/hero/lui-video.mp4"
              poster="/hero/lui-poster.jpg"
              controls
              autoPlay
              playsInline
              className="h-auto w-full block"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/90 hover:bg-white text-black shadow-lg transition-transform hover:scale-105"
              aria-label="Close video"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
