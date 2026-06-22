import Image from "next/image";
import { servicesIndustries } from "@/lib/services-industries";

export default function ServicesIndustriesSection() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="services-industries-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="services-industries-heading"
          className="mb-10 text-2xl font-extrabold uppercase tracking-wide text-[#1e3a5f] sm:text-3xl"
        >
          Industries We Serve
        </h2>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {servicesIndustries.map((industry) => (
            <article key={industry.title} className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200/80 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <h3 className="mt-3 text-sm font-extrabold leading-snug text-[#1a1a1a] sm:text-base">
                {industry.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
