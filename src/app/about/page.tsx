import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { Button, ArrowRight } from "@/components/button";
import { YearRail } from "@/components/year-rail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Luis Sanchez",
  description:
    "Background, current role, work timeline, and how to reach Luis Sanchez.",
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
  {
    year: "2021 — 2024",
    role: "Leadership Development Program",
    org: "USCS",
    body: "Rotational program across logistics, customer experience, and load planning. Gave me end-to-end exposure to the supply chain before specializing in automation and analytics.",
  },
];

const SCHOOL = [
  {
    year: "2021",
    role: "BS, Supply Chain Management",
    org: "Rutgers Business School",
    body: "Summa Cum Laude (3.94 GPA). Led a six-student team in the New Jersey County College Case Competition.",
  },
];

const SIDE = [
  {
    year: "2023 — 2025",
    role: "Cofounder",
    org: "Mutuall",
    body: "Chrome extension that automated purchase-order management and one-click appointment scheduling across supply-chain portals — smart PO lookup, encrypted credential storage, full activity log. Sunset after a 2-year cycle. Listed on the Chrome Web Store: chromewebstore.google.com/detail/mutuall.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section boxed={false} className="pt-4 md:pt-8 lg:pt-12">
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
            <Button href="https://www.linkedin.com/in/luissanchez000" variant="outline">
              LinkedIn
            </Button>
          </div>
        </Hero>
      </Section>

      {/* Current */}
      <Section className="mt-8 md:mt-12">
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
      <Section className="mt-8 md:mt-12">
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

      {/* School */}
      <Section className="mt-8 md:mt-12">
        <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em] mb-10 md:mb-14">
          School
        </h2>
        <div className="flex flex-col gap-12">
          {SCHOOL.map((s, i) => (
            <YearRail key={i} year={s.year}>
              <div className="flex flex-col gap-2 max-w-[760px]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-[20px] md:text-[24px] text-[var(--color-text-strong)] tracking-[-0.01em]">
                    {s.role}
                  </h3>
                  <span className="text-[14px] text-[var(--color-text-muted)]">
                    {s.org}
                  </span>
                </div>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-primary)]">
                  {s.body}
                </p>
              </div>
            </YearRail>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-[var(--color-text-muted)] max-w-[760px]">
          More background:{" "}
          <a
            href="https://bergen.edu/posts/spotlight/luis-sanchez/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-primary)] hover:underline underline-offset-4"
          >
            Bergen Community College spotlight ↗
          </a>
        </p>
      </Section>

      {/* Side projects */}
      <Section className="mt-8 md:mt-12">
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
      <Section className="mt-8 md:mt-12 mb-10">
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
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/luissanchez000"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)]"
                >
                  linkedin.com/in/luissanchez000
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
