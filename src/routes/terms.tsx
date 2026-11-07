import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Financial Services" },
      {
        name: "description",
        content: "Terms governing use of this website and its general financial information.",
      },
      { property: "og:title", content: "Terms & Conditions" },
      { property: "og:description", content: "Terms governing use of this website." },
    ],
  }),
  component: () => (
    <LegalPage title="Terms & Conditions">
      <h2>Use of information</h2>
      <p>
        Content on this website is for general informational and educational purposes only and is
        not personalized investment advice or a solicitation.
      </p>
      <h2>Regulated services</h2>
      <p>
        Any regulated service, including portfolio management, is offered only subject to applicable
        regulatory authorization.
      </p>
      <h2>No guarantees</h2>
      <p>We make no representation regarding the outcome of any financial decision.</p>
      <h2>Governing law</h2>
      <p>[Owner to specify jurisdiction.]</p>
    </LegalPage>
  ),
});
