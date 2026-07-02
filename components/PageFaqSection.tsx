import SectionHeading from "@/components/SectionHeading";
import type { FaqItem } from "@/lib/faq-types";

type PageFaqSectionProps = {
  items: FaqItem[];
  id?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
};

export default function PageFaqSection({
  items,
  id = "page-faq",
  eyebrow = "FAQs",
  title = "Frequently Asked Questions",
  className = "bg-[#f7f7f7] py-12 sm:py-16",
}: PageFaqSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} id={`${id}-heading`} />

        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={`${item.question}-${index}`}
              className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:border-[#f0571f]/40 hover:shadow-md"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-extrabold text-[#1a1a1a] marker:content-none sm:px-6 sm:py-5">
                <span>
                  Q{index + 1}. {item.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#f0571f] ring-1 ring-orange-100 transition group-open:rotate-45">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-orange-100 px-5 pb-5 pt-4 text-sm leading-7 text-[#4b5563] sm:px-6 sm:pb-6">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
