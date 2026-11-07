import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { RISK_DISCLOSURE } from "@/config/siteConfig";

export const Route = createFileRoute("/risk-disclosure")({
  head: () => ({
    meta: [
      { title: "Risk Disclosure | Financial Services" },
      {
        name: "description",
        content:
          "Risks of investments and financial market activities, and how to read the information on this website.",
      },
      { property: "og:title", content: "Risk Disclosure" },
      {
        property: "og:description",
        content: "Risks of investments and financial market activities.",
      },
    ],
  }),
  component: () => (
    <LegalPage title="Risk Disclosure">
      <p className="text-ice">{RISK_DISCLOSURE}</p>
      <h2>Content types on this website</h2>
      <p>
        <strong>Educational information:</strong> forex market concepts and mentorship.{" "}
        <strong>General market information:</strong> IPO and unlisted-share information.{" "}
        <strong>Regulated services (subject to authorization):</strong> portfolio management.
      </p>
      <h2>Unlisted securities</h2>
      <p>
        Unlisted securities can be illiquid, may be difficult to sell, and carry higher risk.
        Nothing on this website implies guaranteed liquidity or appreciation.
      </p>
      <h2>Forex</h2>
      <p>
        In India, retail forex participation is restricted to permitted currency pairs through
        authorized entities. Our mentorship is educational and does not direct anyone to
        unauthorized or offshore platforms.
      </p>
      <h2>IPOs</h2>
      <p>
        IPO information is provided for general awareness only and is not a solicitation to
        subscribe to any issue.
      </p>
      <h2>No personalized advice</h2>
      <p>Nothing on this website is a recommendation or personalized investment advice.</p>
    </LegalPage>
  ),
});
