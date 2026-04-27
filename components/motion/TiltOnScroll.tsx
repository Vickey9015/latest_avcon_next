"use client";

import { useEffect, useRef, type ReactNode } from "react";

const LERP = 0.12;
const EPS = 0.03;

type Props = {
  children: ReactNode;
  className?: string;
  /** 0–1 scales tilt depth (default 1) */
  intensity?: number;
};

export default function TiltOnScroll({
  children,
  className = "",
  intensity = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ rx: 0, tz: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;

    const target = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const delta = (center - vh * 0.5) / vh;
      const clamped = Math.max(-1, Math.min(1, delta * 1.25));
      const rotX = clamped * -6.5 * intensity;
      const tz = 20 * (1 - Math.abs(clamped)) * intensity;
      return { rx: rotX, tz };
    };

    const kick = () => {
      if (rafId !== 0) return;

      const loop = () => {
        const t = target();
        const s = state.current;
        s.rx += (t.rx - s.rx) * LERP;
        s.tz += (t.tz - s.tz) * LERP;

        const moving =
          Math.abs(s.rx - t.rx) > EPS || Math.abs(s.tz - t.tz) > EPS;

        el.style.transform = `translate3d(0,0,0) rotateX(${s.rx.toFixed(3)}deg) translateZ(${s.tz.toFixed(2)}px)`;
        el.style.transformStyle = "preserve-3d";
        el.style.willChange = "transform";

        if (moving) {
          rafId = requestAnimationFrame(loop);
        } else {
          rafId = 0;
        }
      };

      rafId = requestAnimationFrame(loop);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`motion-tilt-scroll max-w-full overflow-x-clip [transform-style:preserve-3d] ${className}`.trim()}
    >
      {children}
    </div>
  );
}
