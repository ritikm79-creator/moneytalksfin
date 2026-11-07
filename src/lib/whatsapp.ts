export function normalizeNumber(n: string): string {
  return n.replace(/\D/g, "");
}
export function isValidNumber(n: string): boolean {
  return /^\d{8,15}$/.test(normalizeNumber(n));
}
/** Returns null when the number is not configured/valid, so callers render nothing. */
export function buildWhatsAppUrl(number: string, message?: string): string | null {
  const n = normalizeNumber(number);
  if (!isValidNumber(n)) return null;
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
