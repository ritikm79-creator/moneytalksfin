import { z } from "zod";

/**
 * Central, editable site configuration. Empty values are HIDDEN in the UI.
 * Never put unverified facts here.
 */
export type ServiceId = "ipo" | "unlisted" | "forex" | "portfolio";

export interface Service {
  id: ServiceId;
  index: string;
  label: string;
  headline: string;
  description: string;
  features: string[];
  cta: string;
  whatsappMessage: string;
  important: string;
  contentType:
    | "Educational information"
    | "General market information"
    | "Regulated services (subject to authorization)";
  regulatoryStatusVerified?: boolean;
}

const configSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    location: z.string(),
    mission: z.string(),
  }),
  contact: z.object({
    whatsappNumber: z.string().regex(/^(\d{8,15})?$/),
    email: z.string(),
    phone: z.string(),
  }),
  social: z.record(z.string(), z.string()),
  team: z.array(z.object({ name: z.string(), role: z.string() })),
  registrations: z.array(
    z.object({ body: z.string(), number: z.string(), scope: z.string(), verifiedOn: z.string() }),
  ),
  form: z.object({
    provider: z.enum(["none", "formspree", "web3forms", "endpoint"]),
    endpoint: z.string(),
  }),
  legal: z.object({ updated: z.string(), jurisdiction: z.string(), reviewed: z.boolean() }),
});

const rawWa = (import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined) ?? "";

export const siteConfig = configSchema.parse({
  business: { name: "Money Talks", tagline: "", location: "", mission: "" },
  contact: { whatsappNumber: "919099537935", email: "", phone: "" },
  social: { linkedin: "", instagram: "", youtube: "", facebook: "", x: "", telegram: "" },
  team: [],
  registrations: [],
  form: {
    provider: ((import.meta.env["VITE_FORM_PROVIDER"] as string | undefined) ?? "none") as "none",
    endpoint: (import.meta.env["VITE_FORM_ENDPOINT"] as string | undefined) ?? "",
  },
  legal: { updated: "", jurisdiction: "", reviewed: false },
});

/** Wordmark shown when no business name is configured. */
export const brandName = siteConfig.business.name || "Financial Services";

export const services: Service[] = [
  {
    id: "ipo",
    index: "01",
    label: "IPO Updates",
    headline: "Discover upcoming IPO opportunities.",
    description:
      "Stay informed about upcoming IPOs, subscription updates, important dates, company information, and listing-related developments.",
    features: [
      "Upcoming IPO information",
      "Opening and closing dates",
      "Subscription updates",
      "Company fundamentals",
      "Listing-related developments",
      "Relevant market information",
    ],
    cta: "Enquire about IPOs",
    whatsappMessage:
      "Hello, I would like to know more about your IPO-related services and updates.",
    important: "Information only. We do not solicit subscriptions to any specific IPO.",
    contentType: "General market information",
  },
  {
    id: "unlisted",
    index: "02",
    label: "Unlisted Shares",
    headline: "Explore the world of unlisted shares.",
    description:
      "Explore information about unlisted companies, company fundamentals, relevant market developments, and available investment-related opportunities.",
    features: [
      "Unlisted company information",
      "Company fundamentals",
      "Market updates",
      "Relevant business information",
      "Enquiry-based assistance",
    ],
    cta: "Explore unlisted shares",
    whatsappMessage:
      "Hello, I am interested in learning more about unlisted shares and the information you provide.",
    important: "Unlisted securities can be illiquid and carry higher risk.",
    contentType: "General market information",
  },
  {
    id: "forex",
    index: "03",
    label: "Forex & Mentorship",
    headline: "Understand the global currency markets.",
    description:
      "Explore forex market concepts, currency-market insights, technical analysis, trading education, and risk-management principles through structured mentorship.",
    features: [
      "Forex market education",
      "Currency-market insights",
      "Trading concepts",
      "Technical analysis",
      "Risk management",
      "Mentorship information",
    ],
    cta: "Enquire about forex mentorship",
    whatsappMessage:
      "Hello, I would like to know more about your forex trading mentorship and educational services.",
    important:
      "Educational mentorship only. Forex participation in India is restricted to permitted pairs through authorized entities.",
    contentType: "Educational information",
  },
  {
    id: "portfolio",
    index: "04",
    label: "Portfolio Management",
    headline: "Build a more informed financial approach.",
    description:
      "Explore portfolio-related services covering investment objectives, asset allocation, risk considerations, and portfolio monitoring, subject to applicable regulatory authorization.",
    features: [
      "Investment objective discussions",
      "Asset allocation information",
      "Risk considerations",
      "Portfolio monitoring",
      "Financial planning-related assistance",
    ],
    cta: "Enquire about portfolio services",
    whatsappMessage: "Hello, I would like to know more about your portfolio management services.",
    important: "Portfolio management is a regulated activity.",
    contentType: "Regulated services (subject to authorization)",
    regulatoryStatusVerified: false,
  },
];

export const formServiceOptions = [
  "IPO Updates",
  "Unlisted Shares",
  "Forex Trading & Mentorship",
  "Portfolio Management",
  "General Enquiry",
] as const;

export const RISK_DISCLOSURE =
  "Investments and financial market activities involve risks, including the possible loss of capital. Information presented on this website is for general informational and educational purposes and should not be interpreted as a guarantee of returns or personalized investment advice. Visitors should independently assess risks and consult appropriately qualified and authorized professionals before making financial decisions.";

export const GENERAL_WA_MESSAGE = "Hello, I would like to know more about your financial services.";
