export type NavLink = {
  label: string;
  href: string;
};

export const aboutNavLinks: NavLink[] = [
  { label: "Overview", href: "/overview" },
  { label: "Team", href: "/team" },
  { label: "What we do", href: "/what-we-do" },
];

export const servicesNavLinks: NavLink[] = [
  { label: "Business & Technical Consultancy", href: "/services/business-technical-consulting" },
  { label: "Project Management", href: "/services/project-management" },
  { label: "Architecture & Designing", href: "/services/architecture-designing" },
  { label: "Industrial Revival & Growth", href: "/services/industrial-revival" },
  { label: "Startup Accelerator", href: "/services/startup-accelerator" },
  { label: "Waste Management", href: "/services/waste-management" },
  { label: "Agro Value Chain", href: "/services/agro-value-chain" },
  { label: "Talent Management Services", href: "/services/talent-management" },
  { label: "Supply-Chain Management", href: "/services/supply-chain" },
];

export const primaryNavLinks: NavLink[] = [
  { label: "Projects", href: "/project" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
];
