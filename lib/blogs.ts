import "server-only";

import type { Blog, BlogInput, BlogStatus } from "@/lib/blog-types";
import { blogHref } from "@/lib/blog-types";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type { Blog, BlogInput, BlogStatus } from "@/lib/blog-types";
export { blogHref, blogExcerpt, formatBlogDate, parseBlogTags } from "@/lib/blog-types";

interface BlogRow {
  id: number;
  title: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  tags: string | null;
  link_url: string;
  status: BlogStatus;
  publish_date: Date | string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const BLOG_SELECT = `
  id, title, image, author, category, slug, excerpt, content, tags,
  link_url, status, publish_date, sort_order, created_at, updated_at
`;

const DEFAULT_EXCERPT =
  "Explore how AVCONEXPO delivers engineering excellence, sustainable solutions, and strategic consulting for industrial growth.";

const DEFAULT_CONTENT = `AVCONEXPO continues to support organizations with end-to-end engineering, consulting, and project execution capabilities.

Our teams combine technical expertise with practical field experience to help clients plan, build, and optimize complex industrial operations.

From feasibility studies to commissioning and long-term operations support, we focus on measurable outcomes, safety, and sustainable growth.

Contact our team to discuss how we can support your next initiative.`;

const DEFAULT_BLOGS: BlogInput[] = [
  {
    title: "Sustainable Energy Solutions for 2026",
    image: "/slider2.jpg",
    author: "AVCONEXPO Team",
    category: "Sustainability",
    slug: "sustainable-energy-solutions-for-2026",
    excerpt: "How modern industrial operators are adopting cleaner energy strategies for long-term efficiency.",
    content: `${DEFAULT_CONTENT}\n\nIn 2026, energy planning is no longer optional for industrial leaders. Facilities are evaluating hybrid systems, optimized load management, and lifecycle cost models before major capital decisions.`,
    tags: "Energy, Sustainability, Industry",
    linkUrl: "#",
    status: "Published",
    publishDate: "2026-01-19",
    order: 1,
  },
  {
    title: "Business Technical Consultants in Kenya—Why Avconexpo Is Your Growth Partner",
    image: "/service-details/business-technical-consultancy.jpg",
    author: "AVCONEXPO Team",
    category: "Consulting",
    slug: "business-technical-consultants-kenya",
    excerpt: "Why businesses in Kenya rely on AVCONEXPO for technical consulting and execution support.",
    content: `${DEFAULT_CONTENT}\n\nKenya's industrial landscape is evolving quickly. Organizations need partners who understand local requirements while applying global engineering standards.`,
    tags: "Consulting, Kenya, Business",
    linkUrl: "#",
    status: "Published",
    publishDate: "2025-05-29",
    order: 2,
  },
  {
    title: "Industrial Plant Setup & Consultancy in Africa | Avconexpo",
    image: "/services/industrial_consultancy_machinery.png",
    author: "AVCONEXPO Team",
    category: "Industry News",
    slug: "industrial-plant-setup-consultancy-africa",
    excerpt: "Key considerations for greenfield and brownfield plant setup across African markets.",
    content: `${DEFAULT_CONTENT}\n\nSuccessful plant setup requires integrated planning across process design, procurement, construction, and commissioning milestones.`,
    tags: "Plant Setup, Africa, Engineering",
    linkUrl: "#",
    status: "Published",
    publishDate: "2025-05-21",
    order: 3,
  },
  {
    title: "Industrial Trends 2024",
    image: "/slider1.jpg",
    author: "John Smith",
    category: "Industry News",
    slug: "industrial-trends-2024",
    excerpt: DEFAULT_EXCERPT,
    content: DEFAULT_CONTENT,
    tags: "Industry News, Trends",
    linkUrl: "#",
    status: "Published",
    publishDate: "2024-01-15",
    order: 4,
  },
  {
    title: "Future of Industry 4.0",
    image: "/slider3.jpg",
    author: "David Brown",
    category: "Technology",
    slug: "future-of-industry-4-0",
    excerpt: "A look at automation, data-driven operations, and smart manufacturing adoption.",
    content: DEFAULT_CONTENT,
    tags: "Industry 4.0, Technology",
    linkUrl: "#",
    status: "Draft",
    publishDate: "2024-01-01",
    order: 5,
  },
];

async function addBlogColumn(sql: string) {
  try {
    await execute(sql);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }
}

function toDateString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function mapBlog(row: BlogRow): Blog {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    author: row.author,
    category: row.category,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    tags: row.tags ?? "",
    linkUrl: row.link_url,
    status: row.status,
    publishDate: toDateString(row.publish_date),
    order: row.sort_order,
  };
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function ensureBlogsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      image VARCHAR(500) NOT NULL,
      author VARCHAR(255) NOT NULL DEFAULT '',
      category VARCHAR(120) NOT NULL DEFAULT '',
      slug VARCHAR(255) NOT NULL,
      excerpt TEXT NULL,
      content LONGTEXT NULL,
      tags VARCHAR(500) NOT NULL DEFAULT '',
      link_url VARCHAR(500) NOT NULL DEFAULT '#',
      status ENUM('Published', 'Draft') DEFAULT 'Draft',
      publish_date DATE NOT NULL,
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_blogs_slug (slug),
      INDEX idx_blogs_status (status),
      INDEX idx_blogs_sort_order (sort_order),
      INDEX idx_blogs_publish_date (publish_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await addBlogColumn("ALTER TABLE blogs ADD COLUMN excerpt TEXT NULL");
  await addBlogColumn("ALTER TABLE blogs ADD COLUMN content LONGTEXT NULL");
  await addBlogColumn("ALTER TABLE blogs ADD COLUMN tags VARCHAR(500) NOT NULL DEFAULT ''");

  await execute(
    `UPDATE blogs SET excerpt = ? WHERE excerpt IS NULL OR TRIM(excerpt) = ''`,
    [DEFAULT_EXCERPT],
  );
  await execute(
    `UPDATE blogs SET content = ? WHERE content IS NULL OR TRIM(content) = ''`,
    [DEFAULT_CONTENT],
  );
}

async function dedupeBlogs() {
  await execute(`
    DELETE t1 FROM blogs t1
    INNER JOIN blogs t2
      ON t1.slug = t2.slug
      AND t1.id > t2.id
  `);
}

async function seedDefaultBlogs() {
  const existing = await query<{ count: number }>("SELECT COUNT(*) AS count FROM blogs");
  if (parseCount(existing) > 0) {
    await dedupeBlogs();
    return;
  }

  if (!(await acquireSeedLock("blogs"))) {
    return;
  }

  const afterLock = await query<{ count: number }>("SELECT COUNT(*) AS count FROM blogs");
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const blog of DEFAULT_BLOGS) {
    await execute(
      `INSERT INTO blogs
        (title, image, author, category, slug, excerpt, content, tags, link_url, status, publish_date, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        blog.title,
        blog.image,
        blog.author,
        blog.category,
        blog.slug,
        blog.excerpt,
        blog.content,
        blog.tags,
        blog.linkUrl,
        blog.status,
        blog.publishDate,
        blog.order,
      ],
    );
  }
}

export async function getPublishedBlogs(limit?: number): Promise<Blog[]> {
  await ensureBlogsTable();
  await seedDefaultBlogs();
  await dedupeBlogs();

  const limitSql = limit && limit > 0 ? `LIMIT ${Math.floor(limit)}` : "";
  const rows = await query<BlogRow>(
    `SELECT ${BLOG_SELECT}
     FROM blogs
     WHERE status = 'Published'
     ORDER BY sort_order ASC, publish_date DESC, id ASC
     ${limitSql}`,
  );

  return rows.map(mapBlog);
}

export async function getPublishedBlogBySlug(slug: string): Promise<Blog | null> {
  await ensureBlogsTable();
  await seedDefaultBlogs();
  await dedupeBlogs();

  const normalized = slugifyTitle(slug);
  if (!normalized) {
    return null;
  }

  const rows = await query<BlogRow>(
    `SELECT ${BLOG_SELECT}
     FROM blogs
     WHERE slug = ? AND status = 'Published'
     LIMIT 1`,
    [normalized],
  );

  return rows[0] ? mapBlog(rows[0]) : null;
}

export async function getAllBlogs(): Promise<Blog[]> {
  await ensureBlogsTable();
  await seedDefaultBlogs();
  await dedupeBlogs();

  const rows = await query<BlogRow>(
    `SELECT ${BLOG_SELECT}
     FROM blogs
     ORDER BY sort_order ASC, publish_date DESC, id ASC`,
  );

  return rows.map(mapBlog);
}

export async function getBlogCount(): Promise<number> {
  await ensureBlogsTable();
  await seedDefaultBlogs();

  const result = await query<{ count: number }>("SELECT COUNT(*) AS count FROM blogs");
  return result[0]?.count ?? 0;
}

export async function createBlog(input: BlogInput): Promise<number> {
  await ensureBlogsTable();

  const result = await execute(
    `INSERT INTO blogs
      (title, image, author, category, slug, excerpt, content, tags, link_url, status, publish_date, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.image,
      input.author,
      input.category,
      input.slug,
      input.excerpt,
      input.content,
      input.tags,
      input.linkUrl,
      input.status,
      input.publishDate,
      input.order,
    ],
  );

  return result.insertId;
}

export async function updateBlog(id: number, input: BlogInput): Promise<boolean> {
  await ensureBlogsTable();

  const result = await execute(
    `UPDATE blogs
     SET title = ?, image = ?, author = ?, category = ?, slug = ?, excerpt = ?, content = ?, tags = ?,
         link_url = ?, status = ?, publish_date = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.title,
      input.image,
      input.author,
      input.category,
      input.slug,
      input.excerpt,
      input.content,
      input.tags,
      input.linkUrl,
      input.status,
      input.publishDate,
      input.order,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteBlog(id: number): Promise<boolean> {
  await ensureBlogsTable();

  const result = await execute("DELETE FROM blogs WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export function normalizeBlogInput(body: Record<string, unknown>): BlogInput | null {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const tags = typeof body.tags === "string" ? body.tags.trim() : "";
  const status: BlogStatus = body.status === "Draft" ? "Draft" : "Published";
  const order = Number(body.order ?? body.sort_order);

  let slug =
    (typeof body.slug === "string" ? body.slug.trim() : "") ||
    slugifyTitle(title);
  slug = slugifyTitle(slug);

  const linkUrl =
    (typeof body.linkUrl === "string" ? body.linkUrl.trim() : "") ||
    (typeof body.link_url === "string" ? body.link_url.trim() : "") ||
    (typeof body.href === "string" ? body.href.trim() : "") ||
    "#";

  let publishDate =
    (typeof body.publishDate === "string" ? body.publishDate.trim() : "") ||
    (typeof body.publish_date === "string" ? body.publish_date.trim() : "");

  if (!publishDate) {
    publishDate = new Date().toISOString().slice(0, 10);
  }

  if (!title || !image || !slug || !Number.isFinite(order) || order < 1) {
    return null;
  }

  return {
    title,
    image,
    author,
    category,
    slug,
    excerpt,
    content,
    tags,
    linkUrl: linkUrl || "#",
    status,
    publishDate,
    order: Math.floor(order),
  };
}
