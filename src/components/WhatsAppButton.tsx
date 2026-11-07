import { useEffect } from "react";
import { siteConfig, GENERAL_WA_MESSAGE } from "@/config/siteConfig";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const waUrl = (msg = GENERAL_WA_MESSAGE) =>
  buildWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);

let warned = false;
/** Renders nothing in production when no number is configured; a dev-only badge in development. */
export function WhatsAppButton({
  message,
  children,
  className,
  variant = "ghost",
}: {
  message?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "ghost" | "gold";
}) {
  const url = waUrl(message);
  useEffect(() => {
    if (!url && import.meta.env.DEV && !warned) {
      warned = true;
      console.warn("WhatsApp number not configured (VITE_WHATSAPP_NUMBER).");
    }
  }, [url]);
  if (!url) {
    return import.meta.env.DEV ? (
      <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-destructive px-4 text-xs text-destructive">
        Dev only: WhatsApp number not configured
      </span>
    ) : null;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        variant === "gold" ? "btn-gold" : "border border-cyan/60 text-ice hover:bg-cyan/10",
        "inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      {children}
    </a>
  );
}

export function WhatsAppFab() {
  const url = waUrl();
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="btn-gold fixed z-40 flex h-14 w-14 items-center justify-center rounded-full"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
      </svg>
    </a>
  );
}
