"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "mailto:lsancheznj@gmail.com", label: "Contact", external: true },
];

export function NavPill() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top desktop nav — always rendered, intensifies after 80px scroll */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-300",
          scrolled && "pt-3",
        )}
      >
        <nav
          className={cn(
            "hidden md:flex items-center gap-1 rounded-full border px-2 py-1.5 text-sm transition-all duration-300",
            "border-[var(--color-border)] backdrop-blur-md",
            scrolled
              ? "bg-[var(--color-bg-elev)]/95 shadow-[var(--shadow-pill)]"
              : "bg-[var(--color-bg-elev)]/70",
          )}
        >
          <Link
            href="/"
            className="px-3 py-1.5 font-display text-[15px] text-[var(--color-text-strong)] hover:text-[var(--color-primary)]"
          >
            Lui Sanchez
          </Link>
          <span className="mx-1 h-5 w-px bg-[var(--color-border)]" />
          {NAV.map((item) => {
            const active =
              !item.external &&
              (pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full transition-colors",
                  active
                    ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-[var(--color-border)]" />
          <ThemeToggle className="!h-7 !w-7" />
        </nav>

        {/* Mobile: compact pill with logo + theme toggle */}
        <nav className="md:hidden flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 backdrop-blur-md px-3 py-1.5 text-sm shadow-[var(--shadow-pill)]">
          <Link
            href="/"
            className="px-2 py-1 font-display text-[14px] text-[var(--color-text-strong)]"
          >
            Lui Sanchez
          </Link>
          <ThemeToggle className="!h-7 !w-7" />
        </nav>
      </header>

      {/* Mobile bottom-tab pill nav */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 backdrop-blur-md px-2 py-1.5 text-sm shadow-[var(--shadow-pill)]">
        {NAV.map((item) => {
          const active =
            !item.external &&
            (pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-full transition-colors",
                active
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
