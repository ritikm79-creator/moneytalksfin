import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { enquirySchema } from "@/lib/validation";

describe("buildWhatsAppUrl", () => {
  it("returns null when unconfigured", () => expect(buildWhatsAppUrl("")).toBeNull());
  it("strips + spaces and dashes", () => expect(buildWhatsAppUrl("+91 98-7654 3210")).toBe("https://wa.me/919876543210"));
  it("encodes spaces, commas, apostrophes, non-ASCII", () => {
    const url = buildWhatsAppUrl("919876543210", "Hello, I'd like ₹ info")!;
    expect(url).toBe("https://wa.me/919876543210?text=" + encodeURIComponent("Hello, I'd like ₹ info"));
    expect(url).toContain("Hello%2C%20I'd%20like%20%E2%82%B9");
  });
});

describe("enquirySchema", () => {
  const ok = { name: "Asha", phone: "+91 98765 43210", email: "a@b.co", service: "IPO Updates", message: "Tell me more please", consent: true };
  it("accepts valid input", () => expect(enquirySchema.safeParse(ok).success).toBe(true));
  it("rejects missing consent", () => expect(enquirySchema.safeParse({ ...ok, consent: false }).success).toBe(false));
  it("rejects short phone", () => expect(enquirySchema.safeParse({ ...ok, phone: "12345" }).success).toBe(false));
  it("rejects short message", () => expect(enquirySchema.safeParse({ ...ok, message: "hi" }).success).toBe(false));
});
