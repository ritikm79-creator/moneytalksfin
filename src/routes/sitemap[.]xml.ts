import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: ({ request }) => {
    const o = new URL(request.url).origin;
    const urls = ["/", "/privacy-policy", "/terms", "/risk-disclosure"].map((p) => `<url><loc>${o}${p}</loc></url>`).join("");
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml" } });
  } } },
});
