"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Magnetic } from "./motion";

// The single booking CTA, reused everywhere so there is one label for one intent.
// Cyan fill + dark accent-ink text passes WCAG AA in both themes.
export function BookButton({
  children = "Book an appointment",
  href = "#book",
  size = "md",
  magnetic = true,
  withArrow = true,
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  withArrow?: boolean;
  className?: string;
}) {
  const pad =
    size === "lg"
      ? "px-7 py-4 text-[0.95rem]"
      : size === "sm"
        ? "px-4 py-2 text-[0.82rem]"
        : "px-5 py-3 text-[0.875rem]";

  const inner = (
    <a
      href={href}
      className={`group/btn inline-flex items-center gap-2 rounded-full bg-accent font-medium tracking-tight text-accent-ink shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-[transform,filter] duration-300 ease-out hover:brightness-[1.04] active:scale-[0.97] ${pad} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          size={size === "lg" ? 18 : 16}
          weight="bold"
          className="transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      )}
    </a>
  );

  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
