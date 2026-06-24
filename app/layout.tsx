import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { ThemeScript } from "./components/ThemeScript";
import { SmoothScroll } from "./components/SmoothScroll";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caslon",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://denluxdental.com"),
  title: "Denlux Dental | Private dental care led by Dr. Saad Ahmed",
  description:
    "Denlux is a private dental practice led by Dr. Saad Ahmed, built for families who want unhurried, careful, and honest dental care. Same-week appointments, new patients welcome.",
  keywords: [
    "private dentist",
    "family dentist",
    "cosmetic dentistry",
    "dental implants",
    "invisible aligners",
    "Denlux Dental",
    "Dr. Saad Ahmed",
  ],
  openGraph: {
    title: "Denlux Dental | Care that takes its time",
    description:
      "A private dental practice led by Dr. Saad Ahmed. Unhurried, careful, and honest care for the whole family.",
    type: "website",
    images: [{ url: "/reception.webp", width: 2752, height: 1536, alt: "Inside Denlux Dental" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf5ec" },
    { media: "(prefers-color-scheme: dark)", color: "#151d21" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${cinzel.variable} ${montserrat.variable} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
