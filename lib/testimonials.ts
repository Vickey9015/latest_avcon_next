import "server-only";

import type {
  Testimonial,
  TestimonialInput,
  TestimonialStatus,
} from "@/lib/testimonial-types";
import { formatTestimonialRole } from "@/lib/testimonial-types";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type { Testimonial, TestimonialInput, TestimonialStatus } from "@/lib/testimonial-types";
export { formatTestimonialRole } from "@/lib/testimonial-types";

interface TestimonialRow {
  id: number;
  quote: string;
  client_name: string;
  image: string;
  company: string;
  designation: string;
  rating: number;
  status: TestimonialStatus;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const DEFAULT_TESTIMONIALS: TestimonialInput[] = [
  {
    quote:
      "AVCONEXPO exceeded our expectations with their turnkey project solutions. The team's technical expertise and attention to detail made our entire plant setup seamless and efficient.",
    name: "Phyllis Kerubo",
    image: "/phyllis.jpeg",
    company: "Manufacturing Unit",
    designation: "CEO",
    rating: 5,
    status: "Active",
    order: 1,
  },
  {
    quote:
      "Highly professional team with deep knowledge of industrial solutions. They delivered our boiler installation project before the deadline with outstanding quality.",
    name: "Tejasv Sahu",
    image: "/reviewer_2.jpg",
    company: "",
    designation: "Plant Manager",
    rating: 5,
    status: "Active",
    order: 2,
  },
  {
    quote:
      "Their piping and utility services played a crucial role in our factory's expansion. The dedication and quality of work truly set them apart.",
    name: "Ellis William",
    image: "/reviewer_3.jpg",
    company: "",
    designation: "Operations Director",
    rating: 5,
    status: "Active",
    order: 3,
  },
  {
    quote:
      "I started with Avconexpo for a feasibility study, but the scope quickly grew into much more. They supported the project end-to-end - from concept and planning to technical decisions and execution support.",
    name: "Yahya Shakiru",
    image: "/yahya.jpeg",
    company: "",
    designation: "Project Owner",
    rating: 5,
    status: "Active",
    order: 4,
  },
  {
    quote:
      "Avconexpo's energy audit exposed exactly where profits were leaking and what needed to be fixed. It was a wake-up call that directly improved my operations.",
    name: "Willy Mekombo",
    image: "/reviewer_2.jpg",
    company: "",
    designation: "Factory Owner",
    rating: 5,
    status: "Active",
    order: 5,
  },
  {
    quote:
      "For our 100 TPD edible oil project, Avconexpo delivered a true scratch-to-shelf solution. Their EPC expertise, combined with deep understanding of African markets, made a real difference.",
    name: "John Boscow",
    image: "/reviewer_3.jpg",
    company: "",
    designation: "Managing Director",
    rating: 5,
    status: "Active",
    order: 6,
  },
  {
    quote:
      "The supply chain optimization provided by AVCONEXPO transformed our distribution network. Their strategic approach to vendor management and logistics is unparalleled in the industry.",
    name: "Spondon Phukan",
    image: "/spondon.png",
    company: "",
    designation: "Supply Chain Director",
    rating: 5,
    status: "Active",
    order: 7,
  },
  {
    quote:
      "Their expertise in waste-to-energy conversion helped us implement a sustainable solution that significantly reduced our environmental footprint while generating substantial energy savings.",
    name: "Ahmad Malim",
    image: "/ahmed.jpeg",
    company: "",
    designation: "Sustainability Manager",
    rating: 5,
    status: "Active",
    order: 8,
  },
  {
    quote:
      "AVCONEXPO's project management team ensured our complex greenfield project was completed on time and within budget. Their technical governance and attention to detail are world-class.",
    name: "Hitesh Mahajan",
    image: "/hitesh.png",
    company: "",
    designation: "Infrastructure Lead",
    rating: 5,
    status: "Active",
    order: 9,
  },
];

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.client_name,
    image: row.image,
    company: row.company,
    designation: row.designation,
    role: formatTestimonialRole(row.designation, row.company),
    rating: row.rating,
    status: row.status,
    order: row.sort_order,
  };
}

