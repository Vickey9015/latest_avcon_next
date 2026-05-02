"use client";

import { useEffect, useState } from "react";
import { TiltOnScroll } from "@/components/motion";

const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Countries",
    description: "Global Presence",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.4 2.5 3.7 5.8 3.7 10S14.4 19.5 12 22m0-20C9.6 4.5 8.3 7.8 8.3 12S9.6 19.5 12 22M2 12h20M4.9 6.5h14.2M4.9 17.5h14.2" />
      </svg>
    ),
    gradient: "from-orange-400 to-orange-600",
  },
  {
    value: 30,
    suffix: "+",
    label: "Years of Industry Experience",
    description: "Since 1994",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-blue-400 to-blue-600",
  },
  {
    value: 100,
    suffix: "%",
    label: "Expertise",
    description: "In Industrial Solutions",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-orange-500 to-pink-500",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 py-20 text-white" aria-label="Company highlights">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-orange-400">Our Impact</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Numbers That Speak Excellence</h2>
        </div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s, index) => (
            <TiltOnScroll key={s.label} intensity={0.3}>
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:shadow-2xl">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}>
                  <div className="h-full w-full rounded-2xl bg-slate-900" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                    {s.icon}
                  </div>

                  {/* Value */}
                  <p className={`text-5xl font-black sm:text-6xl bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>

                  {/* Label */}
                  <p className="mt-3 text-lg font-bold text-white">{s.label}</p>

                  {/* Description */}
                  <p className="mt-1 text-sm text-white/60">{s.description}</p>
                </div>

                {/* Hover glow */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${s.gradient} opacity-0 blur transition-opacity duration-500 group-hover:opacity-30`} />
              </div>
            </TiltOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
