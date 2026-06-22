export type ServiceCatalogItem = {
  title: string;
  shortDescription: string;
  image: string;
  href: string;
  icon: string;
  contactFormService: string;
};

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    title: "Business & Technical Consultancy",
    shortDescription:
      "Comprehensive business planning, feasibility studies, risk assessment, and technical consultancy for industrial growth.",
    image: "/service-details/business-technical-consultancy.jpg",
    href: "/services/business-technical-consulting",
    icon: "M10.5 6V5a2.5 2.5 0 015 0v1M4 8.5h18m-16 0V19a2 2 0 002 2h10a2 2 0 002-2V8.5M9 13h6",
    contactFormService: "Business and Technical Consultancy",
  },
  {
    title: "Project Management",
    shortDescription:
      "End-to-end project execution with planning, coordination, quality control, and on-time delivery.",
    image: "/service-details/projectmanagement.jpg",
    href: "/services/project-management",
    icon: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
    contactFormService: "Project Management (Greenfield & Brownfields)",
  },
  {
    title: "Architecture & Designing",
    shortDescription:
      "Functional industrial and commercial spaces designed for efficiency, compliance, and long-term performance.",
    image: "/service-details/architecture.jpg",
    href: "/services/architecture-designing",
    icon: "M12 3l8 4.5-8 4.5-8-4.5L12 3zm0 9v9m-7-5l7 5 7-5",
    contactFormService: "Architecture & Design",
  },
  {
    title: "Industrial Revival & Growth",
    shortDescription:
      "Diagnosing, restructuring, and reviving underperforming industries for sustainable profitability.",
    image: "/service-details/sick-industry.jpg",
    href: "/services/industrial-revival",
    icon: "M4 19V5m0 14h16M7 15l3-3 3 2 5-7",
    contactFormService: "Reviving and Running the Sick industries",
  },
  {
    title: "Startup Accelerator",
    shortDescription:
      "Strategy, funding support, operational setup, and market entry guidance for high-growth startups.",
    image: "/service-details/startup.jpg",
    href: "/services/startup-accelerator",
    icon: "M12 15l-3-3m3 3l3-3m-3 3V3m7 9a7 7 0 11-14 0",
    contactFormService: "Startups",
  },
  {
    title: "Waste Management",
    shortDescription:
      "Sustainable waste-to-energy and environmental solutions for cleaner, compliant industrial operations.",
    image: "/service-details/waste-management.jpg",
    href: "/services/waste-management",
    icon: "M4 7h4l2-3m0 0l2 3h4M7 7l-3 5 3 5m10-10l3 5-3 5M8 17h8",
    contactFormService: "Waste Management",
  },
  {
    title: "Agro Value Chain",
    shortDescription:
      "Agricultural systems, horticulture ventures, and eco-tourism destinations that empower communities.",
    image: "/service-details/horticulture.jpg",
    href: "/services/agro-value-chain",
    icon: "M5 19c8 0 14-6 14-14-8 0-14 6-14 14zm7-7c-3 1-5 3-6 6",
    contactFormService: "Hotel, clubs, resorts, Golf course, Horticulture & landscaping",
  },
  {
    title: "Talent Management Services",
    shortDescription:
      "Workforce planning, training, and organizational development aligned with business goals.",
    image: "/service-details/teammeeting.jpg",
    href: "/services/talent-management",
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0M18 8h3m-1.5-1.5v3",
    contactFormService: "Talent Management",
  },
  {
    title: "Supply Chain Management",
    shortDescription:
      "Procurement, logistics, vendor management, and trade financing for cost-efficient operations.",
    image: "/service-details/trading-sourcing.jpg",
    href: "/services/supply-chain",
    icon: "M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 18a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z",
    contactFormService: "Trading and sourcing",
  },
];

export const servicesTrustPoints = [
  {
    title: "Expert Engineers & Consultants",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    title: "Global Standards & Best Practices",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Cost Optimization & Efficiency",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Sustainable & Future Ready Solutions",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    title: "Complete Confidentiality Assured",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
];

export const servicesWorkProcess = [
  {
    step: "01",
    title: "Consultation & Assessment",
    description: "Understanding your business goals, challenges, and project requirements.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    step: "02",
    title: "Feasibility & Planning",
    description: "Analyzing risks, costs, and timelines to create a clear execution strategy.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    step: "03",
    title: "Engineering & Design",
    description: "Developing customized technical and architectural solutions.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    step: "04",
    title: "Execution & Project Management",
    description: "Managing procurement, implementation, and quality control.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    step: "05",
    title: "Optimization & Growth",
    description: "Improving efficiency and supporting long-term business growth.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];
