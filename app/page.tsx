import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import SectionEnter from "@/components/SectionEnter";
import Navbar from "@/components/Navbar";
import SectorsSection from "@/components/SectorsSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <HeroCarousel />
        <Navbar />
      </div>
      <SectionEnter variant="fade-up">
        <AboutSection />
      </SectionEnter>
      <SectionEnter variant="fade-up">
        <ServicesSection />
      </SectionEnter>
      <SectionEnter variant="fade-down">
        <StatsSection />
      </SectionEnter>
      <SectionEnter variant="fade-up">
        <SectorsSection />
      </SectionEnter>
      <SectionEnter variant="scale">
        <ClientsSection />
      </SectionEnter>
      <SectionEnter variant="fade-up">
        <TestimonialsSection />
      </SectionEnter>
      <SectionEnter variant="fade">
        <BlogSection />
      </SectionEnter>
      <SectionEnter variant="scale">
        <ContactSection />
      </SectionEnter>
      <Footer />
      <FloatingActions />
    </>
  );
}
