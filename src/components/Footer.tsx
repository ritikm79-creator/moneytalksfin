import { Link } from "@tanstack/react-router";
import { siteConfig, RISK_DISCLOSURE, brandName } from "@/config/siteConfig";
import { Wordmark } from "./Nav";
import { WhatsAppButton } from "./WhatsAppButton";

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v);
  const { email, phone } = siteConfig.contact;
  return (
    <footer className="relative z-10 border-t border-border bg-night/95 px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <Wordmark />
          {siteConfig.business.tagline && (
            <p className="text-silver">{siteConfig.business.tagline}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-silver">
            {email && (
              <a href={`mailto:${email}`} className="hover:text-ice">
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="hover:text-ice">
                {phone}
              </a>
            )}
            {socials.map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize hover:text-ice"
              >
                {k}
              </a>
            ))}
          </div>
          <WhatsAppButton>Connect on WhatsApp</WhatsAppButton>
        </div>
        <nav aria-label="Legal" className="flex flex-col gap-3 text-sm md:items-end">
          <Link to="/privacy-policy" className="text-silver hover:text-ice">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-silver hover:text-ice">
            Terms &amp; Conditions
          </Link>
          <Link to="/risk-disclosure" className="text-silver hover:text-ice">
            Risk Disclosure
          </Link>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs leading-relaxed text-silver">
        <strong className="text-ice">Risk disclosure: </strong>
        {RISK_DISCLOSURE}
      </p>
      <p className="mx-auto mt-4 max-w-7xl text-xs text-silver">© {brandName}</p>
    </footer>
  );
}
