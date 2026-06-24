"use client";

import Image from "next/image";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BookButton } from "./BookButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const rise = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section id="top" className="relative flex w-full flex-col-reverse overflow-hidden lg:block lg:min-h-[100dvh]">
      {/* Reception: a full uncropped frame at the bottom on mobile, a dimmed full
          background on desktop. */}
      <div className="relative aspect-[2752/1536] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <Image
          src="/reception.webp"
          alt="The Denlux reception, warm lighting against a dark panelled feature wall"
          fill
          priority
          sizes="100vw"
          className="object-cover lg:scale-[1.04]"
        />
        {/* Desktop legibility scrim. Content is anchored low, so darken the
            bottom (over the bright tiled floor) and the lower-left, while the
            warm ceiling up top is left to breathe. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/72 via-black/34 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-[58%] bg-gradient-to-t from-black/78 via-black/28 to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-black/45 to-transparent lg:block" />
      </div>

      {/* Content: above the image on mobile (page colours), overlaid and anchored
          to the lower third on desktop (light). */}
      <motion.div
        className="relative mx-auto flex max-w-[1320px] flex-col px-5 py-14 sm:px-8 lg:min-h-[100dvh] lg:justify-end lg:px-12 lg:pb-11 lg:pt-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div variants={rise} className="mb-7 flex items-center gap-3">
            <span className="h-px w-9 bg-accent" aria-hidden />
            <span className="text-sm font-medium tracking-[0.02em] text-accent-strong lg:text-accent">
              Private dental care
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,6.4vw,5.25rem)] leading-[1.02] tracking-[-0.012em] text-ink lg:text-white">
            <motion.span variants={rise} className="block">
              Care that takes
            </motion.span>
            <motion.span variants={rise} className="block">
              its time.
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            className="prose-measure mt-8 text-lg leading-relaxed text-ink-soft lg:leading-[1.7] lg:tracking-[0.004em] lg:text-white/85"
          >
            A private practice, built for families who
            want a dentist that slows down and explains.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
            <BookButton size="lg" />
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent-strong lg:text-white lg:hover:text-accent"
            >
              Meet Dr. Saad
              <span className="h-px w-7 bg-ink transition-all duration-300 ease-out group-hover:w-10 group-hover:bg-accent-strong lg:bg-white lg:group-hover:bg-accent" />
            </a>
          </motion.div>
        </div>

        {/* Grounding rail: a hairline baseline that anchors the composition.
            Desktop-only; on mobile the Marquee strip directly below does the
            grounding instead. */}
        <motion.div
          variants={rise}
          className="mt-16 hidden items-end justify-between border-t border-white/15 pt-6 lg:flex"
        >
          <p className="text-sm tracking-tight text-white/55">
            <span className="text-white/75">Denlux Dental</span>
            <span className="px-2 text-white/30">·</span>
            Private practice by H&amp;S
          </p>

         
        </motion.div>
      </motion.div>
    </section>
  );
}
