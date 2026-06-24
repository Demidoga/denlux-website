"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
type Tag = "div" | "section" | "li" | "figure" | "span" | "ul";

/* Rises and fades as it enters the viewport.
   Under reduced motion it renders as a plain, always-visible element with no
   scroll gating, so the content never depends on a reveal firing. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  // The `reveal` class carries a pure-CSS guarantee: under prefers-reduced-motion
  // it is forced visible (see globals.css), independent of any JS timing, so a
  // reveal that never fires (reduced motion, headless, crawler) still shows content.
  return (
    <Comp
      className={`reveal ${className}`}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const PANEL_OFFSET = {
  tl: "-translate-x-4 -translate-y-4",
  tr: "translate-x-4 -translate-y-4",
  bl: "-translate-x-4 translate-y-4",
  br: "translate-x-4 translate-y-4",
} as const;

/* Image set into a layered frame: a cool backing panel offset behind it, a hairline
   border, and a plate caption with an index. Optional vertical parallax drift.
   The backing panel is what keeps an image from reading as "pasted onto" the page. */
export function FramedImage({
  src,
  alt,
  sizes,
  priority = false,
  aspect = "aspect-[4/5]",
  caption,
  index,
  panel = "tl",
  parallax = false,
  imgClass = "",
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  aspect?: string;
  caption?: string;
  index?: string;
  panel?: keyof typeof PANEL_OFFSET;
  parallax?: boolean;
  imgClass?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !reduce ? [-34, 34] : [0, 0]
  );
  return (
    <figure className={`relative ${className}`}>
      <div ref={ref} className="relative">
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[8px] border border-line bg-frame ${PANEL_OFFSET[panel]}`}
        />
        <div className={`relative ${aspect} overflow-hidden rounded-[6px] border border-line bg-surface`}>
          {parallax ? (
            <motion.div style={{ y }} className="absolute -inset-x-0 -top-[12%] -bottom-[12%]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={`object-cover ${imgClass}`}
              />
            </motion.div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={`object-cover ${imgClass}`}
            />
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-6">
          <span className="block h-px w-full bg-line" />
          <span className="mt-2.5 flex items-baseline justify-between gap-3">
            <span className="text-[0.84rem] tracking-tight text-ink-soft">{caption}</span>
            {index && (
              <span className="font-display text-[0.82rem] text-muted">{index}</span>
            )}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

/* CTA that leans toward the cursor, then springs back. Pointer only. */
export function Magnetic({
  children,
  className = "",
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
