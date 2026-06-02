import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { formatJobDate, getActiveJobs } from "@/lib/jobs";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/career",
    title: "Career | AVCONEXPO",
    description:
      "Explore careers at AVCONEXPO and apply for Business Development Executive and future engineering roles.",
    imageUrl: "/service-details/talent-management-services.jpg",
  });
}

export const dynamic = "force-dynamic";

type CareerPageProps = {
  searchParams: Promise<{ job?: string }>;
};

export default async function CareerPage({ searchParams }: CareerPageProps) {
  const { job: jobParam } = await searchParams;
  const jobs = await getActiveJobs();
  const jobOptions = jobs.map((job) => ({ id: job.id, title: job.title }));
  const defaultJobId = jobParam ? Number(jobParam) : null;

  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/service-details/talent-management-services.jpg"
            alt="Career hero backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Career</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Career</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f0571f]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            <p className="rounded-2xl border border-orange-100 bg-orange-50/50 p-8 text-center text-gray-600">
              No open positions at the moment. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-[24px] border border-orange-100 bg-gradient-to-br from-white to-orange-50/45 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-xl"
                >
                  <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[#f37021] ring-1 ring-orange-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                      />
                    </svg>
                    {formatJobDate(job.publishDate)}
                  </p>
                  <h2 className="mt-4 text-2xl font-extrabold text-[#1a1a1a]">{job.title}</h2>
                  {(job.location || job.department || job.jobType) && (
                    <p className="mt-2 text-sm font-semibold text-[#f37021]">
                      {[job.department, job.location, job.jobType].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {job.experience ? (
                    <p className="mt-1 text-xs font-medium text-gray-500">Experience: {job.experience}</p>
                  ) : null}
                  <p className="mt-4 text-sm leading-6 text-[#4b5563]">
                    {job.shortDescription} <span className="font-bold text-[#f0571f]">View More</span>
                  </p>
                  <details className="group mt-4">
                    <summary className="cursor-pointer list-none text-sm font-extrabold text-[#f0571f]">
                      Full Description <span className="transition group-open:hidden">+</span>
                      <span className="hidden group-open:inline">-</span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-[#4b5563]">{job.fullDescription}</p>
                  </details>
                  <a
                    href={`/career?job=${job.id}#apply`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  >
                    Apply Now
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="apply" className="relative overflow-hidden bg-[#f7f7f7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[34px] bg-white px-6 py-10 shadow-xl ring-1 ring-orange-100 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#f37021]">
                  <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
                  Avconexpo
                </p>
                <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">Apply For Job</h2>
              </div>
              <p className="leading-7 text-[#4b5563]">
                We&apos;re working to find new and better ways to help businesses succeed, and we&apos;re
                looking for people like you to help shape tomorrow at AVCONEXPO.
              </p>
            </div>
          </div>

          <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]" data-reveal-group>
            <CareerApplicationForm
              jobs={jobOptions}
              defaultJobId={Number.isInteger(defaultJobId) && defaultJobId! > 0 ? defaultJobId : null}
            />

            <div className="flex h-full flex-col gap-5">
              <div className="relative h-[240px] overflow-hidden rounded-[28px] bg-zinc-200 shadow-2xl ring-1 ring-orange-100 sm:h-[280px] lg:h-[300px]">
                <Image src="/contact_img.jpg" alt="Contact AVCONEXPO" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[#f0571f]">Career Support</p>
                  <p className="mt-1 text-sm font-bold text-[#273339]">Lucknow, India</p>
                </div>
              </div>
              <div className="flex-1 rounded-[28px] border border-orange-100 bg-white p-6 shadow-2xl">
                <h3 className="mb-4 text-2xl font-extrabold text-[#1a1a1a]">Contact Info</h3>
                <address className="space-y-4 not-italic text-[#4b5563]">
                  <div className="flex gap-3 rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </span>
                    <p className="font-semibold text-[#273339]">
                      1/6/55, Sector J, Pocket 6,
                      <br />
                      Sushant Golf City, Lucknow - 226030, UP, India
                    </p>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l2 5-2 1a12 12 0 005 5l1-2 5 2v3a2 2 0 01-2 2h-1C9.925 19 5 14.075 5 8V7a2 2 0 00-2-2z" />
                      </svg>
                    </span>
                    <p className="font-semibold text-[#273339]">
                      <a href="tel:+917007729873" className="hover:text-[#f37021]">
                        +91-7007729873
                      </a>
                      <br />
                      <a href="tel:+917860563231" className="hover:text-[#f37021]">
                        +91-7860563231
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <p className="font-semibold text-[#273339]">
                      <a href="mailto:solutions@avconexpo.com" className="hover:text-[#f37021]">
                        solutions@avconexpo.com
                      </a>
                    </p>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
