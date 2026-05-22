"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Hero video block. Shows a small clickable thumbnail with a handwritten
 * "In case you're tired of reading" caption + an arrow. Clicking opens a
 * modal that plays the video.
 *
 * Current placeholder: uses /press/speech.png as a stand-in. When Luis drops
 * a real loop at /public/hero/lui-video.mp4, swap the <Image> in the modal
 * for a <video src=".../lui-video.mp4" autoPlay controls playsInline />.
 */
export function VideoBlock() {
  const [open, setOpen] = React.useState(false);

  // Close on Escape; lock body scroll while open.
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
      <div className="mt-6 md:mt-10 flex flex-col items-center gap-1">
        {/* Handwritten caption above the video */}
        <span className="font-hand text-[20px] md:text-[24px] text-[var(--color-primary)] leading-none">
          In case you&apos;re tired of reading
        </span>
        {/* Curly arrow pointing down at the video */}
        <svg
          width="40"
          height="34"
          viewBox="0 0 40 34"
          fill="none"
          aria-hidden
          className="text-[var(--color-primary)] -mt-1 mb-1"
        >
          <path
            d="M4 2 C 14 2, 26 4, 28 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M22 18 L 28 24 L 34 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Watch Luis introduce himself"
          className="group relative h-[220px] w-[180px] md:h-[260px] md:w-[210px] overflow-hidden rounded-[24px] border-4 border-[var(--color-surface)] bg-black shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] rotate-[-2deg] transition-transform duration-300 ease-out hover:scale-[1.04] hover:rotate-0"
        >
          <Image
            src="/press/speech.png"
            alt="Luis Sanchez"
            width={420}
            height={520}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/30" aria-hidden />
          <span
            className="absolute inset-0 grid place-items-center"
            aria-hidden
          >
            <span className="grid place-items-center h-14 w-14 rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-black translate-x-[1px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Luis Sanchez introduction video"
        >
          <div
            className="relative w-full max-w-[460px] rounded-[28px] overflow-hidden bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/press/speech.png"
              alt="Luis Sanchez introduction (placeholder)"
              width={800}
              height={1000}
              className="h-auto w-full"
              priority
            />
            {/*
              TODO(lui): drop a real video at /public/hero/lui-video.mp4 and
              replace the <Image> above with:

              <video
                src="/hero/lui-video.mp4"
                controls
                autoPlay
                playsInline
                className="h-auto w-full"
              />
            */}
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
            <div className="absolute bottom-4 left-4 right-4 rounded-full bg-black/55 backdrop-blur-sm px-4 py-2 text-center text-[12px] text-white/90">
              Placeholder — real video lands at <span className="font-mono">/hero/lui-video.mp4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
