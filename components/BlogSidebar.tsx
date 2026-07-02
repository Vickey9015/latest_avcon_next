import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/blog-types";
import { blogHref, formatBlogDate, parseBlogTags } from "@/lib/blog-types";

type BlogSidebarProps = {
  posts: Blog[];
  currentPostId?: number;
  currentTags?: string;
};

export default function BlogSidebar({ posts, currentPostId, currentTags }: BlogSidebarProps) {
  const recentPosts = posts.filter((post) => post.id !== currentPostId).slice(0, 5);
  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort();
  const tagList = parseBlogTags(currentTags || "");

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-4">
          <h2 className="text-lg font-extrabold text-white">Recent Posts</h2>
        </div>
        <ul className="divide-y divide-orange-50 p-2">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blogs/${post.slug}`}
                className="flex gap-3 rounded-xl p-3 transition hover:bg-orange-50/60"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#f0571f]">
                    {formatBlogDate(post.publishDate)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-extrabold leading-snug text-[#1a1a1a]">{post.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {categories.length > 0 ? (
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#1a1a1a]">Categories</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category}>
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#f0571f] ring-1 ring-orange-100">
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {tagList.length > 0 ? (
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#1a1a1a]">Tags</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-[#444]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-[#101827] text-white shadow-lg">
        <div className="relative h-36">
          <Image src="/contact_img.jpg" alt="Contact AVCONEXPO" fill className="object-cover opacity-60" sizes="320px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/40 to-transparent" />
        </div>
        <div className="p-5">
          <h2 className="text-lg font-extrabold">Need Expert Help?</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Talk to our engineering and consultancy team about your project requirements.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#f0571f] to-[#faa419] px-4 py-2.5 text-sm font-extrabold text-white transition hover:brightness-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </aside>
  );
}
