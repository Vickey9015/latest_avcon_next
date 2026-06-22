import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { aboutNavLinks, primaryNavLinks, servicesNavLinks } from "@/lib/nav-links";
import { blogHref, getPublishedBlogs } from "@/lib/blogs";

function toAbsoluteUrl(pathname: string): string {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) return pathname;
  if (!pathname.startsWith("/")) return `${SITE}/${pathname}`;
  return `${SITE}${pathname}`;
}

const countryLandingPaths = [
  "/egypt/",
  "/kenya/",
  "/niger/",
  "/nigeria/",
  "/guinea/",
  "/ghana/",
  "/sierra-leone/",
  "/burundi/",
  "/rwanda/",
  "/tanzania/",
  "/ethiopia/",
  "/uganda/",
  "/qatar/en/",
  "/qatar/ar/",
  "/bahrain/en/",
  "/bahrain/ar/",
  "/uae/en/",
  "/uae/ar/",
  "/oman/en/",
  "/oman/ar/",
  "/kuwait/en/",
  "/kuwait/ar/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/services",
    "/equipments-spares",
    "/privacy-policy",
    "/terms-and-conditions",
    "/business-technical-consulting",
    ...aboutNavLinks.map((l) => l.href),
    ...servicesNavLinks.map((l) => l.href),
    ...primaryNavLinks.map((l) => l.href),
    ...countryLandingPaths,
  ];

  const uniqueStaticPaths = Array.from(new Set(staticPaths));

  const staticEntries: MetadataRoute.Sitemap = uniqueStaticPaths.map((pathname) => ({
    url: toAbsoluteUrl(pathname),
    changeFrequency: pathname === "/" ? "daily" : "weekly",
    priority: pathname === "/" ? 1 : countryLandingPaths.includes(pathname) ? 0.9 : 0.8,
  }));

  // Add published blog posts from DB
  const posts = await getPublishedBlogs(200);
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: toAbsoluteUrl(blogHref(post)),
    changeFrequency: "weekly",
    priority: 0.6,
    lastModified: post.publishDate,
  }));

  return [...staticEntries, ...blogEntries];
}
