import { Tooth } from "@phosphor-icons/react/dist/ssr";

const ITEMS = [
  "Same-week appointments",
  "Nervous patients welcome",
  "Children seen gently",
  "Cosmetic and implant work",
  "Honest second opinions",
  "Late clinics midweek",
];

export function Marquee() {
  // Items repeated so the -50% translate loops seamlessly.
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="What patients can count on"
      className="border-y border-line bg-surface/60 py-5"
    >
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 text-[0.95rem] tracking-tight text-ink-soft"
            >
              {item}
              <Tooth size={16} weight="fill" className="text-accent/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
