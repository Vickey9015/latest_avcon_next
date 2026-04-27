import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

type DetailBlock = {
  title: string;
  description?: string;
  items?: string[];
};

type DetailSection = {
  eyebrow?: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  blocks?: DetailBlock[];
  comparison?: {
    leftTitle: string;
    rightTitle: string;
    rows: [string, string][];
  };
  oemPartners?: string[];
};

export type ServiceDetailTemplateProps = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  introTitle: string;
  introParagraphs: string[];
  highlight?: string;
  sections: DetailSection[];
  closingTitle?: string;
  closingText?: string;
  ctaLabel?: string;
};

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#f0571f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ServiceDetailTemplate({
  title,
  subtitle,
  image,
  imageAlt,
  introTitle,
  introParagraphs,
  highlight,
  sections,
  closingTitle = "Serving Clients Worldwide",
  closingText,
  ctaLabel = "Start Your Project",
}: ServiceDetailTemplateProps) {
  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/bg/videoBg4_1.jpg" alt={`${title} breadcrumb`} fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/85">{subtitle}</p>
            <nav className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/75" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="transition-colors hover:text-white">
                Services
              </Link>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-orange-100">
            <div className="relative aspect-[16/7] min-h-[280px]">
              <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1200px" />
            </div>

            <div className="space-y-10 p-5 sm:p-8 lg:p-10">
              <div>
                <div className="rounded-[24px] bg-gradient-to-r from-[#f0571f] to-[#faa419] p-5 text-white shadow-xl">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/85">Service Detail</p>
                  <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white">{introTitle}</h2>
                </div>
                <div className="mt-5 space-y-4 text-justify leading-7 text-[#4b5563]">
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {highlight ? (
                  <h3 className="mt-5 inline-flex rounded-full bg-orange-50 px-5 py-2 text-lg font-extrabold text-[#f0571f] ring-1 ring-orange-100">
                    {highlight}
                  </h3>
                ) : null}
              </div>

              {sections.map((section) => (
                <div key={section.title}>
                  <div className="rounded-[24px] bg-gradient-to-r from-[#f0571f] to-[#faa419] p-5 text-white shadow-lg">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">
                      {section.eyebrow ?? "Details"}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold text-white">{section.title}</h3>
                  </div>
                  {section.description ? (
                    <p className="mt-5 text-justify leading-7 text-[#4b5563]">{section.description}</p>
                  ) : null}
                  {section.paragraphs?.length ? (
                    <div className="mt-5 space-y-4 text-justify leading-7 text-[#4b5563]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {section.image ? (
                    <div className="mt-6 overflow-hidden rounded-[24px] shadow-xl ring-1 ring-orange-100">
                      <Image
                        src={section.image}
                        alt={section.imageAlt ?? section.title}
                        width={1200}
                        height={620}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ) : null}
                  {section.comparison ? (
                    <div className="mt-6 overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-xl">
                      <div className="grid bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white sm:grid-cols-2">
                        <div className="p-4 text-center font-extrabold">{section.comparison.leftTitle}</div>
                        <div className="border-t border-white/25 p-4 text-center font-extrabold sm:border-l sm:border-t-0">
                          {section.comparison.rightTitle}
                        </div>
                      </div>
                      {section.comparison.rows.map(([left, right]) => (
                        <div key={`${left}-${right}`} className="grid border-t border-orange-100 sm:grid-cols-2">
                          <div className="p-4 text-sm leading-6 text-[#4b5563]">{left}</div>
                          <div className="border-t border-orange-100 p-4 text-sm font-semibold leading-6 text-[#273339] sm:border-l sm:border-t-0">
                            {right}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {section.blocks?.length ? (
                    <div className="mt-6 space-y-5">
                      {section.blocks.map((block, index) => (
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
                  ) : null}
                  {section.oemPartners?.length ? (
                    <div className="mt-6 rounded-[24px] border border-orange-100 bg-white p-6 shadow-sm">
                      <div className="flex flex-wrap gap-3">
                        {section.oemPartners.map((partner) => (
                          <span
                            key={partner}
                            className="rounded-full bg-gradient-to-r from-orange-50 to-white px-5 py-2 text-sm font-bold text-[#f0571f] ring-1 ring-orange-100"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f7f7] py-14 lg:py-16">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f0571f]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[26px] bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-7 text-center text-white shadow-xl">
            <h2 className="text-3xl font-extrabold md:text-4xl">{closingTitle}</h2>
            {closingText ? <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/90">{closingText}</p> : null}
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#f0571f] shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              {ctaLabel}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
