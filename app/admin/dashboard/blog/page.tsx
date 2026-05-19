import BlogManagement from "@/components/admin/BlogManagement";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const blogs = await getAllBlogs();

  return <BlogManagement initialBlogs={blogs} />;
}
