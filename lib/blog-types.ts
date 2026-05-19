export type BlogStatus = "Published" | "Draft";

export interface Blog {
  id: number;
  title: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  linkUrl: string;
  status: BlogStatus;
  publishDate: string;
  order: number;
}

export interface BlogInput {
  title: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  linkUrl: string;
  status: BlogStatus;
  publishDate: string;
  order: number;
}

export function formatBlogDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function blogHref(blog: Pick<Blog, "slug" | "linkUrl">): string {
  const external = blog.linkUrl?.trim();
  if (external && external !== "#" && !external.startsWith("/blogs/")) {
    return external;
  }
  if (blog.slug) {
    return `/blogs/${blog.slug}`;
  }
  return "#";
}

export function blogExcerpt(blog: Pick<Blog, "excerpt" | "content">, maxLength = 160): string {
  const excerpt = blog.excerpt?.trim();
  if (excerpt) {
    return excerpt;
  }

  const content = blog.content?.trim().replace(/\s+/g, " ");
  if (!content) {
    return "";
  }

  if (content.length <= maxLength) {
    return content;
  }

  return `${content.slice(0, maxLength).trimEnd()}…`;
}

export function parseBlogTags(tags: string): string[] {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
