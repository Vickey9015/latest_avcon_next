import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/terms-and-conditions",
    title: "Terms & Conditions | AVCONEXPO",
    description:
      "Terms and conditions governing your use of the AVCONEXPO Private Limited website and online services.",
    imageUrl: "/slider2.jpg",
  });
}

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <h2>1. Company Information</h2>
      <p>
        AVCONEXPO Private Limited is an engineering, technology, architecture, design, supply chain management,
        project management, sourcing, and business consultancy company providing professional services across various
        industrial sectors.
      </p>

      <h2>2. Purpose of the Website</h2>
      <p>
        This website is intended to provide general information regarding AVCONEXPO, its services, capabilities,
        expertise, projects, industries served, and business activities.
      </p>

      <h2>3. Accuracy of Information</h2>
      <p>
        While AVCONEXPO endeavours to ensure that information presented on this website is accurate and up to date,
        no guarantee is provided regarding completeness, reliability, adequacy, suitability, or availability.
      </p>

      <h2>4. Information and Advisory Disclaimer</h2>
      <p>
        The information and content available on this website are provided solely for general informational purposes
        and do not constitute engineering, technical, business, financial, legal, investment, architectural, project
        management, procurement, operational, regulatory, environmental, or any other form of professional advice.
      </p>

      <h2>5. Intellectual Property Rights</h2>
      <p>
        All content available on this website, including text, graphics, logos, drawings, diagrams, methodologies,
        process flows, designs, reports, presentations, brochures, photographs, videos, documents, and website design,
        are the exclusive property of AVCONEXPO or its licensors.
      </p>

      <h2>6. Project Information and Illustrations</h2>
      <p>
        Project descriptions, technical information, capacities, layouts, process flows, engineering concepts, case
        studies, examples, illustrations, photographs, diagrams, or representations displayed on this website are
        provided for general reference purposes only.
      </p>

      <h2>7. User Conduct</h2>
      <p>
        Users agree not to misuse the website, attempt unauthorized access, introduce malware, interfere with website
        functionality, infringe intellectual property rights, or use content in a manner harmful to AVCONEXPO.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, AVCONEXPO shall not be liable for any losses, damages, liabilities,
        costs, claims, penalties, disruptions, or consequences arising from the use of, reliance on, or inability to
        access this website, or from any decisions or actions taken based on information contained herein.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        AVCONEXPO does not control, endorse, or assume responsibility for third-party websites linked from this
        website.
      </p>

      <h2>10. Confidentiality of Submitted Information</h2>
      <p>
        Information submitted through website forms, emails, inquiries, or communications may be used for responding
        to inquiries, business development, project evaluation, and service delivery purposes.
      </p>

      <h2>11. Service Engagement</h2>
      <p>
        No professional service shall be deemed engaged unless a formal proposal has been accepted and a written
        agreement has been executed.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        Users agree to indemnify and hold harmless AVCONEXPO from claims, liabilities, losses, damages, costs, or
        expenses arising from their use of the website.
      </p>

      <h2>13. Modification of Terms</h2>
      <p>AVCONEXPO reserves the right to amend these Terms &amp; Conditions at any time.</p>

      <h2>14. Governing Law</h2>
      <p>These Terms &amp; Conditions shall be governed by the laws of India.</p>

      <h2>15. Jurisdiction</h2>
      <p>
        Any dispute shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh, India.
      </p>

      <h2>16. Contact Information</h2>
      <p>
        AVCONEXPO Private Limited, Lucknow, Uttar Pradesh, India | Email: consult@avconexpo.com | Website:
        www.avconexpo.com
      </p>

      <h2 className="!mt-10 !text-xl uppercase tracking-wide">
        Additional Terms &amp; Conditions Recommended for AVCONEXPO Private Limited
      </h2>

      <h2>17. No Warranty</h2>
      <p>
        The website and its contents are provided on an &quot;as is&quot; and &quot;as available&quot; basis. AVCONEXPO
        makes no representations or warranties, express or implied, regarding the accuracy, completeness, reliability,
        suitability, availability, merchantability, fitness for a particular purpose, or non-infringement of any
        information, content, services, or materials contained on this website.
      </p>

      <h2>18. No Professional or Client Relationship</h2>
      <p>
        Accessing this website, communicating with AVCONEXPO, submitting inquiries, downloading materials, receiving
        proposals, presentations, brochures, reports, or obtaining information through this website shall not create
        any consultant-client, contractor-client, advisor-client, fiduciary, partnership, joint venture, employment,
        agency, or other professional relationship between AVCONEXPO and any user.
      </p>
      <p>
        No professional engagement shall arise unless expressly confirmed through a written agreement executed by
        authorized representatives of the parties.
      </p>

      <h2>19. Vendor and Third-Party Information Disclaimer</h2>
      <p>
        References to suppliers, manufacturers, vendors, contractors, technologies, equipment, products, service
        providers, market participants, or business partners are provided solely for informational purposes.
      </p>
      <p>
        AVCONEXPO does not warrant, guarantee, endorse, or assume responsibility for the performance, quality,
        compliance, availability, pricing, delivery, suitability, safety, or fitness of any third-party products or
        services unless expressly agreed in writing.
      </p>

      <h2>20. Exclusion of Consequential Damages</h2>
      <p>
        To the fullest extent permitted by applicable law, AVCONEXPO shall not be liable for any indirect, incidental,
        consequential, special, exemplary, punitive, or similar damages, including but not limited to loss of profit,
        loss of business opportunity, loss of production, loss of revenue, loss of contracts, loss of goodwill, loss of
        anticipated savings, loss of use, loss of data, project delays, business interruption, or economic loss
        arising out of or related to the use of this website.
      </p>

      <h2>21. Technical Content and Generated Information Disclaimer</h2>
      <p>
        Technical articles, industry insights, market assessments, engineering concepts, project illustrations,
        feasibility discussions, calculations, reports, blogs, presentations, process flows, conceptual designs, and
        other informational materials available on this website are intended solely for general informational purposes.
      </p>
      <p>
        Certain content may be generated, assisted, summarized, or compiled using automated tools, artificial
        intelligence systems, external data sources, industry references, or publicly available information.
      </p>
      <p>
        Users are solely responsible for independently verifying all information before relying upon it for technical,
        engineering, commercial, financial, legal, procurement, investment, operational, regulatory, environmental,
        construction, or business decisions.
      </p>

      <h2>22. Forward-Looking Statements</h2>
      <p>
        The website may contain statements regarding market opportunities, industry trends, project potential, expected
        outcomes, business strategies, forecasts, projections, or future developments.
      </p>
      <p>
        Such statements are based on assumptions and information available at the time of publication and should not be
        interpreted as guarantees of future performance, results, achievements, or outcomes.
      </p>

      <h2>23. International Use</h2>
      <p>
        The website may be accessed from jurisdictions outside India. AVCONEXPO makes no representation that the
        website or its contents are appropriate, lawful, or available for use in every jurisdiction.
      </p>
      <p>
        Users accessing the website from outside India do so at their own initiative and are responsible for compliance
        with applicable local laws and regulations.
      </p>

      <h2>24. Reservation of Rights</h2>
      <p>Any rights not expressly granted herein are reserved by AVCONEXPO Private Limited.</p>
      <p>
        Failure by AVCONEXPO to enforce any provision of these Terms &amp; Conditions shall not constitute a waiver of
        any rights or remedies available to it.
      </p>

      <h2>25. Severability</h2>
      <p>
        If any provision of these Terms &amp; Conditions is determined to be invalid, unlawful, or unenforceable by a
        court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
      </p>
    </LegalPageLayout>
  );
}
