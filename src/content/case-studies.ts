import type { MetadataCell } from "@/components/metadata-grid";
import type { Stat } from "@/components/stat-callout";

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  company: string;
  visualTodo: string; // for the hero card visual
  overview: string;
  metadata: MetadataCell[];
  stats: Stat[];
  constraints: string[];
  sections: {
    id: string;
    label: string;
    heading: string;
    body: string[];
    /** Optional inline visual placeholder TODOs */
    visuals?: { todo: string; aspect?: string }[];
  }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pricing-intelligence-platform",
    title: "ML Pricing Intelligence Platform",
    oneLiner:
      "Freight brokerage needed to price thousands of lanes in real time; manual quoting was slow and inconsistent.",
    year: "2025 — Present",
    company: "Genpro",
    visualTodo:
      "insert dashboard screenshot or short autoplay loop of the pricing UI (lane lookup → recommended rate + forecast)",
    overview:
      "I led the third-party engineering team that built Genpro's ML-driven pricing and lane analytics platform — a React frontend over a Python ML stack and BigQuery warehouse — to give brokers real-time, model-backed quoting and to power daily GTM market targeting.",
    metadata: [
      { label: "Stack", value: "React • Python (scikit-learn, XGBoost) • BigQuery" },
      { label: "Scale", value: "Thousands of lanes priced daily" },
      { label: "Latency", value: "Real-time at quote time" },
      {
        label: "Outcome",
        value: "Powers daily GTM market-targeting + lane pricing decisions",
      },
    ],
    stats: [
      { value: "1000s", label: "Lanes priced daily", caption: "Across the active U.S. truckload network" },
      { value: "Real-time", label: "Quote-time latency", caption: "Brokers get a model-backed price before they pick up the phone" },
      { value: "Daily", label: "GTM cadence", caption: "Sales and capacity teams target lanes off the same model output" },
    ],
    constraints: [
      "Pricing must be defensible to a broker, not just accurate",
      "Model retrains must not block live quoting",
      "Same data must serve sales targeting and quote pricing",
      "Outputs need to reconcile against finance reporting",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "Pricing was a bottleneck, not a moat.",
        body: [
          "Brokers were quoting lanes by intuition and recent memory, which meant inconsistent rates across the desk and slow turnarounds on RFPs. The pricing process couldn't keep up with how fast the freight market actually moved.",
          "Sales and capacity were targeting different lanes than pricing thought were attractive — three teams, three views of the same market, and no shared source of truth.",
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "The data existed — it just wasn't wired into the decision.",
        body: [
          "We had years of historical loads in BigQuery, plus external market signals, but nothing turned that into a lane-level price a broker could use in the moment. The gap was operational, not analytical.",
          "Existing dashboards were retrospective. To change behavior at quote time, the model had to live where the quote was actually being made.",
        ],
        visuals: [
          {
            todo: "architecture diagram for Pricing Platform — React frontend → API gateway → Python ML service → BigQuery warehouse, with sidecars for retraining + feature store",
          },
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "One model, three surfaces.",
        body: [
          "If we trained a single pricing model on the same warehouse data the entire commercial org used, then exposed it through (1) a quoting UI, (2) a GTM targeting view, and (3) a market forecasting feed, all three teams would converge on the same picture of the market.",
          "That meant we couldn't ship a notebook — we had to ship a product. React + Python ML + BigQuery, deployed to brokers' actual workflow.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Led the build end-to-end with a third-party engineering team.",
        body: [
          "I owned the spec, the data model, and the integration into broker workflows; the third-party team owned the React frontend and the Python ML service implementation. We standardized on scikit-learn and XGBoost for the core pricing models, BigQuery as the system of record, and a thin API layer to keep retraining decoupled from quote-time serving.",
          "The hardest part wasn't the model — it was making the outputs trustworthy. Every recommended price needed an explainability trail a broker could push back on, and every aggregate needed to reconcile against finance's monthly numbers.",
        ],
        visuals: [
          {
            todo: "dashboard screenshot for Pricing Platform — broker view showing recommended rate, recent comparable lanes, and confidence band",
            aspect: "aspect-[16/9]",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "From spreadsheet pricing to a system the GTM org runs on.",
        body: [
          "The platform is now the default surface for lane pricing and is wired directly into daily GTM market-targeting decisions. Sales, capacity, and pricing work off the same numbers for the first time.",
          "Just as importantly, the underlying warehouse, models, and serving layer are now the substrate the next set of internal ML projects sit on — not a one-off.",
        ],
      },
    ],
  },
  {
    slug: "enterprise-analytics-platform",
    title: "Enterprise Analytics Platform",
    oneLiner:
      "Enterprise customers had no commercial-data visibility into their cold-storage operations.",
    year: "2024",
    company: "USCS",
    visualTodo:
      "dashboard hero screenshot showing the customer-facing analytics view (operational + commercial metrics for a single customer account)",
    overview:
      "I architected and shipped a React + Google Kubernetes Engine analytics platform processing $150M+ in operational and commercial data, deployed directly to enterprise customer accounts so their teams could make pricing and operational decisions off the same numbers we did.",
    metadata: [
      { label: "Stack", value: "React • Google Kubernetes Engine • BigQuery" },
      { label: "Scale", value: "$150M+ in operational data" },
      { label: "SLA", value: "Enterprise-grade, customer-facing" },
      {
        label: "Outcome",
        value: "Customer accounts using it for pricing + operational decisions",
      },
    ],
    stats: [
      { value: "$150M+", label: "Operational data processed", caption: "Across the customer book that opted into the platform" },
      { value: "TODO", label: "Enterprise accounts on the platform", caption: "TODO: confirm exact count before launch" },
      { value: "TODO", label: "Customer business teams using it", caption: "TODO: confirm — was at least pricing, ops, and finance per account" },
    ],
    constraints: [
      "Customer-facing — every chart had to be defensible externally",
      "Multi-tenant data isolation, no cross-customer leakage",
      "GKE deployment had to survive enterprise security review",
      "Same warehouse had to feed internal and external surfaces",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "Customers couldn't see what we could see.",
        body: [
          "Enterprise cold-storage customers were running their supply chain through us but only got visibility through monthly PDFs and ad-hoc requests. They had no way to interrogate their own operational and commercial data in real time.",
          "Every account renewal turned into a custom data pull. The volume of one-off requests was eating analyst time that should have been spent on actual analysis.",
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "The data was a product. We were treating it as a report.",
        body: [
          "We were sitting on $150M+ in operational and commercial data per year for these accounts. Customers were already paying for it — they just couldn't access it on their own terms.",
          "Building a delivery vehicle for that data wasn't a reporting project. It was a product project: multi-tenant, customer-facing, with the security posture of an enterprise SaaS.",
        ],
        visuals: [
          {
            todo: "architecture diagram for Enterprise Analytics Platform — React app on GKE, multi-tenant data layer, BigQuery as the system of record, auth/isolation boundaries highlighted",
          },
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "Ship the same view we use, scoped per customer.",
        body: [
          "If we exposed the same operational dashboards we used internally — scoped per-customer with hard tenant isolation — customers would self-serve the questions that currently came in as tickets, and account teams would have a shared surface to talk through performance.",
          "That meant React for the frontend, GKE for the deployment to survive enterprise IT review, and BigQuery as the system of record so internal and external views stayed in sync.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Architected, built, and deployed into enterprise accounts.",
        body: [
          "I owned the architecture and led the build — React frontend, GKE for the orchestration layer, BigQuery as the warehouse. Tenant isolation was enforced at the data layer, not just the UI, so a misconfigured frontend couldn't leak across accounts.",
          "Deployment was the slow part: each enterprise customer ran the platform through their own security review. Getting through those reviews shaped a lot of decisions about how data flowed and how auth was structured.",
        ],
        visuals: [
          {
            todo: "dashboard hero screenshot for Enterprise Analytics Platform — single-customer view with operational + commercial KPIs side by side",
            aspect: "aspect-[16/9]",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "From PDFs to a platform.",
        body: [
          "The platform is live in enterprise customer accounts and is used by their pricing and operational teams to make decisions that previously required pulling our analysts into the room.",
          "On our side, the analyst time we recovered from killing one-off data pulls now goes back into the next layer of the product — and the warehouse those dashboards sit on top of is the same one the pricing and causal-inference work runs against.",
        ],
      },
    ],
  },
  {
    slug: "causal-inference-evaluation-framework",
    title: "Causal-Inference Evaluation Framework",
    oneLiner:
      "‘Did this ML actually work?’ had no rigorous answer — heterogeneous customer scenarios made simple A/B impossible.",
    year: "2024",
    company: "USCS",
    visualTodo:
      "methodology diagram + before/after savings-validation table showing a per-customer counterfactual lift estimate",
    overview:
      "I designed a regression and causal-inference framework to quantify the impact of ML and pricing changes across heterogeneous customer scenarios — and used it to validate $9.3M+ in ML-driven savings on a standardized methodology the org now reuses.",
    metadata: [
      {
        label: "Stack",
        value: "Python • statsmodels • custom causal-inference toolkit",
      },
      { label: "Scope", value: "Enterprise customer accounts" },
      { label: "Adoption", value: "Standardized eval methodology org-wide" },
      { label: "Outcome", value: "Validated $9.3M+ in ML-driven savings" },
    ],
    stats: [
      { value: "$9.3M+", label: "ML-driven savings validated", caption: "Quantified through the framework across active customer scenarios" },
      { value: "TODO", label: "Customer scenarios evaluated", caption: "TODO: confirm exact count of distinct customer × intervention pairs" },
      { value: "1", label: "Standardized methodology", caption: "Replaced ad-hoc, per-project evaluation across the org" },
    ],
    constraints: [
      "Customers are not interchangeable — no clean control group exists",
      "Interventions overlap in time and across accounts",
      "Results must be defensible to finance, not just data science",
      "Reusable as a methodology, not a one-off study",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "Every project claimed savings. Nobody could prove them.",
        body: [
          "Multiple ML and pricing initiatives were running across the customer book at the same time. Each one had an intuition for the impact it was creating, and each one was effectively un-auditable — the customers were too different from each other to A/B test in any clean way.",
          "Finance, naturally, wanted a number they could put in front of leadership. The existing answer was a stack of one-off analyses that didn't agree with each other.",
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "We needed a framework, not another study.",
        body: [
          "The problem wasn't that any single analysis was wrong — it was that every analyst was answering the question differently, with different assumptions, on different time windows. There was no shared methodology to even disagree against.",
          "Causal inference was the right toolset: regression-based estimators with explicit controls for customer-level heterogeneity, applied the same way across every intervention.",
        ],
        visuals: [
          {
            todo: "methodology diagram for Causal-Inference Framework — DGP cartoon → estimator choice tree → counterfactual lift calculation per customer × intervention",
          },
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "Standardize the estimator. Vary the inputs.",
        body: [
          "If we picked a small set of estimators (regression, fixed-effects, simple synthetic-control style methods) and standardized how they got applied across customer scenarios, the outputs would become comparable across projects — and the methodology itself would become an asset, not a one-time deliverable.",
          "That meant making the framework usable by analysts who weren't necessarily causal-inference specialists. Documentation, sensible defaults, and explicit error bars mattered as much as the math.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "A Python toolkit + a playbook the team actually uses.",
        body: [
          "I built the framework in Python on top of statsmodels with a thin custom layer that encoded the conventions (treatment definition, control selection, lift calculation, confidence reporting). The toolkit got paired with a short playbook so a non-specialist could run a defensible evaluation without re-deriving the methodology each time.",
          "Working through it on real interventions exposed the rough edges quickly — most of the engineering effort went into making it robust to messy real-world data, not into the estimators themselves.",
        ],
        visuals: [
          {
            todo: "before/after savings-validation table for Causal-Inference Framework — pre vs. post intervention lift, with confidence intervals, for 3–5 example customers",
            aspect: "aspect-[16/9]",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "$9.3M+ defended — and a methodology the org keeps reaching for.",
        body: [
          "The framework was used to validate $9.3M+ in ML-driven savings across the customer book, with results finance was willing to stand behind. It also retired several competing one-off methodologies and became the default way the team evaluates new interventions.",
          "The bigger win was cultural: ‘did this actually work?’ stopped being a debate about methodology and started being a debate about the underlying business.",
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
    title: "Mutuall — Chrome Extension for Supply-Chain Portal Automation",
    tag: "Cofounder · 2023 – 2025",
    description:
      "Chrome extension that automated purchase-order management and one-click appointment scheduling across supply-chain portals. Smart PO lookup matched orders to the correct facility ID, encrypted credential storage handled portal logins, and an activity log made every booking auditable. Sunset after a 2-year cycle.",
    visualTodo: "Mutuall product screenshot or schema diagram",
    image: "/mutuall/product-1.png",
    href: "https://chromewebstore.google.com/detail/mutuall/mfpagiocmfjfmphagndihhfclhhpjebd",
  },
  {
    title: "BigQuery Enterprise Data Governance",
    tag: "Genpro · 2025",
    description:
      "Standardized metric definitions, schemas, lineage, and access controls so reporting reconciles across operations, finance, and sales.",
    visualTodo: "lineage diagram or governance model screenshot",
  },
  {
    title: "EDI / Cleo Integration Replacement",
    tag: "Genpro · 2025",
    description:
      "Replaced an $80K/year third-party EDI middleware platform with an internal integration system handling EDI, ETL, and API data exchange.",
    visualTodo: "EDI/integration architecture diagram, before vs. after vendor",
  },
];
