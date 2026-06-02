import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import { getActiveBanners } from "@/lib/banners";
import { getPublishedBlogs } from "@/lib/blogs";
import { getActiveTestimonials } from "@/lib/testimonials";
import BlogSection from "@/components/BlogSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import SectionEnter from "@/components/SectionEnter";
import Navbar from "@/components/Navbar";
import ParallaxDivider from "@/components/ParallaxDivider";
import VideoSection from "@/components/VideoSection";
import SectorsSection from "@/components/SectorsSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/",
    title: "AVCONEXPO | Global Engineering, EPC & Sourcing Solutions",
    description:
      "Engineering-Technology, Supply-Chain Management, Architecture-Design, EPC, and industrial solutions — concept to consumer, scratch to shelf.",
    imageUrl: "/slider2.jpg",
  });
}

export default async function Home() {
  const [banners, blogPosts, testimonials] = await Promise.all([
    getActiveBanners(),
    getPublishedBlogs(3),
    getActiveTestimonials(),
  ]);

  return (
    <main className="overflow-x-clip pb-[4.75rem] md:pb-0">
      <TopBar />
      <div className="relative">
        <HeroCarousel slides={banners} />
        <Navbar />
      </div>
      <SectionEnter variant="fade-up">
        <AboutSection />
      </SectionEnter>
      <SectionEnter variant="fade-up">
        <ServicesSection />
      </SectionEnter>
      <ParallaxDivider />
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
        <TestimonialsSection testimonials={testimonials} />
      </SectionEnter>
      <SectionEnter variant="fade">
        <VideoSection />
      </SectionEnter>
      <SectionEnter variant="fade">
        <BlogSection posts={blogPosts} />
      </SectionEnter>
      <SectionEnter variant="scale">
        <ContactSection />
      </SectionEnter>
      <Footer />
      <FloatingActions />
    </main>
  );
}
