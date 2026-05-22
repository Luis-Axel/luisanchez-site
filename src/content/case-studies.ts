import type { MetadataCell } from "@/components/metadata-grid";
import type { Stat } from "@/components/stat-callout";

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  company: string;
  visualTodo: string; // for the hero card visual
  /** Optional path under /public to a real image for the hero card + page hero. */
  heroImage?: string;
  /** Optional external link surfaced near the metadata (e.g. live product URL). */
  externalLink?: { href: string; label: string };
  overview: string;
  metadata: MetadataCell[];
  stats: Stat[];
  constraints: string[];
  sections: {
    id: string;
    label: string;
    heading: string;
    body: string[];
    /** Optional inline visual placeholder TODOs (or real images when `src` is set) */
    visuals?: { todo: string; aspect?: string; src?: string }[];
  }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "smartmove-platform",
    title: "SmartMove — Full-Stack Logistics Analytics Platform",
    oneLiner:
      "USCS load planners were consolidating LTL freight by hand, capped by 'that's how we've always done it.' Built a full-stack platform that systemized the workflow, modeled it as traveling-salesman + bin-packing, and rolled it out nationwide.",
    year: "2024",
    company: "USCS",
    visualTodo:
      "SmartMove platform UI — consolidation recommendation queue with route map and bin-pack visualization",
    heroImage: "/smartmove/shared-locations.png",
    externalLink: {
      href: "https://www.linkedin.com/posts/united-states-cold-storage-inc-_bestincold-bestinpeople-bestinlogistics-activity-7241601204802179072-6dev/",
      label: "Featured in The Shield, Q2 2024 ↗",
    },
    overview:
      "SmartMove is USCS's full-stack platform for less-than-truckload (LTL) freight consolidation. It took a core USCS service, combining shipments from multiple customers into shared trucks, that had been done manually for years and turned it into a systemized, defensible workflow. I led product dev and rollout, working directly with load planners to map and redesign the workflow before rolling it out nationwide over the course of a year. The platform validated $9.3M in savings and was featured in USCS's company newsletter as a 'game changer for LTL load planning.'",
    metadata: [
      { label: "Stack", value: "Python (optimization) · React UI · BigQuery · custom data-entry tooling" },
      { label: "Scale", value: "Nationwide USCS LTL network" },
      { label: "Approach", value: "Traveling salesman + bin packing optimization" },
      { label: "Outcome", value: "$9.3M validated savings · Featured in The Shield Q2 2024" },
    ],
    stats: [
      { value: "$9.3M", label: "Validated savings", caption: "Across the national USCS network over the rollout year" },
      { value: "Nationwide", label: "Rollout cycle", caption: "Site by site over a 12-month deployment" },
      { value: "Game changer", label: "Per USCS leadership", caption: "Keith Mowery (EVP) and Lauren Fitzpatrick (Sr. Manager, Logistics Systems) on the record in The Shield" },
    ],
    constraints: [
      "Solve a real combinatorial optimization in production, not in a notebook",
      "Respect what experienced planners do, but push back on the wrong 'we've always done it this way' assumptions",
      "Build datasets the industry didn't have (facility hours, freight-type compatibility, time windows)",
      "Make planners trust the system enough to use it daily",
      "Roll out across the national network without disrupting running operations",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "The work was done by intuition, not by system.",
        body: [
          "USCS's core LTL consolidation work, combining shipments from multiple customers heading to the same regions into shared trucks, had been done manually for years. Planners coordinated by tribal knowledge and individual experience. The process was slow, varied wildly by who was on shift, and capped by a stack of 'that's how we've always done it' assumptions.",
          "Underneath the manual workflow, USCS was leaving real consolidation opportunities on the table every day. More trucks, more miles, more cost, fewer happy customers.",
        ],
        visuals: [
          {
            todo: "Baseline non-consolidated shipments: each customer gets their own truck. More trucks, more miles, more cost.",
            aspect: "aspect-[16/9]",
            src: "/smartmove/baseline-non-consolidated.png",
          },
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "Two textbook optimization problems hiding under a custom workflow.",
        body: [
          "At the math level, this was traveling-salesman (route between drop-off points) plus bin-packing (pack each truck within capacity and temperature constraints). What made it hard wasn't the math. It was that the inputs the algorithms needed didn't exist anywhere in the industry as a clean dataset.",
          "There was no normalized record of when each facility was open, which freight types each facility accepted in which time windows (a frozen-only dock won't take refrigerated mid-shift), or which temperature classes could ride together in the same trailer. All of that lived in planners' heads.",
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "Systemize the experts, build the missing data, then let planners stop doing the easy 80%.",
        body: [
          "If we could capture what the best planners were actually doing, build the datasets they were holding in their heads, and wrap the whole thing in a UI they'd trust, the platform could automate the 80% of consolidation that was rote and free planners to focus on the 20% that needed judgment.",
          "Critically, planners had to stay in control. The platform would recommend; planners would approve, adjust, or override. Otherwise it wouldn't get used.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Three layers: the data, the optimizer, the UI.",
        body: [
          "I worked directly with load planners across multiple sites to map the real workflow. Every 'that's how we've always done it' got pushed back on. About half of those rules turned out to be real constraints; the rest were assumptions that quietly capped output.",
          "Then we built the unique datasets the industry didn't have: facility hours of operation, freight types accepted by time of day (poultry, dairy, ice cream, frozen, refrigerated), and cross-loading temperature compatibility. Critically, I built a data-entry tool so end users could maintain the dataset themselves in a data-friendly way, without needing engineering involvement every time a facility changed its hours.",
          "On top of that data layer, I modeled the consolidation problem as traveling salesman plus bin packing and wrote the optimizer in Python, tuned against historical loads.",
          "All of it was packaged in a clean React UI so planners stayed in control. The system recommended consolidations; planners approved, rejected, or edited. Then we rolled it out nationwide over a year, site by site, never disrupting live operations.",
        ],
        visuals: [
          {
            todo: "Cross-temperature consolidation: ice cream, frozen, and refrigerated riding together on one truck, made possible by the custom temperature-compatibility dataset.",
            aspect: "aspect-[16/9]",
            src: "/smartmove/cross-temp-consolidation.png",
          },
          {
            todo: "Consolidated trucks heading to shared customer locations: the platform's core output. Fewer trucks, fewer miles, fewer dollars.",
            aspect: "aspect-[16/9]",
            src: "/smartmove/shared-locations.png",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "$9.3M saved and planners promoted to problem solvers.",
        body: [
          "Over the rollout year SmartMove validated $9.3M in savings against the national LTL network. USCS's company newsletter, The Shield, featured the platform in its Q2 2024 issue, with Keith Mowery (EVP) calling it 'a game changer for LTL load planning.'",
          "Lauren Fitzpatrick, Senior Manager of Logistics Systems and one of the platform's earliest champions, framed the impact this way: 'SmartMove lets load planners become more proactive problem solvers. They can focus on what truly matters: servicing customers and ensuring that when issues inevitably arise, they can quickly resolve them.'",
          "The win underneath the savings number is that the workflow itself moved from individual intuition to a system anyone on the team could run, audit, and improve. The data planners had been carrying in their heads now lives in a dataset the org owns.",
        ],
      },
    ],
  },
  {
    slug: "macro",
    title: "Macro — Consumer-Health AI Product",
    oneLiner:
      "Building a consumer-health AI product on top of model APIs. Current cofounder side project.",
    year: "2026 — Present",
    company: "Cofounder · Macro",
    visualTodo:
      "Macro product screenshot or onboarding flow",
    overview:
      "Macro is a consumer-health AI product I'm building as a cofounder. It sits on top of frontier model APIs and turns ambient personal-health signals into actions a normal person can take. [TODO — Lui to expand: positioning, target user, what shipped so far, what's in flight.]",
    metadata: [
      { label: "Stack", value: "[TODO — confirm: model APIs (Anthropic / OpenAI), iOS / mobile-web stack, backend]" },
      { label: "Stage", value: "Side project · Active development" },
      { label: "Role", value: "Cofounder · Builder" },
      { label: "Started", value: "2026" },
    ],
    stats: [
      { value: "TODO", label: "Headline product metric", caption: "TODO — pick the one number that tells the Macro story" },
      { value: "TODO", label: "Users / cohort size", caption: "TODO — confirm before launch" },
      { value: "TODO", label: "Model coverage", caption: "TODO — which model APIs Macro currently routes against" },
    ],
    constraints: [
      "TODO — what the product CAN'T do or won't do (privacy boundary, scope discipline)",
      "TODO — what makes Macro defensible vs. a thin wrapper on a chat API",
      "TODO — how Macro stays cheap enough to run on consumer pricing",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "[TODO: the user problem Macro is solving]",
        body: [
          "[TODO — Lui: 1-2 sentences on what's broken in consumer health that Macro is responding to.]",
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "[TODO: why this problem hasn't been solved already]",
        body: [
          "[TODO — Lui: what's structurally different now (model capabilities, costs, distribution) that makes Macro possible.]",
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "[TODO: the bet Macro is taking]",
        body: [
          "[TODO — Lui: 1-2 sentences on the specific bet — product hypothesis + go-to-market hypothesis.]",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "[TODO: how it's built]",
        body: [
          "[TODO — Lui: the architecture in one paragraph. Where the model APIs sit, what's deterministic vs. prompted, what's persistent vs. ephemeral.]",
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "[TODO: traction]",
        body: [
          "[TODO — Lui: what's shipped, who's using it, what's measured. If pre-launch, that's fine: name what's in flight and what the next milestone is.]",
        ],
      },
    ],
  },
  {
    slug: "etl-integration-replacement",
    title: "Replacing Cleo: an Internal EDI + ETL + API Integration Service",
    oneLiner:
      "Genpro was paying ~$80K/year for Cleo, a third-party EDI middleware that held trading-partner data behind a vendor wall. When a new TMS onboarding made the Cleo dev work absurd, I built the replacement instead.",
    year: "2025",
    company: "Genpro",
    visualTodo:
      "Architecture diagram: trading partners → internal ingestion service (EDI parser, ETL pipelines, API connectors) → BigQuery → internal consumers",
    overview:
      "Designed and built the internal EDI/ETL/API integration system that replaced Cleo at Genpro. The replacement handles EDI parsing, ETL pipelines, and REST integrations from one in-house codebase and lands all trading-partner data directly in our BigQuery warehouse, where the pricing platform, data governance layer, and the rest of the analytics stack can use it natively. The $80K/year Cleo subscription was decommissioned.",
    metadata: [
      { label: "Stack", value: "Python · BigQuery · custom EDI parser · REST/API connectors" },
      { label: "Scope", value: "All Genpro trading-partner integrations" },
      { label: "Replaces", value: "Cleo middleware ($80K/yr eliminated)" },
      { label: "Outcome", value: "Trading-partner data lives in BigQuery, accessible internally" },
    ],
    stats: [
      { value: "$80K", label: "Annual licensing eliminated", caption: "Cleo subscription decommissioned after cut-over" },
      { value: "EDI + ETL + API", label: "All channels in one system", caption: "From ingestion through warehouse landing" },
      { value: "BigQuery", label: "Where data lands by default", caption: "Same warehouse the rest of analytics already uses" },
    ],
    constraints: [
      "Cut over without dropping any trading-partner connection",
      "Match Cleo's reliability and ack-handling behavior on every transaction",
      "Land data in the warehouse schemas the rest of the org already uses",
      "Stay maintainable by a small in-house team",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "$80K a year for a black box, and a new TMS that needed to talk through it.",
        body: [
          "Cleo was the EDI middleware Genpro used to exchange data with trading partners: purchase orders, invoices, shipment statuses, the usual freight-industry traffic. It worked, but it worked behind a vendor wall. Every schema change took a vendor ticket. Trading-partner data was effectively trapped inside Cleo and had to be manually re-exported to land anywhere we could query it.",
          "The forcing function was a new TMS onboarding. The development required to fit the new TMS through Cleo's platform was so extensive that just building the integration ourselves made more sense than paying Cleo to extend their model. Once we'd built that, backfilling the rest of the partner connections in-house followed naturally.",
        ],
        visuals: [
          {
            todo: "Why people use Cleo: dozens of messy B2B applications and partner systems that need normalizing into one feed. Cleo's pitch.",
            aspect: "aspect-[16/9]",
            src: "/cleo/usecase.png",
          },
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "Modern tooling can do this in-house at a fraction of the cost.",
        body: [
          "What Cleo was actually doing, parse EDI messages, normalize schemas, route data to downstream systems, is well-defined and increasingly straightforward with modern data tooling. What the $80K/year was buying us was vendor lock-in, plus the integration overhead of keeping Cleo wired into the rest of our stack.",
          "Bringing it in-house unlocked something Cleo never could: every trading-partner record would land directly in BigQuery, alongside the operational and pricing data the rest of the analytics work depended on.",
        ],
        visuals: [
          {
            todo: "Cleo's integration cloud: how Cleo positions itself as the connective tissue between data providers, customers, suppliers, and internal apps. We replaced this entire surface with an in-house service.",
            aspect: "aspect-[16/9]",
            src: "/cleo/integration-cloud.png",
          },
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "One internal service that handles EDI, ETL, and API in the same codebase.",
        body: [
          "A single integration service, owned in-house, that ingests trading-partner traffic in any format the partner uses (EDI, file-based ETL, REST APIs), normalizes everything into our warehouse schemas, and makes the data immediately queryable to internal systems.",
          "Trading partners shouldn't notice the cut-over. They keep sending data the same way; we change what's on our side.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Cut over partner-by-partner, never broke a connection.",
        body: [
          "I mapped every Cleo connection first: protocol, schema, downstream consumer, ack expectations. Each was a contract we had to preserve exactly.",
          "The replacement was built in Python on top of BigQuery as the warehouse: an EDI parser handling the common transaction sets (810, 850, 856, etc.), an ETL pipeline framework for file-based feeds, and a REST connector layer for API-driven partners. Schema normalization happened once on ingestion. Monitoring and KPI reporting got built into the service from day one, so the team could see exactly what Cleo had been doing for us, but now in our own dashboards instead of theirs.",
          "Then we migrated connection by connection, validating data parity against Cleo at each step before cutting traffic over. After every partner was on the new system, we cancelled the Cleo subscription.",
        ],
        visuals: [
          {
            todo: "Cleo's KPI dashboard: the kind of reporting we'd been paying for, that the in-house service now produces itself. Errors, throughput, partner-level health, all visible to the team that runs the integrations.",
            aspect: "aspect-[16/9]",
            src: "/cleo/kpis.jpg",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "$80K saved, data unlocked, foundation for everything that came next.",
        body: [
          "The Cleo line item is gone. Every byte of trading-partner data now lands inside Genpro's BigQuery warehouse alongside the rest of our operational data.",
          "The bigger win was downstream. The pricing intelligence platform and the data governance layer both rely on this integration. They wouldn't exist if trading-partner data still lived inside a vendor system we couldn't query directly.",
        ],
      },
    ],
  },
  {
    slug: "pricing-intelligence-platform",
    title: "ML Pricing Intelligence Platform",
    oneLiner:
      "Freight brokers were quoting off DAT, the industry-standard peer-rate feed everyone in logistics uses. DAT is noisy on its own. I led the build of an ML platform that cleans the noise, protects the brokerage's downside, and prices thousands of lanes systemically.",
    year: "2025 — Present",
    company: "Genpro",
    visualTodo:
      "Network mapping visualization showing pricing flow across lanes (geo + model output)",
    heroImage: "/pricing/network-mapping.png",
    overview:
      "I led the third-party engineering team that built Genpro's ML pricing and lane analytics platform. A React frontend over a Python ML stack (scikit-learn, XGBoost) and a BigQuery warehouse, it takes the messy industry-standard DAT peer-rate feed plus our own historical loads and turns them into clean, model-backed lane prices brokers can use in the moment. The same model powers daily GTM market targeting across the desk.",
    metadata: [
      { label: "Stack", value: "React · Python (scikit-learn, XGBoost) · BigQuery" },
      { label: "Scale", value: "Thousands of lanes priced daily" },
      { label: "Inputs", value: "DAT peer rates · Genpro historical loads · external market signals" },
      { label: "Outcome", value: "Powers daily GTM market-targeting + lane pricing decisions" },
    ],
    stats: [
      { value: "1000s", label: "Lanes priced daily", caption: "Across the active U.S. truckload network, off cleaned DAT + internal signals" },
      { value: "Real-time", label: "Quote-time latency", caption: "Brokers get a model-backed price before they pick up the phone" },
      { value: "Daily", label: "GTM cadence", caption: "Sales and capacity teams target lanes off the same model output as pricing" },
    ],
    constraints: [
      "DAT is industry-standard but noisy: peer-reported, sparse on thin lanes, biased on volatile ones",
      "Pricing must be defensible to a broker, not just accurate. Every rec needs an explainability trail",
      "Genpro's downside must be protected: a bad print should never get quoted to a customer",
      "Same model has to serve sales targeting and quote pricing without divergence",
      "Outputs need to reconcile against finance reporting at the month-end view",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "Brokers were quoting off a feed everyone knows is messy.",
        body: [
          "DAT is the leading rate feed in trucking. Everyone in the industry uses it. The problem is that DAT is peer-reported, which means it's noisy on its own: thin coverage on uncommon lanes, lagging signal on volatile ones, and rate bands wide enough to drive a truck through.",
          "Genpro brokers were quoting off DAT directly, padded with intuition and recent memory. Rates came out inconsistent across the desk, slow on RFPs, and structurally exposed to whichever way the peer noise was leaning that week.",
        ],
        visuals: [
          {
            todo: "DAT trendlines — the industry-standard peer rate feed every brokerage in trucking quotes off. Useful, but visibly noisy, especially on thinner lanes.",
            aspect: "aspect-[16/9]",
            src: "/pricing/dat-trendlines.avif",
          },
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "The feed isn't broken. The relationship with the feed is.",
        body: [
          "DAT is fine as an input. It is not fine as a quote. The leverage point wasn't replacing DAT. It was wrapping it with a model that knew where DAT was reliable, where it wasn't, and what to do in either case.",
          "Underneath that, we had years of Genpro historical loads in BigQuery and external market signals nobody had wired together yet. Combined with DAT, that was enough to clean the noise, fill the sparse lanes, and produce a single defensible price per lane.",
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "One model, three surfaces, downside-protected by construction.",
        body: [
          "If we trained a pricing model on Genpro's historical loads and market signals together with DAT (treating DAT as one input among many, not the answer), we could (1) clean DAT's noise on the lanes it covered, (2) infer prices on the lanes it didn't, and (3) flag the lanes where our confidence was too low to quote at all.",
          "That same model then powers three surfaces from one source of truth: the quoting UI brokers use, the GTM targeting view sales uses, and the market view capacity uses. Three teams, one set of numbers.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Led the build end-to-end with a third-party engineering team.",
        body: [
          "I owned the spec, the data model, and the broker workflow integration. The third-party engineering team I led owned the React frontend and the Python ML service implementation. We standardized on scikit-learn and XGBoost for the core pricing models, BigQuery as the system of record, and a thin API layer so retraining never blocks quote-time serving.",
          "On the data side, the work was building the lane network: mapping every active and adjacent lane, attaching DAT, internal load history, and market signals to each, and producing a continuous price surface where lanes that DAT covered well, lanes it covered sparsely, and lanes it didn't cover at all all came out with the same shape of answer.",
          "The hardest part wasn't the model. It was making the outputs trustworthy. Every recommended price gets an explainability trail a broker can push back on, every low-confidence lane is flagged before it gets quoted (downside protection), and every aggregate reconciles against finance's monthly numbers.",
        ],
        visuals: [
          {
            todo: "Network mapping for pricing: model output projected across the active and adjacent lane network. Where DAT is reliable, where it isn't, and where we have enough internal signal to price anyway.",
            aspect: "aspect-[16/9]",
            src: "/pricing/network-mapping.png",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "From spreadsheet pricing to a system the GTM org runs on.",
        body: [
          "The platform is the default surface for lane pricing at Genpro and is wired directly into daily GTM market-targeting decisions. Sales, capacity, and pricing are working off the same numbers for the first time, and the broker desk is no longer exposed to whichever way the DAT peer noise leaned that week.",
          "Just as important, the underlying warehouse, models, and serving layer are now the substrate the next set of internal ML projects sit on. Not a one-off. (The platform's internal UI isn't shown here for IP reasons.)",
        ],
      },
    ],
  },
];

export const MORE_WORK: {
  href?: string;
  title: string;
  tag: string;
  description: string;
  /** Used when no `image` is set yet — describes what visual should eventually go here. */
  visualTodo: string;
  /** Path under /public to a real image. When set, replaces the TODO placeholder. */
  image?: string;
}[] = [
  {
    title: "Operational ML & Automation Portfolio",
    tag: "USCS · 2022 – 2024",
    description:
      "Applied ML, computer vision, and RPA (UiPath, Power Platform, Python) to procurement, inventory, and fulfillment workflows across 26 sites. $9.3M in savings and 12,500 hours returned annually. Featured in USCS's company newsletter as “a game changer for LTL load planning.”",
    visualTodo:
      "thumbnail strip showing 3 representative automations: e.g. a CV inspection still, a UiPath workflow, an inventory model",
    image: "/press/smartmove.png",
  },
  {
    title: "BigQuery Enterprise Data Governance",
    tag: "Genpro · 2025",
    description:
      "Standardized metric definitions, schemas, lineage, and access controls so reporting reconciles across operations, finance, and sales.",
    visualTodo: "lineage diagram or governance model screenshot",
  },
];
