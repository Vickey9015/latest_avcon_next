import Image from "next/image";
import Link from "next/link";
import { HoverTiltCard3D } from "@/components/motion";
import type { Blog } from "@/lib/blog-types";
import { blogHref } from "@/lib/blog-types";

type BlogSectionProps = {
  posts: Blog[];
};

export default function BlogSection({ posts }: BlogSectionProps) {
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
          <Link
            href="/blogs"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ff8c00] px-6 py-3 font-semibold text-white shadow-md hover:bg-[#e67e00]"
          >
            Read More
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No blog posts available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
            {posts.map((post) => {
              const href = blogHref(post);
              return (
                <HoverTiltCard3D key={post.id} className="h-full min-w-0" maxTilt={8}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-1 hover:shadow-xl">
                    <Link href={href} className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-5 flex-1 text-lg font-extrabold leading-snug text-[#1a1a1a]">{post.title}</h3>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#ff8c00] hover:text-[#e67e00]"
                      >
                        Read more
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </HoverTiltCard3D>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
