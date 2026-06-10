import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/terms-and-conditions",
    title: "Terms & Conditions | AVCONEXPO",
    description:
      "Terms and conditions governing your use of the AVCONEXPO website and online services.",
    imageUrl: "/slider2.jpg",
  });
}

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p className="text-sm font-semibold text-[#f0571f]">Last updated: June 8, 2026</p>

      <p>
        Welcome to AVCONEXPO. By accessing or using <Link href="/">www.avconexpo.com</Link> (&quot;Website&quot;), you
        agree to these Terms &amp; Conditions. If you do not agree, please do not use the Website.
      </p>

      <h2>1. About AVCONEXPO</h2>
      <p>
        AVCONEXPO is a global engineering-technology, supply-chain management, and architecture-design consultancy
        firm. Information on this Website is provided for general business and informational purposes.
      </p>

      <h2>2. Use of the Website</h2>
      <p>You agree to use the Website only for lawful purposes. You must not:</p>
      <ul>
        <li>Attempt to gain unauthorised access to any part of the Website or its systems.</li>
        <li>Upload or transmit harmful code, spam, or misleading information through our forms.</li>
        <li>Copy, reproduce, or distribute Website content without prior written permission.</li>
        <li>Use the Website in any way that could damage, disable, or impair our services.</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this Website — including text, graphics, logos, images, brochures, and layout — is owned by or
        licensed to AVCONEXPO and protected by applicable intellectual property laws. Unauthorised use is prohibited.
      </p>

      <h2>4. Enquiries &amp; Form Submissions</h2>
      <p>
        When you submit a contact or career form, you confirm that the information provided is accurate to the best
        of your knowledge. Submission does not create a binding contract for services. Any commercial engagement
        with AVCONEXPO will be governed by separate written agreements.
      </p>

      <h2>5. Professional Services Disclaimer</h2>
      <p>
        Content on this Website, including blogs, case studies, and service descriptions, is for general information
        only. It does not constitute professional, legal, financial, or engineering advice. Specific project outcomes
        depend on site conditions, scope, regulations, and client requirements.
      </p>

      <h2>6. Third-Party Links</h2>
      <p>
        The Website may link to third-party websites or social media platforms. AVCONEXPO is not responsible for the
        content, policies, or practices of those external sites.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, AVCONEXPO shall not be liable for any direct, indirect, incidental,
        or consequential damages arising from your use of, or inability to use, the Website or its content.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless AVCONEXPO, its directors, employees, and affiliates from claims
        arising out of your misuse of the Website or violation of these Terms.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of India. Courts in Lucknow,
        Uttar Pradesh shall have exclusive jurisdiction over disputes relating to use of this Website, subject to
        applicable law.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may revise these Terms &amp; Conditions at any time. Updated terms will be posted on this page with a
        revised &quot;Last updated&quot; date. Continued use of the Website constitutes acceptance of the updated Terms.
      </p>

      <h2>11. Contact</h2>
      <p>
        For questions about these Terms, contact us at{" "}
        <a href="mailto:solutions@avconexpo.com">solutions@avconexpo.com</a> or via our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </LegalPageLayout>
  );
}
