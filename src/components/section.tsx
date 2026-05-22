import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "header" | "footer" | "div" | "article";
  bleed?: boolean; // when true, skip inner max-w so caller controls
  tone?: "default" | "cream";
};

export function Section({
  as: Tag = "section",
  className,
  children,
  bleed = false,
  tone = "default",
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "px-5 py-10 md:px-8 lg:px-[120px]",
        tone === "cream" && "bg-[var(--color-bg-cream)]",
        className,
      )}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto max-w-[1200px]">{children}</div>
      )}
    </Tag>
  );
}
