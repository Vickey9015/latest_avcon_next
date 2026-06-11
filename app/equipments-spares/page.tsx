import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import EquipmentSparesEnquiryForm from "@/components/EquipmentSparesEnquiryForm";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/equipments-spares",
    title: "Industrial Equipment & Spare Parts | AVCONEXPO",
    description:
      "AVCONEXPO supplies electrical equipment, industrial components, and critical spare parts for manufacturing, infrastructure, utility, and commercial applications worldwide.",
    imageUrl: "/equipments-spares/hero-compressors.png",
  });
}

const productCategories = [
  {
    title: "Electrical Distribution Equipment",
    image: "/equipments-spares/switchgear.png",
    imageAlt: "Industrial switchgear and electrical distribution systems",
    items: [
      "Switchgear Systems",
      "Motor Control Centers (MCC)",
      "Distribution Boards",
      "Control Panels",
      "Power Distribution Units",
      "Circuit Breakers",
      "Contactors & Relays",
      "Protection Devices",
    ],
  },
  {
    title: "Power & Energy Solutions",
    image: "/equipments-spares/control-panel.png",
    imageAlt: "Power and energy control equipment",
    items: [
      "Transformers",
      "Voltage Stabilizers",
      "UPS Systems",
      "Batteries & Battery Chargers",
      "Power Factor Correction Equipment",
      "Energy Management Systems",
      "Power Monitoring Devices",
    ],
  },
  {
    title: "Industrial Automation & Control",
    image: "/equipments-spares/conveyor.png",
    imageAlt: "Industrial automation and conveyor systems",
    items: [
      "PLC Systems",
      "SCADA Components",
      "HMI Panels",
      "Sensors & Transmitters",
      "Control Instruments",
      "Variable Frequency Drives (VFDs)",
      "Servo Drives & Controllers",
      "Industrial Networking Components",
    ],
  },
  {
    title: "Cables & Wiring Accessories",
    image: "/equipments-spares/gaskets.png",
    imageAlt: "Industrial gaskets and wiring accessories",
    items: [
      "Power Cables",
      "Instrumentation Cables",
      "Control Cables",
      "Cable Trays & Accessories",
      "Cable Glands",
      "Cable Lugs & Connectors",
      "Junction Boxes",
      "Termination Kits",
    ],
  },
  {
    title: "Motors & Rotating Equipment",
    image: "/equipments-spares/pumps.png",
    imageAlt: "Industrial pumps and rotating equipment",
    items: [
      "AC Motors",
      "DC Motors",
      "Explosion-Proof Motors",
      "Gear Motors",
      "Soft Starters",
      "Motor Protection Systems",
      "Motor Spare Parts",
    ],
  },
  {
    title: "Lighting & Electrical Accessories",
    image: "/equipments-spares/sight-glass.png",
    imageAlt: "Industrial sight glass and process instrumentation",
    items: [
      "Industrial Lighting Systems",
      "LED Lighting Solutions",
      "Hazardous Area Lighting",
      "Emergency Lighting Systems",
      "Electrical Enclosures",
      "Switches & Sockets",
      "Earthing & Lightning Protection Systems",
    ],
  },
];

const spareParts = [
  "PLC & Automation Spares",
  "Drive & VFD Components",
  "Circuit Breakers & Protection Relays",
  "Switchgear Components",
  "Control Panel Accessories",
  "Industrial Sensors",
  "Electrical Connectors",
  "Power Supply Modules",
  "Contactors & Overload Relays",
  "Motor Spare Parts",
  "Transformer Components",
  "Instrumentation & Control Parts",
];

const industries = [
  "Food & Beverage Manufacturing",
  "Dairy Processing",
  "FMCG Manufacturing",
  "Chemical & Petrochemical Facilities",
  "Water & Wastewater Treatment Plants",
  "Power Generation Facilities",
  "Renewable Energy Projects",
  "Infrastructure & Construction Projects",
  "Mining & Metals Industries",
  "Logistics & Warehousing Facilities",
];

const whyChoose = [
  {
    title: "Global Sourcing Network",
    text: "Access to leading manufacturers, OEMs, and approved suppliers across international markets.",
    image: "/equipments-spares/global-logistics.png",
  },
  {
    title: "Quality Assurance",
    text: "Products sourced from trusted and certified manufacturers meeting international standards.",
    image: "/equipments-spares/filtration.png",
  },
  {
    title: "Fast Procurement Support",
    text: "Efficient sourcing and supply chain management for urgent and project-based requirements.",
    image: "/equipments-spares/gearbox.png",
  },
  {
    title: "Technical Expertise",
    text: "Support in identifying suitable equipment, alternatives, and replacement parts.",
    image: "/equipments-spares/bearings.png",
  },
];

