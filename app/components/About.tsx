import Image from "next/image";
import { Reveal } from "./motion";

type Doctor = {
  index: string;
  name: string;
  plate: string;
  role: string;
  photo: string;
  alt: string;
  objectPosition: string;
  contour: string;
  lead: string;
  body: string;
  specs: string[];
};

const DOCTORS: Doctor[] = [
  {
    index: "01",
    name: "Dr. Saad Ahmed",
    plate: "DR. SAAD AHMED",
    role: "Demo, (AFID, CMH)",
    photo: "/dr_cp.webp",
    alt: "Dr. Saad Ahmed, dentist at Denlux",
    objectPosition: "center 18%",
    contour: "/about/contour_1.png",
    lead: "Precision that comes from years of specialized training, not guesswork.",
    body: "Saad trained at the Armed Forces Institute of Dentistry, one of Pakistan's most rigorous clinical environments. His post-graduate work in endodontics and orthodontics means the full arc of your treatment, from root to alignment, stays in experienced hands.",
    specs: [
      "BDS, de' Montmorency College of Dentistry",
      "FCICSD",
      "C-Endo, C-Ortho",
    ],
  },
  {
    index: "02",
    name: "Dr. Hassan",
    plate: "DR. HASSAN",
    role: "Demo, (AFID, CMH)",
    photo: "/dr.jpeg",
    alt: "Dr. Hassan, dentist at Denlux",
    objectPosition: "center 12%",
    contour: "/about/contour_2.png",
    lead: "A clinical eye sharpened across some of Pakistan's most demanding teaching hospitals.",
    body: "Hassan trained at Bahria University Medical and Dental College and PNS Shifa in Karachi, institutions known for high patient volume and exacting standards. That background gives him a confident, efficient touch that puts anxious patients at ease.",
    specs: [
      "BDS, RDS",
      "BUMDC, PNS Shifa, Karachi",
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
          floating portrait; the plate text sits in the right half. The contour art
          backs the frame; a deep scrim keeps the spec text legible over it. */}
      <div className="relative flex min-h-[24rem] flex-col justify-center overflow-hidden rounded-2xl border border-deep-line bg-deep px-6 pb-7 pt-[19rem] sm:px-8 lg:min-h-[31rem] lg:py-9 lg:pl-[53%] lg:pr-10 lg:pt-9">
        {/* contour background art */}
        <Image
          src={doctor.contour}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 1024px) 90vw, 60vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* corner index */}
        <span className="font-display absolute right-5 top-5 z-10 text-[0.78rem] tracking-tight text-deep-soft lg:right-7 lg:top-7">
          {doctor.index}
        </span>

        <div className="relative z-10 w-full">
          <p className="font-display text-[clamp(1.2rem,1.5vw,1.5rem)] leading-none tracking-[-0.01em] text-accent">
            {doctor.plate}
          </p>
          <p className="mt-2 text-sm tracking-tight text-deep-soft">{doctor.role}</p>

          <ul className="mt-6 border-t border-deep-line">
            {doctor.specs.map((spec) => (
              <li
                key={spec}
                className="border-b border-deep-line py-3 text-[0.96rem] tracking-tight text-deep-ink"
              >
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating portrait: in normal flow on mobile (absolutely placed over the
          frame's reserved top band), absolute and overhanging on large screens. */}
      <div className="absolute left-5 right-5 top-[-2rem] h-[20rem] sm:left-8 sm:right-8 lg:left-[-1.25rem] lg:right-auto lg:top-[-2.5rem] lg:bottom-12 lg:h-auto lg:w-[49%]">
        <div className="relative h-full w-full overflow-hidden  bg-black shadow-[0_58px_80px_-30px_rgba(20,29,33,1)] dark:shadow-[0_54px_96px_-28px_rgba(0,0,0,0.95)]">
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
        <Reveal delay={0.06}>
          <h3 className="font-display mt-4 text-[clamp(1.7rem,2.7vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-accent-strong">
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
      className="relative scroll-mt-16 lg:scroll-mt-[72px] border-y border-line bg-bg py-24 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* Section header */}
        <div className="max-w-[42ch]">
          <Reveal delay={0.06}>
            <h1 className="font-display font-bold text-[clamp(2.4rem,4.6vw,3.7rem)] leading-[1.0] tracking-[-0.02em] text-ink">
              ABOUT US
            </h1>
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
