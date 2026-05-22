import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-[var(--shadow-button)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px]",
  ghost:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
  outline:
    "border border-[var(--color-border-strong)] text-[var(--color-text-strong)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
};

type AnchorProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

export function Button(props: AnchorProps | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    trailingIcon,
    leadingIcon,
  } = props;

  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const {
      href,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      trailingIcon: _t,
      leadingIcon: _l,
      ...rest
    } = props;
    void _v;
    void _s;
    void _c;
    void _ch;
    void _t;
    void _l;
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a className={cls} href={href} {...rest}>
          {leadingIcon}
          <span>{children}</span>
          {trailingIcon}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {leadingIcon}
        <span>{children}</span>
        {trailingIcon}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    trailingIcon: _t,
    leadingIcon: _l,
    ...rest
  } = props as ButtonAsButton;
  void _v;
  void _s;
  void _c;
  void _ch;
  void _t;
  void _l;
  return (
    <button className={cls} {...rest}>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
