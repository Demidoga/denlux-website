import { Reveal } from "./motion";

export function Interlude() {
  return (
    <section className="relative overflow-hidden bg-deep py-28 sm:py-36 lg:py-44">
      {/* subtle brand-cyan glow, the one warm light in the dark room */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.02] tracking-[-0.025em] text-deep-ink">
            The opposite of a rushed appointment.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-deep-soft sm:text-xl">
            Quieter rooms. Longer visits. A dentist who explains before anything
            begins. That is the whole idea behind Denlux.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
