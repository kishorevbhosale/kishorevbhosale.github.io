import { LegalPage } from "@/components/ui/LegalPage";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the Aaradhya Management System Consultancy Services website and information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="November 2026">
      <p>By using this website you agree to the following terms.</p>
      <h2>Information only</h2>
      <p>
        Content on this website, including guides, fee tables and the FSSAI License Finder, is provided for general information. It is based on our understanding of the Food Safety &amp; Standards Act, 2006 and FSSAI regulations at the time of publishing and may change as regulations are amended. It is not a substitute for advice specific to your business.
      </p>
      <h2>Government fees</h2>
      <p>All government fees shown are indicative and are determined solely by FSSAI and other authorities. Professional fees are quoted separately in writing.</p>
      <h2>No guarantee of approval</h2>
      <p>
        Licences, registrations and certifications are granted by FSSAI and independent certification bodies. While we prepare applications with care, approval and timelines depend on the respective authority.
      </p>
      <h2>Independence</h2>
      <p>
        {siteConfig.legalName} is an independent consultancy and is not affiliated with or acting on behalf of FSSAI or any government body. We do not issue certificates; certification is performed by accredited certification bodies.
      </p>
      <h2>Intellectual property</h2>
      <p>The content, logos and design of this website belong to {siteConfig.legalName} and may not be reproduced without permission.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with courts at Thane, Maharashtra having jurisdiction.</p>
    </LegalPage>
  );
}
