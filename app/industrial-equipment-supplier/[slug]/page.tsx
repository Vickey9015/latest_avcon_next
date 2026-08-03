import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import ProductDetailClient from "@/components/industrial/ProductDetailClient";
import Navbar from "@/components/Navbar";
import ShortEnquiryForm from "@/components/industrial/ShortEnquiryForm";
import TopBar from "@/components/TopBar";
import {
  equipmentProducts,
  getCategoryLabel,
  getProductBySlug,
  productHref,
} from "@/lib/industrial-equipment";
import { seoForRoute } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return equipmentProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return seoForRoute({
      pathname: "/industrial-equipment-supplier",
      title: "Industrial Equipment & Spare Parts Supplier | AVCONEXPO",
      description:
        "Looking for a reliable industrial equipment supplier? AVCONEXPO supplies industrial spare parts, electrical equipment, and plant components globally.",
    });
  }

  return seoForRoute({
    pathname: productHref(product.slug),
    title: `${product.title} Supplier | AVCONEXPO`,
    description: product.shortDescription,
    imageUrl: product.images[0],
  });
}

export default async function IndustrialEquipmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = equipmentProducts
    .filter((item) => item.categoryId === product.categoryId && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[34vh] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101827]/92 via-[#101827]/75 to-[#101827]/40" />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[34vh] w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-32 sm:px-6 lg:px-8">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#faa419]">
              {getCategoryLabel(product.categoryId)}
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>
          </div>
        </section>
      </div>

      <section className="bg-[#f7f8fa] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm text-[#555]">
            <Link href="/industrial-equipment-supplier" className="font-semibold text-[#f0571f] hover:underline">
              Industrial Equipment Supplier
            </Link>
            <span className="mx-2">/</span>
            <span>{product.title}</span>
          </p>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductDetailClient product={product} />
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                <h2 className="text-xl font-extrabold text-[#1a1a1a]">Product Overview</h2>
                <p className="mt-3 text-sm leading-7 text-[#555] sm:text-base">{product.description}</p>
                <dl className="mt-5 overflow-hidden rounded-xl border border-zinc-100">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-2 border-b border-zinc-100 last:border-b-0">
                      <dt className="bg-zinc-50 px-4 py-3 text-sm font-semibold text-[#555]">{spec.label}</dt>
                      <dd className="px-4 py-3 text-sm text-[#333]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ShortEnquiryForm
                title="Enquire About This Product"
                subtitle={`Category auto-selected: ${getCategoryLabel(product.categoryId)}`}
                defaultCategory={`${getCategoryLabel(product.categoryId)} — ${product.title}`}
              />
            </div>
          </div>

          {related.length > 0 ? (
            <div className="mt-12">
              <h2 className="mb-5 text-2xl font-extrabold text-[#1a1a1a]">Related Products</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={productHref(item.slug)}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative h-28">
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="25vw" />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-bold text-[#1e3a5f]">{item.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
