import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

export default function BlogNotFound() {
  return (
    <>
      <TopBar />
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold text-[#1a1a1a]">Blog post not found</h1>
        <p className="mt-4 text-gray-600">This article may have been removed or is not published yet.</p>
        <Link
          href="/blogs"
          className="mt-8 inline-flex rounded-full bg-[#ff8c00] px-6 py-3 font-semibold text-white hover:bg-[#e67e00]"
        >
          View all blogs
        </Link>
      </section>
      <Footer />
    </>
  );
}
