import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/contact",
    title: "Contact Us | AVCONEXPO",
    description:
      "Get in touch with AVCONEXPO for engineering, EPC, architecture, supply-chain, and business consultancy solutions worldwide.",
    imageUrl: "/slider3.jpg",
  });
}

export default function ContactPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/slider4.jpg"
            alt="Contact AVCONEXPO"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Contact Us</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Contact Us</span>
            </nav>
          </div>
        </section>
      </div>

      <ContactSection />
      <Footer />
      <FloatingActions />
    </>
  );
}
