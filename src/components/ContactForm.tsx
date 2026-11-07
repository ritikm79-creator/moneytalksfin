import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig, formServiceOptions } from "@/config/siteConfig";
import { enquirySchema } from "@/lib/validation";
import { WhatsAppButton } from "./WhatsAppButton";

type Status = "idle" | "submitting" | "success" | "error";
const fields = ["name", "phone", "email", "service", "message", "consent"] as const;

async function deliver(payload: Record<string, unknown>) {
  const { provider, endpoint } = siteConfig.form;
  const url = provider === "web3forms" ? "https://api.web3forms.com/submit" : endpoint;
  const body = provider === "web3forms" ? { ...payload, access_key: endpoint } : payload;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(String(res.status));
}

export function ContactForm() {
  const configured = siteConfig.form.provider !== "none" && !!siteConfig.form.endpoint;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<(typeof fields)[number], string>>>({});
  const started = useRef(Date.now());
  const cooldown = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured || status === "submitting" || Date.now() < cooldown.current) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) return; // honeypot
    const data = { name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"), service: fd.get("service"), message: fd.get("message"), consent: fd.get("consent") === "on" };
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.issues.forEach((i) => { const k = i.path[0] as (typeof fields)[number]; errs[k] ??= i.message; });
      setErrors(errs);
      const first = fields.find((f) => errs[f]);
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    if (Date.now() - started.current < 3000) { setStatus("error"); return; }
    setStatus("submitting");
    try {
      await deliver({ ...parsed.data, idempotencyKey: crypto.randomUUID() });
      setStatus("success"); cooldown.current = Date.now() + 30000; formRef.current?.reset();
    } catch { setStatus("error"); }
  }

  const input = "mt-1 w-full min-h-11 rounded-lg border border-input bg-night/70 px-3 py-2 text-ice placeholder:text-silver/60 aria-[invalid=true]:border-destructive";
  const err = (k: (typeof fields)[number]) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;
  const a = (k: (typeof fields)[number]) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-2xl p-6 sm:p-8" aria-label="Enquiry form">
      {!configured && (
        <p role="status" className="rounded-lg border border-gold/50 bg-gold/10 p-3 text-sm text-ice">Online enquiry form is pending configuration. Please use WhatsApp.</p>
      )}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-silver">Full name *<input name="name" autoComplete="name" maxLength={80} className={input} {...a("name")} />{err("name")}</label>
        <label className="block text-sm text-silver">Phone number *<input name="phone" type="tel" autoComplete="tel" maxLength={20} className={input} {...a("phone")} />{err("phone")}</label>
      </div>
      <label className="block text-sm text-silver">Email address *<input name="email" type="email" autoComplete="email" maxLength={255} className={input} {...a("email")} />{err("email")}</label>
      <label className="block text-sm text-silver">Select a service *
        <select name="service" defaultValue="" className={input} {...a("service")}>
          <option value="" disabled>Choose…</option>
          {formServiceOptions.map((o) => <option key={o}>{o}</option>)}
        </select>{err("service")}
      </label>
      <label className="block text-sm text-silver">Message / enquiry *<textarea name="message" rows={4} maxLength={1000} className={input} {...a("message")} />{err("message")}</label>
      <label className="flex items-start gap-3 text-sm text-silver">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[var(--gold)]" {...a("consent")} />
        <span>I agree to be contacted regarding my enquiry and have read the <Link to="/privacy-policy" className="text-cyan underline">Privacy Policy</Link>.</span>
      </label>
      {err("consent")}
      <div aria-live="polite" className="text-sm">
        {status === "success" && <p className="text-cyan">Thank you. Your enquiry was received.</p>}
        {status === "error" && <p className="text-destructive">We couldn't send your enquiry. Please try again or use WhatsApp.</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!configured || status === "submitting"} className="btn-gold min-h-11 rounded-full px-7 font-display text-xs font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-50">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <WhatsAppButton message="Hello, I have an enquiry about your financial services.">Connect on WhatsApp</WhatsAppButton>
      </div>
    </form>
  );
}
