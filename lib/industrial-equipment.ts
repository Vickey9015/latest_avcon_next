export type EquipmentCategoryId =
  | "electrical-distribution"
  | "power-energy"
  | "automation-control"
  | "cables-wiring"
  | "motors-rotating"
  | "lighting-accessories"
  | "spare-parts"
  | "others";

export type EquipmentProductStatus = "Active" | "Inactive";

export type EquipmentCategory = {
  id: EquipmentCategoryId;
  label: string;
};

export type EquipmentSpec = { label: string; value: string };

export type EquipmentProduct = {
  id: number;
  slug: string;
  title: string;
  categoryId: EquipmentCategoryId;
  shortDescription: string;
  description: string;
  specs: EquipmentSpec[];
  images: string[];
  featured: boolean;
  status: EquipmentProductStatus;
  order: number;
};

export type EquipmentProductInput = {
  slug: string;
  title: string;
  categoryId: EquipmentCategoryId;
  shortDescription: string;
  description: string;
  specs: EquipmentSpec[];
  images: string[];
  featured: boolean;
  status: EquipmentProductStatus;
  order: number;
};

export const EQUIPMENT_CATEGORY_IDS = [
  "electrical-distribution",
  "power-energy",
  "automation-control",
  "cables-wiring",
  "motors-rotating",
  "lighting-accessories",
  "spare-parts",
  "others",
] as const satisfies readonly EquipmentCategoryId[];

export function isEquipmentCategoryId(value: string): value is EquipmentCategoryId {
  return (EQUIPMENT_CATEGORY_IDS as readonly string[]).includes(value);
}

export function slugifyEquipmentTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const img = {
  switchgear: "/equipments-spares/switchgear.png",
  control: "/equipments-spares/control-panel.png",
  conveyor: "/equipments-spares/conveyor.png",
  gaskets: "/equipments-spares/gaskets.png",
  pumps: "/equipments-spares/pumps.png",
  sight: "/equipments-spares/sight-glass.png",
  bearings: "/equipments-spares/bearings.png",
  gearbox: "/equipments-spares/gearbox.png",
  filtration: "/equipments-spares/filtration.png",
  filtration2: "/equipments-spares/filtration-2.png",
  seals: "/equipments-spares/seals.png",
  logistics: "/equipments-spares/global-logistics.png",
  hero: "/equipments-spares/hero-compressors.png",
};

export const equipmentCategories: EquipmentCategory[] = [
  { id: "electrical-distribution", label: "Electrical Distribution" },
  { id: "power-energy", label: "Power & Energy" },
  { id: "automation-control", label: "Automation & Control" },
  { id: "cables-wiring", label: "Cables & Wiring" },
  { id: "motors-rotating", label: "Motors & Rotating Equipment" },
  { id: "lighting-accessories", label: "Lighting & Accessories" },
  { id: "spare-parts", label: "Critical Spare Parts" },
  { id: "others", label: "Others" },
];

const IMAGE_POOL = [
  img.switchgear,
  img.control,
  img.conveyor,
  img.gaskets,
  img.pumps,
  img.sight,
  img.bearings,
  img.gearbox,
  img.filtration,
  img.filtration2,
  img.seals,
  img.logistics,
  img.hero,
];

/** Ensure every product carousel has at least 6 images. */
function gallery(...preferred: string[]) {
  const images: string[] = [];

  for (const src of preferred) {
    if (!images.includes(src)) images.push(src);
  }

  for (const src of IMAGE_POOL) {
    if (images.length >= 6) break;
    if (!images.includes(src)) images.push(src);
  }

  while (images.length < 6 && preferred.length > 0) {
    images.push(preferred[images.length % preferred.length]);
  }

  return images.slice(0, 6);
}

