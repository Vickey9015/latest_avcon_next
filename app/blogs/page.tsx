import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Blogs | AVCONEXPO",
  description:
    "Read AVCONEXPO blogs on sustainable energy, industrial consulting, and plant setup across global markets.",
};

const posts = [
  {
    title: "Sustainable Energy Solutions for 2026",
    date: "Jan 19, 2026",
    href: "#",
    image: "/slider2.jpg",
  },
  {
    title: "Business Technical Consultants in Kenya—Why Avconexpo Is Your Growth Partner",
    date: "May 29, 2025",
    href: "#",
    image: "/service-details/business-technical-consultancy.jpg",
  },
  {
    title: "Industrial Plant Setup & Consultancy in Africa | Avconexpo",
    date: "May 21, 2025",
    href: "#",
    image: "/services/industrial_consultancy_machinery.png",
  },
];

export default function BlogsPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/bg/heroBg3_3.jpg"
            alt="Blogs hero backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Blogs</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Blogs</span>
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
              Our Blog
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Latest Blog</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
            {posts.map((post) => (
              <article
                key={post.title}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                  <Link href={post.href} aria-label={post.title}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1280px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/55 via-transparent to-transparent" />
                  </Link>
                </div>
                <div className="flex flex-1 flex-col border-t-4 border-[#f0571f] bg-gradient-to-br from-white to-orange-50/45 p-6">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-[#f37021] ring-1 ring-orange-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                      />
                    </svg>
                    {post.date}
                  </p>
                  <h3 className="mt-4 flex-1 text-xl font-extrabold leading-snug text-[#1a1a1a]">
                    <Link href={post.href} className="transition hover:text-[#f0571f]">
                      {post.title}
                    </Link>
                  </h3>
                  <a
                    href={post.href}
                    className="mt-6 inline-flex items-center gap-2 font-extrabold text-[#f37021] transition-colors hover:text-[#d96516]"
                  >
                    Read more
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-3 text-sm font-extrabold text-white shadow-md"
            >
              1
            </button>
            <button
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-orange-100 bg-white px-3 text-sm font-extrabold text-[#1a1a1a] shadow-sm hover:border-[#f37021] hover:text-[#f37021]"
            >
              2
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
