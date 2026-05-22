import { Section } from "@/components/section";
import { HomeHero } from "@/components/hero";
import { Button, ArrowRight } from "@/components/button";
import { YearRail } from "@/components/year-rail";
import { CaseStudyCard } from "@/components/case-study-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { PressCard } from "@/components/press-card";
import { CASE_STUDIES, MORE_WORK } from "@/content/case-studies";
import { TESTIMONIALS } from "@/content/testimonials";
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
              I&apos;m a builder/operator, not a designer or pure software
              engineer. My work sits at the seam between data, ML, and
              operations — wherever a messy real-world workflow needs to become a
              system someone else can run.
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

      {/* Working with me — testimonials */}
      <Section id="working-with-me" className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em]">
            What it&apos;s like working with me
          </h2>
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            From peers & mentees
          </span>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Section>

      {/* Press & recognition */}
      <Section id="press" className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em]">
            Press & recognition
          </h2>
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            {PRESS.length} mentions
          </span>
        </div>
        <div className="grid gap-10 md:gap-12 md:grid-cols-2">
          {PRESS.map((p) => (
            <PressCard key={p.url} {...p} />
          ))}
        </div>
      </Section>

      {/* More work strip */}
      <Section id="more-work" className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[36px] tracking-[-0.015em]">
            More work
          </h2>
          <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            {MORE_WORK.length} projects
          </span>
        </div>
        <div className="grid gap-10 md:gap-12 md:grid-cols-2">
          {MORE_WORK.map((item, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[20px] md:text-[22px] text-[var(--color-text-strong)] tracking-[-0.01em]">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] whitespace-nowrap">
                  {item.tag}
                </span>
              </div>
              <p className="text-[15px] leading-[1.6] text-[var(--color-text-primary)]">
                {item.description}
              </p>
              {item.image ? (
                <div className="mt-2 aspect-[16/9] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-black/[0.03] dark:bg-white/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="mt-2 aspect-[16/9] bg-black/10 dark:bg-white/[0.04] rounded-[12px] grid place-items-center text-center p-4 border border-[var(--color-border)]"
                  aria-hidden
                >
                  <span className="text-[11px] md:text-xs text-[var(--color-text-muted)] font-mono leading-relaxed">
                    [TODO: {item.visualTodo}]
                  </span>
                </div>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start text-[14px] text-[var(--color-primary)] hover:underline underline-offset-4 mt-1"
                >
                  View on the Chrome Web Store ↗
                </a>
              ) : null}
            </article>
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
