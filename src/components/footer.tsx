import * as React from "react";
import Link from "next/link";

const PRIMARY_LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "mailto:lsancheznj@gmail.com", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/luissanchez000", label: "LinkedIn" },
  { href: "mailto:lsancheznj@gmail.com", label: "Email" },
  { href: "tel:+19733068631", label: "973.306.8631" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24 pb-24 md:pb-12">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-[120px] py-12 grid gap-10 md:grid-cols-[1fr_auto_auto]">
        <div className="flex flex-col gap-3">
          <span className="font-display text-[20px] text-[var(--color-text-strong)]">
            Lui Sanchez
          </span>
          <p className="text-[14px] text-[var(--color-text-primary)] max-w-[420px] leading-[1.55]">
            Data engineer & analytics builder. Currently leading data at Genpro.
            Based in Lodi, NJ.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-[14px]">
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)] mb-1">
            Site
          </span>
          {PRIMARY_LINKS.map((l) =>
            l.href.startsWith("mailto:") ? (
              <a
                key={l.href}
                href={l.href}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <nav className="flex flex-col gap-2 text-[14px]">
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)] mb-1">
            Elsewhere
          </span>
          {SOCIAL_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-[120px] flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[12px] text-[var(--color-text-muted)]">
        <span>© {new Date().getFullYear()} Luis Sanchez. Built with Next.js + Tailwind.</span>
        <span>Lodi, NJ</span>
      </div>
    </footer>
  );
}
