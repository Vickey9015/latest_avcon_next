"use client";

import Link from "next/link";
import { useState } from "react";
import { aboutNavLinks, servicesNavLinks } from "@/lib/nav-links";
import Logo from "./Logo";
import NavSidebar from "./NavSidebar";

const linkBase =
  "px-3 py-2 text-sm font-medium text-white/95 transition-colors hover:text-white";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-[999]">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-md">
          <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
            <div className="max-w-[140px] shrink-0 sm:max-w-none">
              <Logo variant="onDark" size="sm" className="sm:hidden" />
              <Logo variant="onDark" className="hidden sm:flex" />
            </div>

            <ul className="hidden items-center lg:flex">
              <li>
                <Link href="/" className={`${linkBase} text-white`}>
                  Home
                </Link>
              </li>
              <li className="group relative">
                <button type="button" className={`${linkBase} flex items-center gap-0.5`}>
                  About Us
                  <span className="text-white/70">+</span>
                </button>
                <ul className="invisible absolute left-0 top-full z-[1000] min-w-[240px] rounded-b-2xl border border-orange-100 bg-white py-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  {aboutNavLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block border-b border-orange-50 px-4 py-2.5 text-sm font-semibold text-[#273339] transition-colors last:border-b-0 hover:bg-gradient-to-r hover:from-[#f0571f] hover:to-[#faa419] hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="group relative">
                <button type="button" className={`${linkBase} flex items-center gap-0.5`}>
                  Services
                  <span className="text-white/70">+</span>
                </button>
                <ul className="invisible fixed left-1/2 top-[4.5rem] z-[1000] w-[340px] -translate-x-1/2 rounded-b-2xl border border-orange-100 bg-white py-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  {servicesNavLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block border-b border-orange-50 px-4 py-2.5 text-left text-sm font-semibold text-[#273339] transition-colors last:border-b-0 hover:bg-gradient-to-r hover:from-[#f0571f] hover:to-[#faa419] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href="/project" className={linkBase}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={linkBase}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/career" className={linkBase}>
                  Career
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/#contact"
                className="hidden items-center gap-2 rounded border border-white/50 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:inline-flex"
              >
                Get In Touch
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-90 lg:hidden"
                aria-expanded={sidebarOpen}
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                onClick={() => setSidebarOpen((o) => !o)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <NavSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
