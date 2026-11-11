# Moneytalksfin

# PROJECT: PREMIUM FINANCIAL UNIVERSE: Cinematic Night-City Financial Services Website



## 0. HOW TO WORK (read first)



You are a senior creative developer and front-end architect (React, WebGL, motion design) who also understands financial-marketing compliance. Build a complete, production-ready website, not a mockup.



Operating rules:

1. **Plan first.** Before writing code, output a short plan: file structure, scroll-timeline design, performance budget, and any assumptions. Then build in the phases in Section 14.

2. **Never invent facts.** No company credentials, registrations, founding dates, team members, client numbers, returns, performance charts, testimonials, awards, phone numbers, emails or addresses. Anything not supplied lives in the config as an empty value, and the UI that depends on it is hidden or shows a clearly marked, non-public placeholder (see Section 11).

3. **Don't block on missing inputs.** Build with the empty config, make everything config-driven, and list at the end what the owner must supply.

4. **Verify your own work.** Run type-check, lint and production build; fix failures; report real results, not assumptions.

5. **Visual reference rule.** The owner supplied a reference image (Section 3.1). Match its atmosphere, colour, lighting and composition. Use it for look and feel only. Do not copy its numbers, labels, tickers or percentages (see Section 5.4), and never copy its code or raster assets.



---



## 1. INPUTS (supplied by the business owner)



| Field | Value |

|---|---|

| Business name | `[INSERT]` (the reference image shows the wordmark "AegisIQ" with the line "Insights · Intelligence · Growth"; use only if the owner confirms it) |

| Location / address | `[INSERT or leave empty]` |

| Reference website | `[INSERT URL]` (the reference image footer shows `aegisiqequity.ai`; use only for verified facts, tone and branding cues; never copy its copy, images or code) |

| WhatsApp number (country code, digits only, e.g. 919XXXXXXXXX) | `[INSERT]` |

| Business email | `[INSERT or leave empty]` |

| Social profiles | `[INSERT verified URLs or leave empty]` |

| Logo file | `[INSERT or use text wordmark fallback]` |

| Form delivery method | `[Formspree / Web3Forms / Resend + serverless function / CRM webhook / pending]` |

| Regulatory registrations (e.g. SEBI numbers) | `[INSERT only if verified, else leave empty]` |

| Visual reference image | Night-city hero reference supplied with this brief (described in Section 3.1) |



---



## 2. PROJECT VISION



A premium, cinematic financial-services site that feels like the opening shot of a luxury fintech brand film: a glowing blue night city beside a reflective waterfront, a luminous neon ring sweeping around a floating holographic glass panel, and warm gold accents. It must **not** feel like a template or a crypto/trading-casino site.



It must communicate: professionalism, trust, transparency, market awareness, financial education, and customer focus.



**Conversion goals (in priority order):**

1. WhatsApp enquiries

2. Contact-form enquiries

3. Exploration of the four services



**Services:** IPO Updates · Unlisted Shares · Forex Trading & Mentorship · Portfolio Management



---



## 3. DESIGN SYSTEM



### 3.1 Reference background: "Night City Horizon" (the look to reproduce)



The background must look like the supplied reference image. Its key traits:



- **Sky and atmosphere:** deep midnight navy at the top, flowing into electric blue and cyan near the horizon. A soft blue haze/fog sits between building layers, giving depth. A faint star/bokeh dust is scattered in the sky and over the city.

- **Skyline:** a dense futuristic downtown skyline at night. Tall glass towers and one landmark spire sit in the middle distance. Thousands of small lit windows glow in cool white-blue and cyan with occasional warm-white accents. Buildings are layered in 3–4 depth planes: the farthest are hazier and darker, the nearest are sharper with more window detail. The left side has the closest, tallest towers, framing the headline area.

- **Waterfront:** a calm, dark water plane at the bottom third of the frame. It mirrors the skyline as vertical blue/white/amber light streaks with gentle ripple distortion, and fades into darkness toward the bottom edge.

- **Hero ring:** one large, thin, glowing electric-blue/cyan orbital ring sweeps in a wide ellipse around the right-hand hologram panel and skims across the water in perspective, with a bright core line, a wider soft bloom and a faint secondary ring.

- **Hologram panel:** a tilted, floating glass panel on the right with a luminous blue edge, subtle frosted fill, faint grid lines, a smooth glowing line path and a ring/donut shape. It is decorative and non-numeric (see Section 5.4).

- **Light direction:** cool blue key light from the city and ring, with small warm gold accents (buttons, wordmark, highlights). The left half of the frame is darker with a smooth gradient so that the headline stays crisp and readable.

- **Composition (desktop):** headline, description and buttons are left-aligned over the darkened left side; the hologram panel and ring occupy the right 50–55%; the skyline spans the full width behind both; water occupies the bottom ~25–30%.

- **Composition (mobile portrait):** the skyline stays full-width in the lower half; the ring and panel sit centred above the headline and are scaled down; the headline remains over a dark gradient scrim.



### 3.2 Palette (define as CSS variables / Tailwind tokens)



