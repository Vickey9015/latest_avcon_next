import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { servicePages } from "@/lib/service-pages";

const page = servicePages.businessTechnical;
const processBlocks = page.sections[0]?.blocks ?? [];
const integrationBlocks = page.sections[1]?.blocks ?? [];

function CheckIcon() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-[#f0571f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BusinessTechnicalConsultingPhpPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/bg/videoBg4_1.jpg"
            alt="Business and Technical Consultancy breadcrumb"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Business & Technical Consultancy
            </h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Business & Technical Consultancy</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-orange-100">
            <div className="relative aspect-[16/7] min-h-[280px]">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>

            <div className="space-y-10 p-5 sm:p-8 lg:p-10">
              <div>
                <div className="rounded-[24px] bg-gradient-to-r from-[#f0571f] to-[#faa419] p-5 text-white shadow-xl">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/85">Service Detail</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-white">Business and Technical Consultancy</h2>
                </div>
                <div className="mt-5 space-y-4 text-justify leading-7 text-[#4b5563]">
                  {page.introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <h3 className="mt-5 inline-flex rounded-full bg-orange-50 px-5 py-2 text-lg font-extrabold text-[#f0571f] ring-1 ring-orange-100">
                  We are Your Industrial Think Tank!
                </h3>
              </div>

              <div>
                <h3 className="inline-flex rounded-2xl bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-3 text-2xl font-extrabold text-white shadow-lg">
                  Our Process/ Approach:
                </h3>
                <div className="mt-6 space-y-5">
                  {processBlocks.map((block, index) => (
                    <article
                      key={block.title}
                      className="rounded-[20px] border border-orange-100 bg-gradient-to-br from-white to-orange-50/55 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#f0571f]/50 hover:shadow-lg"
                    >
                      <h4 className="flex items-center gap-3 text-lg font-extrabold text-[#273339]">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] text-sm text-white shadow">
                          {index + 1}
                        </span>
                        {block.title}
                      </h4>
                      {block.description ? (
                        <p className="mt-2 text-justify leading-7 text-[#4b5563]">{block.description}</p>
                      ) : null}
                      {block.items?.length ? (
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-[#4b5563]">
                              <CheckIcon />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f7f7] py-14 lg:py-16">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f0571f]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[26px] bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-6 text-white shadow-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">Complete Factory Setup</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">Integration</h2>
          </div>
          <div className="space-y-5">
            {integrationBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-[22px] border border-orange-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#f0571f]/50 hover:shadow-xl"
              >
                <h3 className="inline-flex rounded-xl bg-orange-50 px-4 py-2 text-xl font-extrabold text-[#f0571f] ring-1 ring-orange-100">
                  {block.title}
                </h3>
                {block.items?.length ? (
                  <ul className="mt-4 grid gap-3 lg:grid-cols-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#4b5563]">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
            <article className="rounded-[22px] border border-orange-100 bg-white p-6 text-justify leading-7 text-[#4b5563] shadow-sm">
              At Avconexpo, we specialise in assisting in establishing industries and industrial parks, from the
              initial concept to a fully operational plant. Whether it&apos;s a Greenfield or Brownfield project, we
              bring deep expertise, proven processes, and the right people to make it happen.
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
