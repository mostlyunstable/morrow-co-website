export type ServiceSlug =
  | "automation"
  | "saas"
  | "web-products"
  | "custom-engineering";

export interface AgencyService {
  index: string;
  slug: ServiceSlug;
  chainLabel: string;
  label: string;
  title: string;
  tagline: string;
  summary: string;
  startHereWhen: string;
  priceNote: string;
  price: {
    USD: string;
    INR: string;
  };
  timeline: string;
  halftoneVariant: "circuit" | "grid" | "wave" | "orbit";
  deliverables: string[];
  whatYouGet: { title: string; detail: string }[];
  stack: string[];
  idealFor: string;
}

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
] as const;

export const MARQUEE_TOOLS = [
  "Next.js",
  "TypeScript",
  "Python",
  "n8n",
  "Make",
  "Vercel",
  "Supabase",
  "Postgres",
  "Stripe",
  "Razorpay",
  "OpenAI",
  "Anthropic",
  "HubSpot",
  "Slack",
  "Twilio",
] as const;

export interface ManifestoToken {
  text: string;
  icon?: "grid" | "branch" | "arrow" | "briefcase" | "bars";
}

export const MANIFESTO_TOKENS: ManifestoToken[] = [
  { text: "Morrow" },
  { text: "&" },
  { text: "Co." },
  { text: "is" },
  { text: "the" },
  { text: "studio" },
  { text: "where" },
  { text: "repetitive" },
  { text: "busywork" },
  { text: "becomes" },
  { text: "software" },
  { text: "your" },
  { text: "team" },
  { text: "owns", icon: "grid" },
  { text: "—" },
  { text: "automations" },
  { text: "that" },
  { text: "run,", icon: "branch" },
  { text: "SaaS" },
  { text: "apps" },
  { text: "that" },
  { text: "scale,", icon: "arrow" },
  { text: "and" },
  { text: "web" },
  { text: "products" },
  { text: "that" },
  { text: "ship.", icon: "briefcase" },
  { text: "Built" },
  { text: "for" },
  { text: "India" },
  { text: "and" },
  { text: "the" },
  { text: "world.", icon: "bars" },
];

