import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticleContent from "@/components/BlogArticleContent";
import BlogSidebar from "@/components/BlogSidebar";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import PageFaqSection from "@/components/PageFaqSection";
import TopBar from "@/components/TopBar";
import { blogExcerpt, formatBlogDate, getPublishedBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { seoForRoute } from "@/lib/seo";
import {
  buildBlogPostingSchema,
  buildFaqSchema,
  buildWebPageSchema,
  faqItems,
} from "@/lib/structured-data";

export const dynamic = "force-dynamic";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found | AVCONEXPO" };
  }

  const description = blogExcerpt(post, 160) || post.title;

  return seoForRoute({
    pathname: `/blogs/${post.slug}`,
    title: `${post.title} | AVCONEXPO`,
    description,
    imageUrl: post.image,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogs();
  const relatedPosts = allPosts.filter((item) => item.id !== post.id).slice(0, 3);
  const pageFaqs = post.faqs.length > 0 ? post.faqs : [...faqItems];
  const pathname = `/blogs/${post.slug}`;
  const description = blogExcerpt(post, 160) || post.title;
  const webpageSchema = buildWebPageSchema({
    pathname,
    name: `${post.title} | AVCONEXPO`,
    description,
    imageUrl: post.image,
    datePublished: post.publishDate,
  });
  const blogPostingSchema = buildBlogPostingSchema({
    pathname,
    headline: post.title,
    description,
    imageUrl: post.image,
    author: post.author,
    datePublished: post.publishDate,
  });
  const faqSchema = buildFaqSchema(pageFaqs);

  return (
    <>
      <JsonLd data={webpageSchema} />
      <JsonLd data={blogPostingSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <TopBar />

      <div className="relative">
        <section className="relative min-h-[52vh] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/65" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[52vh] w-full max-w-7xl flex-col justify-end px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/blogs" className="hover:text-white">
                Blogs
              </Link>{" "}
              / <span className="text-white">{post.category || "Article"}</span>
            </nav>
            {post.category ? (
              <span className="mb-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25">
                {post.category}
              </span>
            ) : null}
            <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/90">
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                </svg>
                {formatBlogDate(post.publishDate)}
              </span>
              {post.author ? <span>By {post.author}</span> : null}
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[#f7f7f7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-xl">
                <div className="relative aspect-[16/9] w-full bg-zinc-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                </div>

                <div className="space-y-8 p-6 sm:p-10">
                  {post.excerpt ? (
                    <p className="text-lg font-semibold leading-8 text-[#1a1a1a]">{post.excerpt}</p>
                  ) : null}

                  <BlogArticleContent content={post.content} tags={post.tags} />

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-orange-100 pt-6">
                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 font-extrabold text-[#f37021] transition-colors hover:text-[#d96516]"
                    >
                      <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Back to all blogs
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <PageFaqSection
                  items={pageFaqs}
                  id="blog-faq"
                  className="rounded-[28px] border border-orange-100 bg-white py-8 shadow-xl sm:py-10"
                />
              </div>

              {relatedPosts.length > 0 ? (
                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-extrabold text-[#1a1a1a]">More from our blog</h2>
                  <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map((related) => (
                      <article
                        key={related.id}
                        className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Link href={`/blogs/${related.slug}`} className="relative block aspect-[16/10] bg-zinc-100">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </Link>
                        <div className="p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-[#f37021]">
                            {formatBlogDate(related.publishDate)}
                          </p>
                          <h3 className="mt-2 text-lg font-extrabold text-[#1a1a1a]">
                            <Link href={`/blogs/${related.slug}`} className="hover:text-[#f0571f]">
                              {related.title}
                            </Link>
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <BlogSidebar posts={allPosts} currentPostId={post.id} currentTags={post.tags} />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
