"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], article:not([data-no-reveal])"
      )
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );

    const groups = new Map<HTMLElement, HTMLElement[]>();
    for (const el of elements) {
      const group = (el.closest("[data-reveal-group]") as HTMLElement | null) ?? el.parentElement;
      if (!group) continue;
      const list = groups.get(group) ?? [];
      list.push(el);
      groups.set(group, list);
    }

    for (const [, list] of groups) {
      list.forEach((el, idx) => {
        el.style.setProperty("--reveal-delay", `${Math.min(idx, 7) * 70}ms`);
      });
    }

    for (const el of elements) {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
