"use client";
import { useEffect, useRef } from "react";
import { motionConfig as M } from "@/lib/motion";
export default function Lattice({ close = false }: { close?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      visible = true;
    const mouse = { x: -10000, y: -10000 };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from({ length: M.fallbackNodes }, (_, i) => {
      const a = i * 2.399963;
      const r = Math.sqrt((i + 0.5) / M.fallbackNodes);
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        z: Math.sin(i * 1.73),
        phase: i * 0.7,
      };
    });
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < 0.21) edges.push([i, j]);
      }
    const draw = (time: number) => {
      const start = performance.now();
      ctx.clearRect(0, 0, width, height);
      const t = reduce.matches ? 0 : time * 0.00002;
      const zoom = close ? 1.7 : 1;
      const points = nodes.map((p) => {
        const z = p.z + Math.sin(t + p.phase) * 0.08;
        const scale = zoom * (0.82 + z * 0.15 + Math.min(scrollY / 8000, 0.1));
        return {
          x:
            width * 0.66 +
            (p.x * Math.cos(t) - p.y * Math.sin(t)) * width * 0.42 * scale,
          y: height * 0.45 + p.y * height * 0.55 * scale,
          z,
          hot: false,
        };
      });
      for (const p of points)
        p.hot = Math.hypot(p.x - mouse.x, p.y - mouse.y) < M.attention;
      for (const [a, b] of edges) {
        const p = points[a],
          q = points[b];
        ctx.strokeStyle =
          p.hot && q.hot
            ? "rgba(199,255,61,.48)"
            : `rgba(210,224,218,${0.055 + (p.z + 1) * 0.045})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      for (const p of points) {
        ctx.fillStyle = p.hot
          ? "#c7ff3d"
          : `rgba(230,240,234,${0.22 + (p.z + 1) * 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.hot ? 2 : 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
      canvas.dataset.renderMs = (performance.now() - start).toFixed(2);
      if (visible && !document.hidden && !reduce.matches)
        frame = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(frame);
    const restart = () => {
      stop();
      draw(performance.now());
    };
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio, M.dpr);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    };
    const pointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? restart() : stop();
    });
    observer.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("visibilitychange", restart);
    reduce.addEventListener("change", restart);
    resize();
    return () => {
      stop();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", restart);
      reduce.removeEventListener("change", restart);
    };
  }, [close]);
  return (
    <canvas
      ref={ref}
      className={"lattice" + (close ? " lattice-close" : "")}
      aria-hidden="true"
    />
  );
}
