import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { Button, ArrowRight } from "@/components/button";
import { YearRail } from "@/components/year-rail";
import { JourneyTimeline, type JourneyEntry } from "@/components/journey-timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Luis Sanchez",
  description:
    "Background, current role, work timeline, and how to reach Luis Sanchez.",
};

const HOW_I_WORK = [
  {
    n: "01",
    title: "Question the requirement",
    body:
      "I challenge specs, assumptions, and inherited processes before building anything. The most expensive mistake is optimizing work that should not exist.",
  },
  {
    n: "02",
    title: "Delete what does not need to be there",
    body:
      "I look for steps, fields, handoffs, reports, and checks that can be removed entirely before adding new tooling.",
  },
  {
    n: "03",
    title: "Simplify what remains",
    body:
      "Once the unnecessary pieces are gone, I streamline the core workflow so the system has fewer moving parts and fewer places to break.",
  },
  {
    n: "04",
    title: "Accelerate the cycle",
    body:
      "Only after the process is clean do I focus on speed: faster feedback loops, faster reporting, faster decisions, and faster iteration.",
  },
  {
    n: "05",
    title: "Automate last",
    body:
      "I use automation to lock in a validated workflow, not to preserve a broken one. Automating a bad process just scales the mess.",
  },
];

function HowIWork() {
  return (
    <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {HOW_I_WORK.map((step) => (
        <article
          key={step.n}
          className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-5 md:p-6"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] tracking-[0.12em] text-[var(--color-text-muted)]">
              {step.n}
            </span>
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden />
          </div>
          <h3 className="font-display text-[20px] md:text-[22px] text-[var(--color-text-strong)] tracking-[-0.01em] leading-[1.2]">
            {step.title}
          </h3>
          <p className="text-[14.5px] md:text-[15px] leading-[1.6] text-[var(--color-text-primary)]">
            {step.body}
          </p>
        </article>
      ))}
    </div>
  );
}

const JOURNEY: JourneyEntry[] = [
  {
    year: "25 ~",
    org: "Genpro",
    role: "Data Manager",
    type: "Full-time",
    dateRange: "Jan 2025 — Present",
    summary:
      "Leading a 4-person data team that supports the GTM organization.",
    bullets: [
      "Built the ML pricing intelligence platform serving thousands of lanes daily.",
      "Stood up enterprise data governance and replaced legacy EDI middleware (Cleo) with internal systems.",
      "Partner with leadership on market targeting, pricing intelligence, and commercial decision support.",
    ],
    tags: ["ML pricing", "GTM strategy", "Data governance"],
  },
  {
    year: "24",
    org: "USCS",
    role: "Supervisor, Data & Automation",
    type: "Full-time",
    dateRange: "Feb 2024 — Dec 2024",
    summary:
      "Led an 11-person team across data engineering, ML, and automation.",
    bullets: [
      "Shipped SmartMove, the LTL load-planning platform ($9.3M validated savings).",
      "Designed the causal-inference framework used to validate ML impact across heterogeneous customer scenarios.",
      "Partnered with USCS leadership across operations and commercial.",
    ],
    tags: ["Team leadership", "SmartMove", "Causal inference"],
  },
  {
    year: "22 - 24",
    org: "USCS",
    role: "Automation Specialist",
    type: "Full-time",
    dateRange: "Aug 2022 — Feb 2024",
    summary:
      "Built ML, computer vision, and RPA automations across 26 cold-storage sites.",
    bullets: [
      "Procurement, inventory, and fulfillment workflows became systems.",
      "Stack: UiPath, Power Platform, Python.",
    ],
    tags: ["Automation", "Applied ML"],
  },
  {
    year: "22",
    org: "USCS",
    role: "Systems Analyst",
    type: "Full-time",
    dateRange: "Jun 2022 — Aug 2022",
    summary:
      "Connective tissue between operational software, the warehouse, and downstream reporting.",
    bullets: [
      "Built systems integrations across logistics and finance domains.",
      "Designed the data flows that the analytics work later sat on.",
    ],
  },
  {
    year: "21 - 22",
    org: "USCS",
    role: "Logistics Analyst · LDP",
    type: "Full-time",
    dateRange: "Jun 2021 — Jun 2022",
    summary:
      "First role out of school as part of USCS's Leadership Development Program.",
    bullets: [
      "Operational analytics on cold-storage logistics.",
      "Rotational exposure across logistics, customer experience, and load planning.",
    ],
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

      {/* How I work — first-principles operating system, sits before the journey */}
      <Section className="mt-8 md:mt-12">
        <div className="flex flex-col gap-6 max-w-[760px] mb-10 md:mb-14">
          <h2 className="font-display text-[var(--color-text-strong)] text-[32px] md:text-[48px] tracking-[-0.02em] leading-[1.05]">
            How I work
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.55] text-[var(--color-text-primary)]">
            The operating system behind the projects. First principles, in
            order — applied to every build, every workflow, every team I lead.
          </p>
        </div>
        <HowIWork />
      </Section>

      {/* Work journey — diagonal staircase of pills, hover reveals details */}
      <Section className="mt-8 md:mt-12">
        <div className="flex flex-col gap-6 max-w-[760px] mb-10 md:mb-14">
          <h2 className="font-display text-[var(--color-text-strong)] text-[32px] md:text-[48px] tracking-[-0.02em] leading-[1.05]">
            My journey
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.55] text-[var(--color-text-primary)]">
            Five years of operational and analytical work, plus the side bets
            that kept it interesting. Hover any pill on desktop for the full
            story; mobile shows it inline.
          </p>
        </div>
        <JourneyTimeline entries={JOURNEY} />
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
