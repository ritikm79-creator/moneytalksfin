import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { services, siteConfig } from "@/config/siteConfig";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SceneLayer } from "@/components/SceneLayer";
import { WhatsAppButton, WhatsAppFab } from "@/components/WhatsAppButton";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smarter Financial Opportunities | IPOs, Unlisted Shares, Forex Mentorship" },
      {
        name: "description",
        content:
          "Information and guidance on IPO updates, unlisted shares, forex trading mentorship and portfolio management services.",
      },
      { property: "og:title", content: "Your Gateway to Smarter Financial Opportunities" },
      {
        property: "og:description",
        content:
          "IPO updates, unlisted shares, forex mentorship and portfolio management information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function GoldLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn-gold inline-flex min-h-11 items-center gap-2 rounded-full px-7 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em]"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
function Heading({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="fluid-h2 mt-3 font-bold text-ice">
        {children}
      </h2>
    </>
  );
}

const values = [
  [
    "Professional guidance",
    "A focus on providing relevant information and professional assistance.",
  ],
  ["Market insights", "Access to relevant market information and developments."],
  [
    "Transparent communication",
    "Clear communication about available services, processes, and associated risks.",
  ],
  [
    "Client-focused approach",
    "Understanding customer requirements before discussing relevant services.",
  ],
  [
    "Multiple financial segments",
    "Information and assistance across IPOs, unlisted shares, forex education, and portfolio-related services.",
  ],
];
const steps = [
  ["Explore", "Explore the available financial services and understand what each service offers."],
  ["Select", "Choose the financial service you are interested in."],
  ["Connect", "Contact the team through WhatsApp or submit an enquiry through the website."],
  [
    "Discuss",
    "Discuss your requirements and receive relevant information about the selected service.",
  ],
];
// constellation node positions (%), desktop
const nodes: [number, number][] = [
  [12, 30],
  [36, 70],
  [52, 18],
  [70, 62],
  [88, 28],
];

function Home() {
  const [paused, setPaused] = useState(false);
  const { business, registrations, team } = siteConfig;
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        Skip to content
      </a>
      <SceneLayer paused={paused} />
      <Nav paused={paused} onTogglePause={() => setPaused((p) => !p)} />
      <main id="main" className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          aria-labelledby="hero-h"
          className="flex min-h-svh items-end px-5 pb-16 pt-28 md:items-center md:pb-0"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl">
              <h1 id="hero-h" className="fluid-h1 font-bold text-ice">
                Your gateway to <span className="text-headline-gradient">smarter financial</span>{" "}
                opportunities.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-silver">
                Explore IPO opportunities, unlisted shares, forex trading mentorship, and portfolio
                management services with professional financial insights and guidance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldLink href="#services">Explore our services</GoldLink>
                <WhatsAppButton>Connect on WhatsApp</WhatsAppButton>
              </div>
              <p className="mt-5 text-xs text-silver">
                Investments involve risk. See{" "}
                <Link to="/risk-disclosure" className="text-cyan underline">
                  Risk Disclosure
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          aria-labelledby="about-h"
          className="flex min-h-svh items-center px-5 py-24"
        >
          <div className="glass mx-auto max-w-3xl rounded-2xl p-8 sm:p-12">
            <Heading id="about-h" eyebrow="About">
              Empowering your financial journey.
            </Heading>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-silver">
              <p>
                We are a financial services business focused on providing market insights,
                investment-related information, and financial guidance across multiple financial
                segments.
              </p>
              <p>
                Our objective is to make relevant financial information more accessible while
                maintaining a commitment to transparent communication, professional assistance, and
                informed decision-making.
              </p>
              <p>
                Through our services, we aim to help individuals explore financial opportunities and
                better understand the markets.
              </p>
              {business.mission && <p className="text-ice">{business.mission}</p>}
              {business.location && <p>{business.location}</p>}
            </div>
            {registrations.length > 0 && (
              <ul className="mt-6 space-y-1 text-sm text-silver">
                {registrations.map((r) => (
                  <li key={r.number}>
                    {r.body}: {r.number} ({r.scope})
                  </li>
                ))}
              </ul>
            )}
            {team.length > 0 && (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {team.map((t) => (
                  <li key={t.name} className="text-ice">
                    {t.name} <span className="text-silver">· {t.role}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" aria-labelledby="services-h" className="px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <Heading id="services-h" eyebrow="Services">
              Four ways to explore the markets.
            </Heading>
            <div className="mt-12 space-y-[30vh]">
              {services.map((s) => (
                <article
                  key={s.id}
                  id={`service-${s.id}`}
                  aria-labelledby={`${s.id}-h`}
                  className={`glass max-w-2xl rounded-2xl p-7 sm:p-10 ${Number(s.index) % 2 === 0 ? "md:ml-auto" : ""}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">
                      {s.index} · {s.label}
                    </p>
                    <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-silver">
                      {s.contentType}
                    </span>
                  </div>
                  <h3 id={`${s.id}-h`} className="mt-4 text-2xl font-bold text-ice sm:text-3xl">
                    {s.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-silver">{s.description}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex gap-3 text-ice">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-l-2 border-gold pl-3 text-sm text-silver">
                    <strong className="text-ice">Important: </strong>
                    {s.important}
                  </p>
                  {s.regulatoryStatusVerified === false && (
                    <p className="mt-3 rounded-lg bg-gold/10 px-3 py-2 text-sm font-semibold text-gold">
                      Availability subject to regulatory authorization.
                    </p>
                  )}
                  <div className="mt-6">
                    <WhatsAppButton variant="gold" message={s.whatsappMessage}>
                      {s.cta}
                    </WhatsAppButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" aria-labelledby="why-h" className="px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <Heading id="why-h" eyebrow="Why choose us">
              Why connect with us?
            </Heading>
            <div className="relative mt-12 hidden h-[460px] md:block">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polyline
                  points={nodes.map(([x, y]) => `${x},${y}`).join(" ")}
                  fill="none"
                  stroke="var(--cyan)"
                  strokeOpacity=".5"
                  strokeWidth=".25"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <ol className="contents">
                {values.map(([t, d], i) => (
                  <li
                    key={t}
                    tabIndex={0}
                    className="group absolute w-56 -translate-x-1/2 -translate-y-3 text-center"
                    style={{ left: `${nodes[i]?.[0]}%`, top: `${nodes[i]?.[1]}%` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mx-auto block h-5 w-5 rounded-full bg-gold shadow-[var(--shadow-gold)] ring-4 ring-cyan/30 animate-breathe"
                    />
                    <h3 className="mt-3 text-sm font-semibold tracking-widest text-ice">{t}</h3>
                    <p className="mt-1 text-sm text-silver">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <ol className="mt-10 space-y-8 border-l border-cyan/50 pl-6 md:hidden">
              {values.map(([t, d]) => (
                <li key={t} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold"
                  />
                  <h3 className="text-sm font-semibold tracking-widest text-ice">{t}</h3>
                  <p className="mt-1 text-silver">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* HOW */}
        <section id="how" aria-labelledby="how-h" className="px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <Heading id="how-h" eyebrow="How it works">
              Four simple steps.
            </Heading>
            <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan to-gold md:left-0 md:top-5 md:h-px md:w-full md:bg-gradient-to-r"
              />
              {steps.map(([t, d], i) => (
                <li key={t} tabIndex={0} className="relative pl-14 md:pl-0 md:pt-14">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-night font-display text-sm text-gold shadow-[var(--shadow-gold)]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold tracking-widest text-ice">{t}</h3>
                  <p className="mt-2 text-silver">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-h" className="px-5 py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl bg-night/70 p-6">
              <Heading id="contact-h" eyebrow="Contact">
                Let's start a conversation.
              </Heading>
              <p className="mt-6 text-lg leading-relaxed text-silver">
                Have questions about IPOs, unlisted shares, forex mentorship, or portfolio
                management? Connect with our team to discuss your requirements and explore the
                available services.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* FINAL */}
        <section aria-labelledby="final-h" className="flex min-h-[80svh] items-center px-5 py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl">
              <h2 id="final-h" className="fluid-h2 font-bold text-ice">
                Your next financial conversation{" "}
                <span className="text-headline-gradient">starts here.</span>
              </h2>
              <p className="mt-5 text-lg text-silver">
                Explore financial insights. Discover available services. Connect with our team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldLink href="#services">Explore our services</GoldLink>
                <WhatsAppButton>Connect with us</WhatsAppButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
