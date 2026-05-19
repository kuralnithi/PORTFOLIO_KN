"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { about } from "@/lib/data";
import {
  fadeInUp,
  scrollViewport,
} from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="relative" style={{ paddingTop: '5rem', paddingBottom: '10rem' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B1020] to-[#060816]" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="About"
          title="Who I Am"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="max-w-3xl"
        >
          <p className="text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            {about.summary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
