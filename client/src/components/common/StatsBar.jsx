import React, { useState, useEffect, useRef } from "react";

function useInView(options = { threshold: 0.15 }) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

export const CountUp = ({ end = 0, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

/**
 * Reusable Stats Bar section
 */
export default function StatsBar({ stats = [], className = "" }) {
  return (
    <section className={`py-14 px-4 border-y border-white/10 bg-black/60 backdrop-blur-sm ${className}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-3xl sm:text-5xl font-black text-primary tracking-tight mb-2">
              <CountUp
                end={stat.value}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                duration={stat.duration || 2000}
              />
            </div>
            <div className="text-xs sm:text-sm font-bold text-text-muted uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
