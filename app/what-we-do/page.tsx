import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/what-we-do",
    title: "What We Do | AVCONEXPO",
    description:
      "Discover AVCONEXPO tailored solutions, process optimisation, execution support, and cross-functional delivery model.",
    imageUrl: "/bg/breadcrumb.jpg",
  });
}

const industries = [
  "Plastic factory",
  "Power substations, electrical",
  "Refinery",
  "Fractionation",
  "Soap plant",
  "Tank farms",
  "Packaging factory",
  "Air, cold water, chilled water",
  "Water treatment, ETP",
  "Sizing of utilities, piping's electrical etc.",
  "Industrial and heavy equipment",
  "Manufacturing plant set up Solutions",
  "Packaging Industries",
  "Mining",
];

const processBlocks = [
  {
    title: "Consultants & Associate",
    text: "Our consultant and associates analyze the clients requirements and create tailored solutions.",
  },
  {
    title: "Engineers & Professionals",
    text: "Our team of engineers and professionals uses the latest technologies to develop and implement those solutions.",
  },
  {
    title: "Support System & Coordinators",
    text: "Our support system and coordinators ensure timely delivery and project success.",
  },
  {
    title: "Vendors & OEMs",
    text: "We partner with top vendors and collaborate with the best OEMs to deliver innovative and scalable solutions.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/bg/breadcrumb.jpg"
            alt="What we do hero backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">What we do</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">What we do</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8">
          <div className="relative min-h-[430px]">
            <div className="absolute left-0 top-0 h-[330px] w-[78%] overflow-hidden rounded-[32px] shadow-2xl ring-1 ring-orange-100 sm:h-[390px]">
              <Image
                src="/what-we-do/tailored-made-solutions_2.jpg"
                alt="Tailored-made solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 78vw, 38vw"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-60 w-[58%] overflow-hidden rounded-[28px] border-8 border-white shadow-2xl sm:h-72">
              <Image
                src="/what-we-do/tailored-made-solutions.jpg"
                alt="AVCONEXPO tailored industrial solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 58vw, 28vw"
              />
            </div>
            <div className="absolute right-4 top-7 rounded-2xl bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-6 text-center text-white shadow-xl">
              <p className="text-4xl font-extrabold leading-none">20+</p>
              <p className="mt-1 max-w-24 text-xs font-bold uppercase tracking-wide">Years Of Experience</p>
            </div>
          </div>

          <div className="relative rounded-[32px] border border-orange-100 bg-orange-50/45 p-5 shadow-2xl sm:p-7 lg:p-8">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">
              <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
              What We Do
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-[#1a1a1a] sm:text-4xl">
              Tailored-made solutions
            </h2>
            <div className="mt-5 space-y-4 text-justify leading-7 text-[#444]">
              <p>
                No two businesses are the same and therefore come with their own set of challenges.
                We pride ourselves in offering you the best solution for your business through a team
                of experienced professionals who work proactively and with the client&apos;s best interests
                in mind to deliver the desired outcome.
              </p>
              <p>
                We deliver our services and solutions to a diversified base of over 21 customers across
                multiple industries.
              </p>
            </div>

            <ul className="mt-6 grid gap-2 text-sm font-semibold text-[#273339] sm:grid-cols-2">
              {industries.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-orange-100">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#f37021]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f7f7] py-14 sm:py-16">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f37021]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">
                <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
                Process Optimisation
              </p>
              <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">
                A delivery model built around the right people
              </h2>

              <div className="mt-7 grid gap-4">
                {processBlocks.map((block, index) => (
                  <article
                    key={block.title}
                    className="group flex gap-4 rounded-[22px] border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#273339] text-sm font-extrabold text-white shadow-md group-hover:bg-[#f0571f]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1a1a1a]">{block.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#4b5563]">{block.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl ring-1 ring-orange-100">
                <Image
                  src="/core-feature/coreFeatureThumb2_1.jpg"
                  alt="Process optimisation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/45 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-9 left-5 right-5 rounded-[22px] bg-white p-5 shadow-2xl ring-1 ring-orange-100">
                <p className="font-extrabold text-[#f0571f]">Execution Support</p>
                <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                  Our execution support entails ongoing surveillance, performance reporting, and real-time
                  tuning for optimal process effectiveness and lasting achievement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm lg:p-8">
            <p className="text-justify leading-7 text-[#444]">
              Our process experts guarantee that every process is optimized for maximum efficiency and
              minimum conversion costs. They are able to share their knowledge of how to optimize the
              setup to an almost scientific degree. It doesn&apos;t end at finding the solutions; we make
              sure that all the processes are done to the best of our ability from the conceptual stage
              to the execution.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
