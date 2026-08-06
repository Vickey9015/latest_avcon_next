"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/industrial/ProductCard";
import ProductContactModal from "@/components/industrial/ProductContactModal";
import ShortEnquiryForm from "@/components/industrial/ShortEnquiryForm";
import {
  equipmentCategories,
  getCategoryLabel,
  productHref,
  type EquipmentCategoryId,
  type EquipmentProduct,
} from "@/lib/industrial-equipment";

type IndustrialEquipmentCatalogProps = {
  products: EquipmentProduct[];
};

export default function IndustrialEquipmentCatalog({ products }: IndustrialEquipmentCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<EquipmentCategoryId | "all">("all");
  const [contactProduct, setContactProduct] = useState<EquipmentProduct | null>(null);

  const featured = useMemo(
    () => products.filter((product) => product.featured),
    [products],
  );

  const topProducts = useMemo(() => {
    if (activeCategory === "all") return featured;
    const inCategory = featured.filter((product) => product.categoryId === activeCategory);
    if (inCategory.length > 0) return inCategory;
    return products.filter((product) => product.categoryId === activeCategory).slice(0, 4);
  }, [activeCategory, featured, products]);

  return (
    <>
      {/* 1. H1 + category filters */}
      <section className="border-b border-zinc-200 bg-white py-5 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-[1.35rem] font-extrabold leading-snug tracking-tight text-[#1a1a1a] sm:text-3xl sm:leading-tight lg:text-[2.6rem]">
            Industrial Equipment &amp; Spare Parts for Industrial Factories and plants
          </h1>
          <p className="mt-2 text-xs text-[#555] sm:text-sm lg:text-base">
            {products.length}+ products available · Global sourcing for factories &amp; plants
          </p>

          <div
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-5 sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter products by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                activeCategory === "all"
                  ? "bg-[#f0571f] text-white"
                  : "bg-zinc-100 text-[#333] hover:bg-orange-50 hover:text-[#f0571f]"
              }`}
            >
              All Categories
            </button>
            {equipmentCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                  activeCategory === category.id
                    ? "bg-[#f0571f] text-white"
                    : "bg-zinc-100 text-[#333] hover:bg-orange-50 hover:text-[#f0571f]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Top high-requirement equipment */}
      <section className="bg-[#f7f8fa] py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#f0571f] sm:text-sm">
              High Demand
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[#1a1a1a] sm:text-2xl lg:text-3xl">
              Top Required Industrial Equipment
            </h2>
            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-[#555] sm:mt-2 sm:text-sm sm:leading-6 lg:text-base">
              Frequently requested equipment and spare parts for factories, utilities, and process plants.
            </p>
          </div>

          {topProducts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center text-sm text-[#555] sm:p-8">
              No featured products in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {topProducts.map((product) => (
                <ProductCard key={product.slug} product={product} onContact={setContactProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Short enquiry form */}
      <section className="bg-white py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ShortEnquiryForm
            title="Request a Quick Quote"
            subtitle="Share your name, email, phone and requirements — our team will respond promptly."
            defaultCategory={
              activeCategory === "all"
                ? "Industrial Equipment & Spare Parts"
                : getCategoryLabel(activeCategory)
            }
          />
        </div>
      </section>

      {/* 4. Browse categories — links to product details */}
      <section className="bg-[#f7f8fa] py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#f0571f]">Categories</p>
            <h2 className="mt-0.5 text-xl font-extrabold text-[#1a1a1a] sm:text-2xl">Browse Categories</h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {equipmentCategories.map((category) => {
              const count = products.filter((product) => product.categoryId === category.id).length;
              const sample =
                products.find((product) => product.categoryId === category.id) ?? products[0];
              const href =
                count > 0 && sample
                  ? productHref(sample.slug)
                  : "/industrial-equipment-supplier";
              const imageSrc = sample?.images[0] ?? "/equipments-spares/hero-compressors.png";

              return (
                <Link
                  key={category.id}
                  href={href}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
                >
                  <div className="relative h-28 sm:h-36 lg:h-40">
                    <Image
                      src={imageSrc}
                      alt={category.label}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                      <p className="line-clamp-2 text-xs font-bold leading-snug text-white sm:text-sm lg:text-base">
                        {category.label}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold text-[#faa419] sm:mt-1 sm:text-xs">
                        <span className="sm:hidden">{count} items</span>
                        <span className="hidden sm:inline">{count} products · View details →</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. About AVCONEXPO — before footer */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative h-48 overflow-hidden rounded-2xl sm:h-64 sm:rounded-[28px] lg:min-h-[280px] lg:h-auto">
              <Image
                src="/equipments-spares/global-logistics.png"
                alt="AVCONEXPO global industrial supply"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#f0571f] sm:text-sm">
                About AVCONEXPO
              </p>
              <h2 className="mt-1.5 text-2xl font-extrabold text-[#1a1a1a] sm:mt-2 sm:text-3xl">
                Your trusted industrial equipment supplier
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#555] sm:mt-4 sm:leading-7 sm:text-base">
                AVCONEXPO supplies a comprehensive range of electrical equipment, components, and spare parts for
                industrial, commercial, infrastructure, utility, and manufacturing applications. Through our global
                sourcing network and strong supplier partnerships, we deliver high-quality electrical products that
                ensure operational reliability, safety, and efficiency.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
                {[
                  { value: "25+", label: "Countries Served" },
                  { value: "30+", label: "Years of Experience" },
                  { value: "End-to-End", label: "Supply Solutions" },
                  { value: "Africa · GCC · India", label: "Regions Covered" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-orange-100 bg-orange-50/50 p-3 sm:rounded-2xl sm:p-4">
                    <p className="text-base font-extrabold text-[#f0571f] sm:text-lg lg:text-xl">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#333] sm:mt-1 sm:text-xs lg:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold text-[#1e3a5f] sm:mt-5 sm:text-sm">
                Serving Industries Across Africa, GCC &amp; India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pre-footer CTA form + contact details */}
      <section className="border-t border-orange-100 bg-gradient-to-br from-[#fff7f2] via-white to-orange-50/40 py-8 pb-24 sm:py-12 sm:pb-14 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-extrabold text-[#1a1a1a] sm:text-2xl">Ready to source equipment?</h2>
              <p className="mt-2 text-sm leading-6 text-[#555] sm:leading-7">
                Contact AVCONEXPO for industrial equipment, electrical systems, and critical spare parts supply.
              </p>
              <div className="mt-4 space-y-2 text-sm text-[#333] sm:mt-5">
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a className="text-[#f0571f] hover:underline" href="tel:+917007729873">
                    +91-7007729873
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a className="text-[#f0571f] hover:underline" href="tel:+917860563231">
                    +91-7860563231
                  </a>
                </p>
                <p className="break-all">
                  <span className="font-semibold">Email:</span>{" "}
                  <a className="text-[#f0571f] hover:underline" href="mailto:solutions@avconexpo.com">
                    solutions@avconexpo.com
                  </a>
                </p>
                <p className="pt-1 text-xs leading-5 sm:text-sm sm:leading-6">
                  Pocket 1, 171, Golf City, Sector D, Bangiamau, Lucknow, Uttar Pradesh 226030
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ShortEnquiryForm
                title="Send Your Requirement"
                subtitle="Name, email, phone and requirements — we will get back quickly."
              />
            </div>
          </div>
        </div>
      </section>

      <ProductContactModal
        open={Boolean(contactProduct)}
        onClose={() => setContactProduct(null)}
        productTitle={contactProduct?.title}
        categoryLabel={contactProduct ? getCategoryLabel(contactProduct.categoryId) : ""}
      />
    </>
  );
}
