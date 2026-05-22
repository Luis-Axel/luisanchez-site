import * as React from "react";
import { cn } from "@/lib/utils";

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