export const SERVICES: AgencyService[] = [
  {
    index: "01",
    slug: "automation",
    chainLabel: "01 / Kill busywork",
    label: "WORKFLOW & AI AUTOMATION",
    title: "Workflow & AI Automation",
    tagline:
      "Every repetitive spreadsheet, handoff, and manual sync replaced by pipelines that run 24/7.",
    summary:
      "We audit your daily bottlenecks and wire autonomous pipelines across your CRM, spreadsheets, WhatsApp, email, invoicing, and internal ops—so routine work finishes before your team wakes up.",
    startHereWhen:
      "your team is copying data between tabs, chasing manual approvals, or drowning in repetitive customer/lead follow-ups.",
    priceNote: "Workflow audit credited back in full if you build with us",
    price: {
      USD: "From $650",
      INR: "From ₹45,000",
    },
    timeline: "1 – 2 weeks",
    halftoneVariant: "circuit",
    deliverables: [
      "Autonomous n8n, Make, or Python pipelines",
      "AI agents for triage, parsing & replies",
      "WhatsApp, Slack, GST & CRM two-way sync",
      "Error alerts, retries & team runbooks",
    ],
    whatYouGet: [
      {
        title: "Autonomous multi-step pipelines",
        detail:
          "n8n, Make, or custom Python/Node workers connecting your CRM, sheets, email, and webhooks cleanly.",
      },
      {
        title: "Production AI agents",
        detail:
          "Lead qualification, invoice/PDF parsing, and support drafting with strict schema validation and guardrails.",
      },
      {
        title: "India & global stack native",
        detail:
          "Two-way sync across WhatsApp Cloud API, Zoho, Razorpay, GST invoicing, Slack, HubSpot, and Notion.",
      },
      {
        title: "Observability & team runbooks",
        detail:
          "Dead-letter retries, Slack/email failure alerts, and full handover docs in your own accounts.",
      },
    ],
    stack: ["n8n", "Python", "OpenAI", "Anthropic", "Webhooks", "Slack API"],
    idealFor:
      "Founders and ops teams drowning in manual copy-paste work.",
  },
  {
    index: "02",
    slug: "saas",
    chainLabel: "02 / Launch SaaS",
    label: "CUSTOM SAAS APPLICATIONS",
    title: "Custom SaaS Applications",
    tagline:
      "From raw problem statement to multi-tenant, revenue-ready software your customers pay for.",
    summary:
      "We take your product idea or internal service and engineer a complete SaaS application—authentication, multi-tenant Postgres, dual INR/USD billing, and a sub-second React workspace.",
    startHereWhen:
      "you have validated customer demand and want a production-grade v1 shipped in weeks instead of burning months hiring.",
    priceNote: "Fixed-scope milestones with weekly live staging demos",
    price: {
      USD: "From $2,800",
      INR: "From ₹1,85,000",
    },
    timeline: "3 – 6 weeks",
    halftoneVariant: "grid",
    deliverables: [
      "Multi-tenant auth, roles & SSO ready",
      "Stripe (global) & Razorpay (UPI/INR) billing",
      "Sub-second React & Next.js workspaces",
      "Production Postgres, logs & CI/CD",
    ],
    whatYouGet: [
      {
        title: "Multi-tenant architecture",
        detail:
          "Workspaces, role-based permissions, magic links/OAuth, and row-level security baked in from day one.",
      },
      {
        title: "Stripe + Razorpay subscriptions",
        detail:
          "Collect recurring USD/EUR globally via Stripe and INR/UPI locally via Razorpay with automated GST/tax receipts.",
      },
      {
        title: "High-craft Next.js product UI",
        detail:
          "Keyboard-friendly dashboards, optimistic updates, and clean responsive design built for daily users.",
      },
      {
        title: "Zero-lock-in deployment",
        detail:
          "Everything pushed to your GitHub, Supabase/Postgres, and Vercel/AWS with automated CI/CD.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Stripe", "Razorpay"],
    idealFor:
      "Startups launching v1 fast and teams productizing a service.",
  },
  {
    index: "03",
    slug: "web-products",
    chainLabel: "03 / Ship web apps",
    label: "WEB PRODUCTS & PORTALS",
    title: "Web Products & Client Portals",
    tagline:
      "Flagship web apps, customer portals, and booking systems engineered for speed and trust.",
    summary:
      "Built to command authority in Bengaluru, Mumbai, London, and San Francisco—combining editorial design craft, interactive portals, and edge-cached global performance.",
    startHereWhen:
      "your current site looks generic, slows down conversions, or your clients need a dedicated self-serve portal.",
    priceNote: "Includes multi-currency UX and technical SEO setup",
    price: {
      USD: "From $1,200",
      INR: "From ₹85,000",
    },
    timeline: "2 – 4 weeks",
    halftoneVariant: "wave",
    deliverables: [
      "Editorial UI with fluid scroll & canvas art",
      "Self-serve client portals & dashboards",
      "INR ₹ / USD $ localization & edge speed",
      "Technical SEO & analytics wired in",
    ],
    whatYouGet: [
      {
        title: "Studio-grade editorial design",
        detail:
          "Custom typography, Lenis smooth scroll, and interactive canvas/WebGL visuals tailored to your brand.",
      },
      {
        title: "Self-serve customer portals",
        detail:
          "Authenticated booking flows, document vaults, status trackers, and onboarding wizards.",
      },
      {
        title: "India & international framing",
        detail:
          "Sub-50ms edge caching across Mumbai and global PoPs with native INR / USD currency support.",
      },
      {
        title: "Conversion & analytics ready",
        detail:
          "Clean semantic SEO, structured metadata, lead webhooks, and privacy-first event tracking.",
      },
    ],
    stack: ["Next.js", "Tailwind CSS", "Lenis", "HTML5 Canvas", "Vercel Edge"],
    idealFor:
      "Companies upgrading their flagship or launching customer portals.",
  },
  {
    index: "04",
    slug: "custom-engineering",
    chainLabel: "04 / Solve anything",
    label: "BESPOKE SOLUTIONS & APIS",
    title: "Bespoke Solutions & APIs",
    tagline:
      "You have a problem, we build whatever the demand requires—with zero off-the-shelf limits.",
    summary:
      "When generic tools break on your edge cases—custom ERP bridges, scraping pipelines, AI copilots, or internal admin consoles—we architect and ship the exact tool you need.",
    startHereWhen:
      "the spreadsheet or off-the-shelf tool everything runs on has become the bottleneck holding your team back.",
    priceNote: "Quoted flat after a 30-minute architecture diagnostic",
    price: {
      USD: "From $1,500",
      INR: "From ₹1,10,000",
    },
    timeline: "Scoped to problem",
    halftoneVariant: "orbit",
    deliverables: [
      "Custom REST & GraphQL API middleware",
      "Internal admin tools & analytics engines",
      "Automated reports, PDFs & GST workflows",
      "100% source code ownership, zero lock-in",
    ],
    whatYouGet: [
      {
        title: "Custom APIs & middleware",
        detail:
          "Reliable bridges between legacy ERPs, payment gateways, shipping partners, and modern cloud apps.",
      },
      {
        title: "Purpose-built internal tools",
        detail:
          "Inventory consoles, operations command centers, and approval dashboards built around your exact workflow.",
      },
      {
        title: "Document & compliance automation",
        detail:
          "Automated PDF/report generation, GST/tax reconciliation, and scheduled data exports.",
      },
      {
        title: "Full ownership & documentation",
        detail:
          "Clean, typed repositories with tests and runbooks so any engineer on your team can extend it.",
      },
    ],
    stack: ["Node.js", "Python", "FastAPI", "Postgres", "Redis", "Docker"],
    idealFor:
      "Businesses with unique bottlenecks generic SaaS cannot touch.",
  },
];

export const DIAGNOSTIC_ROUTES = [
  {
    pain: "Our team spends hours every day copying records across WhatsApp, sheets, and our CRM.",
    serviceTitle: "Workflow & AI Automation",
    slug: "automation" as ServiceSlug,
    step: { USD: "From $650", INR: "From ₹45,000" },
  },
  {
    pain: "Customers want our solution as a self-serve software product with logins and billing.",
    serviceTitle: "Custom SaaS Applications",
    slug: "saas" as ServiceSlug,
    step: { USD: "From $2,800", INR: "From ₹1,85,000" },
  },
  {
    pain: "Our current website or client portal feels outdated and fails to convert global or Indian buyers.",
    serviceTitle: "Web Products & Client Portals",
    slug: "web-products" as ServiceSlug,
    step: { USD: "From $1,200", INR: "From ₹85,000" },
  },
  {
    pain: "The spreadsheet or legacy tool our business runs on has become the biggest bottleneck.",
    serviceTitle: "Bespoke Solutions & APIs",
    slug: "custom-engineering" as ServiceSlug,
    step: { USD: "Free architecture quote", INR: "Free architecture quote" },
  },
  {
    pain: "Everything is manual and we aren't sure what to automate or build first.",
    serviceTitle: "Scope with our engineers",
    slug: "automation" as ServiceSlug,
    step: { USD: "Free · 30 minutes", INR: "Free · 30 minutes" },
  },
] as const;

export const ENGAGEMENT_PRINCIPLES = [
  {
    index: "01",
    title: "Every build starts with a clear problem scope",
    takeaway: "You see the exact architecture before code begins",
  },
  {
    index: "02",
    title: "Fixed milestone pricing in INR or USD",
    takeaway: "No bloated retainers and no surprise invoices",
  },
  {
    index: "03",
    title: "Built in your accounts and handed over clean",
    takeaway: "You keep the repos, the cloud, and the data",
  },
] as const;

export const FAQS = [
  {
    q: "What kinds of problems does Morrow & Co. actually solve?",
    a: "Two core tracks: (1) eliminating repetitive operational busywork through workflow & AI automation, and (2) engineering custom web products, SaaS applications, client portals, and bespoke internal tools. If your team is doing something manually—or your customers are asking for software you don't have yet—we build the solution.",
  },
  {
    q: "Do you work with both Indian and international clients?",
    a: "Yes. We partner with founders and enterprises across India (Bengaluru, Mumbai, Delhi NCR, Hyderabad) as well as teams in the US, UK, UAE, Europe, and Singapore. We support both INR (UPI/bank transfer with GST invoicing) and USD/EUR/GBP (Stripe, Wise, or wire) alongside overlapping async + live sprint calls across timezones.",
  },
  {
    q: "How fast can we go from an idea or bottleneck to live software?",
    a: "Focused workflow automations typically ship in 7 to 14 days. Flagship web products take 2 to 4 weeks, and full multi-tenant SaaS MVPs usually launch in 3 to 6 weeks with weekly working builds you can test live.",
  },
  {
    q: "Do we own the source code and automation workflows?",
    a: "100%. Every repository, database schema, cloud deployment, and n8n/Python workflow is provisioned under your accounts. You never depend on Morrow & Co. to keep your own product running.",
  },
  {
    q: "What happens if we don't know the exact technical stack yet?",
    a: "That's our job. You describe the business problem, desired outcome, and budget range in our onboarding flow, and we recommend the simplest, lowest-maintenance architecture to get you there.",
  },
  {
    q: "Can you integrate Indian platforms like Razorpay, WhatsApp Business, or Zoho alongside global tools?",
    a: "Absolutely. We routinely connect Razorpay, WhatsApp Cloud API, Zoho, and Tally/GST workflows alongside global tools like Stripe, HubSpot, Slack, Notion, OpenAI, and Supabase.",
  },
] as const;
