export type TestimonialStatus = "Active" | "Inactive";

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  image: string;
  company: string;
  designation: string;
  role: string;
  rating: number;
  status: TestimonialStatus;
  order: number;
}

export interface TestimonialInput {
  quote: string;
  name: string;
  image: string;
  company: string;
  designation: string;
  rating: number;
  status: TestimonialStatus;
  order: number;
}

export function formatTestimonialRole(designation: string, company: string): string {
  const title = designation.trim();
  const org = company.trim();
  if (title && org) {
    return `${title}, ${org}`;
  }
  return title || org;
}
