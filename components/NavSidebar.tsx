"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";

const TRANSITION_MS = 420;

const social = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

type NavSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function NavSidebar({ open, onClose }: NavSidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const openId = window.setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      }, 0);
      return () => clearTimeout(openId);
    }
    const closeId = window.setTimeout(() => setVisible(false), 0);
    return () => clearTimeout(closeId);
  }, [open]);

  const finishClose = useCallback(() => {
    if (!open) setMounted(false);
  }, [open]);

  useEffect(() => {
    if (!open && !visible && mounted) {
      const t = window.setTimeout(finishClose, TRANSITION_MS + 40);
      return () => clearTimeout(t);
    }
  }, [open, visible, mounted, finishClose]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (mounted) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  function onBackdropTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "opacity") return;
    if (!open && !visible) finishClose();
  }

  function onPanelTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "transform") return;
    if (!open && !visible) finishClose();
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[2000]" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-400 ease-out motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"
          }`}
        aria-label="Close menu"
        onClick={onClose}
        onTransitionEnd={onBackdropTransitionEnd}
      />
      <aside
        onTransitionEnd={onPanelTransitionEnd}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[min(100%,420px)] flex-col border-l-[3px] border-[#f37021] bg-white shadow-2xl will-change-transform transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:max-w-[26rem] ${visible ? "translate-x-0" : "translate-x-[102%]"
          }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-5">
          <Logo variant="onLight" size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f37021] text-white shadow-md transition-colors hover:bg-[#d96516]"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className={`flex flex-1 flex-col overflow-y-auto px-5 py-6 transition-all duration-500 ease-out delay-100 motion-reduce:transition-none motion-reduce:delay-0 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
        >
          <p className="text-sm leading-relaxed text-[#444]">
            We engage with customers across their value chain helping to design, build, operate, and
            maintain the products and services that make them leaders and respected brands in their
            industries and markets.
          </p>

          <Link
            href="/#contact"
            onClick={onClose}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#f37021] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#d96516]"
          >
            Contact Us
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-[#f37021]">Contact Info</h3>
            <ul className="mt-4 space-y-4 text-sm text-[#333]">
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#f37021]" aria-hidden>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span>1/6/55, Sector J, Pocket 6, Sushant Golf City, Lucknow - 226030, UP, India</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#f37021]" aria-hidden>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <a href="mailto:solutions@avconexpo.com" className="hover:text-[#f37021]">
                  solutions@avconexpo.com
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#f37021]" aria-hidden>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <span>
                  <a href="tel:+917007729873" className="hover:text-[#f37021]">
                    +91-7007729873
                  </a>
                  {", "}
                  <a href="tel:+917860563231" className="hover:text-[#f37021]">
                    +91-7860563231
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-auto flex justify-center gap-3 border-t border-zinc-100 pt-8">
            {social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-opacity hover:opacity-85"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
