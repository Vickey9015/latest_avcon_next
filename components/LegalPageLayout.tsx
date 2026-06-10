import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

type LegalPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
          <Image
            src="/slider2.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[42vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:min-h-[48vh] sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">{title}</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="bg-gradient-to-br from-white via-orange-50/20 to-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="space-y-6 text-sm leading-7 text-[#444] sm:text-base [&_a]:font-semibold [&_a]:text-[#f0571f] [&_a]:hover:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[#1a1a1a] [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_strong]:font-bold [&_strong]:text-[#1a1a1a] [&_ul]:space-y-2">
              {children}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
