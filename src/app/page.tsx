import { Section } from "@/components/section";
import { HomeHero } from "@/components/hero";
import { Button, ArrowRight } from "@/components/button";
import { YearRail } from "@/components/year-rail";
import { CaseStudyCard } from "@/components/case-study-card";
import { PressCard } from "@/components/press-card";
import { WorkingWithMeShowcase } from "@/components/working-with-me";
import { CASE_STUDIES } from "@/content/case-studies";
import { PRESS } from "@/content/press";
import Link from "next/link";

export default function Home() {
  const hero = CASE_STUDIES; // hero case studies, in order

  return (
    <>
      {/* Hero — unboxed; sits flush at the top of the page. */}
      <Section boxed={false} className="pt-4 md:pt-8 lg:pt-12">
        <HomeHero />
      </Section>

      {/* About teaser */}
      <Section className="mt-8 md:mt-12">
        <div className="grid gap-8 md:grid-cols-[160px_1fr] lg:[grid-template-columns:200px_1fr]">
          <div className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)] md:pt-2">
            About
          </div>
          <div className="flex flex-col gap-4 text-[18px] md:text-[20px] leading-[1.55] text-[var(--color-text-primary)] max-w-[760px]">
            <p>
              I&apos;m a builder/operator who turns operational mess into
              usable systems. My work sits at the seam between data, ML, and
              operations, where messy real-world workflows need to become tools
              teams can rely on.
            </p>
            <p>
              Today that means leading a 4-person data team at Genpro, building
              the pricing intelligence and governance layer the GTM org runs on.
              Before that, I led an 11-person team at USCS shipping ML and
              automation across 26 cold-storage sites.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/about"
                className="text-[var(--color-primary)] hover:underline underline-offset-4 text-[16px]"
              >
                Read the full background →
              </Link>
              <a
                href="/Sanchez_Luis_Resume.pdf"
                download
                className="text-[var(--color-primary)] hover:underline underline-offset-4 text-[16px]"
              >
                Download resume ↓
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Selected Work — hero case studies with year rail */}
      <Section id="selected-work" className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <h2 className="font-display text-[var(--color-text-strong)] text-[32px] md:text-[44px] tracking-[-0.02em]">
            Selected work
          </h2>
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            {hero.length} case studies
          </span>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {hero.map((cs) => (
            <YearRail key={cs.slug} year={cs.year}>
              <CaseStudyCard
                href={`/case-studies/${cs.slug}`}
                title={cs.title}
                oneLiner={cs.oneLiner}
                visualTodo={cs.visualTodo}
                heroImage={cs.heroImage}
                tag={cs.company}
                size="hero"
                cta="Read the case study"
              />
            </YearRail>
          ))}
        </div>
      </Section>

      {/* Working with me — testimonial showcase with Luis cutout centerpiece */}
      <Section id="working-with-me" className="mt-8 md:mt-12">
        <WorkingWithMeShowcase />
      </Section>

      {/* Press & recognition — compact horizontal cards, less vertical real estate */}
      <Section id="press" className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 className="font-display text-[var(--color-text-strong)] text-[24px] md:text-[32px] tracking-[-0.015em]">
            Press & recognition
          </h2>
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            {PRESS.length} mentions
          </span>
        </div>
        <div className="grid gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PRESS.map((p) => (
            <PressCard key={p.url} {...p} />
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="mt-8 md:mt-12 mb-10">
        <div className="flex flex-col gap-6 max-w-[680px]">
          <h2 className="font-display text-[var(--color-text-strong)] text-[32px] md:text-[48px] tracking-[-0.02em]">
            If you&apos;re building something at the seam of data, ML, and
            operations — let&apos;s talk.
          </h2>
          <p className="text-[18px] text-[var(--color-text-primary)] leading-[1.55]">
            I&apos;m always interested in conversations with teams who are
            past dashboards and into systems. Email is the fastest way to
            reach me.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="mailto:lsancheznj@gmail.com" trailingIcon={<ArrowRight />}>
              lsancheznj@gmail.com
            </Button>
            <Button
              href="https://www.linkedin.com/in/luissanchez000"
              variant="outline"
            >
              LinkedIn
            </Button>
            <Button href="/Sanchez_Luis_Resume.pdf" variant="outline" download>
              Download resume
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
