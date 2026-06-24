"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const QUOTES = [
  {
    body: "I have always dreaded dentists. Dr. Saad is the first one who actually listened before reaching for anything.",
    name: "Hannah Whitfield",
    meta: "Patient since 2022",
  },
  {
    body: "They fixed work two other clinics had rushed. No lecture, no upsell, just a clear plan and an honest price.",
    name: "Omar Haddad",
    meta: "Patient since 2021",
  },
  {
    body: "I booked an emergency on a Thursday evening and was seen the same night. The relief was worth every penny.",
    name: "Priya Nair",
    meta: "Patient since 2023",
  },
  {
    body: "Calm is the word. From the waiting room to the chair, it never once felt like a conveyor belt.",
    name: "James Okafor",
    meta: "Patient since 2020",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length),
    []
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), 6500);
    return () => clearInterval(id);
  }, [reduce, paused, go]);

  const q = QUOTES[index];

  return (
    <section
      aria-label="What patients say"
      className="scroll-mt-24 bg-surface/50 py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.01em] text-ink">
            In their words.
          </h2>
          <Quotes size={40} weight="fill" className="text-accent/30" aria-hidden />
        </div>

        <div className="mt-10 min-h-[14rem] sm:min-h-[12rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-balance text-[clamp(1.5rem,3.4vw,2.6rem)] font-light leading-[1.22] tracking-[-0.01em] text-ink">
                {q.body}
              </blockquote>
              <figcaption className="mt-7 flex items-baseline gap-3 text-[0.95rem]">
                <span className="font-medium text-ink">{q.name}</span>
                <span className="text-muted">{q.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-ink"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-ink"
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
