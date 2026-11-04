"use client";
import { useEffect } from "react";
import { motionConfig as M } from "@/lib/motion";
export default function SmoothScroll() {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    async function setup() {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".manifesto h2 span")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { opacity: 0.22 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: M.scrub,
                },
              },
            ),
          );
        gsap.utils
          .toArray<HTMLElement>(".timeline-list article")
          .forEach((el) =>
            gsap.from(el, {
              x: 24,
              opacity: 0,
              duration: M.duration,
              scrollTrigger: { trigger: el, start: "top 90%" },
            }),
          );
      });
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = document.querySelector<HTMLElement>(".scenario-track");
          if (!track) return;
          gsap.set(track, { display: "flex", width: "400%" });
          gsap.set(".scenario", { width: "25%", flexShrink: 0 });
          gsap.to(track, {
            x: () => -(track.scrollWidth - innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".scenarios",
              start: "top top",
              end: () => "+=" + innerHeight * 3,
              pin: true,
              scrub: M.scrub,
              invalidateOnRefresh: true,
            },
          });
        },
      );
      dispose = () => {
        mm.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    }
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      dispose();
      dispose = () => {};
      if (!preference.matches) void setup();
    };
    preference.addEventListener("change", changed);
    const start = () => {
      void setup();
    };
    window.addEventListener("scroll", start, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", start);
      cancelled = true;
      preference.removeEventListener("change", changed);
      dispose();
    };
  }, []);
  return null;
}