- Night navy `#030A1F`, deep navy `#061233`, midnight `#0A1B4D`, charcoal-blue `#0B1020`

- Electric blue `#1E6BFF`, bright blue `#2D8CFF`, cyan glow `#2FD0FF`, ice white `#EAF4FF`

- Gold (CTA and accents only) `#F5B942` (highlight `#FFD98A`, shadow `#B9852A`)

- Silver text `#B8C4D9`, warm white `#F6F1E7`

- Check contrast: body text ≥ WCAG AA (4.5:1) on all backgrounds, including over the 3D scene and the bright parts of the skyline. Use gradient scrims behind text where needed.



**Use blue glow with restraint:** high bloom threshold, low intensity; no oversaturated neon, no purple "AI" gradients, no glitch effects.



**Avoid:** bull/bear icons, rocket ships, green/red profit arrows, rising-candlestick hero animations, and any trading-terminal look with live-looking numbers.



### 3.3 Typography



One clean geometric sans for headlines (semi-bold/bold, as in the reference) plus one readable sans for body, self-hosted or via `@fontsource`, `font-display: swap`, display face preloaded. An optional refined serif may be used for small accents only. Fluid type scale using `clamp()`. Headlines are uppercase with moderate tracking; body copy is sentence case. A single word or phrase in the hero headline may use the cyan/blue gradient as in the reference, while the readable base colour stays white.



### 3.4 Motion language



Slow, eased, confident. Default easing `power3.out`/`expo.out`; durations 0.8–1.4 s for reveals. No bouncing, no shaking, no motion that competes with reading. Ambient motion: slow water ripple, gentle window flicker (a tiny fraction of windows), ring glow breathing, drifting dust.



### 3.5 Component primitives



`Button` (primary gold pill with arrow / ghost outlined pill with a play-style icon variant for secondary actions), `SectionHeading`, `RevealText`, `GlassPanel` (restrained blur, thin blue hairline border like the hologram panel), `ConstellationNode`, `Disclaimer`. All with focus-visible styles.



---



## 4. ARCHITECTURE



**Stack:** React 18+, Vite, TypeScript (strict), Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing, GSAP + ScrollTrigger, Tailwind CSS (or a well-structured CSS-variables system), React Hook Form + Zod (or equivalent) for the form.



**Suggested structure:**

```

src/

  config/        siteConfig.ts, services.ts, legal.ts, env.ts (typed, validated)

  scene/         Experience.tsx, CitySkyline.tsx, Waterfront.tsx, SkyDome.tsx,

                 HeroRing.tsx, HologramPanel.tsx, Globe.tsx, Particles.tsx,

                 OrbitalRings.tsx,

                 ServiceScenes/{IPO,Unlisted,Forex,Portfolio}.tsx,

                 Constellation.tsx, PathwayNodes.tsx, Lights.tsx, Effects.tsx,

                 cameraRig.ts, quality.ts

  sections/      Hero, About, Services, WhyUs, HowItWorks, Contact, FinalSignature

  components/    Nav, Footer, WhatsAppFab, ContactForm, ServiceCard, ...

  hooks/         useScrollProgress, useReducedMotion, useQualityTier, useWhatsApp

  lib/           whatsapp.ts, validation.ts, seo.ts

  pages/         PrivacyPolicy, Terms, RiskDisclosure (routed, e.g. react-router, with a basic router fallback)

api/             serverless handler for enquiries (if no third-party form service)

```



**Single persistent canvas:**

- One fixed, full-viewport `<Canvas>` behind the DOM content (`position: fixed; inset: 0; z-index: 0`), with HTML sections layered above (`pointer-events` managed so links/buttons always work).

- Legal pages are separate routes and **do not** mount the heavy canvas (they use the static night-city gradient background from Section 6).



**Deterministic scroll system:**

- One master `ScrollTrigger` (scrub with light smoothing) writes a single normalized `progress` value (0–1) plus per-section sub-progress into a shared store (a ref or zustand store, **not** React state, to avoid re-renders per frame).

- Camera position, light intensity/colour, ring rotation, skyline fog density, water reflection strength, globe orientation, particle uniforms and node illumination are **pure functions of progress** (keyframe tables interpolated with easing). Scrolling backward must reproduce earlier states exactly. No time-based or accumulating animation tied to scroll direction. Ambient idle motion (water ripple, window flicker, ring breathing, particle drift) uses `clock` time and is layered on top without altering scroll-driven state.

- Use `frameloop="demand"` or pause rendering when the tab is hidden or the canvas is off-screen; resume on return.

- Respect anchor links and browser back/forward: navigating to `#services` must set the correct scene state immediately (no replay of the whole journey).



**Scroll storyboard (define in a single `timeline.ts`):**



| Section | Camera / scene beat |

|---|---|

| Hero | The Night City Horizon exactly as in Section 3.1: low, wide establishing shot over the water toward the skyline; the neon ring sweeps around the hologram panel; headline stays dominant and readable |

| About | Slow rise and dolly forward over the water, skyline falling away; the city dissolves into a network of interconnected glowing points forming an abstract structure |