export async function ensureTestimonialsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote TEXT NOT NULL,
      client_name VARCHAR(255) NOT NULL,
      image VARCHAR(500) NOT NULL,
      company VARCHAR(255) NOT NULL DEFAULT '',
      designation VARCHAR(255) NOT NULL DEFAULT '',
      rating TINYINT NOT NULL DEFAULT 5,
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_testimonials_status (status),
      INDEX idx_testimonials_sort_order (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function dedupeTestimonials() {
  await execute(`
    DELETE t1 FROM testimonials t1
    INNER JOIN testimonials t2
      ON t1.client_name = t2.client_name
      AND t1.sort_order = t2.sort_order
      AND t1.quote = t2.quote
      AND t1.id > t2.id
  `);
}

async function seedDefaultTestimonials() {
  const existing = await query<{ count: number }>("SELECT COUNT(*) AS count FROM testimonials");
  if (parseCount(existing) > 0) {
    await dedupeTestimonials();
    return;
  }

  if (!(await acquireSeedLock("testimonials"))) {
    return;
  }

  const afterLock = await query<{ count: number }>("SELECT COUNT(*) AS count FROM testimonials");
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const testimonial of DEFAULT_TESTIMONIALS) {
    await execute(
      `INSERT INTO testimonials
        (quote, client_name, image, company, designation, rating, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        testimonial.quote,
        testimonial.name,
        testimonial.image,
        testimonial.company,
        testimonial.designation,
        testimonial.rating,
        testimonial.status,
        testimonial.order,
      ],
    );
  }
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  await ensureTestimonialsTable();
  await seedDefaultTestimonials();
  await dedupeTestimonials();

  const rows = await query<TestimonialRow>(
    `SELECT id, quote, client_name, image, company, designation, rating, status, sort_order, created_at, updated_at
     FROM testimonials
     WHERE status = 'Active'
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapTestimonial);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  await ensureTestimonialsTable();
  await seedDefaultTestimonials();
  await dedupeTestimonials();

  const rows = await query<TestimonialRow>(
    `SELECT id, quote, client_name, image, company, designation, rating, status, sort_order, created_at, updated_at
     FROM testimonials
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapTestimonial);
}

export async function getTestimonialCount(): Promise<number> {
  await ensureTestimonialsTable();
  await seedDefaultTestimonials();

  const result = await query<{ count: number }>("SELECT COUNT(*) AS count FROM testimonials");
  return result[0]?.count ?? 0;
}

export async function createTestimonial(input: TestimonialInput): Promise<number> {
  await ensureTestimonialsTable();

  const result = await execute(
    `INSERT INTO testimonials
      (quote, client_name, image, company, designation, rating, status, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.quote,
      input.name,
      input.image,
      input.company,
      input.designation,
      input.rating,
      input.status,
      input.order,
    ],
  );

  return result.insertId;
}

export async function updateTestimonial(id: number, input: TestimonialInput): Promise<boolean> {
  await ensureTestimonialsTable();

  const result = await execute(
    `UPDATE testimonials
     SET quote = ?, client_name = ?, image = ?, company = ?, designation = ?,
         rating = ?, status = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.quote,
      input.name,
      input.image,
      input.company,
      input.designation,
      input.rating,
      input.status,
      input.order,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  await ensureTestimonialsTable();

  const result = await execute("DELETE FROM testimonials WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export function normalizeTestimonialInput(body: Record<string, unknown>): TestimonialInput | null {
  const quote = typeof body.quote === "string" ? body.quote.trim() : "";
  const name =
    (typeof body.name === "string" ? body.name.trim() : "") ||
    (typeof body.client_name === "string" ? body.client_name.trim() : "");
  const image =
    (typeof body.image === "string" ? body.image.trim() : "") ||
    (typeof body.photo === "string" ? body.photo.trim() : "");
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const designation =
    (typeof body.designation === "string" ? body.designation.trim() : "") ||
    (typeof body.role === "string" ? body.role.trim() : "");
  const status: TestimonialStatus = body.status === "Inactive" ? "Inactive" : "Active";
  const order = Number(body.order ?? body.sort_order);
  const rating = Math.min(
    5,
    Math.max(1, Math.floor(Number(body.rating ?? 5))),
  );

  if (!quote || !name || !image || !designation || !Number.isFinite(order) || order < 1) {
    return null;
  }

  return {
    quote,
    name,
    image,
    company,
    designation,
    rating,
    status,
    order: Math.floor(order),
  };
}
