"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { TiltOnScroll } from "@/components/motion";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white pb-16 sm:pb-20 lg:pb-24" aria-labelledby="contact-heading">
      <div className="relative overflow-hidden bg-[#101827] py-16 text-white sm:py-20 lg:py-24">
        <Image src="/slider4.jpg" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-[#101827]/80" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Contact Us
            </p>
            <h2 id="contact-heading" className="text-3xl font-extrabold sm:text-4xl">
              Feel Free To Contact Us
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/80 lg:pt-10">
            Looking for expert engineering solutions? AVCONEXPO delivers excellence with innovative
            technology and unmatched expertise. Let&apos;s build something great together!
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-7xl px-4 sm:-mt-16 sm:px-6 lg:px-8">
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <ContactForm className="h-full" />

          <TiltOnScroll
            intensity={0.72}
            className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200"
          >
            <div className="relative min-h-48 flex-1 bg-zinc-200">
              <Image
                src="/slider3.jpg"
                alt="AVCONEXPO contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="shrink-0 bg-[#101827] p-6 text-white sm:p-8">
              <h3 className="mb-5 text-2xl font-extrabold">Contact Info</h3>
              <address className="not-italic text-[#444]">
                <p className="mb-4 font-medium text-white/90">
                  1/6/55, Sector J, Pocket 6,
                  <br />
                  Sushant Golf City, Lucknow - 226030, UP, India
                </p>
                <p className="mb-3 text-white/75">
                  <a href="tel:+917007729873" className="hover:text-[#ff8c00]">
                    +91-7007729873
                  </a>
                  <br />
                  <a href="tel:+917860563231" className="hover:text-[#ff8c00]">
                    +91-7860563231
                  </a>
                </p>
                <p className="text-white/75">
                  <a href="mailto:solutions@avconexpo.com" className="hover:text-[#ff8c00]">
                    solutions@avconexpo.com
                  </a>
                </p>
              </address>
              <p className="mt-5 text-sm font-bold text-[#ff8c00]">Serving Clients Worldwide</p>
            </div>
          </TiltOnScroll>
        </div>
      </div>
    </section>
  );
}