| Services | Four distinct "chambers" or stations above the city layer; camera glides between them, each with its own scene (Section 5.6) |

| Why Us | Constellation of five linked nodes in the dark blue sky above the skyline |

| How It Works | A luminous blue-gold pathway/light trail, like a road of light across the water, with four nodes lighting progressively |

| Contact | Calmer, lower-intensity scene (dimmed skyline, reduced bloom, darker scrim) so the form is legible |

| Final | Camera descends and settles at the waterfront horizon: skyline, water reflections, subtle globe, particles and warm gold light, echoing the hero |



---



## 5. 3D ENVIRONMENT SPEC



Build real depth (parallax layers, fog, depth-of-field-like falloff), not a flat background image.



### 5.1 Sky, skyline and water (the reference background)



- **Sky dome:** a gradient shader from `#030A1F` (top) through `#0A1B4D` to electric blue/cyan at the horizon, with a faint vertical haze band and sparse stars/bokeh (GPU points, size-attenuated).

- **City skyline (`InstancedMesh`):**

  - Procedurally generated, seeded buildings (boxes with a few stepped/tapered variants plus one landmark spire) in 3–4 depth layers, positioned in rows with increasing distance. Use a seeded PRNG so that the layout is deterministic.

  - **Window lights via shader, not geometry:** a single custom shader (or `onBeforeCompile`) draws a window grid per building face, using per-instance random values for on/off, brightness and cool-white/cyan/rare-warm tint. A tiny fraction of windows flicker slowly using time. No per-frame JS loops over buildings.

  - Atmospheric fog by depth (exp2 fog tinted `#0A1B4D`) so that distant layers fade to haze; the nearest left-hand towers are darkest and tallest to frame the headline.

  - Optional rim light on tower edges (cheap fresnel in the shader) to echo the blue edge glow.

  - Fewer than ~400 buildings total on high tier; reduce on lower tiers (Section 6).

- **Waterfront:**

  - **High/Medium:** `MeshReflectorMaterial` (drei) on a large plane, low resolution reflection buffer (≤ 512), blurred, strong fade with distance, dark blue base colour, subtle animated normal ripple.

  - **Low / mobile:** no real reflection; use a vertical-mirror gradient plane with stretched light-streak texture or shader to fake reflections.

  - The water must darken toward the bottom edge so that the bottom of the viewport is calm and legible.

- **Static poster layer:** a pre-rendered or CSS/SVG night-skyline gradient poster (same composition) is displayed first for LCP, then cross-faded to the live scene (Section 6). Generate this poster from the real scene (screenshot at build or design time) or build it with layered CSS/SVG; do not hotlink or copy the owner's reference image into the repository unless the owner confirms they own it.



### 5.2 Hero ring and hologram panel



- **Hero ring:** thin torus/line geometry in an elliptical orbit, emissive cyan-blue with a bright core and a wider soft glow (via bloom plus an additive sprite or second wider torus). A faint secondary ring with a slower speed. The ring crosses in front of the water so that it appears to skim over it, and casts a soft light streak on the water.

- **Hologram panel (`HologramPanel`):** a tilted glass plane with a thin glowing blue border and a subtle frosted fill (transmission-lite or alpha blur sprite; avoid expensive `MeshTransmissionMaterial` on low tier). It floats slightly and has a slow, small parallax from pointer or scroll. Contents are decorative only (Section 5.4).

- The panel and ring are located in the right ~50–55% on desktop and centred above the headline on portrait mobile.



### 5.3 Other scene elements (reused from the original concept)



- **Globe:** sphere with a dark metallic base, procedurally generated graticule/dot-matrix landmasses via shader or a small optimized texture (≤ 256 KB), fresnel atmosphere shader in blue-tinted white with a gold hint, a few animated arcs connecting abstract points (no real-world claims implied by the arcs). It appears from the About section onward (not in the hero, so that the hero matches the reference).

- **Particles:** `InstancedMesh` or `Points` with a custom shader; GPU-driven drift (no per-frame JS loops over thousands of particles). Sizes and brightness vary with depth. Blue/ice-white dust with rare gold sparks.

- **Orbital rings:** thin torus/line geometries with slow, differing rotation speeds; subtle emissive blue with gold accents.

- **Light trails:** scroll-revealed `Line2`/tube geometry with a dash/progress uniform driven by section progress.

- **Abstract metallic structures:** low-poly faceted shapes using `MeshStandardMaterial`/`MeshPhysicalMaterial` with a small HDR environment map (`Environment` with a lightweight night/city-like preset or a compressed custom HDRI).

- **Post-processing (desktop/high tier only):** controlled bloom (high threshold, low intensity, mipmap blur) tuned so that the ring, window lights and panel edge glow like the reference without washing out text; filmic tone mapping (ACES), subtle vignette, optional very light chromatic aberration at the edges (≤ 0.0005, off for reduced motion). Skip or reduce on lower tiers.

- **Resource hygiene:** reuse geometries/materials, dispose of textures/geometries/materials/render targets on unmount, remove all listeners and ScrollTriggers on cleanup, kill GSAP contexts (`gsap.context().revert()`).



