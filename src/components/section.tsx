import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "header" | "footer" | "div" | "article";
  bleed?: boolean; // when true, skip inner max-w so caller controls
  tone?: "default" | "cream";
  /**
   * Whether to wrap the inner content in a rounded "container box" — the
   * elevated card look benshih.design uses for every section after the hero.
   * Defaults to `true`. Set `boxed={false}` for the hero (sits flush at the
   * top of the page outside any container).
   */
  boxed?: boolean;
  /** Inner padding inside the box. Defaults are tuned for the standard look. */
  innerClassName?: string;
};

export function Section({
  as: Tag = "section",
  className,
  children,
  bleed = false,
  tone = "default",
  boxed = true,
  innerClassName,
  ...rest
}: SectionProps) {
  // Outer padding tuned for the boxed layout: the box has its own breathing
  // room, so we keep horizontal padding to bring it in from the viewport edge.
  const outerPad = boxed
    ? "px-4 md:px-6 lg:px-8"
    : "px-5 py-10 md:px-8 lg:px-[120px]";

  const boxClasses = boxed
    ? "rounded-[28px] md:rounded-[36px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-box)] p-6 md:p-10 lg:p-14"
    : "";

  const inner = (
    <div
      className={cn(
        "mx-auto w-full max-w-[1200px]",
        boxClasses,
        innerClassName,
      )}
    >
      {children}
    </div>
  );

  return (
    <Tag
      className={cn(
        outerPad,
        tone === "cream" && "bg-[var(--color-bg-cream)]",
        className,
      )}
      {...rest}
    >
      {bleed ? children : inner}
    </Tag>
  );
}
