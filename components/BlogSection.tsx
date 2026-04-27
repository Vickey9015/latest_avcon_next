import Image from "next/image";
import { HoverTiltCard3D } from "@/components/motion";
import { SITE } from "@/lib/site";

const posts = [
  {
    title: "Sustainable Energy Solutions for 2026",
    href: `${SITE}/blog/sustainable-energy-solutions-2026`,
    image: "/slider1.jpg",
  },
  {
    title: "Business Technical Consultants in Kenya—Why Avconexpo Is Your Growth Partner",
    href: `${SITE}/blog/business-technical-consultants-kenya`,
    image: "/slider2.jpg",
  },
  {
    title: "Industrial Plant Setup & Consultancy in Africa | Avconexpo",
    href: `${SITE}/blog/industrial-plant-setup-consultancy-africa`,
    image: "/slider3.jpg",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#ff8c00]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8c00]/15">
                <svg className="h-4 w-4 text-[#ff8c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </span>
              Our Blog
            </p>
            <h2 id="blog-heading" className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">
              Our Latest Blog
            </h2>
          </div>
          <a
            href={`${SITE}/blogs.php`}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ff8c00] px-6 py-3 font-semibold text-white shadow-md hover:bg-[#e67e00]"
          >
            Read More
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
          {posts.map((p) => (
            <HoverTiltCard3D key={p.href} className="h-full min-w-0" maxTilt={8}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-1 hover:shadow-xl">
              <a href={p.href} className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
              </a>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-5 flex-1 text-lg font-extrabold leading-snug text-[#1a1a1a]">{p.title}</h3>
                <a
                  href={p.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#ff8c00] hover:text-[#e67e00]"
                >
                  Read more
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
            </HoverTiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
