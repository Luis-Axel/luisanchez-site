import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type StickyTone = "orange" | "green" | "blue";

const TONE_BG: Record<StickyTone, string> = {
  orange: "bg-[#a8542d]",
  green: "bg-[#1f3d36]",
  blue: "bg-[#2c4d63]",
};

export type StickyCardProps = {
  label: string;
  description: string;
  cta: string;
  href: string;
  tone: StickyTone;
  /** Tailwind transform classes applied on group-hover for the fan-out. */
  hoverTransform?: string;
  /** Base tilt applied at rest. */
  baseTilt?: string;
  className?: string;
};

/**
 * A single hand-placed sticky note. Three of these sit side by side in the
 * hero row; the parent container owns the `group` class so the cards fan
 * outward on hover via `group-hover:` transform classes.
 */
export function StickyCard({
  label,
  description,
  cta,
  href,
  tone,
  hoverTransform = "",
  baseTilt = "rotate-0",
  className,
}: StickyCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        // Card frame
        "relative flex flex-col justify-between",
        "w-[240px] h-[280px] md:w-[280px] md:h-[320px]",
        "rounded-2xl p-5 md:p-6",
        "text-[#fdf6ec]",
        TONE_BG[tone],
        // Subtle paper shadow
        "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.25)]",
        // Hover motion (transform + slight elevate). The parent owns the
        // `group` class so all three fan out together.
        "transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        baseTilt,
        hoverTransform,
        // Focus ring for keyboard users
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]",
        className,
      )}
    >
      <h3 className="font-display text-[22px] md:text-[26px] leading-tight tracking-[-0.01em] text-[#fdf6ec]">
        {label}
      </h3>
      <p className="text-[13px] md:text-[14px] leading-[1.45] text-[#fdf6ec]/85">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 self-start rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-medium text-[#fdf6ec]">
        {cta}
      </span>
    </Link>
  );
}
