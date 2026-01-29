import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Works />
      <About />
      <BentoGrid />
      <Skills />
      <Testimonials />
      <Footer />
    </main>
  );
}
