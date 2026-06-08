import SectionHeading from "@/components/SectionHeading";
import { faqItems } from "@/lib/structured-data";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#f7f7f7] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" id="faq-heading" />

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
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

        <div className="mt-10 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-extrabold text-[#1a1a1a]">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-[#4b5563]">
            <li>
              Email:{" "}
              <a href="mailto:solutions@avconexpo.com" className="text-[#f0571f] hover:underline">
                solutions@avconexpo.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+917007729873" className="text-[#f0571f] hover:underline">
                +91-7007729873
              </a>
              {" | "}
              <a href="tel:+917860563231" className="text-[#f0571f] hover:underline">
                +91-7860563231
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href="https://wa.me/918423923769"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0571f] hover:underline"
              >
                +91-8423923769
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
