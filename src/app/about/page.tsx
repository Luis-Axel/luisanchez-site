import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { Button, ArrowRight } from "@/components/button";
import { YearRail } from "@/components/year-rail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Lui Sanchez",
  description:
    "Background, current role, work timeline, and how to reach Lui Sanchez.",
};

const TIMELINE = [
  {
    year: "2025 —",
    role: "Data Manager",
    org: "Genpro",
    body: "Leading a 4-person data team. Built and shipped the ML pricing intelligence platform; standing up enterprise data governance and replacing legacy EDI middleware with internal systems.",
  },
  {
    year: "2024",
    role: "Supervisor, Data & Automation",
    org: "USCS",
    body: "Led an 11-person team across data engineering, ML, and automation. Shipped the enterprise analytics platform and the causal-inference evaluation framework used to validate $9.3M+ in ML-driven savings.",
  },
  {
    year: "2022 — 2024",
    role: "Automation Specialist",
    org: "USCS",
    body: "Built ML, computer vision, and RPA automations across 26 cold-storage sites. Procurement, inventory, fulfillment — wherever a workflow needed to become a system.",
  },
  {
    year: "2022",
    role: "Systems Analyst",
    org: "USCS",
    body: "Moved from analytics into systems work — building the connective tissue between operational software, the warehouse, and downstream reporting.",
  },
  {
    year: "2021",
    role: "Logistics Analyst",
    org: "USCS",
    body: "Operational analytics on cold-storage logistics — the foundation everything after this was built on.",
  },
];

const SIDE = [
  {
    year: "2026 —",
    role: "Cofounder",
    org: "Macro",
    body: "Consumer-health AI product built on top of model APIs. Current side project.",
  },
  {
    year: "2023 — 2025",
    role: "Cofounder",
    org: "Mutuall",
    body: "Freight rate intelligence SaaS unifying broker rate data into a common warehouse model. Sunset after a 2-year cycle.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 md:pt-16 lg:pt-24">
        <Hero
          eyebrow={
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              About
            </>
          }
          title={
            <>
              Five years building data and automation systems where
              operations and software meet.
            </>
          }
          intro="BS Supply Chain, Rutgers (Summa Cum Laude). Five years across freight brokerage and cold-storage operators shipping ML, analytics, and automation that runs in production. Currently Data Manager at Genpro, leading a 4-person team supporting GTM strategy."
        >
          <div className="flex flex-wrap gap-3 mt-2">
            <Button href="mailto:lsancheznj@gmail.com" trailingIcon={<ArrowRight />}>
              Email
            </Button>
            <Button href="https://www.linkedin.com/in/luissanchez-nj" variant="outline">
              LinkedIn
            </Button>
          </div>
        </Hero>
      </Section>

      {/* Current */}
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-8 md:grid-cols-[160px_1fr] lg:[grid-template-columns:200px_1fr]">
          <div className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)] md:pt-2">
            Right now
          </div>
          <div className="flex flex-col gap-4 text-[17px] md:text-[19px] leading-[1.6] text-[var(--color-text-primary)] max-w-[760px]">
            <p>
              I&apos;m Data Manager at <strong className="text-[var(--color-text-strong)]">Genpro</strong>, leading a 4-person data team that supports the GTM organization. My work centers on the pricing intelligence platform, enterprise data governance in BigQuery, and the systems that replace third-party middleware with stuff we own.
            </p>
            <p>
              I think most of the friction in operational data work isn&apos;t technical — it&apos;s organizational. The interesting problems live where data, ML, and operations have to agree, and where role boundaries between &quot;engineer,&quot; &quot;analyst,&quot; and &quot;operator&quot; stop being useful. I work past those boundaries.
            </p>
          </div>
        </div>
      </Section>

      {/* Work timeline */}
      <Section className="pt-12 md:pt-16">
        <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em] mb-10 md:mb-14">
          Work
        </h2>
        <div className="flex flex-col gap-12 md:gap-16">
          {TIMELINE.map((t, i) => (
            <YearRail key={i} year={t.year}>
              <div className="flex flex-col gap-2 max-w-[760px]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-[20px] md:text-[24px] text-[var(--color-text-strong)] tracking-[-0.01em]">
                    {t.role}
                  </h3>
                  <span className="text-[14px] text-[var(--color-text-muted)]">
                    {t.org}
                  </span>
                </div>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-primary)]">
                  {t.body}
                </p>
              </div>
            </YearRail>
          ))}
        </div>
      </Section>

      {/* Side projects */}
      <Section className="pt-12 md:pt-16">
        <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em] mb-10 md:mb-14">
          Side projects
        </h2>
        <div className="flex flex-col gap-12">
          {SIDE.map((t, i) => (
            <YearRail key={i} year={t.year}>
              <div className="flex flex-col gap-2 max-w-[760px]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-[20px] md:text-[24px] text-[var(--color-text-strong)] tracking-[-0.01em]">
                    {t.role}
                  </h3>
                  <span className="text-[14px] text-[var(--color-text-muted)]">
                    {t.org}
                  </span>
                </div>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-primary)]">
                  {t.body}
                </p>
              </div>
            </YearRail>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="pt-12 md:pt-20" tone="cream">
        <div className="grid gap-8 md:grid-cols-[160px_1fr] lg:[grid-template-columns:200px_1fr]">
          <div className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)] md:pt-2">
            Contact
          </div>
          <div className="flex flex-col gap-4 max-w-[760px]">
            <div className="grid gap-4 md:grid-cols-2 text-[15px] text-[var(--color-text-strong)]">
              <div className="flex flex-col gap-1">
                <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
                  Email
                </span>
                <a
                  href="mailto:lsancheznj@gmail.com"
                  className="hover:text-[var(--color-primary)]"
                >
                  lsancheznj@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
                  Phone
                </span>
                <a href="tel:+19733068631" className="hover:text-[var(--color-primary)]">
                  973.306.8631
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
                  Based in
                </span>
                <span>Lodi, NJ</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/luissanchez-nj"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)]"
                >
                  linkedin.com/in/luissanchez-nj
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
