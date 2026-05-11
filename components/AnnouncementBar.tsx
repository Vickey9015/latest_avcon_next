import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-[#2a2a2a] text-sm text-white/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-3xl leading-relaxed text-white/90">
          We engage with customers across their value chain helping to design, build, operate, and
          maintain the products and services that make them leaders and respected brands in their
          industries and markets.
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded bg-[#ff8c00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e67e00]"
          >
            Contact Us
          </Link>
          <div className="hidden text-xs text-white/70 md:block">
            <p className="font-medium text-white/90">Contact Info</p>
            <p>1/6/55, Sector J, Sushant Golf City, Lucknow - 226030, UP</p>
            <p>
              <a href="mailto:solutions@avconexpo.com" className="hover:text-white">
                solutions@avconexpo.com
              </a>
              {" · "}
              <a href="tel:+917007729873" className="hover:text-white">
                +91-7007729873
              </a>
              {", "}
              <a href="tel:+917860563231" className="hover:text-white">
                +91-7860563231
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
