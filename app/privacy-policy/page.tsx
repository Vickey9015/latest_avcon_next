import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/privacy-policy",
    title: "Privacy Policy | AVCONEXPO",
    description:
      "Read how AVCONEXPO Private Limited collects, uses, and protects your personal information when you visit our website or interact with our business.",
    imageUrl: "/slider2.jpg",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <h2>1. Introduction</h2>
      <p>
        AVCONEXPO Private Limited respects your privacy and is committed to protecting the information you share with
        us through our website, communications, and business interactions.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We may collect personal information such as name, email address, phone number, company name, designation,
        location, project requirements, and other information voluntarily submitted through inquiries and
        communications.
      </p>

      <h2>3. How We Use Information</h2>
      <p>
        Information collected may be used to respond to inquiries, provide consultancy and technical services, prepare
        proposals, communicate regarding projects, improve services, conduct business development activities, and
        comply with legal obligations.
      </p>

      <h2>4. Data Protection</h2>
      <p>
        AVCONEXPO takes appropriate administrative and technical measures to safeguard information collected through
        its website and business communications. While we strive to protect information using commercially reasonable
        practices, the security of information transmitted over the internet cannot be guaranteed absolutely.
      </p>

      <h2>5. Confidentiality</h2>
      <p>
        Business, technical, and project-related information shared with AVCONEXPO will be handled responsibly and,
        where applicable, subject to separate confidentiality agreements or non-disclosure agreements.
      </p>

      <h2>6. Sharing of Information</h2>
      <p>
        AVCONEXPO does not sell personal information. Information may be shared with employees, consultants, service
        providers, business partners, or regulatory authorities where necessary for project execution, legal compliance,
        or legitimate business purposes.
      </p>

      <h2>7. Cookies and Analytics</h2>
      <p>
        Our website may use cookies, analytics tools, and similar technologies to improve user experience and
        understand website performance.
      </p>

      <h2>8. Third-Party Websites</h2>
      <p>
        Our website may contain links to third-party websites. AVCONEXPO is not responsible for the content, privacy
        practices, or policies of such websites.
      </p>

      <h2>9. Data Retention</h2>
      <p>
        Information will be retained only for as long as necessary to fulfil business purposes, provide services,
        meet legal obligations, and resolve disputes.
      </p>

      <h2>10. User Rights</h2>
      <p>
        Subject to applicable laws, users may request access to, correction of, or deletion of their personal
        information by contacting AVCONEXPO.
      </p>

      <h2>11. Changes to this Privacy Policy</h2>
      <p>
        AVCONEXPO reserves the right to modify this Privacy Policy at any time. Updated versions will be posted on the
        website.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        AVCONEXPO Private Limited
        <br />
        1/6/55 Sector J, Pocket 6, Sushant Golf City, Lucknow – 226030, Uttar Pradesh, India
        <br />
        Email: solutions@avconexpo.com
        <br />
        Website: www.avconexpo.com
      </p>

      <h2>13. Legal Basis and Consent</h2>
      <p>
        By submitting information through the website, contacting AVCONEXPO, requesting information, downloading
        materials, subscribing to communications, or otherwise interacting with AVCONEXPO, users consent to the
        collection, processing, storage, and use of their information in accordance with this Privacy Policy and
        applicable laws.
      </p>

      <h2>14. International Data Transfers</h2>
      <p>
        As AVCONEXPO serves clients, suppliers, consultants, and partners across multiple countries, information may
        be accessed, processed, stored, or transferred across jurisdictions where necessary for legitimate business
        purposes, project execution, service delivery, or regulatory compliance.
      </p>

      <h2>15. Marketing Communications</h2>
      <p>
        AVCONEXPO may periodically send business updates, industry insights, newsletters, event invitations, service
        information, or other communications that may be relevant to users and clients.
      </p>
      <p>
        Recipients may request to opt out of such communications at any time by contacting AVCONEXPO or following the
        unsubscribe instructions provided in the communication.
      </p>

      <h2>16. Recruitment and Employment Applications</h2>
      <p>
        Information submitted for employment opportunities, internships, consulting assignments, vendor registrations,
        or business partnerships may be used for evaluation, recruitment, due diligence, onboarding, and related
        business purposes.
      </p>

      <h2>17. Children&apos;s Privacy</h2>
      <p>
        This website is intended for business and professional use and is not directed toward individuals under the
        age of 18 years. AVCONEXPO does not knowingly collect personal information from children.
      </p>

      <h2>18. Business Transactions</h2>
      <p>
        In the event of a merger, acquisition, restructuring, investment transaction, business transfer, asset sale, or
        similar corporate transaction, information may be transferred as part of the associated business assets,
        subject to applicable legal requirements.
      </p>

      <h2>19. Contact Form Disclaimer</h2>
      <p>
        Submission of inquiries, project requirements, technical information, or business proposals through the
        website does not create any contractual, consulting, fiduciary, confidential, or professional relationship
        unless expressly agreed in writing by AVCONEXPO.
      </p>
      <p>
        Users are advised not to submit confidential, proprietary, trade secret, or commercially sensitive information
        through website forms unless specifically requested and protected under a separate confidentiality agreement.
      </p>
    </LegalPageLayout>
  );
}
