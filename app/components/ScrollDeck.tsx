"use client";

import Image from "next/image";
import {
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";

export type DeckItem = {
  src: string;
  alt: string;
  caption: string;
  index: string;
};

/* A page-pinned card deck driven purely by a 0..1 progress value (the section's
   own scroll, via the pinned stage). No internal scroll container: each card is
   absolutely stacked and positioned by a deterministic transform, so it advances
   no matter where the cursor is, and the math cannot fight a nested scroller.

   As progress climbs, the next card slides up from below and decks onto the pile;
   earlier cards recede a touch and peek above as a stacked edge. The deck finishes
   just before progress 1 and holds, so the last image is fully up before the pin
   releases to the next section.

   Reduced motion / no-JS: no pinning, no scrub. The cards render as a calm static
   pile (top card fully shown); every image stays in the DOM for crawlers and AT. */

const LAYERS = 3; // how many stacked edges peek behind the top card
const GAP = 3.6; // % of box height each receding card lifts
const TOP = LAYERS * GAP; // resting offset of the current top card (keeps edges >= 0)
const SCALE_STEP = 0.04;
const HOLD = 0.9; // deck completes at this progress, then holds until release

export function ScrollDeck({
  items,
  progress,
  className = "",
}: {
  items: readonly DeckItem[];
  progress: MotionValue<number>;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const n = items.length;

  const apply = (p: number) => {
    const active = Math.min(p / HOLD, 1) * (n - 1);
    for (let i = 0; i < n; i++) {
      const el = cardsRef.current[i];
      if (!el) continue;
      const layer = active - i; // 0 = current top, >0 receded, <0 incoming
      let y: number;
      let scale: number;
      let opacity = 1;
      if (layer <= -1) {
        y = 112;
        scale = 1;
        opacity = 0;
      } else if (layer < 0) {
        const e = layer + 1; // 0 -> 1 as it slides up
        y = 112 + e * (TOP - 112);
        scale = 1;
      } else {
        const k = Math.min(layer, LAYERS);
        y = TOP - k * GAP;
        scale = 1 - k * SCALE_STEP;
      }
      el.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${i}`;
    }
  };

  useMotionValueEvent(progress, "change", (p) => {
    if (!reduce) apply(p);
  });

  // Position once on mount (and whenever motion preference resolves).
  useEffect(() => {
    if (!reduce) apply(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`.trim()}>
      {items.map((it, i) => (
        <div
          key={it.src}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="absolute inset-0 origin-top will-change-transform"
          style={
            reduce
              ? {
                  transform: `translateY(${(n - 1 - i) * -GAP}%) scale(${
                    1 - (n - 1 - i) * SCALE_STEP
                  })`,
                  zIndex: i,
                }
              : undefined
          }
        >
          <DeckCard {...it} priority={i === 0} />
        </div>
      ))}
    </div>
  );
}

function DeckCard({
  src,
  alt,
  caption,
  index,
  priority,
}: DeckItem & { priority: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_26px_55px_-28px_rgba(20,16,12,0.7)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="30vw"
        priority={priority}
        className="object-contain"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 px-4 pb-3 text-white">
        <span className="text-[0.8rem] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {caption}
        </span>
        <span className="font-display text-[0.8rem] text-white/80">{index}</span>
      </span>
    </div>
  );
}
