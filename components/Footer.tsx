import Image from "next/image";
import Link from "next/link";
import { instagramLink, socialLinks } from "@/lib/social-links";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/overview" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Services", href: "/services" },
  { label: "Projects", href: "/project" },
  { label: "Our Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
];

const mapDots = [
  { title: "Guinea", top: "56%", left: "43.5%" },
  { title: "Sierra Leone", top: "57%", left: "42.5%" },
  { title: "DRC", top: "61%", left: "51.5%" },
  { title: "Angola", top: "68%", left: "50.5%" },
  { title: "Rwanda", top: "61%", left: "55.5%" },
  { title: "Burundi", top: "62%", left: "55.5%" },
  { title: "Uganda", top: "59%", left: "55.5%" },
  { title: "Tanzania", top: "63%", left: "56.5%" },
  { title: "Kenya", top: "59%", left: "57.5%" },
  { title: "South Sudan", top: "55%", left: "54.5%" },
  { title: "Ethiopia", top: "53%", left: "58.5%" },
  { title: "Somalia", top: "55%", left: "61.5%" },
  { title: "Qatar", top: "45%", left: "61.5%" },
  { title: "India", top: "48%", left: "68.5%" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white">
      <div className="relative min-h-[395px] overflow-hidden py-[50px]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            <WorldPresenceMap />

            <div className="lg:col-span-2">
              <h3 className="mb-6 text-2xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") && !l.href.startsWith("//") ? (
                      <Link href={l.href} className="group inline-flex items-center gap-2 text-white hover:text-white">
                        <span className="text-white transition group-hover:translate-x-1">›</span>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="group inline-flex items-center gap-2 text-white hover:text-white">
                        <span className="text-white transition group-hover:translate-x-1">›</span>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="mb-6 text-2xl font-bold text-white">Contact Us</h3>
              <address className="space-y-4 text-sm leading-6 text-white not-italic">
                <p className="flex gap-3">
                  <FooterIcon path="M9.69 18.93l.003.002.007.003.018.009a.4.4 0 00.162 0l.018-.009.007-.003.003-.002C10.11 18.82 17 14.52 17 8A7 7 0 103 8c0 6.52 6.89 10.82 6.69 10.93zM10 10.5A2.5 2.5 0 1010 5a2.5 2.5 0 000 5.5z" />
                  <span>
                    Pocket 1, 171, Golf City, Sector D,
                    <br />
                    Bagiamau, Lucknow, Uttar Pradesh 226030
                  </span>
                </p>
                <p className="flex gap-3">
                  <FooterIcon path="M2 3.5A1.5 1.5 0 013.5 2h2.1a1.5 1.5 0 011.43 1.05l.78 2.46a1.5 1.5 0 01-.38 1.53L6.2 8.26a11.03 11.03 0 005.54 5.54l1.22-1.23a1.5 1.5 0 011.53-.38l2.46.78A1.5 1.5 0 0118 14.4v2.1a1.5 1.5 0 01-1.5 1.5H15C7.82 18 2 12.18 2 5V3.5z" />
                  <a href="tel:+917007729873" className="hover:text-white">
                    +91-7007729873
                  </a>
                </p>
                <p className="flex gap-3">
                  <FooterIcon path="M2 3.5A1.5 1.5 0 013.5 2h2.1a1.5 1.5 0 011.43 1.05l.78 2.46a1.5 1.5 0 01-.38 1.53L6.2 8.26a11.03 11.03 0 005.54 5.54l1.22-1.23a1.5 1.5 0 011.53-.38l2.46.78A1.5 1.5 0 0118 14.4v2.1a1.5 1.5 0 01-1.5 1.5H15C7.82 18 2 12.18 2 5V3.5z" />
                  <a href="tel:+917860563231" className="hover:text-white">
                    +91-7860563231
                  </a>
                </p>
                <p className="flex gap-3">
                  <FooterIcon path="M2.94 6.34A2 2 0 014.89 5h10.22a2 2 0 011.95 1.34L10 10.76 2.94 6.34zM18 8.12l-7.47 4.67a1 1 0 01-1.06 0L2 8.12V14a2 2 0 002 2h12a2 2 0 002-2V8.12z" />
                  <a href="mailto:solutions@avconexpo.com" className="hover:text-white">
                    solutions@avconexpo.com
                  </a>
                </p>
              </address>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0571f] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#f0571f]"
              >
                Contact Us
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={instagramLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={instagramLink.label}
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/20 bg-transparent text-white transition hover:border-transparent hover:bg-[#f15e22]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                    <path d="M7.7 4h8.6A3.7 3.7 0 0120 7.7v8.6a3.7 3.7 0 01-3.7 3.7H7.7A3.7 3.7 0 014 16.3V7.7A3.7 3.7 0 017.7 4z" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/20 bg-transparent text-white transition hover:border-transparent hover:bg-[#f15e22]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2.5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-sm font-bold text-white/80 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            © 2016{" "}
            <Link href="/" className="hover:text-white">
              AVCONEXPO. All rights reserved.
            </Link>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span className="hidden text-white/50 sm:inline" aria-hidden>
              |
            </span>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <span className="hidden text-white/50 sm:inline" aria-hidden>
              |
            </span>
            <p>
              Designed &amp; Developed By{" "}
              <Link href="/" className="text-[#fbbf24] hover:text-white">
                AVCONEXPO.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({ path }: { path: string }) {
  return (
    <span className="mt-1 shrink-0 text-white">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d={path} />
      </svg>
    </span>
  );
}

function WorldPresenceMap() {
  return (
    <div className="md:col-span-2 lg:col-span-7">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-5">
          <p className="text-base font-semibold text-white">Serving Clients Worldwide</p>
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#f0571f]">
            14+ Locations
          </span>
        </div>
        <div className="relative h-[330px] overflow-hidden sm:h-[390px] lg:h-[430px]" aria-label="AVCONEXPO global presence map">
          <div className="absolute inset-[3px] top-11 sm:inset-1 sm:top-12">
            <Image
              src="/world_map_white_on_black.png"
              alt=""
              fill
              className="scale-[1.04] object-cover object-center mix-blend-screen"
              sizes="(max-width: 1024px) 100vw, 55vw"
              unoptimized
            />
            {mapDots.map((dot) => (
              <span
                key={dot.title}
                title={dot.title}
                className="group absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#f0571f] shadow-[0_0_0_5px_rgba(240,87,31,0.25),0_0_18px_rgba(240,87,31,0.9)]"
                style={{ top: dot.top, left: dot.left }}
              >
                <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] whitespace-nowrap rounded-full bg-[#07111f] px-3 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                  {dot.title}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