export const DEFAULT_EQUIPMENT_PRODUCTS: EquipmentProductInput[] = [
  {
    slug: "switchgear-systems",
    title: "Industrial Switchgear Systems",
    categoryId: "electrical-distribution",
    featured: true,
    status: "Active",
    order: 1,
    shortDescription:
      "Reliable LV/MV switchgear for plant distribution, protection, and safe power control.",
    description:
      "AVCONEXPO supplies industrial switchgear systems for factories, utilities, and infrastructure projects. We source OEM-grade panels and protection assemblies for new installations, expansions, and emergency replacements through our global supplier network.",
    specs: [
      { label: "Type", value: "LV / MV Switchgear" },
      { label: "Application", value: "Plant Distribution" },
      { label: "Supply", value: "Global Sourcing" },
    ],
    images: gallery(img.switchgear, img.control, img.hero, img.logistics, img.filtration),
  },
  {
    slug: "motor-control-centers",
    title: "Motor Control Centers (MCC)",
    categoryId: "electrical-distribution",
    featured: true,
    status: "Active",
    order: 2,
    shortDescription:
      "Modular MCC panels for motor starting, protection, and centralized plant control.",
    description:
      "Motor Control Centers from AVCONEXPO support continuous process industries with modular drawers, soft starters, and VFD-ready compartments. Ideal for food processing, chemicals, utilities, and manufacturing plants.",
    specs: [
      { label: "Type", value: "MCC Panels" },
      { label: "Use", value: "Motor Control" },
      { label: "Grade", value: "Industrial / OEM" },
    ],
    images: gallery(img.control, img.switchgear, img.conveyor, img.gearbox, img.pumps),
  },
  {
    slug: "circuit-breakers",
    title: "Circuit Breakers & Protection Devices",
    categoryId: "electrical-distribution",
    featured: true,
    status: "Active",
    order: 3,
    shortDescription:
      "MCCB, ACB, and protection relays for reliable electrical safety and uptime.",
    description:
      "We supply circuit breakers, contactor assemblies, and protection relays for industrial boards and switchgear. Fast procurement support for maintenance shutdowns and critical replacements.",
    specs: [
      { label: "Range", value: "MCCB / ACB / Relay" },
      { label: "Use", value: "Protection" },
      { label: "Availability", value: "Project & Spares" },
    ],
    images: gallery(img.switchgear, img.bearings, img.control, img.seals, img.filtration2),
  },
  {
    slug: "distribution-boards",
    title: "Distribution Boards & Control Panels",
    categoryId: "electrical-distribution",
    featured: false,
    status: "Active",
    order: 4,
    shortDescription: "Custom and standard DB / control panels for industrial power distribution.",
    description:
      "Distribution boards and control panels engineered for commercial buildings, factories, and utility rooms. AVCONEXPO helps identify suitable configurations and source certified components.",
    specs: [
      { label: "Type", value: "DB / Control Panel" },
      { label: "Sector", value: "Industrial / Commercial" },
      { label: "Support", value: "Sourcing + Spec Match" },
    ],
    images: gallery(img.control, img.switchgear, img.sight, img.logistics),
  },
  {
    slug: "transformers",
    title: "Industrial Transformers",
    categoryId: "power-energy",
    featured: true,
    status: "Active",
    order: 5,
    shortDescription:
      "Power and distribution transformers for plant expansions and utility projects.",
    description:
      "AVCONEXPO sources industrial transformers for greenfield and brownfield projects across Africa, GCC, and India. We support specification matching, OEM alternatives, and logistics coordination.",
    specs: [
      { label: "Type", value: "Power / Distribution" },
      { label: "Application", value: "Plant / Utility" },
      { label: "Coverage", value: "25+ Countries" },
    ],
    images: gallery(img.hero, img.control, img.logistics, img.filtration, img.gearbox),
  },
  {
    slug: "ups-systems",
    title: "UPS Systems & Battery Chargers",
    categoryId: "power-energy",
    featured: true,
    status: "Active",
    order: 6,
    shortDescription:
      "Uninterruptible power systems and battery chargers for critical plant loads.",
    description:
      "Protect critical control rooms, PLC cabinets, and process loads with industrial UPS systems and battery chargers. Suitable for manufacturing, data rooms, and continuous process facilities.",
    specs: [
      { label: "Type", value: "UPS / Charger" },
      { label: "Use", value: "Critical Power" },
      { label: "Support", value: "Spares Available" },
    ],
    images: gallery(img.control, img.hero, img.filtration2, img.switchgear, img.bearings),
  },
  {
    slug: "voltage-stabilizers",
    title: "Voltage Stabilizers & PFC Equipment",
    categoryId: "power-energy",
    featured: false,
    status: "Active",
    order: 7,
    shortDescription: "Stabilizers and power factor correction systems for efficient plant power.",
    description:
      "Improve voltage quality and energy efficiency with industrial stabilizers and PFC equipment. AVCONEXPO supports project-based and urgent replacement supply.",
    specs: [
      { label: "Type", value: "Stabilizer / PFC" },
      { label: "Benefit", value: "Power Quality" },
      { label: "Sector", value: "Manufacturing" },
    ],
    images: gallery(img.filtration, img.control, img.hero, img.logistics),
  },
  {
    slug: "vfd-drives",
    title: "Variable Frequency Drives (VFDs)",
    categoryId: "automation-control",
    featured: true,
    status: "Active",
    order: 8,
    shortDescription:
      "VFDs and servo drives for energy-efficient motor speed control in industrial plants.",
    description:
      "Variable Frequency Drives for pumps, conveyors, compressors, and process lines. We supply new drives and critical VFD spare modules to reduce downtime.",
    specs: [
      { label: "Type", value: "VFD / Servo" },
      { label: "Use", value: "Motor Speed Control" },
      { label: "Spares", value: "Drive Modules" },
    ],
    images: gallery(img.conveyor, img.pumps, img.gearbox, img.control, img.bearings),
  },
  {
    slug: "plc-systems",
    title: "PLC Systems & SCADA Components",
    categoryId: "automation-control",
    featured: true,
    status: "Active",
    order: 9,
    shortDescription:
      "PLC, HMI, and SCADA components for industrial automation and process control.",
    description:
      "Source PLC systems, HMI panels, and SCADA components for plant automation upgrades and maintenance. AVCONEXPO helps locate OEM parts and compatible alternatives quickly.",
    specs: [
      { label: "Type", value: "PLC / HMI / SCADA" },
      { label: "Use", value: "Automation" },
      { label: "Support", value: "OEM + Alternatives" },
    ],
    images: gallery(img.conveyor, img.sight, img.control, img.seals, img.filtration2),
  },
  {
    slug: "sensors-transmitters",
    title: "Industrial Sensors & Transmitters",
    categoryId: "automation-control",
    featured: false,
    status: "Active",
    order: 10,
    shortDescription: "Process sensors, transmitters, and instruments for plant monitoring.",
    description:
      "Industrial sensors and transmitters for temperature, pressure, flow, and level applications. Suitable for process industries and utility plants.",
    specs: [
      { label: "Type", value: "Sensors / Instruments" },
      { label: "Use", value: "Process Monitoring" },
      { label: "Sector", value: "Process Industry" },
    ],
    images: gallery(img.sight, img.conveyor, img.filtration, img.seals),
  },
  {
    slug: "power-cables",
    title: "Power & Control Cables",
    categoryId: "cables-wiring",
    featured: true,
    status: "Active",
    order: 11,
    shortDescription:
      "Industrial power, control, and instrumentation cables for plant wiring projects.",
    description:
      "Complete cable supply for industrial installations including power, control, and instrumentation cables with glands, lugs, and accessories.",
    specs: [
      { label: "Type", value: "Power / Control / Inst." },
      { label: "Use", value: "Plant Wiring" },
      { label: "Accessories", value: "Glands & Lugs" },
    ],
    images: gallery(img.gaskets, img.seals, img.switchgear, img.logistics, img.hero),
  },
  {
    slug: "cable-trays-accessories",
    title: "Cable Trays, Glands & Termination Kits",
    categoryId: "cables-wiring",
    featured: false,
    status: "Active",
    order: 12,
    shortDescription: "Cable management systems, glands, connectors, and termination kits.",
    description:
      "Cable trays, glands, connectors, junction boxes, and termination kits for safe and organized industrial cable installations.",
    specs: [
      { label: "Type", value: "Trays / Glands / Kits" },
      { label: "Use", value: "Cable Management" },
      { label: "Supply", value: "Project Lots" },
    ],
    images: gallery(img.gaskets, img.seals, img.bearings, img.filtration),
  },
  {
    slug: "ac-motors",
    title: "Industrial AC Motors",
    categoryId: "motors-rotating",
    featured: true,
    status: "Active",
    order: 13,
    shortDescription:
      "AC motors and gear motors for pumps, conveyors, compressors, and process machinery.",
    description:
      "Industrial AC motors, gear motors, and explosion-proof options for demanding plant environments. We also support motor spare parts for maintenance teams.",
    specs: [
      { label: "Type", value: "AC / Gear Motor" },
      { label: "Use", value: "Rotating Equipment" },
      { label: "Options", value: "Ex-Proof Available" },
    ],
    images: gallery(img.pumps, img.gearbox, img.bearings, img.conveyor, img.hero),
  },
  {
    slug: "soft-starters",
    title: "Soft Starters & Motor Protection",
    categoryId: "motors-rotating",
    featured: false,
    status: "Active",
    order: 14,
    shortDescription: "Soft starters and motor protection systems for reliable motor starts.",
    description:
      "Reduce mechanical stress and electrical peaks with industrial soft starters and motor protection assemblies for plant rotating equipment.",
    specs: [
      { label: "Type", value: "Soft Starter" },
      { label: "Use", value: "Motor Starting" },
      { label: "Benefit", value: "Protect & Smooth Start" },
    ],
    images: gallery(img.gearbox, img.pumps, img.control, img.bearings),
  },
  {
    slug: "industrial-lighting",
    title: "Industrial & Hazardous Area Lighting",
    categoryId: "lighting-accessories",
    featured: false,
    status: "Active",
    order: 15,
    shortDescription: "LED and hazardous-area lighting systems for factories and utilities.",
    description:
      "Industrial LED lighting, emergency systems, and hazardous area luminaires for manufacturing floors, warehouses, and process areas.",
    specs: [
      { label: "Type", value: "LED / Hazardous" },
      { label: "Use", value: "Plant Lighting" },
      { label: "Options", value: "Emergency Lighting" },
    ],
    images: gallery(img.sight, img.filtration2, img.logistics, img.hero),
  },
  {
    slug: "electrical-enclosures",
    title: "Electrical Enclosures & Accessories",
    categoryId: "lighting-accessories",
    featured: false,
    status: "Active",
    order: 16,
    shortDescription: "Enclosures, switches, sockets, and earthing / lightning protection.",
    description:
      "Electrical enclosures and accessories including switches, sockets, and earthing / lightning protection systems for industrial facilities.",
    specs: [
      { label: "Type", value: "Enclosures / Accessories" },
      { label: "Use", value: "Plant Electrical" },
      { label: "Protection", value: "Earthing Available" },
    ],
    images: gallery(img.sight, img.control, img.gaskets, img.seals),
  },
  {
    slug: "plc-automation-spares",
    title: "PLC & Automation Spares",
    categoryId: "spare-parts",
    featured: true,
    status: "Active",
    order: 17,
    shortDescription:
      "Critical PLC, drive, and automation spare parts to minimize plant downtime.",
    description:
      "When downtime matters, AVCONEXPO sources PLC modules, drive components, sensors, and automation spares for urgent maintenance and repair needs.",
    specs: [
      { label: "Type", value: "Automation Spares" },
      { label: "Priority", value: "Critical / Urgent" },
      { label: "Coverage", value: "OEM + Alternatives" },
    ],
    images: gallery(img.conveyor, img.seals, img.bearings, img.control, img.filtration),
  },
  {
    slug: "switchgear-spares",
    title: "Switchgear & Protection Spares",
    categoryId: "spare-parts",
    featured: false,
    status: "Active",
    order: 18,
    shortDescription: "Breakers, relays, contactors, and switchgear spare components.",
    description:
      "Critical switchgear spares including breakers, protection relays, contactors, and panel accessories for maintenance teams.",
    specs: [
      { label: "Type", value: "Switchgear Spares" },
      { label: "Use", value: "Maintenance" },
      { label: "Supply", value: "Fast Sourcing" },
    ],
    images: gallery(img.switchgear, img.bearings, img.seals, img.control),
  },
  {
    slug: "motor-spare-parts",
    title: "Motor Spare Parts & Bearings",
    categoryId: "spare-parts",
    featured: false,
    status: "Active",
    order: 19,
    shortDescription: "Motor spares, bearings, and rotating equipment replacement parts.",
    description:
      "Motor spare parts, bearings, and rotating equipment components for continuous plant reliability and planned shutdowns.",
    specs: [
      { label: "Type", value: "Motor Spares" },
      { label: "Parts", value: "Bearings / Kits" },
      { label: "Use", value: "Maintenance" },
    ],
    images: gallery(img.bearings, img.gearbox, img.pumps, img.seals),
  },
];

/** Mapped fallback with synthetic ids for backward compatibility. */
export const equipmentProducts: EquipmentProduct[] = DEFAULT_EQUIPMENT_PRODUCTS.map(
  (product, index) => ({
    ...product,
    id: index + 1,
  }),
);

export function getCategoryLabel(id: EquipmentCategoryId) {
  return equipmentCategories.find((category) => category.id === id)?.label ?? id;
}

export function productHref(slug: string) {
  return `/industrial-equipment-supplier/${slug}`;
}
