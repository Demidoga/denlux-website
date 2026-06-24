import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./motion";
import { BookButton } from "./BookButton";

const CONTOUR = "/services/Gemini_Generated_Image_kw4ty6kw4ty6kw4t.png";
const AT_WORK = "/services/Gemini_Generated_Image_lg9wbmlg9wbmlg9w.png";

const TREATMENTS = [
  {
    no: "01",
    name: "General & preventive",
    desc: "Routine examinations, hygiene, and the small fixes that stop trouble before it starts.",
    detail: "The visits you barely remember are the ones doing the most work.",
  },
  {
    no: "02",
    name: "Cosmetic dentistry",
    desc: "Whitening, veneers, and bonding shaped to look like you on a good day, never like someone else.",
    detail: "We plan the result with you before a single tooth is touched.",
  },
  {
    no: "03",
    name: "Dental implants",
    desc: "Permanent replacements for missing teeth, planned tooth by tooth and placed to last.",
    detail: "We map the bite first, so the new tooth behaves like the old one.",
  },
  {
    no: "04",
    name: "Children's dentistry",
    desc: "Gentle first visits that teach a child the dentist is nothing to fear.",
    detail: "Paced to their nerves rather than our schedule.",
  },
  {
    no: "05",
    name: "Emergency care",
    desc: "Same-day relief when something cracks, aches, or comes loose.",
    detail: "You call, we make room, the pain stops.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-surface/50 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* ============ LEFT: the pinned rail ============ */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <h2 className="font-display font-bold text-[clamp(2.4rem,4.6vw,3.7rem)] leading-[1.0] tracking-[-0.02em] text-accent-strong">
                WHAT WE PROVIDE.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="prose-measure mt-5 text-lg leading-relaxed text-ink-soft">
                A short list, kept short on purpose. Each treatment here is one
                Dr. Saad performs often and refines constantly. When something
                falls outside it, we will tell you and point you to who does it
                best.
              </p>
            </Reveal>

            {/* The slate vignette, shrunk to a compact landscape card. */}
            <Reveal delay={0.12} className="mt-8 sm:mt-10">
              <div className="relative overflow-hidden rounded-2xl border border-deep-line bg-deep shadow-[0_34px_80px_-46px_rgba(20,16,12,0.7)]">
                <Image
                  src={CONTOUR}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-center"
                />
                <div aria-hidden className="absolute inset-0 bg-black/25" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent sm:bg-gradient-to-l sm:from-black/70 sm:via-black/15 sm:to-transparent"
                />

                <div className="relative grid grid-cols-1 gap-5 p-5 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6">
                  <figure className="sm:col-span-5">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-deep-line shadow-[0_22px_50px_-32px_rgba(0,0,0,0.85)] sm:aspect-[4/5]">
                      <Image
                        src={AT_WORK}
                        alt="Dr. Saad Ahmed working under magnification at the chair, gloved hands steady over a patient"
                        fill
                        sizes="(max-width: 1024px) 90vw, 22vw"
                        className="object-cover object-[50%_30%]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent"
                      />
                      <figcaption className="absolute bottom-3 left-3.5 text-[0.74rem] tracking-tight text-deep-ink/90">
                        Dr. Saad Ahmed, mid&#8209;treatment
                      </figcaption>
                    </div>
                  </figure>

                  <div className="relative sm:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-accent" aria-hidden />
                      <span className="text-[0.78rem] tracking-tight text-deep-soft">
                        Inside every visit
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.14] tracking-[-0.02em] text-deep-ink">
                      Warm light, real materials, unhurried hands.
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-deep-ink/85">
                      Soft lighting, considered materials, and instruments chosen
                      for accuracy over show.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ============ RIGHT: the treatment index ============
              A card, but the index inside it carries the weight: large numerals
              and serif names with a hard scale jump over the body. The cyan
              accent stays dormant until a row is engaged, then rewards the
              hover. */}
          <div className="mt-12 lg:col-span-6 lg:mt-0">
            <div className="rounded-2xl border border-line bg-bg/60 p-6 shadow-[0_24px_60px_-44px_rgba(31,45,52,0.45)] sm:p-9 dark:shadow-[0_30px_70px_-48px_rgba(0,0,0,0.7)]">
              <div className="flex items-baseline justify-between border-b border-line pb-5">
                <span className="text-[0.78rem] uppercase tracking-[0.16em] text-muted">
                  Treatments
                </span>
                <span className="font-display text-lg text-ink">
                  Five, done properly
                </span>
              </div>

              <ul>
                {TREATMENTS.map((t, i) => (
                  <Reveal as="li" key={t.name} delay={i * 0.05}>
                    <div className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-7 transition-colors duration-300 hover:bg-accent/[0.05] sm:gap-x-7 sm:py-8">
                      <span className="font-display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-none tabular-nums text-muted transition-colors duration-300 group-hover:text-accent-strong">
                        {t.no}
                      </span>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-[clamp(1.5rem,2.7vw,2.15rem)] leading-[1.06] tracking-[-0.015em] text-balance text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                            {t.name}
                          </h3>
                          <ArrowRight
                            size={24}
                            weight="bold"
                            className="mt-2 shrink-0 text-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                            aria-hidden
                          />
                        </div>
                        <p className="mt-3 text-[1.02rem] leading-snug text-ink-soft">
                          {t.desc}
                        </p>
                        <p className="mt-1.5 text-[0.95rem] leading-snug text-muted">
                          {t.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>

              {/* Closing note + the single booking CTA, reached after the list scrolls. */}
              <Reveal className="pt-8">
                <p className="font-display text-2xl leading-snug tracking-[-0.01em] text-ink">
                  Not sure where to begin?
                </p>
                <p className="prose-measure mt-2 text-[1rem] leading-relaxed text-ink-soft">
                  Start with a consultation. We will look, listen, and map out
                  your options before anything is decided.
                </p>
                <div className="mt-6">
                  <BookButton />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
