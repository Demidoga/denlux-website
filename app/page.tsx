import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Interlude } from "./components/Interlude";
import { Testimonials } from "./components/Testimonials";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Interlude />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
