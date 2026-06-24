import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./motion";
import { BookButton } from "./BookButton";

// NOTE: replace address, phone, email, and hours with the practice's real details before launch.
const HOURS = [
  { day: "Monday to Wednesday", time: "9:00 to 18:00" },
  { day: "Thursday", time: "9:00 to 20:00" },
  { day: "Friday", time: "9:00 to 17:00" },
  { day: "Saturday", time: "9:00 to 14:00" },
  { day: "Sunday", time: "Closed" },
];

export function Booking() {
  return (
    <section id="book" className="scroll-mt-16 lg:scroll-mt-[72px] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Invitation */}
        <Reveal>
          <h2 className="font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-ink">
            Come and meet us.
          </h2>
          <p className="prose-measure mt-7 text-lg leading-relaxed text-ink-soft">
            New patients are always welcome. Call or email and we will find you a
            time that works, usually within the same week. No referral needed.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BookButton size="lg" href="tel:+441134960220" />
            <a
              href="mailto:hello@denluxdental.com"
              className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent-strong"
            >
              <EnvelopeSimple size={18} weight="bold" aria-hidden />
              hello@denluxdental.com
            </a>
          </div>
        </Reveal>

        {/* Essentials */}
        <Reveal delay={0.1} className="lg:pt-3">
          <dl className="divide-y divide-line border-y border-line">
            <div className="flex gap-5 py-6">
              <dt className="mt-0.5 shrink-0 text-accent-strong">
                <MapPin size={20} weight="bold" aria-label="Address" />
              </dt>
              <dd className="text-[1.02rem] leading-relaxed text-ink">
                Denlux Dental, by H&amp;S
                <span className="block text-ink-soft">
                  14 Bridgewater Place, City Centre
                </span>
              </dd>
            </div>

            <div className="flex gap-5 py-6">
              <dt className="mt-0.5 shrink-0 text-accent-strong">
                <Clock size={20} weight="bold" aria-label="Opening hours" />
              </dt>
              <dd className="w-full">
                <ul className="space-y-2">
                  {HOURS.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 text-[0.98rem]"
                    >
                      <span className="text-ink">{h.day}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="flex gap-5 py-6">
              <dt className="mt-0.5 shrink-0 text-accent-strong">
                <Phone size={20} weight="bold" aria-label="Phone" />
              </dt>
              <dd className="text-[1.02rem] text-ink">
                <a
                  href="tel:+441134960220"
                  className="transition-colors hover:text-accent-strong"
                >
                  +44 113 4960 220
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
