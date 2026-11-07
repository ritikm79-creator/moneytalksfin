import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Financial Services" },
    { name: "description", content: "How enquiry information submitted through this website is collected, used and retained." },
    { property: "og:title", content: "Privacy Policy" },
    { property: "og:description", content: "How enquiry information is collected, used and retained." },
  ] }),
  component: () => (
    <LegalPage title="Privacy Policy">
      <p>This template describes how personal data submitted through this website is handled, in line with India's Digital Personal Data Protection Act, 2023. The owner must update it to reflect actual practices.</p>
      <h2>Data we collect</h2><p>When you submit an enquiry: your name, phone number, email address, selected service and message. We do not store this data in your browser.</p>
      <h2>Purpose</h2><p>Solely to respond to your enquiry about the selected service.</p>
      <h2>Third-party processors</h2><p>Enquiries may be processed by a form-delivery or email provider, and WhatsApp (Meta) when you choose to contact us there. [Owner to list actual processors.]</p>
      <h2>Retention</h2><p>[Owner to specify retention period.]</p>
      <h2>Your rights</h2><p>You may request access, correction or erasure of your data, and withdraw consent.</p>
      <h2>Grievance contact</h2><p>[Owner to provide a grievance officer contact.]</p>
    </LegalPage>
  ),
});
