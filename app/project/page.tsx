import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Projects | AVCONEXPO",
  description:
    "Explore AVCONEXPO's latest industrial and EPC projects including sustainable energy, water bottling, and milk processing facilities.",
};

const projects = [
  {
    title: "Sustainable Energy Facility",
    image: "/slider2.jpg",
    text: "Avconexpo proudly establishes a state-of-the-art sustainable industrial facility dedicated to producing clean energy and materials through advanced technology and eco-friendly practices. This project supports local infrastructure, economic growth, and a resilient industrial ecosystem.",
    tag: "Clean Energy",
  },
  {
    title: "Water Bottling Plant",
    image: "/sectors/utilities.jpg",
    text: "AVCONEXPO successfully installed a state-of-the-art water bottling line in Rwanda, delivering clean and efficiently packaged drinking water. The turnkey setup includes automated purification, filling, and packaging systems for hygiene, reliability, and cost efficiency.",
    tag: "Turnkey Plant",
  },
  {
    title: "Milk processing plant",
    image: "/sectors/Agro_Processing.jpg",
    text: "A milk processing plant transforms fresh raw milk into safe, high-quality dairy products through intake, testing, clarification, pasteurization, homogenization, and hygienic packaging. The setup ensures product consistency while preserving nutritional quality.",
    tag: "Agro Processing",
  },
];

export default function ProjectPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/assets/docs/img/real_four.jpeg"
            alt="Projects hero backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Projects</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Projects</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-[#f7f7f7] py-16 sm:py-20">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f0571f]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-5xl rounded-[30px] bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-8 text-center text-white shadow-xl">
            <p className="mb-2 inline-flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wide">
              <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
              Projects
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Latest Projects</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#f0571f] shadow">
                    {project.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col border-t-4 border-[#f0571f] bg-gradient-to-br from-white to-orange-50/45 p-6">
                  <h3 className="text-xl font-extrabold text-[#1a1a1a]">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#4b5563]">{project.text}</p>
                  <details className="group/details mt-5">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-extrabold text-[#f0571f] transition-colors hover:text-[#d94818]">
                      See More
                      <svg className="h-4 w-4 transition group-open/details:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </summary>
                    <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-4 text-sm leading-6 text-[#4b5563] shadow-sm">
                      <p className="font-bold text-[#273339]">Project Details</p>
                      <p className="mt-2">{project.text}</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[26px] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#f37021]">Project Details</p>
            <h3 className="mt-2 text-xl font-extrabold text-[#1a1a1a]">More case studies coming soon</h3>
            <p className="mt-2 leading-7 text-[#4b5563]">
              We are continuously adding project snapshots and technical highlights from diverse sectors.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
