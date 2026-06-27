"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Reveal } from "./motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { ScrollDeck } from "./ScrollDeck";

/* The three frames from the surgery floor. Each container's aspect ratio matches
   its file exactly, so object-cover shows the whole photograph: shrunk to fit the
   single frame, never cropped. */
const PHOTO = {
  surgery: {
    src: "/chair.webp",
    alt: "A Denlux treatment room: a blue dental chair under warm overhead light, with cabinetry and a chairside monitor",
    aspect: "aspect-[768/1365]",
    index: "01",
    caption: "The surgery",
  },
  diagnostics: {
    src: "/fr0ggy5-DwlC4fija6o-unsplash.webp",
    alt: "A full panoramic dental x-ray on a chairside monitor",
    aspect: "aspect-[3/2]",
    index: "02",
    caption: "Diagnostics",
  },
} as const;

type PhotoKey = keyof typeof PHOTO;

/* A framed photograph: a hairline border and a soft drop shadow that lifts it off
   the muddy box it overflows. Three layers of motion, each suppressed under reduced
   motion: it unveils once on scroll (a CSS clip wipe + a scale that settles from a
   slight overscale, like a print laid down), drifts with the cursor (parallax
   depth), and breathes on its own (idle drift class). The wipe direction is the
   house vertical "down" by default; "right" is reserved for the x-ray, so the
   panoramic image reads as a scan sweeping across. Square-cornered throughout. */
