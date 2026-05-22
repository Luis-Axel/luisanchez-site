"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#selected-work", label: "Work" },
  { href: "/about", label: "About" },
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
      {/* Desktop nav row — pinned, three-column layout (brand / nav / actions) */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between gap-3 px-5 md:px-8 lg:px-[40px] pt-4 transition-all duration-300",
          scrolled && "pt-3",
        )}
      >
        {/* LEFT — circular headshot + name */}
        <Link
          href="/"
          aria-label="Luis Sanchez — home"
          className={cn(
            "flex items-center gap-2.5 rounded-full border border-[var(--color-border)] backdrop-blur-md transition-all duration-300 pl-1.5 pr-3 py-1",
            scrolled
              ? "bg-[var(--color-bg-elev)]/95 shadow-[var(--shadow-pill)]"
              : "bg-[var(--color-bg-elev)]/70",
          )}
        >
          <span className="relative inline-block h-7 w-7 overflow-hidden rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]">
            <Image
              src="/img/headshot.png"
              alt="Luis Sanchez"
              width={56}
              height={56}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-[14px] text-[var(--color-text-strong)] leading-none">
            Luis Sanchez
          </span>
        </Link>

        {/* CENTER — primary nav pill */}
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full border px-2 py-1 text-sm transition-all duration-300",
            "border-[var(--color-border)] backdrop-blur-md",
            scrolled
              ? "bg-[var(--color-bg-elev)]/95 shadow-[var(--shadow-pill)]"
              : "bg-[var(--color-bg-elev)]/70",
          )}
        >
          {NAV.map((item) => {
            const isHome = item.href === "/";
            const active = isHome
              ? pathname === "/"
              : item.href.startsWith("/")
                ? pathname === item.href || pathname.startsWith(item.href + "/")
                : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full transition-colors leading-none",
                  active
                    ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — Say Hello + LinkedIn + Resume + theme toggle */}
        <div
          className={cn(
            "flex items-center gap-1 rounded-full border px-2 py-1 text-sm transition-all duration-300",
            "border-[var(--color-border)] backdrop-blur-md",
            scrolled
              ? "bg-[var(--color-bg-elev)]/95 shadow-[var(--shadow-pill)]"
              : "bg-[var(--color-bg-elev)]/70",
          )}
        >
          <a
            href="mailto:lsancheznj@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-[var(--color-text-strong)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] transition-colors leading-none"
          >
            <MailIcon className="h-3.5 w-3.5" />
            Say Hello
          </a>
          <a
            href="https://www.linkedin.com/in/luissanchez000"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] transition-colors"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href="/Sanchez_Luis_Resume.pdf"
            download
            aria-label="Download resume PDF"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] transition-colors"
            title="Download resume"
          >
            <ResumeIcon className="h-4 w-4" />
          </a>
          <span className="mx-0.5 h-5 w-px bg-[var(--color-border)]" />
          <ThemeToggle className="!h-7 !w-7" />
        </div>
      </header>

      {/* Mobile top — compact pill with headshot + theme toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 pt-3">
        <Link
          href="/"
          aria-label="Luis Sanchez — home"
          className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 backdrop-blur-md pl-1 pr-3 py-1 shadow-[var(--shadow-pill)]"
        >
          <span className="relative inline-block h-7 w-7 overflow-hidden rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]">
            <Image
              src="/img/headshot.png"
              alt="Luis Sanchez"
              width={56}
              height={56}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-[13px] text-[var(--color-text-strong)] leading-none">
            Luis Sanchez
          </span>
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 backdrop-blur-md px-1.5 py-1 shadow-[var(--shadow-pill)]">
          <a
            href="https://www.linkedin.com/in/luissanchez000"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center h-7 w-7 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href="/Sanchez_Luis_Resume.pdf"
            download
            aria-label="Download resume"
            className="inline-flex items-center justify-center h-7 w-7 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          >
            <ResumeIcon className="h-4 w-4" />
          </a>
          <ThemeToggle className="!h-7 !w-7" />
        </div>
      </header>

      {/* Mobile bottom-tab nav — Home / Work / About + Say Hello */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 backdrop-blur-md px-2 py-1.5 text-sm shadow-[var(--shadow-pill)]">
        {NAV.map((item) => {
          const isHome = item.href === "/";
          const active = isHome
            ? pathname === "/"
            : item.href.startsWith("/")
              ? pathname === item.href || pathname.startsWith(item.href + "/")
              : false;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-full transition-colors leading-none",
                active
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href="mailto:lsancheznj@gmail.com"
          className="px-3 py-1.5 rounded-full text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] leading-none"
        >
          Say Hello
        </a>
      </nav>
    </>
  );
}

/* ===========================================================
   Inline icons (no external lib needed for 3 marks)
   =========================================================== */

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ResumeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Document outline */}
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      {/* Download arrow */}
      <path d="M12 12v5" />
      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
    </svg>
  );
}
