import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brandName } from "@/config/siteConfig";
import { waUrl } from "./WhatsAppButton";

const items = [
  ["home", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["why", "Why choose us"],
  ["how", "How it works"],
  ["contact", "Contact"],
] as const;

export function Wordmark() {
  return (
    <span className="font-display text-lg font-bold uppercase tracking-[0.2em] text-gold">
      {brandName}
    </span>
  );
}

export function Nav({
  onHome = true,
  paused,
  onTogglePause,
}: {
  onHome?: boolean;
  paused?: boolean;
  onTogglePause?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    s();
    window.addEventListener("scroll", s, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", s);
      io.disconnect();
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const wa = waUrl();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || !onHome ? "border-b border-border bg-night/85 backdrop-blur-md" : ""}`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5"
      >
        <Link to="/" aria-label={`${brandName} home`}>
          <Wordmark />
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {items.map(([id, label]) => (
            <li key={id}>
              <a
                href={href(id)}
                className={`relative py-2 font-display text-[11px] uppercase tracking-[0.18em] transition-colors ${active === id && onHome ? "text-cyan" : "text-silver hover:text-ice"}`}
              >
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-cyan transition-transform duration-500 ${active === id && onHome ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {onTogglePause && (
            <button
              onClick={onTogglePause}
              aria-pressed={paused}
              className="hidden min-h-11 rounded-full border border-border px-3 text-[11px] uppercase tracking-widest text-silver hover:text-ice sm:block"
            >
              {paused ? "Play animation" : "Pause animation"}
            </button>
          )}
          <a
            href={wa ?? href("contact")}
            {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn-gold hidden min-h-11 items-center rounded-full px-5 font-display text-xs font-semibold uppercase tracking-[0.18em] sm:inline-flex"
          >
            Enquire
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span className="block h-0.5 w-6 bg-ice shadow-[0_6px_0_var(--ice),0_-6px_0_var(--ice)]" />
          </button>
        </div>
      </nav>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-night/97 px-6 py-5 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Wordmark />
            <button
              autoFocus
              className="h-11 w-11 text-2xl text-ice"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <ul className="mt-10 space-y-2">
            {items.map(([id, label]) => (
              <li key={id}>
                <a
                  onClick={() => setOpen(false)}
                  href={href(id)}
                  className="block py-3 font-display text-xl uppercase tracking-widest text-ice"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {onTogglePause && (
            <button
              onClick={onTogglePause}
              className="mt-6 min-h-11 self-start rounded-full border border-border px-4 text-xs uppercase tracking-widest text-silver"
            >
              {paused ? "Play animation" : "Pause animation"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
