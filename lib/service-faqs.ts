import type { FaqItem } from "@/lib/faq-types";

export const serviceFaqsByPath: Record<string, FaqItem[]> = {
  "/services/business-technical-consulting": [
    {
      question: "What does business and technical consultancy include?",
      answer:
        "AVCONEXPO provides feasibility studies, risk assessment, project proposals, capex planning, engineering support, vendor management, and end-to-end execution guidance for industrial projects.",
    },
    {
      question: "Do you support both greenfield and brownfield projects?",
      answer:
        "Yes. We assist with new plant setup, expansion, modernization, and turnaround of existing facilities from concept to commercial production.",
    },
    {
      question: "How do we start a consultancy engagement?",
      answer:
        "Share your project scope through our contact form. Our team will review requirements and schedule an initial consultation to define the roadmap.",
    },
  ],
  "/services/project-management": [
    {
      question: "What types of projects does AVCONEXPO manage?",
      answer:
        "We manage greenfield, brownfield, expansion, and turnaround projects across manufacturing, utilities, infrastructure, and process industries.",
    },
    {
      question: "How do you ensure on-time project delivery?",
      answer:
        "We use structured planning, milestone tracking, vendor coordination, risk management, and on-site supervision aligned with global project management practices.",
    },
    {
      question: "Can you manage procurement and commissioning?",
      answer:
        "Yes. Our project management scope covers sourcing, installation, testing, commissioning, and operational readiness support.",
    },
  ],
  "/services/architecture-designing": [
    {
      question: "What design services do you provide?",
      answer:
        "We deliver master planning, architectural design, industrial layout planning, MEPF coordination, and compliance-focused design for factories and commercial facilities.",
    },
    {
      question: "Do you design for operational efficiency?",
      answer:
        "Yes. Our designs prioritize workflow optimization, safety, scalability, utility integration, and long-term maintainability.",
    },
    {
      question: "Can you support factory and warehouse design?",
      answer:
        "Absolutely. We specialize in industrial facilities including production plants, warehouses, utilities, and integrated infrastructure layouts.",
    },
  ],
  "/services/industrial-revival": [
    {
      question: "What is industrial revival and growth?",
      answer:
        "It is a structured approach to diagnose underperforming plants, improve efficiency, restructure operations, and restore sustainable profitability.",
    },
    {
      question: "Can AVCONEXPO help revive sick industries?",
      answer:
        "Yes. We partner with owners to assess technical, operational, and financial gaps, then implement practical revival and growth strategies.",
    },
    {
      question: "Do you provide hands-on operational support?",
      answer:
        "When required, we support plant operations during stabilization and transition periods to ensure improvements are sustained.",
    },
  ],
  "/services/startup-accelerator": [
    {
      question: "Who is the startup accelerator program for?",
      answer:
        "It is designed for founders and early-stage businesses that need strategy, structure, technical guidance, and market access to scale faster.",
    },
    {
      question: "What support do startups receive?",
      answer:
        "Support includes business planning, market analysis, funding strategy, technical development, operations setup, and growth advisory.",
    },
    {
      question: "Can AVCONEXPO help industrial startups?",
      answer:
        "Yes. We work with manufacturing, agro, energy, and technology-led startups that need engineering and execution expertise.",
    },
  ],
  "/services/waste-management": [
    {
      question: "What waste management solutions does AVCONEXPO offer?",
      answer:
        "We provide waste-to-energy solutions, environmental compliance support, and sustainable waste handling systems including Energy Recovery Technology (ERT).",
    },
    {
      question: "Is segregation required for your waste-to-energy process?",
      answer:
        "Our ERT approach is designed to handle mixed waste streams efficiently while reducing environmental impact and operational complexity.",
    },
    {
      question: "Can you support municipalities and industries?",
      answer:
        "Yes. We support industrial facilities, municipalities, and project developers with tailored waste management and energy recovery solutions.",
    },
  ],
  "/services/agro-value-chain": [
    {
      question: "What is agro value chain development?",
      answer:
        "It covers planning and execution across farming, post-harvest handling, processing, packaging, storage, and market access to improve farm-to-market value.",
    },
    {
      question: "Do you set up food and agro processing plants?",
      answer:
        "Yes. We support dairy, edible oil, horticulture, grain processing, and allied agro-industrial ventures.",
    },
    {
      question: "Can you help with export-ready agro projects?",
      answer:
        "We assist with process design, quality systems, infrastructure planning, and supply chain alignment for domestic and export markets.",
    },
  ],
  "/services/talent-management": [
    {
      question: "What talent management services are available?",
      answer:
        "Services include workforce planning, recruitment, onboarding, training, performance management, and leadership development.",
    },
    {
      question: "Do you support industrial workforce deployment?",
      answer:
        "Yes. We help industries build teams from operator level to functional leadership for plants and large-scale projects.",
    },
    {
      question: "Can AVCONEXPO manage HR systems for new plants?",
      answer:
        "We support HR framework setup, SOPs, KPIs, compliance-ready induction, and long-term talent alignment with business goals.",
    },
  ],
  "/services/supply-chain": [
    {
      question: "What supply chain services does AVCONEXPO provide?",
      answer:
        "We offer sourcing, vendor management, procurement support, logistics coordination, and trade financing assistance for industrial requirements.",
    },
    {
      question: "Can you source machinery and spare parts globally?",
      answer:
        "Yes. Our global vendor network supports equipment, spares, consumables, and project-based procurement with quality assurance.",
    },
    {
      question: "Do you handle urgent procurement requirements?",
      answer:
        "We provide fast procurement support for shutdowns, maintenance, expansions, and time-critical industrial needs.",
    },
  ],
};

export function getServiceFaqs(pathname: string): FaqItem[] {
  return serviceFaqsByPath[pathname] ?? [];
}
