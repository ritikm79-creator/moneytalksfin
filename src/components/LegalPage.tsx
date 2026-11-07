import { siteConfig } from "@/config/siteConfig";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppButton";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-sky">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-night">Skip to content</a>
      <Nav onHome={false} />
      <main id="main" className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-28">
        {!siteConfig.legal.reviewed && (
          <p role="note" className="mb-8 rounded-lg border border-gold bg-gold/10 p-4 font-display text-xs font-semibold uppercase tracking-widest text-gold">Draft template: review by qualified counsel before publishing</p>
        )}
        <h1 className="fluid-h2 font-bold text-ice">{title}</h1>
        {siteConfig.legal.updated && <p className="mt-2 text-sm text-silver">Last updated: {siteConfig.legal.updated}</p>}
        <div className="glass mt-8 space-y-5 rounded-2xl p-6 leading-relaxed text-silver [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-ice">{children}</div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
