import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/privacy-policy",
    title: "Privacy Policy | AVCONEXPO",
    description:
      "Read how AVCONEXPO collects, uses, and protects your personal information when you visit our website or submit an enquiry.",
    imageUrl: "/slider2.jpg",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p className="text-sm font-semibold text-[#f0571f]">Last updated: June 8, 2026</p>

      <p>
        AVCONEXPO (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we
        collect, use, disclose, and safeguard information when you visit{" "}
        <Link href="/">www.avconexpo.com</Link> or interact with our services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Contact details</strong> — name, email address, phone number, company name, and message content
          submitted through our contact or career forms.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type, device information, pages visited, and
          referring URLs collected through cookies and analytics tools.
        </li>
        <li>
          <strong>Career applications</strong> — resume/CV files and employment-related information you choose to
          submit.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Respond to enquiries and provide consultancy, engineering, and business services.</li>
        <li>Process job applications and communicate about career opportunities.</li>
        <li>Improve website performance, content, and user experience.</li>
        <li>Send service-related communications when you have requested information from us.</li>
        <li>Comply with applicable legal and regulatory obligations.</li>
      </ul>

      <h2>3. Cookies &amp; Analytics</h2>
      <p>
        Our website may use cookies and third-party analytics or marketing tools (such as Google Analytics, Google Tag
        Manager, and Microsoft Clarity) to understand how visitors use the site. You can control cookies through your
        browser settings. Disabling cookies may affect certain site features.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share data with trusted service providers who assist us in
        operating the website, hosting infrastructure, email delivery, or analytics — only to the extent necessary and
        subject to appropriate safeguards. We may also disclose information when required by law.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain personal information only for as long as needed to fulfil the purposes described in this policy,
        unless a longer retention period is required by law or legitimate business needs.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and organisational measures to protect your information.
        However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute
        security.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on applicable law, you may have the right to access, correct, update, or request deletion of your
        personal information. To exercise these rights, please contact us using the details below.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the privacy practices of
        those sites and encourage you to review their policies.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
        &quot;Last updated&quot; date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For privacy-related questions, contact AVCONEXPO at{" "}
        <a href="mailto:solutions@avconexpo.com">solutions@avconexpo.com</a> or visit our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
      <p>
        AVCONEXPO
        <br />
        Pocket 1, 171, Golf City, Sector D, Bagiamau,
        <br />
        Lucknow, Uttar Pradesh 226030, India
      </p>
    </LegalPageLayout>
  );
}
