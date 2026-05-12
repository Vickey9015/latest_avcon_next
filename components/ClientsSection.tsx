"use client";

import Image from "next/image";

const partners = [
  { name: "ABB", image: "/brands/abb.jpeg" },
  { name: "Al Jaber", image: "/brands/al_jaber.jpeg" },
  { name: "Alfa", image: "/brands/alfa.jpeg" },
  { name: "Atlas", image: "/brands/atlas.jpeg" },
  { name: "Forbes", image: "/brands/forbes.jpeg" },
  { name: "Milindia", image: "/brands/milindia.jpeg" },
  { name: "Parivartan", image: "/brands/parivartan.jpeg" },
  { name: "PCS", image: "/brands/pcs.jpeg" },
  { name: "State of Qatar", image: "/brands/stateofquater.jpeg" },
  { name: "Tetra", image: "/brands/tetra.jpeg" },
  { name: "Thermax", image: "/brands/thermax.jpeg" },
];

export default function ClientsSection() {
  // Triple the partners array to ensure seamless looping
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section
      id="clients"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30 py-12 sm:py-16"
      aria-labelledby="clients-heading"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[100vw] px-0">
        <div className="mb-8 px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#f0571f]">Clients And Partners</p>
          <h2
            id="clients-heading"
            className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl"
          >
            Trusted by Industry Leaders Worldwide
          </h2>
        </div>

        <div className="mb-6 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        <div className="relative overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-8 px-8">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group relative flex h-28 w-48 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-b-4 border-t-4 border-orange-500 border-b-blue-500 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-xl sm:h-32 sm:w-56"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100/40 via-blue-50/40 to-orange-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={180}
                  height={90}
                  className="relative z-10 h-auto w-auto max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays for smooth entry/exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-orange-50/30 to-transparent z-10" />
        </div>

        <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
    </section>
  );
}
