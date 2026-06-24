"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { BookButton } from "./BookButton";

const LINKS = [
  { label: "The practice", href: "#about" },
  { label: "Treatments", href: "#services" },
  { label: "Inside Denlux", href: "#inside" },
  { label: "Visit", href: "#book" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [nearTop, setNearTop] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));

    // Hide when scrolling down past 80px; reveal on any upward scroll.
    if (y > 80) {
      setHidden(y > prevY.current);
    } else {
      setHidden(false);
    }
    prevY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reveal the bar when the pointer approaches the top edge, even if it was
  // hidden by scrolling down. Ignore coarse pointers (touch), where there is
  // no hover to track.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      setNearTop((prev) => {
        const next = e.clientY <= 80;
        return prev === next ? prev : next;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // At the top of the page the bar floats over the dark reception hero, so it
  // needs light text. Once scrolled (or the mobile menu opens) it goes solid.
  const onHero = !scrolled && !open;
  const barSolid = scrolled || open;

  const shouldHide = hidden && !open && !nearTop;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: shouldHide ? "-100%" : "0%" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <div
        className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
          barSolid
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-[72px]">
          <a href="#top" aria-label="Denlux Dental, home" className="relative block">
            <Image
              src="/logo-light.webp"
              alt="Denlux Dental"
              width={1584}
              height={718}
              priority
              className={`h-7 w-auto lg:h-8 ${onHero ? "hidden" : "block dark:hidden"}`}
            />
            <Image
              src="/logo-dark.webp"
              alt="Denlux Dental"
              width={1584}
              height={718}
              priority
              className={`h-7 w-auto lg:h-8 ${onHero ? "block" : "hidden dark:block"}`}
            />
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`group relative text-[0.9rem] transition-colors duration-300 ${
                  onHero ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle onDark={onHero} />
            <div className="hidden sm:block">
              <BookButton size="sm" magnetic={false} withArrow={false} />
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden ${
                onHero ? "border-white/30 text-white" : "border-line text-ink"
              }`}
            >
              {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-bg/98 backdrop-blur-lg lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display border-b border-line py-4 text-3xl text-ink"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-7">
                <BookButton size="lg" magnetic={false} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
