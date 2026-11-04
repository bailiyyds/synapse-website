"use client";
import { useEffect, useRef, useState } from "react";
import { createWebGL } from "@/lib/webgl";
import Fallback from "./Lattice";
import { motionConfig as M } from "@/lib/motion";
export default function WebGLLattice({ close = false }: { close?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const engine = createWebGL(canvas, close);
    if (!engine) {
      setFallback(true);
      return;
    }
    let frame = 0,
      visible = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let x = -10000,
      y = -10000,
      lastPointer = -10000;
    const draw = (t: number) => {
      const start = performance.now();
      engine.draw(reduce.matches ? 0 : t, x, y, t - lastPointer);
      canvas.dataset.renderMs = (performance.now() - start).toFixed(2);
      if (visible && !document.hidden && !reduce.matches)
        frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) draw(performance.now());
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, M.dpr);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      restart();
    };
    const pointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      lastPointer = performance.now();
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      restart();
    });
    observer.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const lost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frame);
      visible = false;
      setFallback(true);
    };
    canvas.addEventListener("webglcontextlost", lost);
    window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("visibilitychange", restart);
    reduce.addEventListener("change", restart);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ro.disconnect();
      engine.destroy();
      canvas.removeEventListener("webglcontextlost", lost);
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", restart);
      reduce.removeEventListener("change", restart);
    };
  }, [close]);
  return fallback ? (
    <Fallback close={close} />
  ) : (
    <canvas
      ref={ref}
      className={"lattice" + (close ? " lattice-close" : "")}
      aria-hidden="true"
    />
  );
}