function Frame({
  photo,
  sizes,
  priority = false,
  depth,
  drift,
  wipe = "down",
  revealDelay = 0,
  mx,
  my,
  reduce,
  className = "",
}: {
  photo: PhotoKey;
  sizes: string;
  priority?: boolean;
  depth: number;
  drift: "drift-a" | "drift-b" | "drift-c";
  wipe?: "down" | "right";
  revealDelay?: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
  className?: string;
}) {
  const data = PHOTO[photo];
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  // The viewport trigger rides motion's own system on the figure (never the clipped
  // layer: an element clipped to nothing can suppress its own IntersectionObserver,
  // which would stop the wipe from ever firing). `onViewportEnter` flips `.is-in`;
  // the wipe + settle are CSS keyframes on inner layers, since clip-path animates
  // reliably in CSS but not via motion's JS value path.
  const [shown, setShown] = useState(false);

  return (
    <motion.figure
      style={reduce ? undefined : { x, y }}
      initial={{ opacity: 0.999 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setShown(true)}
      viewport={{ once: true, amount: 0.3 }}
      className={`group relative ${className}`}
    >
      <div className={reduce ? "relative" : `relative ${drift}`}>
        <div
          style={{ "--gd": `${revealDelay}s` } as CSSProperties}
          className={`gframe${wipe === "right" ? " gframe--right" : ""}${
            shown ? " is-in" : ""
          } relative ${data.aspect} overflow-hidden border border-surface bg-surface shadow-[0_26px_55px_-28px_rgba(20,16,12,0.7)]`}
        >
          <div className="gframe__clip absolute inset-0 overflow-hidden">
            <div className="gframe__img absolute inset-0">
              <Image
                src={data.src}
                alt={data.alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover transition-[filter] duration-500 group-hover:brightness-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.figure>
  );
}

/* Short label + paragraph. "box" sits on a muddy frame (light ink); "field" sits
   on the frosted backdrop (dark ink). */
function TextBlock({
  title,
  body,
  tone,
  className = "",
}: {
  title: string;
  body: string;
  tone: "box" | "field";
  className?: string;
}) {
  const box = tone === "box";
  return (
    <div className={className}>
      <h3
        className={`text-[0.74rem] font-semibold uppercase tracking-[0.09em] ${
          box ? "text-frame-deep-ink" : "text-accent-strong"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 text-[0.88rem] leading-relaxed ${
          box ? "text-frame-deep-ink/85" : "text-ink-soft"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function Lede() {
  return (
    <div className="max-w-[40ch]">
      <div className="flex items-center gap-3">
        <span className="h-px w-9 bg-accent" aria-hidden />
        <span className="text-[0.78rem] tracking-tight text-muted">
          Inside the practice
        </span>
      </div>
      <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,3.7rem)] leading-[1.05] tracking-[-0.02em] text-accent-strong">
        FEELS JUST LIKE HOME.
      </h2>
    </div>
  );
}

/* The four equipment frames that deck up inside the rightmost slot. Ordered from
   the wide establishing shot down to the close detail, so the stack tightens onto
   the hero handpiece. */
const STACK = [
  {
    src: "/scroll_stack/stack-4.webp",
    alt: "The overhead operatory light above the dental chair, lit",
    caption: "The light",
    index: "01",
  },
  {
    src: "/scroll_stack/stack-3.webp",
    alt: "A mirror, probe, and scaler laid out on a chairside drape",
    caption: "Hand instruments",
    index: "02",
  },
  {
    src: "/scroll_stack/stack-2.webp",
    alt: "A chairside instrument sheathed in a protective barrier on its stand",
    caption: "Sterile barrier",
    index: "03",
  },
  {
    src: "/scroll_stack/stack-1.webp",
    alt: "An endodontic handpiece resting in its charging dock on marble",
    caption: "The handpiece",
    index: "04",
  },
] as const;

/* A single framed card in the deck: hairline border, soft lift, the photograph,
   and a plate caption legible over a foot gradient. Square-cornered like the rest
   of the collage. */
function StackCard({
  src,
  alt,
  caption,
  index,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  index: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_26px_55px_-28px_rgba(20,16,12,0.7)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 86vw, 30vw"
        priority={priority}
        className="object-cover"
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

/* Mobile deck: a self-contained, touch-scroll stack (the page is never pinned on
   mobile, where the collage is taller than a screen). Reduced motion falls back to
   a calm static column, content always visible. */
function EquipmentStack({ className = "" }: { className?: string }) {
  return (
    <ScrollStack
      className={className}
      itemDistance={44}
      itemStackDistance={14}
      baseScale={0.86}
      itemScale={0.04}
      stackPosition="16%"
      scaleEndPosition="6%"
    >
      {STACK.map((s, i) => (
        <ScrollStackItem key={s.src}>
          <StackCard {...s} priority={i === 0} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}

const COPY = {
  recede: {
    title: "A room that recedes",
    body: "Soft light, real materials, and a calm built around the person in the chair.",
  },
  precision: {
    title: "Precision in detail",
    body: "Panoramic imaging and instruments chosen for accuracy, kept quietly in the background.",
  },
};

export function Gallery() {
  const reduce = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Pinning + scroll-jacking is opt-in to motion: under reduced motion (or before
  // hydration) the section keeps its natural height and the deck stays static, so
  // content is never gated behind a scroll that may not happen.
  const [pinned, setPinned] = useState(false);
  useEffect(() => setPinned(!reduce), [reduce]);

  // Progress of the page through the tall (pinned) section drives the desktop deck.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.7 };
  const mx = useSpring(rawX, spring);
  const my = useSpring(rawY, spring);

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) / r.width);
    rawY.set((e.clientY - (r.top + r.height / 2)) / r.height);
  }
  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  const fp = { mx, my, reduce } as const;
  // The tall surgery frame is the height anchor. Its width clamps against both
  // viewport width and height, so the whole collage stays inside one frame on
  // short laptops as well as tall monitors. Stage height follows from its aspect;
  // the muddy boxes and landscape frames are sized as fractions of it.
  const vars = {
    "--op-w": "clamp(214px, min(20vw, 40vh), 290px)",
    "--stage-h": "calc(var(--op-w) * 1.7773)",
  } as CSSProperties;

  return (
    <section
      id="inside"
      ref={sectionRef}
      className={`scroll-mt-16 lg:scroll-mt-[72px] relative ${
        pinned ? "lg:h-[280vh]" : ""
      }`}
      style={vars}
    >
      {/* ============================ DESKTOP: PINNED DECK ============================
          The section is tall; this stage sticks for its length so the page holds
          while scroll progress scrubs the deck, releasing once the last card lands. */}
      <div
        ref={stageRef}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`hidden lg:flex lg:min-h-screen lg:items-center lg:py-[clamp(2.75rem,6vh,6rem)] ${
          pinned ? "lg:sticky lg:top-0" : ""
        }`}
      >
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="relative rounded-xl">
          <div
            aria-hidden
            className="frost-field rounded-lg absolute -left-5 -right-5 -top-6 -bottom-6 border border-line shadow-[0_40px_90px_-55px_rgba(20,16,12,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]"
          />

          <div
            className="relative flex items-stretch gap-7"
            style={{ height: "var(--stage-h)" }}
          >
            {/* Left: the operating room (height anchor). No fade wrapper: the
                clip wipe is its entrance, so it develops in place rather than
                rising as a block. */}
            <Frame
              photo="surgery"
              sizes="22vw"
              priority
              depth={9}
              drift="drift-a"
              wipe="down"
              revealDelay={0.05}
              className="shrink-0 w-[var(--op-w)]"
              {...fp}
            />

            {/* Middle: headline, then the x-ray overflowing a muddy box that holds the copy */}
            <Reveal delay={0.1} className="flex min-w-0 flex-1 flex-col">
              <div className="flex gap-5">
                <span aria-hidden className="w-px self-stretch bg-line" />
                <Lede />
              </div>

              <div className="relative mt-auto w-[calc(var(--stage-h)*0.86)] rounded-lg bg-frame-deep p-5">
                <Frame
                  photo="diagnostics"
                  sizes="24vw"
                  depth={16}
                  drift="drift-b"
                  wipe="right"
                  revealDelay={0.22}
                  className="-mt-11 -ml-3 w-[66%]"
                  {...fp}
                />
                <TextBlock
                  tone="box"
                  title={COPY.recede.title}
                  body={COPY.recede.body}
                  className="mt-4"
                />
              </div>
            </Reveal>

            {/* Right: copy and a rule, then instruments overflowing a muddy box */}
            <Reveal delay={0.16} className="flex shrink-0 basis-[30%] flex-col">
              <TextBlock
                tone="field"
                title={COPY.precision.title}
                body={COPY.precision.body}
                className="max-w-[30ch]"
              />
              <span aria-hidden className="my-6 block h-px w-full bg-line" />
              {/* 16:9 frame matches the photos, so the whole image fits with no crop. */}
              <div className="relative mt-auto aspect-video w-full">
                <ScrollDeck items={STACK} progress={scrollYProgress} />
              </div>
            </Reveal>
          </div>
        </div>
        </div>
      </div>

      {/* ============================ MOBILE / TABLET ============================
          Normal flow, its own touch-scroll deck. The mobile collage is taller than
          a screen, so it is never pinned. */}
      <div className="lg:hidden py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="relative">
          <div
            aria-hidden
            className="frost-field absolute -left-4 -right-4 -top-5 -bottom-5 border border-line"
          />
          <div className="relative flex flex-col gap-9">
            <Reveal>
              <Lede />
            </Reveal>

            <div className="mx-auto w-full max-w-[280px]">
              <Frame
                photo="surgery"
                sizes="(max-width: 640px) 74vw, 280px"
                depth={6}
                drift="drift-a"
                wipe="down"
                revealDelay={0.05}
                {...fp}
              />
            </div>

            <Reveal delay={0.05} className="w-full bg-frame-deep p-5">
              <Frame
                photo="diagnostics"
                sizes="72vw"
                depth={6}
                drift="drift-b"
                wipe="right"
                revealDelay={0.1}
                className="-mt-10 -ml-3 w-[78%]"
                {...fp}
              />
              <TextBlock
                tone="box"
                title={COPY.recede.title}
                body={COPY.recede.body}
                className="mt-4"
              />
            </Reveal>

            <div>
              <Reveal>
                <TextBlock
                  tone="field"
                  title={COPY.precision.title}
                  body={COPY.precision.body}
                />
              </Reveal>
              <span aria-hidden className="my-5 block h-px w-full bg-line" />
              <Reveal delay={0.05} className="relative h-[88vw] max-h-[440px] w-full">
                <EquipmentStack />
              </Reveal>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
