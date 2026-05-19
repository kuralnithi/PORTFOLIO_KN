import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { GenAIFocus } from "@/components/sections/GenAIFocus";
import { Contact } from "@/components/sections/Contact";
import { FloatingResume } from "@/components/shared/FloatingResume";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GenAIFocus />
        <Contact />
      </main>
      <Footer />
      <FloatingResume />
    </>
  );
}
