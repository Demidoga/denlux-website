"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Theme = "light" | "dark";

export function ThemeToggle({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("denlux-theme", next);
    } catch {
      /* storage blocked, in-session toggle still works */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`group relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${
        onDark
          ? "border-white/30 text-white/90 hover:text-white"
          : "border-line text-ink-soft hover:text-ink focus-visible:text-ink"
      }`}
    >
      <span className="sr-only">Toggle colour theme</span>
      <span className="relative block h-5 w-5">
        {mounted && (
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={theme}
              className="absolute inset-0 grid place-items-center"
              initial={reduce ? false : { rotate: -40, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 40, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {isDark ? (
                <Moon size={19} weight="fill" className="text-accent" />
              ) : (
                <Sun
                  size={19}
                  weight="fill"
                  className={onDark ? "text-accent" : "text-accent-strong"}
                />
              )}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
