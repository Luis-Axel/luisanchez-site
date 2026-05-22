import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  name: string;
  context: string;
  relationship: string;
  quote: string;
  screenshot?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  className?: string;
};

export function TestimonialCard({
  name,
  context,
  relationship,
  quote,
  screenshot,
  sourceUrl,
  sourceLabel = "View source",
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-5 border border-[var(--color-border)] rounded-[16px] p-6 md:p-7 bg-[var(--color-surface)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] md:text-[11px] text-[var(--color-text-muted)]">
          {relationship}
        </span>
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          >
            {sourceLabel} ↗
          </a>
        ) : null}
      </div>

      <blockquote className="text-[16px] md:text-[18px] leading-[1.55] text-[var(--color-text-primary)]">
        “{quote}”
      </blockquote>

      <div className="mt-auto flex items-end justify-between gap-3 pt-2 border-t border-[var(--color-border)]">
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-[15px] md:text-[16px] text-[var(--color-text-strong)]">
            {name}
          </span>
          <span className="text-[12px] md:text-[13px] text-[var(--color-text-muted)]">
            {context}
          </span>
        </div>
      </div>

      {screenshot ? (
        <div className="rounded-[10px] overflow-hidden border border-[var(--color-border)] bg-black/[0.03] dark:bg-white/[0.04]">
          <Image
            src={screenshot}
            alt={`Screenshot: ${name} — ${context}`}
            width={1200}
            height={900}
            className="w-full h-auto object-contain"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : null}
    </article>
  );
}
