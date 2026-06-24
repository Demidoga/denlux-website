import Image from "next/image";
import { Reveal } from "./motion";

/* The two clinicians. Hassan currently reuses the practice portrait as a
   placeholder; swap `photo` for his own headshot when supplied. */
type Doctor = {
  index: string;
  name: string;
  plate: string;
  role: string;
  photo: string;
  alt: string;
  objectPosition: string;
  lead: string;
  body: string;
  specs: { label: string; value: string }[];
};

const DOCTORS: Doctor[] = [
  {
    index: "01",
    name: "Dr. Saad Ahmed",
    plate: "DR. SAAD AHMED",
    role: "Principal dentist, founder",
    photo: "/dr_cp.webp",
    alt: "Dr. Saad Ahmed, principal dentist and founder of Denlux",
    objectPosition: "center 18%",
    lead: "Good dentistry begins with a conversation, not a drill.",
    body: "Saad built Denlux around a simple observation: most people put off the dentist because they feel rushed or kept in the dark. Every visit he leads starts with listening, so you understand each option before anything begins.",
    specs: [
      { label: "Focus", value: "Cosmetic & restorative" },
      { label: "Practising since", value: "2012" },
    ],
  },
  {
    index: "02",
    name: "Dr. Hassan",
    plate: "DR. HASSAN",
    role: "Associate dentist",
    photo: "/dr.jpeg",
    alt: "Dr. Hassan, associate dentist at Denlux",
    objectPosition: "center 12%",
    lead: "The quiet appointments, where small things get caught early.",
    body: "Hassan looks after the preventive work most clinics rush. Patients tend to describe him the same way each time, gentle, unhurried, and clear about what comes next, so a routine check never feels like a production line.",
    specs: [
      { label: "Focus", value: "Preventive & hygiene" },
      { label: "Practising since", value: "2016" },
    ],
  },
];

/* A clinician portrait that lifts up and out of a bordered spec plate, casting a
   deep shadow so the card reads as physically hovering above the frame. The frame
   carries a name plate and a short spec list; the photo overlaps its top-left. */
function PortraitPlate({ doctor }: { doctor: Doctor }) {
  return (
    <figure className="relative">
      {/* Spec frame. On large screens the left half is reserved (padding) for the
          floating portrait; the plate text sits in the right half. */}
      <div className="relative flex min-h-[24rem] flex-col justify-center rounded-2xl border border-line bg-surface px-6 pb-7 pt-[19rem] sm:px-8 lg:min-h-[31rem] lg:py-9 lg:pl-[53%] lg:pr-10 lg:pt-9">
        {/* corner index */}
        <span className="font-display absolute right-5 top-5 text-[0.78rem] tracking-tight text-muted lg:right-7 lg:top-7">
          {doctor.index}
        </span>

        <div className="w-full">
          <p className="font-display text-[clamp(1.2rem,1.5vw,1.5rem)] leading-none tracking-[-0.01em] text-accent-strong">
            {doctor.plate}
          </p>
          <p className="mt-2 text-sm tracking-tight text-muted">{doctor.role}</p>

          <dl className="mt-6 border-t border-line">
            {doctor.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3"
              >
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                  {spec.label}
                </dt>
                <dd className="text-right text-[0.96rem] tracking-tight text-ink">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Floating portrait: in normal flow on mobile (absolutely placed over the
          frame's reserved top band), absolute and overhanging on large screens. */}
      <div className="absolute left-5 right-5 top-[-2rem] h-[20rem] sm:left-8 sm:right-8 lg:left-[-1.25rem] lg:right-auto lg:top-[-2.5rem] lg:bottom-12 lg:h-auto lg:w-[49%]">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_40px_70px_-28px_rgba(31,45,52,0.6)] dark:shadow-[0_46px_84px_-30px_rgba(0,0,0,0.85)]">
          <Image
            src={doctor.photo}
            alt={doctor.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 28vw"
            className="object-cover"
            style={{ objectPosition: doctor.objectPosition }}
          />
        </div>
      </div>
    </figure>
  );
}

function DoctorRow({ doctor, reverse }: { doctor: Doctor; reverse: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-14">
      {/* Prose */}
      <div
        className={`lg:col-span-5 ${
          reverse ? "lg:order-2 lg:col-start-8" : "lg:order-1"
        }`}
      >
        <Reveal>
          <p className="text-[0.96rem] font-medium tracking-tight text-accent-strong">
            {doctor.name}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="font-display mt-4 text-[clamp(1.7rem,2.7vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-ink">
            {doctor.lead}
          </h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="prose-measure mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
            {doctor.body}
          </p>
        </Reveal>
      </div>

      {/* Portrait plate */}
      <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <Reveal y={34}>
          <PortraitPlate doctor={doctor} />
        </Reveal>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-y border-line bg-bg py-24 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* Section header */}
        <div className="max-w-[42ch]">
          <Reveal>
            <p className="text-[0.96rem] font-medium tracking-tight text-accent-strong">
              The people behind Denlux
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] tracking-[-0.025em] text-ink">
              Two dentists, one standard of care.
            </h2>
          </Reveal>
        </div>

        {/* Doctor rows */}
        <div className="mt-20 flex flex-col gap-28 sm:mt-24 lg:gap-36">
          {DOCTORS.map((doctor, i) => (
            <DoctorRow key={doctor.name} doctor={doctor} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