### 5.4 Data-visualization rules (compliance-critical, overrides the reference image)



The reference image contains a stock chart with candlesticks, prices, percentages, an index list and an "All Time High" label. **Do not reproduce any of that.** Every chart-like element in the hologram panel and elsewhere must be:

- purely abstract: faint grid lines, smooth glowing paths, generic bars/blocks and a ring/donut shape;

- **free of labels, tickers, axis values, currency amounts, percentages, index names, "high/low" wording or any numbers** that could read as real data;

- free of green/red up/down colour coding, up-arrows implying profit, and realistic candlestick patterns.



### 5.5 Light trails and pathway



Reused from the original: the "How It Works" pathway is a luminous trail (blue core with gold nodes) that appears to run across the water toward the skyline.



### 5.6 Per-service scenes (each visibly distinct, all using the same blue + gold palette, set against the night-city sky)



1. **IPO Updates:** elegant calendar/timeline-like arcs and a rising luminous "gate" motif with abstract stylized panels, silhouetted against distant towers. **No dates, prices or figures.**

2. **Unlisted Shares:** network of interlinked corporate nodes (small cubes/octahedra) with data particles flowing between them, like a lit-up district seen from above.

3. **Forex & Mentorship:** illuminated globe close-up, golden connecting arcs, subtle currency glyphs (generic symbols such as ¤, plus ₹ $ € £ ¥ rendered as faint decoration; **no exchange rates, pips or profit animations**).

4. **Portfolio Management:** orbiting asset-like nodes in a balanced constellation, with slow-morphing abstract allocation shapes (no percentages shown).



---



## 6. PERFORMANCE, QUALITY TIERS AND FALLBACKS



**Budgets (target, measure and report):**

- Initial JS (gzip) ≤ ~250 KB for the first paint shell; 3D scene code-split and lazy-loaded behind a lightweight static hero (the static night-city poster from Section 5.1).

- LCP < 2.5 s on a mid-range phone over a fast 4G profile (the poster image is the LCP element: AVIF/WebP, ≤ 120 KB, `fetchpriority="high"`, correct dimensions); CLS < 0.1; INP < 200 ms.

- Sustained ≥ 55 fps desktop, ≥ 30 fps mid-range mobile.

- Total 3D assets ≤ ~1.5 MB (compressed textures, Draco/Meshopt if models are used). The skyline and window lights are procedural, so they add no heavy assets.



