"use client";
import { labels } from "@/lib/constants";

import { ui } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
const metrics = [
  { value: 7, label: labels.label3 },
  { value: 4, label: labels.label4 },
  { value: 1, label: labels.label5 },
];
export default function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / 700, 1);
          setProgress(p);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section ref={ref} className="metrics" aria-label={labels.label6}>
      {metrics.map(({ value, label }) => (
        <div key={label}>
          <strong aria-label={String(value)}>
            {String(Math.round(value * progress)).padStart(2, "0")}
          </strong>
          <span>{label}</span>
        </div>
      ))}
      <div>
        <strong>∞</strong>
        <span>{ui.text33}</span>
      </div>
    </section>
  );
}
