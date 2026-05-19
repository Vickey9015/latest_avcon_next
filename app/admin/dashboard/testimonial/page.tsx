import TestimonialManagement from "@/components/admin/TestimonialManagement";
import { getAllTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function TestimonialAdminPage() {
  const testimonials = await getAllTestimonials();

  return <TestimonialManagement initialTestimonials={testimonials} />;
}
