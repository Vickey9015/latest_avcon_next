"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type SectionEnterVariant = "fade-up" | "fade-down" | "scale" | "fade";

type Props = {
  children: ReactNode;
  variant?: SectionEnterVariant;
  className?: string;
};

export default function SectionEnter({
  children,
  variant = "fade-up",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-section-enter");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-section-enter");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-enter section-enter--${variant} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
