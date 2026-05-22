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
    /** Optional inline visuals. `src` is a single image. When `stack` is set,
     *  the visual renders as a composite of images layered like a deck of
     *  cards. When `puzzle` is set, the visual renders an illustrated
     *  before/after comparison (scattered pieces → assembled puzzle). */
    visuals?: {
      todo: string;
      aspect?: string;
      src?: string;
      stack?: { src: string; label?: string }[];
      puzzle?: { before: string; after: string };
    }[];
  }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pricing-intelligence-platform",
    title: "ML Pricing Intelligence Platform",
    oneLiner:
      "Thousands of lanes priced daily · Quote-time pricing · Daily GTM targeting",
    year: "2025 — Present",
    company: "Genpro",
    visualTodo:
      "Network mapping visualization showing pricing flow across lanes (geo + model output)",
    heroImage: "/pricing/final-pricing.webp",
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
          {
            todo: "The CCM tool in action: the in-product UI brokers and pricing analysts use to interact with the model, configure lane rules, and review recommendations.",
            aspect: "aspect-[16/9]",
            src: "/pricing/final-pricing.webp",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "From spreadsheet pricing to a system the GTM org runs on.",
        body: [
          "The platform is the default surface for lane pricing at Genpro and is wired directly into daily GTM market-targeting decisions. Sales, capacity, and pricing are working off the same numbers for the first time, and the broker desk is no longer exposed to whichever way the DAT peer noise leaned that week.",
          "Just as important, the underlying warehouse, models, and serving layer are now the substrate the next set of internal ML projects sit on. Not a one-off.",
        ],
        visuals: [
          {
            todo: "The final solution to the pricing problem — a collage of the platform's surfaces and outputs. Full product UI not shown for IP reasons.",
            aspect: "aspect-[16/9]",
            src: "/pricing/product-collage.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "etl-integration-replacement",
    title: "Replacing Cleo: an Internal EDI + ETL + API Integration Service",
    oneLiner:
      "$80K/year vendor eliminated · EDI / ETL / API in-house · BigQuery-native trading-partner data",
    year: "2025",
    company: "Genpro",
    visualTodo:
      "Architecture diagram: trading partners → internal ingestion service (EDI parser, ETL pipelines, API connectors) → BigQuery → internal consumers",
    heroImage: "/cleo/integration-cloud.png",
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
          "The forcing function was a new TMS onboarding. The development required to fit the new TMS through Cleo's platform exposed the limits of the existing workflow, so we built the integration ourselves instead of paying Cleo to extend their model. Once that was live, backfilling the rest of the partner connections in-house followed naturally.",
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
    slug: "smartmove-platform",
    title: "Warehouse Move Optimization Platform (SmartMove)",
    oneLiner:
      "$9.3M validated savings · Nationwide rollout · “Game changer” per USCS leadership",
    year: "2024",
    company: "USCS",
    visualTodo:
      "SmartMove platform UI — consolidation recommendation queue with route map and bin-pack visualization",
    heroImage: "/smartmove/uscs-consolidation.jpg",
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
            todo: "One truck, four shippers: Shipper 1, Shipper 2, Shipper 3, Shipper 4 consolidated onto a single trailer. The platform's core output, on a single visual.",
            aspect: "aspect-[16/9]",
            src: "/smartmove/uscs-consolidation.jpg",
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
    slug: "mutuall-chrome-extension",
    title: "Mutuall — Chrome Extension for Logistics Scheduling Consolidation",
    oneLiner:
      "87% scheduling-time reduction · 15 portals collapsed into one toolbar · Human-approved browser agents",
    year: "2023 — 2025",
    company: "Cofounder · Mutuall",
    visualTodo:
      "Mutuall scheduling UI: companion-tool dropdown showing cross-portal slot recommendations",
    heroImage: "/mutuall/product-1.png",
    externalLink: {
      href: "https://chromewebstore.google.com/detail/mutuall/mfpagiocmfjfmphagndihhfclhhpjebd",
      label: "Live on the Chrome Web Store ↗",
    },
    overview:
      "Mutuall was a Chrome extension that collapsed logistics appointment scheduling from a stack of supplier-portal tabs into a single companion tool. Human-approved browser agents handled repetitive portal work from one toolbar, using encrypted on-device credentials and an auditable activity log. The user stayed in control of every booking. Cut scheduling time per user by 87%.",
    metadata: [
      { label: "Stack", value: "Chrome Extension (TypeScript) · React · Background AI agents · Encrypted local credential store" },
      { label: "Scale", value: "Multiple supply-chain portals supported per session" },
      { label: "Outcome", value: "87% reduction in scheduling time per user" },
      { label: "Lifetime", value: "2-year cycle · Sunset 2025" },
    ],
    stats: [
      { value: "87%", label: "Scheduling time reduction", caption: "Per-user time-to-schedule dropped across active sessions; what used to fill an afternoon now fit a morning" },
      { value: "15 → 1", label: "Portals collapsed into one toolbar", caption: "Five loads used to require ~15 different supplier-portal logins. Mutuall did them all from one surface" },
      { value: "Live", label: "On the Chrome Web Store", caption: "Public listing maintained through 2025" },
    ],
    constraints: [
      "Run inside the host portals' DOM without breaking them",
      "Encrypt credentials on-device; never send them to a server",
      "AI agents stay a companion, never an autonomous booker — every action requires user approval",
      "Survive portal layout changes without redeploying for every site",
      "Auditable trail for every scheduled appointment",
    ],
    sections: [
      {
        id: "symptom",
        label: "Symptom",
        heading: "Five loads meant fifteen portals.",
        body: [
          "Scheduling a single freight booking already means juggling a supplier portal, the receiving facility, and any intermediaries. Scheduling five loads typically meant logging into roughly fifteen different sites in a single afternoon. Five separate sets of credentials, five separate UIs, five separate copy-paste cycles between PO and slot picker.",
          "The work itself, picking the right slot at the right facility, was minutes of decision-making per load. Everything around it was hours of browser tax.",
        ],
        visuals: [
          {
            todo: "Just a few of the scheduling portals a typical logistics user juggled: Target on top, Walmart underneath, and any number of smaller / specialty portals below that.",
            aspect: "aspect-[16/10]",
            stack: [
              { src: "/mutuall/platform-1-target.png", label: "Target" },
              { src: "/mutuall/platform-2-walmart.png", label: "Walmart" },
              { src: "/mutuall/platform-3-other.png", label: "+ many more" },
            ],
          },
        ],
      },
      {
        id: "diagnosis",
        label: "Diagnosis",
        heading: "The scheduling work was solvable. The portal-switching was the cost.",
        body: [
          "When we shadowed logistics teams, the actual scheduling decisions (which slot, which carrier, which facility) were a small fraction of their day. Hours of it went into context-switching between portals to execute those decisions. The leverage point wasn't smarter scheduling; it was collapsing the switching cost to zero.",
          "Replacing the portals was a non-starter. We had to live inside them.",
        ],
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        heading: "Human-approved browser agents that act as the user's hands across portals.",
        body: [
          "Build a single browser-based companion that uses encrypted on-device credentials to dispatch user-approved browser agents across supplier portals. Schedulers approve a recommendation in one surface; the agents handle the repetitive cross-portal execution under human supervision. The user stays in control of every booking.",
          "Encrypted on-device credential storage and an exportable activity log gave the workflow the trust + audit posture logistics IT teams expected before letting any automation touch their portals.",
        ],
      },
      {
        id: "implementation",
        label: "Implementation",
        heading: "Human-approved browser agents, one toolbar, encrypted on-device.",
        body: [
          "The extension lived entirely in the user's Chrome and ran three jobs. (1) A PO lookup engine matched POs across portals to their correct facility IDs even when the portal UIs didn't surface that mapping. (2) Browser agents executed the cross-portal scheduling work using encrypted on-device credentials. Every action was queued for explicit user approval before execution — agents recommended and acted on direct human go-ahead, never autonomously. (3) An exportable activity log captured every action with audit-grade detail.",
          "Hard architectural constraint: human-in-the-loop on every booking. The product never autonomously booked an appointment. That made the failure mode 'agent didn't book' instead of 'agent booked the wrong thing,' which mattered a lot for adoption inside logistics IT.",
          "No backend. The entire extension lived inside the Chrome process. Credentials never left the user's machine, which removed an entire class of compliance conversations.",
        ],
        visuals: [
          {
            todo: "Mutuall companion tool: single-surface slot picker pulling availability across multiple portals via background agents.",
            aspect: "aspect-[16/9]",
            src: "/mutuall/product-1.png",
          },
          {
            todo: "Mutuall PO lookup view: POs matched to correct facility IDs across portals.",
            aspect: "aspect-[16/9]",
            src: "/mutuall/product-2.png",
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "Scheduling time down 87%, plus an audit trail as a side effect.",
        body: [
          "Across active users, scheduling time per load dropped by 87%. The same scheduler now did in a morning what used to fill an entire day.",
          "The activity log turned out to be the quiet second win. Logistics teams had been hand-maintaining appointment trackers in spreadsheets for audit purposes; the extension produced that as a side effect, exportable and accurate by construction.",
          "We ran the product for two years and sunset it in 2025 after an amicable wind-down. The Chrome Web Store listing stayed live through the cycle.",
        ],
        visuals: [
          {
            todo: "Mutuall, finalized: the single companion-tool surface that collapsed those fifteen portal tabs into one.",
            aspect: "aspect-[16/9]",
            src: "/mutuall/finalized-tool.png",
          },
          {
            todo: "Mutuall activity history: exportable log of recent POs and scheduled appointments.",
            aspect: "aspect-[16/9]",
            src: "/mutuall/product-3.png",
          },
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
