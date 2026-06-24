"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Inertia scrolling for a calmer, less mechanical feel.
// Fully disabled under reduced-motion so the page falls back to native scroll.
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Make in-page anchor links cooperate with Lenis.
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // Land the section flush under the sticky nav. Measure the bar instead of
      // guessing, so it stays correct across breakpoints (64px / 72px tall).
      const header = document.querySelector("header");
      const navH = header ? header.getBoundingClientRect().height : 72;
      lenis.scrollTo(el as HTMLElement, { offset: + (navH) });
    }
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