const galleryImages = [
  { src: "/equipments-spares/seals.png", alt: "Industrial seals and O-rings" },
  { src: "/equipments-spares/bearings.png", alt: "Precision ball bearings" },
  { src: "/equipments-spares/gearbox.png", alt: "Industrial gearbox and motor assembly" },
  { src: "/equipments-spares/filtration-2.png", alt: "Industrial filtration equipment" },
];

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#f0571f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function EquipmentsSparesPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/equipments-spares/hero-compressors.png"
            alt="Industrial equipment and compressors"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101827]/90 via-[#101827]/75 to-[#101827]/50" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#faa419]">
              Industrial Solutions
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Industrial Equipment and Spare Parts
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Powering industries with reliable electrical solutions, global sourcing, and dependable spare parts supply.
            </p>
          </div>
        </section>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="flex h-full flex-col">
              <div className="rounded-[24px] bg-gradient-to-r from-[#f0571f] to-[#faa419] p-5 text-white shadow-xl sm:p-6">
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  Powering Industries with Reliable Electrical Solutions
                </h2>
              </div>
              <div className="mt-5 flex flex-1 flex-col justify-center space-y-4 text-justify text-base leading-7 text-[#444]">
                <p>
                  AVCONEXPO supplies a comprehensive range of electrical equipment, components, and spare parts for
                  industrial, commercial, infrastructure, utility, and manufacturing applications. Through our global
                  sourcing network and strong supplier partnerships, we deliver high-quality electrical products that
                  ensure operational reliability, safety, and efficiency.
                </p>
                <p>
                  Whether you require equipment for new projects, plant expansions, maintenance shutdowns, or emergency
                  replacements, AVCONEXPO provides dependable sourcing and supply solutions tailored to your operational
                  requirements.
                </p>
              </div>
            </div>
            <EquipmentSparesEnquiryForm />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">Our Product Range</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">Comprehensive Electrical Portfolio</h2>
          </div>

          <div className="grid gap-8">
            {productCategories.map((category, index) => (
              <article
                key={category.title}
                className={`overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } lg:flex`}
              >
                <div className="relative min-h-[240px] lg:min-h-0 lg:w-[38%]">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                  <h3 className="text-xl font-extrabold text-[#1a1a1a] sm:text-2xl">{category.title}</h3>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-medium text-[#444]">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101827] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#faa419]">
                Electrical Spare Parts Supply
              </p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">Critical Parts When Downtime Matters</h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                We understand that equipment downtime can result in significant operational losses. AVCONEXPO
                specializes in sourcing and supplying critical electrical spare parts for maintenance, repair, and
                replacement requirements.
              </p>
              <p className="mt-4 text-base leading-7 text-white/80">Our spare parts portfolio includes:</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {spareParts.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">Why Choose AVCONEXPO?</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">End-to-End Supply Solutions</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#555]">
              From inquiry and sourcing to logistics and delivery, we manage the complete procurement process.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-[#1a1a1a]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#555]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#f0571f] to-[#faa419] py-16 text-white sm:py-20">
        <div className="absolute inset-0 opacity-20">
          <Image src="/equipments-spares/global-logistics.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Your Trusted Partner for Electrical Procurement</h2>
          <p className="mt-5 text-base leading-8 text-white/90 sm:text-lg">
            At AVCONEXPO, we combine engineering expertise, procurement excellence, and global sourcing capabilities to
            provide reliable electrical equipment and spare parts that keep industries operating efficiently and safely.
          </p>
          <p className="mt-4 text-base leading-8 text-white/90">
            Contact our team today to discuss your electrical equipment requirements and discover how AVCONEXPO can
            support your projects, maintenance operations, and procurement needs.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
            <div className="min-w-0 md:w-1/2">
              <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">Industries We Serve</p>
              <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">
                Our electrical equipment and spare parts solutions support
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-2.5">
                {industries.map((industry) => (
                  <li
                    key={industry}
                    className="flex items-start gap-2 rounded-xl border border-orange-100 bg-orange-50/40 px-2.5 py-2.5 text-[11px] font-semibold leading-4 text-[#333] shadow-sm sm:px-3 sm:py-3 sm:text-xs sm:leading-5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0571f] text-white sm:h-6 sm:w-6">
                      <CheckIcon />
                    </span>
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 md:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
