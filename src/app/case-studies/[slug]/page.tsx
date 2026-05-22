import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { StatCallout } from "@/components/stat-callout";
import { MetadataGrid } from "@/components/metadata-grid";
import { OnThisPageNav } from "@/components/on-this-page-nav";
import { ConstraintChipRow } from "@/components/constraint-chip";
import { BeforeAfter } from "@/components/before-after";
import { MoreCaseStudies } from "@/components/more-case-studies";
import { Button, ArrowRight } from "@/components/button";
import Link from "next/link";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Luis Sanchez`,
    description: cs.oneLiner,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== slug).slice(0, 3);
  const tocItems = cs.sections.map((s) => ({ id: s.id, label: s.label }));

  return (
    <>
      {/* Breadcrumb back */}
      <Section boxed={false} className="pt-4 md:pt-6 pb-0">
        <Link
          href="/"
          className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
        >
          ← Back to work
        </Link>
      </Section>

      {/* Hero */}
      <Section boxed={false} className="pt-6 md:pt-10">
        <Hero
          eyebrow={
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              {cs.company} · {cs.year}
            </>
          }
          title={cs.title}
          intro={cs.overview}
        />
      </Section>

      {/* Hero visual placeholder */}
      <Section boxed={false} className="pt-2">
        <div className="relative aspect-[1948/1080] overflow-hidden rounded-[12px] bg-black/90 dark:bg-black/60">
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <span className="text-xs md:text-sm text-white/40 font-mono leading-relaxed max-w-[80%]">
              [Hero visual placeholder — TODO: {cs.visualTodo}]
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40" />
        </div>
      </Section>

      {/* Metadata grid */}
      <Section boxed={false} className="pt-8">
        <MetadataGrid cells={cs.metadata} />
      </Section>

      {/* Stats up front (per teardown: 3 numbers near the top) */}
      <Section boxed={false} className="pt-8">
        <StatCallout stats={cs.stats} />
      </Section>

      {/* Constraints chips */}
      <Section boxed={false} className="pt-12">
        <div className="flex flex-col gap-4 max-w-[860px]">
          <h2 className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-text-muted)]">
            Constraints that shaped the build
          </h2>
          <ConstraintChipRow items={cs.constraints} />
        </div>
      </Section>

      {/* TOC */}
      <Section boxed={false} className="pt-10">
        <OnThisPageNav items={tocItems} />
      </Section>

      {/* Body sections */}
      <Section boxed={false} className="pt-2">
        <div className="flex flex-col gap-16 md:gap-20 max-w-[820px]">
          {cs.sections.map((s) => (
            <article id={s.id} key={s.id} className="flex flex-col gap-4 scroll-mt-24">
              <div className="font-mono uppercase tracking-[0.12em] text-[11px] text-[var(--color-primary)]">
                {s.label}
              </div>
              <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[36px] tracking-[-0.02em] leading-[1.15]">
                {s.heading}
              </h2>
              <div className="flex flex-col gap-4 text-[17px] md:text-[18px] leading-[1.65] text-[var(--color-text-primary)]">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {s.visuals?.length ? (
                <div className="mt-4 flex flex-col gap-4">
                  {s.visuals.map((v, i) => (
                    <div
                      key={i}
                      className={`relative ${v.aspect ?? "aspect-[1948/1080]"} overflow-hidden rounded-[12px] bg-black/90 dark:bg-black/60`}
                    >
                      <div className="absolute inset-0 grid place-items-center p-6 text-center">
                        <span className="text-xs text-white/40 font-mono leading-relaxed max-w-[80%]">
                          [Inline visual — TODO: {v.todo}]
                        </span>
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40" />
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      {/* Before/After (generic per case study) */}
      <Section boxed={false} className="pt-16">
        <div className="flex flex-col gap-6 max-w-[820px] mb-8">
          <h2 className="font-display text-[var(--color-text-strong)] text-[24px] md:text-[32px] tracking-[-0.015em]">
            Before / After
          </h2>
          <p className="text-[16px] text-[var(--color-text-primary)] leading-[1.6]">
            How the system changed the actual operational shape of the work —
            not just the dashboards on top of it.
          </p>
        </div>
        <BeforeAfter
          before={{
            caption:
              "The decision shape before the platform — manual, lagging, and team-by-team divergent.",
            todo: `"before" DAG or latency histogram for ${cs.title}`,
          }}
          after={{
            caption:
              "After: a shared, automated surface that closed the loop between data and decision.",
            todo: `"after" DAG or latency histogram for ${cs.title}`,
          }}
        />
      </Section>

      {/* CTA */}
      <Section boxed={false} className="pt-16" tone="cream">
        <div className="flex flex-col gap-4 max-w-[680px]">
          <h2 className="font-display text-[var(--color-text-strong)] text-[28px] md:text-[40px] tracking-[-0.02em]">
            Want the longer version?
          </h2>
          <p className="text-[17px] text-[var(--color-text-primary)] leading-[1.55]">
            I&apos;m happy to walk through the architecture, the trade-offs we
            considered but didn&apos;t ship, and what I&apos;d do differently
            next time. Drop me a line.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="mailto:lsancheznj@gmail.com" trailingIcon={<ArrowRight />}>
              Get in touch
            </Button>
          </div>
        </div>
      </Section>

      {/* More case studies */}
      <Section boxed={false} className="pt-16">
        <MoreCaseStudies
          items={others.map((o) => ({
            href: `/case-studies/${o.slug}`,
            title: o.title,
            tag: `${o.company} · ${o.year}`,
            todo: o.visualTodo,
          }))}
        />
      </Section>
    </>
  );
}
