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
  getPublishedEquipmentByCategory,
  getPublishedEquipmentProductBySlug,
} from "@/lib/equipment";
import { getCategoryLabel, productHref } from "@/lib/industrial-equipment";
import { seoForRoute } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedEquipmentProductBySlug(slug);
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
  const product = await getPublishedEquipmentProductBySlug(slug);
  if (!product) notFound();

  const related = (await getPublishedEquipmentByCategory(product.categoryId))
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[200px] overflow-hidden sm:min-h-[34vh]">
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
          <div className="relative z-10 mx-auto flex min-h-[200px] w-full max-w-7xl flex-col justify-end px-4 pb-5 pt-24 sm:min-h-[34vh] sm:px-6 sm:pb-10 sm:pt-32 lg:px-8">
            <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#faa419] sm:mb-2 sm:text-sm sm:tracking-[0.18em]">
              {getCategoryLabel(product.categoryId)}
            </p>
            <h1 className="max-w-4xl text-xl font-extrabold tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>
          </div>
        </section>
      </div>

      <section className="bg-[#f7f8fa] py-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:py-12 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs text-[#555] sm:mb-6 sm:text-sm">
            <Link href="/industrial-equipment-supplier" className="font-semibold text-[#f0571f] hover:underline">
              Industrial Equipment Supplier
            </Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 inline">{product.title}</span>
          </p>

          <div className="grid gap-5 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductDetailClient product={product} />
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:mt-6 sm:p-6">
                <h2 className="text-lg font-extrabold text-[#1a1a1a] sm:text-xl">Product Overview</h2>
                <p className="mt-2.5 text-sm leading-6 text-[#555] sm:mt-3 sm:leading-7 sm:text-base">{product.description}</p>
                <dl className="mt-4 overflow-hidden rounded-xl border border-zinc-100 sm:mt-5">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-2 border-b border-zinc-100 last:border-b-0">
                      <dt className="bg-zinc-50 px-3 py-2.5 text-xs font-semibold text-[#555] sm:px-4 sm:py-3 sm:text-sm">{spec.label}</dt>
                      <dd className="px-3 py-2.5 text-xs text-[#333] sm:px-4 sm:py-3 sm:text-sm">{spec.value}</dd>
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
            <div className="mt-8 sm:mt-12">
              <h2 className="mb-3 text-lg font-extrabold text-[#1a1a1a] sm:mb-5 sm:text-2xl">Related Products</h2>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={productHref(item.slug)}
                    className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl"
                  >
                    <div className="relative h-24 sm:h-28">
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="50vw" />
                    </div>
                    <div className="p-2.5 sm:p-3">
                      <p className="line-clamp-2 text-xs font-bold text-[#1e3a5f] sm:text-sm">{item.title}</p>
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
