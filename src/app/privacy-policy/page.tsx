import { LegalPage } from "@/components/ui/LegalPage";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Aaradhya Management System Consultancy Services collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="November 2026">
      <p>
        {siteConfig.legalName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we collect through this website and how we use it, in line with the Digital Personal Data Protection Act, 2023.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you submit through our enquiry forms — name, phone number, email, city and business information.</li>
        <li>Messages you send us by WhatsApp, phone or email.</li>
        <li>Basic, anonymous technical data such as browser type and pages visited, if analytics are enabled.</li>
      </ul>
      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and provide consultancy services you request.</li>
        <li>To prepare and file regulatory applications on your behalf, with your consent.</li>
        <li>To send compliance reminders such as licence renewal and annual return due dates, if you are a client.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell or rent your personal data. Information is shared only with government authorities (such as FSSAI) for filings you authorise, accredited laboratories or certification bodies you engage through us, and service providers that help us operate this website (for example, our form-delivery provider).
      </p>
      <h2>Data retention &amp; security</h2>
      <p>We retain information only as long as needed for the purpose collected or as required by law, and use reasonable safeguards to protect it.</p>
      <h2>Your rights</h2>
      <p>
        You may request access, correction or deletion of your personal data at any time by writing to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <h2>Contact</h2>
      <p>
        {siteConfig.legalName}, {siteConfig.address.line1} {siteConfig.address.line2}. Phone: {siteConfig.phone}.
      </p>
    </LegalPage>
  );
}