**Quality tiers** (via `useQualityTier`, using `drei`'s `PerformanceMonitor`, `navigator.hardwareConcurrency`, device memory hint and viewport):

- **High:** full skyline (≈ 300–400 buildings, 4 layers), real water reflection (≤ 512 buffer), full particles (≈ 6–10k), post-processing (bloom, vignette, ACES), DPR up to 2

- **Medium:** ≈ 150–250 buildings, 3 layers, low-res reflection, ≈ 2–4k particles, bloom only, DPR ≤ 1.5

- **Low / mobile:** ≈ 60–120 buildings, 2–3 layers, faked water reflection (no reflector), ≈ 800–1.5k particles, no post-processing (bake the glow with additive sprites), DPR ≤ 1.25, simplified globe shader

- Auto-downgrade if frame time is sustained above threshold; never upgrade-flicker (hysteresis).



**Fallbacks (required):**

- No WebGL / context lost / `prefers-reduced-motion`: render the static night-city poster (CSS/SVG/pre-rendered gradient skyline with a glowing ring and water gradient, same palette and composition); content, navigation, form and WhatsApp must remain 100% functional. Handle `webglcontextlost`/`restored`.

- Reduced motion: disable scroll-scrubbed camera travel and text-reveal animations; keep a gentle static or very slow ambient scene (slow water shimmer only).

- Loading: branded preloader with real progress (`useProgress`), ≤ 1.5 s typical, never blocks text content from being in the DOM for SEO and screen readers.

- Pause rendering when the tab is hidden.



---



## 7. SECTION CONTENT (use this copy exactly; headings uppercase in UI)



*(The reference image shows a different headline and nav. They are visual references only. Use the copy below unless the owner explicitly replaces it.)*



### 7.1 Hero

- **Headline:** YOUR GATEWAY TO SMARTER FINANCIAL OPPORTUNITIES.

- **Description:** Explore IPO opportunities, unlisted shares, forex trading mentorship, and portfolio management services with professional financial insights and guidance.

- **Buttons:** `EXPLORE OUR SERVICES` (gold pill with arrow; smooth-scrolls to Services) · `CONNECT ON WHATSAPP` (outlined pill; generic enquiry message)

- Include a small, unobtrusive line under the buttons: "Investments involve risk. See Risk Disclosure." linking to the Risk Disclosure page.

- No statistics, tickers, returns or performance numbers anywhere in the hero.

- Layout follows the reference: left-aligned text block over the darkened left side of the night-city scene, hologram panel and ring on the right.



### 7.2 About: EMPOWERING YOUR FINANCIAL JOURNEY.

> We are a financial services business focused on providing market insights, investment-related information, and financial guidance across multiple financial segments.

>

> Our objective is to make relevant financial information more accessible while maintaining a commitment to transparent communication, professional assistance, and informed decision-making.

>

> Through our services, we aim to help individuals explore financial opportunities and better understand the markets.



Config-driven, optional blocks (render **only** if provided): company name, mission, location, team members, official contact details, verified registrations. Do not render empty headings or placeholder lorem text in production builds.



### 7.3 Services (four distinct interactive experiences)



Each service: headline, description, 6-item feature list, CTA button opening WhatsApp with a URL-encoded pre-filled message, its own 3D treatment (Section 5.6), and a short "Important" note.



| # | Headline | Description | Features | CTA | WhatsApp message |

|---|---|---|---|---|---|

| 01 IPO Updates | DISCOVER UPCOMING IPO OPPORTUNITIES. | Stay informed about upcoming IPOs, subscription updates, important dates, company information, and listing-related developments. | Upcoming IPO information · Opening and closing dates · Subscription updates · Company fundamentals · Listing-related developments · Relevant market information | ENQUIRE ABOUT IPOs | Hello, I would like to know more about your IPO-related services and updates. |

| 02 Unlisted Shares | EXPLORE THE WORLD OF UNLISTED SHARES. | Explore information about unlisted companies, company fundamentals, relevant market developments, and available investment-related opportunities. | Unlisted company information · Company fundamentals · Market updates · Relevant business information · Enquiry-based assistance | EXPLORE UNLISTED SHARES | Hello, I am interested in learning more about unlisted shares and the information you provide. |

| 03 Forex & Mentorship | UNDERSTAND THE GLOBAL CURRENCY MARKETS. | Explore forex market concepts, currency-market insights, technical analysis, trading education, and risk-management principles through structured mentorship. | Forex market education · Currency-market insights · Trading concepts · Technical analysis · Risk management · Mentorship information | ENQUIRE ABOUT FOREX MENTORSHIP | Hello, I would like to know more about your forex trading mentorship and educational services. |

| 04 Portfolio Management | BUILD A MORE INFORMED FINANCIAL APPROACH. | Explore portfolio-related services covering investment objectives, asset allocation, risk considerations, and portfolio monitoring, subject to applicable regulatory authorization. | Investment objective discussions · Asset allocation information · Risk considerations · Portfolio monitoring · Financial planning-related assistance | ENQUIRE ABOUT PORTFOLIO SERVICES | Hello, I would like to know more about your portfolio management services. |



**Per-service guardrails (hard rules):**

- IPO: no fabricated IPO names, dates, price bands, GMP (grey market premium) or "listing gain" language.

- Unlisted: no implication of guaranteed liquidity, appreciation or returns; include a one-line note that unlisted securities can be illiquid and carry higher risk.

- Forex: frame strictly as **education/mentorship**. No profit animations, no "earn X/day", no performance screenshots, no claims about trading signals. The copy must not imply the business facilitates forex trading on unauthorized platforms (see Section 12).

- Portfolio: the "subject to applicable regulatory authorization" wording is mandatory, and a service-level flag `regulatoryStatusVerified: false` in config must keep an on-screen "Availability subject to regulatory authorization" note visible until the owner flips it to `true` and supplies registration details.



### 7.4 Why Connect With Us: WHY CONNECT WITH US?

Five values rendered as a **constellation** (nodes + blue-gold connecting lines, with accessible text alternatives), not rectangular cards. On mobile, collapse to a vertical connected chain.

1. PROFESSIONAL GUIDANCE: A focus on providing relevant information and professional assistance.

2. MARKET INSIGHTS: Access to relevant market information and developments.

3. TRANSPARENT COMMUNICATION: Clear communication about available services, processes, and associated risks.

4. CLIENT-FOCUSED APPROACH: Understanding customer requirements before discussing relevant services.

5. MULTIPLE FINANCIAL SEGMENTS: Information and assistance across IPOs, unlisted shares, forex education, and portfolio-related services.



### 7.5 How It Works

Four nodes on an animated luminous pathway; each node illuminates progressively with section scroll progress (scrub-reversible). On mobile the path runs vertically.

1. **EXPLORE:** Explore the available financial services and understand what each service offers.

2. **SELECT:** Choose the financial service you are interested in.

3. **CONNECT:** Contact the team through WhatsApp or submit an enquiry through the website.

4. **DISCUSS:** Discuss your requirements and receive relevant information about the selected service.



Nodes are keyboard-focusable and also expose a plain ordered list in the DOM for screen readers.



### 7.6 Contact: LET'S START A CONVERSATION.

> Have questions about IPOs, unlisted shares, forex mentorship, or portfolio management? Connect with our team to discuss your requirements and explore the available services.



Form fields: Full Name (required) · Phone Number (required) · Email Address (required) · Select a Service (required; IPO Updates / Unlisted Shares / Forex Trading & Mentorship / Portfolio Management / General Enquiry) · Message / Enquiry (required, 10–1000 chars). Add a required-by-default consent checkbox: "I agree to be contacted regarding my enquiry and have read the Privacy Policy." Submit: `SEND ENQUIRY`. A secondary `CONNECT ON WHATSAPP` button sits beside the form. The form sits on a `GlassPanel` with a darker scrim so that it stays legible over the calmer city scene.



### 7.7 Final Signature

- **Headline:** YOUR NEXT FINANCIAL CONVERSATION STARTS HERE.

- **Text:** Explore financial insights. Discover available services. Connect with our team.

- **Buttons:** `EXPLORE OUR SERVICES` (smooth-scroll to Services) · `CONNECT WITH US` (opens WhatsApp)

- Camera settles at the calm waterfront horizon (skyline, reflections, subtle globe, particles, warm gold light), then the logo (or text wordmark fallback) and footer.



---



## 8. FORM: REAL FUNCTIONALITY, NO FAKE SUCCESS



**Client:**

- Zod schema: name (2–80 chars), phone (E.164-tolerant; digits, spaces, `+`, `-`; 7–15 digits), email (RFC-reasonable regex), service (enum), message (10–1000), consent (true).

- Inline, accessible error messages (`aria-describedby`, `aria-invalid`, focus moves to first invalid field on submit).

- Duplicate-submit prevention: disable the button while in flight, idempotency key per submission, short client-side cooldown after success.

- States: idle, submitting, success, error (with retry). On network/server failure show a real error and offer the WhatsApp fallback. **Never show success unless the server confirmed it (2xx).**

- Spam protection: hidden honeypot field + minimum-fill-time check; optional Cloudflare Turnstile/hCaptcha hook via env var.



**Delivery (choose by what the owner supplies; implement the abstraction regardless):**

- `VITE_FORM_PROVIDER` = `formspree | web3forms | endpoint | none`

- If a provider/endpoint is configured → POST JSON, handle responses.

- If a serverless function is used (`/api/enquiry`): validate again server-side with the same schema, sanitize, rate-limit per IP, send via an email API (e.g. Resend/SMTP) using **server-only** env vars. Never expose secrets in the client bundle.

- If `none` → the form renders a visible, honest state: "Online enquiry form is pending configuration. Please use WhatsApp." and the submit button is disabled. No simulated success, no `setTimeout` fakes.

- Provide `.env.example` documenting every variable, and a README section "Connecting form delivery".



**Privacy:** store nothing in the browser beyond the form's in-memory state; don't log personal data in the console; mention data handling in the Privacy Policy template.



---



## 9. WHATSAPP INTEGRATION



- Single source: `WHATSAPP_NUMBER` in `siteConfig.ts` (read from `VITE_WHATSAPP_NUMBER` with the config as fallback). Digits only, with country code, no `+`, spaces or dashes; normalize and validate on load.

- Helper: `buildWhatsAppUrl(message?: string) => https://wa.me/<number>?text=<encodeURIComponent(message)>`. Open in a new tab with `rel="noopener noreferrer"`.

- Placements: floating action button (bottom-right, safe-area aware on iPhones, not covering the cookie/disclaimer bar), hero CTA, each service CTA with its own message, contact-section CTA, final-section CTA, footer.

- If the number is **not configured**: do not render a dead link. Hide WhatsApp buttons in production, and in development show a visible console warning plus a dev-only badge "WhatsApp number not configured".

- Add unit tests for the URL builder (encoding of spaces, commas, apostrophes, non-ASCII).



---



## 10. NAVIGATION AND UX



- Items: HOME · ABOUT · SERVICES · WHY CHOOSE US · HOW IT WORKS · CONTACT, plus a gold pill CTA at the right end of the bar (`ENQUIRE`, opens WhatsApp or scrolls to Contact), styled like the reference.

- Transparent over the hero; gains a refined translucent dark-navy background with a hairline blue/gold border after scrolling past a small threshold; hides on scroll-down / reveals on scroll-up (optional, must not hurt accessibility).

- Active-section indicator driven by IntersectionObserver or ScrollTrigger (animated blue underline as in the reference, with the active label in the cyan accent colour).

- Smooth scrolling to anchors with offset for the fixed nav; update the URL hash; honour `prefers-reduced-motion` (instant jump). Don't hijack native scroll (no custom scroll-jacking libraries that break touch or accessibility); if Lenis is used, it must be disabled under reduced motion and keep native touch behaviour.

- Mobile: full-screen or slide-in menu with focus trap, `Esc` to close, scroll lock only while open, ≥ 44×44 px targets.

- Keyboard: visible focus rings, skip-to-content link, logical tab order across the canvas overlay (the canvas itself is `aria-hidden="true"` with `role="presentation"`).

- Provide a visible "Pause animation" toggle (also satisfies motion-sensitivity needs beyond the OS setting).



---



## 11. CENTRALIZED, EDITABLE CONFIGURATION



`src/config/siteConfig.ts` (typed with a `SiteConfig` interface, validated at startup with Zod; fails loudly in dev, fails safe in prod):



```ts

export const siteConfig = {

  business: { name: "", legalName: "", logo: "", tagline: "", description: "", mission: "", location: "", address: "" },

  contact:  { whatsappNumber: "", email: "", phone: "" },

  social:   { linkedin: "", instagram: "", youtube: "", facebook: "", x: "", telegram: "" },

  team:     [],                       // [{ name, role, photo?, bio? }]; empty hides the Team block

  registrations: [],                  // [{ body, number, scope, verifiedOn }]; empty hides the registrations block

  services: { /* four services: copy, features, whatsappMessage, regulatoryStatusVerified */ },

  form: { provider: "none", endpoint: "", services: [/* dropdown options */] },

  legal: { privacyUpdated: "", termsUpdated: "", jurisdiction: "", reviewed: false },

  seo: { title: "", description: "", ogImage: "", siteUrl: "" },

  theme: { posterImage: "" },         // optional pre-rendered night-city poster; falls back to the CSS/SVG skyline

};

```



Rules:

- **Empty ⇒ hidden.** Social icons, email, phone, address, team, registrations and any other optional element must not render when unset. No placeholder text visible to the public.

- A build-time script (`npm run check:config`) prints a checklist of unset fields and fails CI with `--strict`.

- Do **not** build a fake admin dashboard. Editing is via the config file/env vars (documented in README). If you add an admin UI, it needs real authentication and persistent storage; otherwise leave it out.



---



## 12. REGULATORY, LEGAL AND CREDIBILITY GUARDRAILS (India-focused; owner must verify)



The business appears to operate in India. These are **verification prompts for the owner and counsel, not legal advice**; the site must be built so that claims can be switched on only after verification.



- **SEBI:** Verify which registrations apply (e.g. Portfolio Manager, Investment Adviser, Research Analyst, Stock Broker, or none). Portfolio management and investment advice are regulated activities; publish a registration number only if it is verified, with its scope. Don't use words like "advisory", "recommendation", "tips", "calls" or "guaranteed" unless authorized.

- **AI-related claims:** The reference image uses phrases such as "AI-Powered Insights" and "AI Equity Research". Do not use AI-capability, accuracy or "smarter decisions" claims anywhere unless the owner can substantiate them and counsel approves.

- **IPO content:** Information only; do not promote or solicit specific IPO subscriptions. No grey-market premium or listing-gain claims.

- **Unlisted shares:** Verify the lawful basis and nature of the activity (e.g. whether the business acts as a facilitator or is only providing information). Include illiquidity and risk wording.

- **Forex:** Under India's FEMA framework, retail participation in forex trading is restricted to specific permitted pairs through authorized entities. Verify that the mentorship is educational and doesn't direct people to unauthorized platforms or offshore brokers. Copy must not promote leveraged trading as a route to income.

- **Marketing rules:** Avoid testimonials, performance claims, "assured/guaranteed/risk-free" language, urgency tactics ("limited seats", "last chance") and income-promise imagery. SEBI has also issued guidance on finfluencer/educator promotion, which the owner should review.

- **Data protection:** The privacy policy must reflect actual data practices and applicable Indian data-protection law (DPDP Act); include purpose, retention, contact for grievance, and third-party processors (form provider, email service, analytics).



**Legal pages (routed pages, linked in footer and the form consent):**

- Privacy Policy, Terms & Conditions, Risk Disclosure, each a well-structured, accessible template driven by `legal.ts`, with a **"DRAFT TEMPLATE: REVIEW BY QUALIFIED COUNSEL BEFORE PUBLISHING"** banner that is shown unless `legal.reviewed === true`.

- **Risk Disclosure text (use verbatim as the opening):** "Investments and financial market activities involve risks, including the possible loss of capital. Information presented on this website is for general informational and educational purposes and should not be interpreted as a guarantee of returns or personalized investment advice. Visitors should independently assess risks and consult appropriately qualified and authorized professionals before making financial decisions."

- Show a compact version of this disclaimer in the footer on every page.

- Clearly label content types: "Educational information", "General market information", "Regulated services (subject to authorization)".



---



## 13. ACCESSIBILITY, SEO AND CODE QUALITY



**Accessibility (WCAG 2.2 AA target):**

- All text content exists in real DOM (not baked into the canvas), semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`), one `h1`.

- Animated text reveals keep text readable to assistive tech (no per-letter `aria-hidden` mess; use a visually-complete accessible label).

- Colour is never the only indicator; touch targets ≥ 44 px; form errors announced via `aria-live`.

- Text over bright window lights, the ring or the water must keep ≥ 4.5:1 contrast (use gradient scrims; verify with real screenshots at every breakpoint).

- Test with keyboard-only and a screen reader pass; run axe/Lighthouse.



**SEO:**

- Title, meta description, canonical, Open Graph/Twitter tags, theme-color (`#030A1F`), favicon set, web manifest.

- JSON-LD `FinancialService`/`Organization` **only** with verified, configured fields (omit empty ones). No fake ratings or review markup.

- `robots.txt`, `sitemap.xml`; legal pages indexable. Because the 3D layer is client-rendered, ensure content is crawlable (consider pre-rendering/SSG of static HTML via `vite-plugin-ssr`/`vite-react-ssg` or a prerender step).



**Code quality:**

- TypeScript `strict`, ESLint + Prettier, no `any` without justification, no unused code.

- Unit tests (Vitest) for `whatsapp.ts`, validation schema and config validation; a Playwright smoke test covering: nav anchors, WhatsApp URLs for each service, form validation errors, form disabled/pending state with no provider, mobile viewport without horizontal overflow, reduced-motion fallback, and a hero screenshot check that headline text is not obscured by the scene.

- Clean up: dispose Three.js objects, remove event listeners, kill ScrollTriggers and GSAP contexts on unmount; verify no leaks on route change (legal pages ↔ home).

- README: setup, config guide, env vars, how to connect form delivery, how to add registrations, how to regenerate the poster image, deployment (Vercel/Netlify/Cloudflare), pre-launch checklist.



---



## 14. BUILD PHASES (stop and summarise after each; keep the app runnable)



1. **Foundation:** Vite + React + TS, Tailwind/CSS tokens (night-city palette), fonts, config system, routing, layout shell, nav, footer, legal pages (templates), SEO scaffold, static night-city CSS/SVG poster background.

2. **Content and conversion:** all sections as accessible DOM with final copy, WhatsApp helper and buttons, working form with validation and provider abstraction. Fully usable **without** 3D.

3. **3D core:** canvas, quality tiers, sky dome, procedural skyline with shader windows, waterfront (reflector + low-tier fake), hero ring, hologram panel, particles, lighting, preloader, fallbacks. **Checkpoint:** compare the hero against the reference image (sky gradient, skyline density, water reflections, ring and panel placement, text legibility) and adjust before continuing.

4. **Scroll choreography:** `timeline.ts`, camera rig, per-section scene states, per-service scenes, constellation, pathway nodes, reversible scrubbing, anchor-jump handling.

5. **Polish and performance:** post-processing, hover interactions (pointer-fine devices only), text reveals, mobile tuning, reduced-motion pass, profiling against the budgets.

6. **QA and hardening:** tests, accessibility audit, cross-browser/device checks (Chrome, Safari/iOS, Firefox, Android Chrome), `npm run build` and `npm run preview` verification, final README.



---



## 15. MOBILE REQUIREMENTS



- Designed mobile-first for the scene as well: simplified camera paths, fewer buildings and particles, DPR cap, no post-processing on low tier, portrait-specific composition (ring and hologram panel centred above the headline, skyline and water in the lower half, never behind body text without a scrim).

- Use `100svh/dvh` units to avoid iOS address-bar jumps; no horizontal overflow at 320 px width; safe-area insets for notch devices and the WhatsApp FAB.

- Preserve native scrolling and momentum; no scroll hijacking; disable hover/cursor effects on coarse pointers.

- Test at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px widths.



---



## 16. DEFINITION OF DONE (all must be true, with evidence)



- [ ] `npm run build`, `npm run lint`, `npm run typecheck` and tests pass; output pasted in the final report

- [ ] Lighthouse (mobile) Performance ≥ 80, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95, or deviations explained

- [ ] Hero background visibly matches the reference (Section 3.1): navy-to-blue night sky, layered lit skyline, reflective waterfront, glowing blue ring and hologram panel, gold CTA accents, readable left-aligned text; side-by-side screenshots included in the report

- [ ] Hero communicates the business and four services within the first viewport

- [ ] Four services have distinct scenes, correct copy and working, individually pre-filled WhatsApp links

- [ ] WhatsApp links use only the configured number and hide when unconfigured

- [ ] Form validates, blocks duplicates, truly delivers via the configured provider, and shows an honest "pending configuration" state otherwise

- [ ] Scrolling backward restores prior visual state; anchor jumps land on the correct scene

- [ ] Reduced-motion and no-WebGL fallbacks fully functional (static night-city poster)

- [ ] No horizontal overflow on any tested viewport

- [ ] Legal pages and risk disclaimer present; draft banner active until reviewed

- [ ] **No** invented numbers, returns, testimonials, credentials, charts with values, prices, percentages, index names or "guaranteed" language anywhere (run a text search for risky terms: guarantee, assured, risk-free, returns, profit, all time high, %, ₹/$ amounts, and report the results)

- [ ] No unauthorized service presented as approved; Portfolio Management note is visible while `regulatoryStatusVerified` is false

- [ ] Final report lists: what was built, what the owner must supply (config fields, backend keys, registrations, counsel review, confirmation of brand name and poster image rights), known limitations, and deployment steps



---



## 17. FINAL CREATIVE PRINCIPLE



"Build trust through transparency. Present opportunities with clarity. Make every connection count."



The result should feel like a premium financial brand brought to life through a restrained, cinematic night-city world: glowing blue skyline, mirrored waterfront, a luminous ring, warm gold accents, efficient real-time 3D, elegant storytelling, and an enquiry experience that genuinely works. It should also be honest enough to publish once the owner has verified and configured their information.

Make a website

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://moneytalksfin.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9adbf4e9-e245-4b8b-b867-4b72ceef2ee4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
