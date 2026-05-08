export const nav = {
  brand: "OmniServe",
  links: ["Features", "Industries", "Pricing", "Compliance", "Contact"],
};

export const parent = {
  name: "1404 Technologies",
  url: "https://www.1404technologies.com",
  logo: "/logos/1404_logo_light.svg",
};

export const hero = {
  tag: "A product by 1404 Technologies",
  headline: "Run your operations from one intelligent hub.",
  headlineAccent: "Audit-ready by default.",
  subheadline:
    "OmniServe eliminates software sprawl and connects your business tools — from project management and CRM to accounting and compliance — in one intelligent hub. Built for UK and U.S. SMEs.",
  cta: "Get Early Access",
  ctaSecondary: "See how it works",
};

export const stats = [
  { value: "50+", label: "Pre-built integrations" },
  { value: "Up to 5 hrs", label: "Saved per user per week" },
  { value: "3", label: "Industry modules" },
  { value: "Audit-ready", label: "MTD · HIPAA · GDPR" },
];

export const integrations = {
  caption: "Universal integration layer with Xero, QuickBooks, Salesforce, Trello, MS Project, and 50+ more.",
  items: ["Xero", "QuickBooks", "Salesforce", "Trello", "MS Project", "+ 50 more"],
};

export const features = [
  {
    iconName: "link",
    title: "Universal integration layer",
    description:
      "Pre-built connectors for Xero, QuickBooks, Salesforce, Trello, MS Project, and 50+ more — keep working in the tools you already use.",
  },
  {
    iconName: "bolt",
    title: "No-code workflow automation",
    description:
      "Automate workflows across project management, CRM, accounting, and compliance — without engineering.",
  },
  {
    iconName: "chart",
    title: "Unified dashboards",
    description:
      "Real-time cross-system dashboards combining operational and financial data into one view.",
  },
  {
    iconName: "card",
    title: "SaaS management",
    description:
      "Discover and optimize subscriptions. Reduce SaaS waste by identifying unused licenses.",
  },
  {
    iconName: "building",
    title: "Industry modules",
    description:
      "Tailored modules for Construction, Logistics, and Healthcare. Connect field teams to office systems in real time.",
  },
];

export const industries = [
  {
    title: "Healthcare",
    description:
      "Compliance engine with audit trails and MTD, HIPAA, and GDPR support.",
    highlights: [
      "Compliance engine with audit trails",
      "MTD / HIPAA / GDPR support",
      "Unified operational + financial dashboards",
    ],
    benefit: "Audit-ready",
  },
  {
    title: "Construction",
    description:
      "Connect field teams to office systems in real time, with no-code workflow automation.",
    highlights: [
      "Field-to-office connectivity, real time",
      "No-code workflow automation",
      "Universal integration layer (50+ tools)",
    ],
    benefit: "Real-time field ops",
  },
  {
    title: "Logistics",
    description:
      "Unified dashboards combining operational and financial data, plus SaaS management to trim unused subscriptions.",
    highlights: [
      "Unified operational + financial dashboards",
      "Universal integration layer",
      "SaaS management module",
    ],
    benefit: "Cross-system visibility",
  },
];

export const pricing = [
  {
    service: "OmniServe",
    model: "Per user / month (UK pricing)",
    rate: "£99 – £599",
    rateNote: "Rate varies by modules and team size — contact us for a tailored quote.",
    highlight: true,
  },
];

export const discounts = [
  "10% off for contracts over 12 months",
  "Volume-based discounts for teams over 50 users",
  "Bundle: Add OmniServe to any 1404 BPO service for 15% off both",
];

export const certifications = [
  { label: "HIPAA Compliant", color: "teal" },
  { label: "GDPR Compliant", color: "blue" },
  { label: "ISO 27001", color: "amber" },
  { label: "SOC 2 Type II", color: "violet" },
];

export const pricingIncludes = [
  "Universal integration layer (50+ tools)",
  "No-code workflow automation",
  "Unified operational + financial dashboards",
  "SaaS management module",
  "Compliance engine with audit trails",
  "MTD / HIPAA / GDPR support",
  "Industry modules (Construction, Logistics, Healthcare)",
  "Audit-ready compliance reporting",
];

export const caseStudies = [
  {
    client: "Healthcare Provider",
    location: "United Kingdom",
    challenge: "GDPR compliance gaps.",
    impact: [
      "70% reduction in compliance reporting time",
      "Zero non-compliance flags in HIPAA audit",
    ],
  },
];

const offices = [
  {
    label: "Global HQ",
    tag: "UK",
    address: "Suite 5711 Unit 3A, 34–35 Hatton Garden, Holborn, London EC1N 8DX",
    phone: "+44 7449 723948",
  },
  {
    label: "U.S. Office",
    tag: "U.S.",
    address: "Office 85 Suite 101-B, 254 Chapman Road, Newark, Delaware 19702",
    phone: "+1 (817) 601-6860",
  },
  {
    label: "Nigeria Office",
    tag: "NG",
    address: "10, Adeleke Street, Ikeja, Lagos, Nigeria",
    phone: "+234 707 920 7638",
  },
];

export const contact = {
  website: "www.1404technologies.com",
  email: "info@1404technologies.com",
  offices,
  phones: offices.map((o) => ({ tag: o.tag, number: o.phone })),
};
