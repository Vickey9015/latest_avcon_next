import { SITE } from "@/lib/site";

const LOGO_URL = `${SITE}/brand-logo.png`;
const HOME_BANNER_URL = `${SITE}/slider2.jpg`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "AVCONEXPO",
  alternateName: "AVCONEXPO Engineering & Industrial Solutions",
  url: SITE,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "AVCONEXPO is a global engineering, EPC, supply chain management, architecture, and industrial solutions company providing greenfield and brownfield project development, technical consultancy, industrial revival, waste management, agro value chain, startup acceleration, talent management, and turnkey industrial solutions.",
  foundingDate: "2001",
  email: "solutions@avconexpo.com",
  telephone: "+91-7007729873",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7007729873",
    contactType: "customer service",
    email: "solutions@avconexpo.com",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1/6/55, Sector J, Pocket 6, Sushant Golf City",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226030",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/avconexpo",
    "https://www.facebook.com/avconexpo",
    "https://www.instagram.com/avconexpo",
    "https://x.com/avconexpo",
  ],
  knowsAbout: [
    "Engineering Consultancy",
    "EPC Services",
    "Project Management",
    "Industrial Revival",
    "Supply Chain Management",
    "Architecture Design",
    "Waste Management",
    "Agro Value Chain",
    "Talent Management",
    "Greenfield Projects",
    "Brownfield Projects",
    "Industrial Automation",
    "Technical Consultancy",
  ],
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Burundi" },
    { "@type": "Country", name: "Ethiopia" },
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "Sierra Leone" },
    { "@type": "Country", name: "Angola" },
    { "@type": "Country", name: "DR Congo" },
    { "@type": "Country", name: "Guinea" },
    { "@type": "Country", name: "South Sudan" },
    { "@type": "Country", name: "Somalia" },
  ],
};

export const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/#webpage`,
  url: SITE,
  name: "AVCONEXPO | Global Business & Technical Consultancy",
  headline: "Global Business & Technical Consultancy",
  description:
    "AVCONEXPO is a global engineering, EPC, supply chain management, architecture, and industrial solutions company providing greenfield and brownfield project development, project management, industrial revival, startup acceleration, waste management, agro value chain, talent management, and turnkey industrial solutions.",
  inLanguage: "en",
  isPartOf: {
    "@id": `${SITE}/#website`,
  },
  about: {
    "@id": `${SITE}/#organization`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: HOME_BANNER_URL,
  },
  datePublished: "2016-01-01",
  dateModified: "2026-06-04",
  publisher: {
    "@id": `${SITE}/#organization`,
  },
  mainEntity: {
    "@type": "Organization",
    name: "AVCONEXPO",
  },
  keywords: [
    "Engineering Consultancy",
    "Business Consultancy",
    "Technical Consultancy",
    "EPC Services",
    "Engineering Procurement Construction",
    "Project Management",
    "Industrial Solutions",
    "Industrial Revival",
    "Supply Chain Management",
    "Architecture Design",
    "Waste Management",
    "Agro Value Chain",
    "Talent Management",
    "Greenfield Projects",
    "Brownfield Projects",
    "Power Plant Solutions",
    "Water Treatment",
    "Utilities Infrastructure",
    "Industrial Plant Setup",
    "Factory Setup",
  ],
  breadcrumb: {
    "@id": `${SITE}/#breadcrumb`,
  },
};

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}/#organization`,
  name: "AVCONEXPO",
  url: SITE,
  telephone: "+91-7007729873",
  email: "solutions@avconexpo.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector J, Sushant Golf City",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226030",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "430",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Michael O." },
      datePublished: "2025-11-15",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "AVCONEXPO provided exceptional project consultancy and execution support. Their team demonstrated strong technical expertise and professionalism throughout the engagement.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sarah K." },
      datePublished: "2025-12-10",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Excellent business consulting and supply chain advisory services. Communication was transparent and the project was delivered efficiently.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "David M." },
      datePublished: "2026-01-08",
      reviewRating: { "@type": "Rating", ratingValue: "4.8", bestRating: "5" },
      reviewBody:
        "Highly knowledgeable team with deep industry expertise. AVCONEXPO helped streamline our operations and improve project outcomes.",
    },
  ],
};

export const faqItems = [
  {
    question: "What services does AVCONEXPO provide?",
    answer:
      "AVCONEXPO is a global business and technical consultancy firm offering Engineering Consultancy, EPC Solutions, Supply Chain Management, Project Management, Architecture & Design, Industrial Consultancy, Startup Acceleration, Talent Management, Waste Management, Agro Value Chain Development, and Business Advisory Services. We help businesses, industries, investors, and organizations successfully plan, execute, and optimize projects across multiple sectors.",
  },
  {
    question: "Which industries does AVCONEXPO serve?",
    answer:
      "AVCONEXPO serves a wide range of industries including Manufacturing, Food Processing, Agriculture, Healthcare, Pharmaceuticals, Infrastructure, Construction, Energy, Oil & Gas, Logistics, Waste Management, Mining, Education, and Industrial Development. Our multidisciplinary expertise allows us to provide customized solutions based on industry-specific requirements.",
  },
  {
    question: "Does AVCONEXPO work with international clients and projects?",
    answer:
      "Yes. AVCONEXPO supports clients across India, Africa, the Middle East, and other international markets. We assist organizations with technical consultancy, project development, market entry strategies, supply chain solutions, EPC support, and business expansion initiatives globally.",
  },
  {
    question: "How can AVCONEXPO help businesses improve operational efficiency and profitability?",
    answer:
      "Our team evaluates existing operations, identifies inefficiencies, and develops practical solutions to reduce costs, improve productivity, optimize supply chains, strengthen project execution, and enhance overall business performance. We focus on delivering measurable results and sustainable growth for our clients.",
  },
  {
    question: "How can I start a project or consultation with AVCONEXPO?",
    answer:
      "Getting started is simple. You can contact our team via phone, email, or the website contact form. After understanding your requirements, our experts will schedule an initial consultation, assess your project needs, and propose a tailored solution aligned with your business objectives.",
  },
] as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
