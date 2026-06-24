import Image from "next/image";
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BookButton } from "./BookButton";

const NAV = [
  { label: "The practice", href: "#about" },
  { label: "Treatments", href: "#services" },
  { label: "Inside Denlux", href: "#inside" },
  { label: "Visit", href: "#book" },
];

const SOCIAL = [
  { label: "Denlux on Instagram", href: "#", Icon: InstagramLogo },
  { label: "Denlux on Facebook", href: "#", Icon: FacebookLogo },
  { label: "Message Denlux on WhatsApp", href: "#", Icon: WhatsappLogo },
];

export function Footer() {
  return (
    <footer className="bg-deep text-deep-ink">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-24">
        {/* Final invitation */}
        <div className="flex flex-col gap-8 border-b border-deep-line pb-14 md:flex-row md:items-end md:justify-between">
          <p className="font-display max-w-xl text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08] tracking-[-0.02em]">
            Dentistry your family can look forward to.
          </p>
          <BookButton size="lg" href="#book" />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo-dark.png"
              alt="Denlux Dental"
              width={1584}
              height={718}
              className="h-8 w-auto"
            />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-deep-soft">
              A private dental practice led by Dr. Saad Ahmed. Unhurried,
              careful, and honest care.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[0.8rem] font-semibold tracking-wide text-deep-soft">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.98rem] text-deep-ink/90 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.8rem] font-semibold tracking-wide text-deep-soft">
              Visit
            </h3>
            <address className="mt-4 space-y-3 not-italic text-[0.98rem] text-deep-ink/90">
              <p className="leading-relaxed">
                14 Bridgewater Place
                <span className="block text-deep-soft">City Centre</span>
              </p>
              <p>
                <a href="tel:+441134960220" className="transition-colors hover:text-accent">
                  +44 113 4960 220
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@denluxdental.com"
                  className="transition-colors hover:text-accent"
                >
                  hello@denluxdental.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-[0.8rem] font-semibold tracking-wide text-deep-soft">
              Hours
            </h3>
            <ul className="mt-4 space-y-3 text-[0.98rem] text-deep-ink/90">
              <li className="flex justify-between gap-3">
                <span>Mon to Fri</span>
                <span className="text-deep-soft">9 to 6</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Thursday</span>
                <span className="text-deep-soft">until 8</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Saturday</span>
                <span className="text-deep-soft">9 to 2</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Sunday</span>
                <span className="text-deep-soft">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-deep-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-deep-soft">
            © 2026 Denlux Dental, by H&amp;S. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-deep-line text-deep-ink/85 transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
