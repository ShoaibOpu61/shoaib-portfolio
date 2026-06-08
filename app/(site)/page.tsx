import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works, { WorkCard } from "@/components/Works";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getFeaturedProjects } from "@/lib/api";

// Revalidate occasionally, or depend on Payload hooks to revalidate
export const revalidate = 60;

export default async function Home() {
  const featuredProjects = await getFeaturedProjects(5);

  return (
    <main className="relative bg-[#050505] text-foreground overflow-hidden selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Works projects={featuredProjects as unknown as WorkCard[]} />
      <About />
      <BentoGrid />
      <Skills />
      <Testimonials />
      <Footer />
    </main>
  );
}
