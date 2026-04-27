"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees (default 9) */
  maxTilt?: number;
  /** Slight scale on hover */
  hoverScale?: number;
};

export default function HoverTiltCard3D({
  children,
  className = "",
  maxTilt = 9,
  hoverScale = 1.02,
}: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(true);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const apply = useCallback(
    (rx: number, ry: number, scale: number, transition: boolean) => {
      const el = innerRef.current;
      if (!el) return;
      el.style.transition = transition
        ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none";
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    []
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -y * 2 * maxTilt;
    const ry = x * 2 * maxTilt;
    apply(rx, ry, hoverScale, false);
  };

  const onLeave = () => {
    if (reducedRef.current) return;
    apply(0, 0, 1, true);
  };

  return (
    <div
      className={`motion-hover-tilt-3d max-w-full ${className}`.trim()}
      style={{ perspective: "1100px" }}
    >
      <div
        ref={innerRef}
        className="h-full transform-gpu will-change-transform [transform-style:preserve-3d]"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </div>
    </div>
  );
}
