import type { Metadata } from "next";
import Image from "next/image";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import IndustrialEquipmentCatalog from "@/components/industrial/IndustrialEquipmentCatalog";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/industrial-equipment-supplier",
    title: "Industrial Equipment & Spare Parts Supplier | AVCONEXPO",
    description:
      "Looking for a reliable industrial equipment supplier? AVCONEXPO supplies industrial spare parts, electrical equipment, and plant components globally.",
    imageUrl: "/equipments-spares/hero-compressors.png",
  });
}

export default function IndustrialEquipmentSupplierPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[32vh] overflow-hidden sm:min-h-[42vh] lg:min-h-[48vh]">
          <Image
            src="/equipments-spares/hero-compressors.png"
            alt="Industrial equipment and spare parts supplier"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101827]/92 via-[#101827]/78 to-[#101827]/45" />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[32vh] w-full max-w-7xl flex-col justify-end px-4 pb-6 pt-28 sm:min-h-[42vh] sm:px-6 sm:pb-10 sm:pt-32 lg:min-h-[48vh] lg:px-8">
            <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#faa419] sm:mb-2 sm:text-sm sm:tracking-[0.2em]">
              Industrial Equipment Supplier
            </p>
            <p className="max-w-3xl text-base font-semibold leading-snug text-white/90 sm:text-lg sm:leading-normal lg:text-xl">
              Electrical equipment, plant components, and critical spare parts for factories worldwide.
            </p>
          </div>
        </section>
      </div>

      <IndustrialEquipmentCatalog />
      <Footer />
      <FloatingActions />
    </>
  );
}
