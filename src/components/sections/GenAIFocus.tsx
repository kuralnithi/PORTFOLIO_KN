"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { genaiAreas } from "@/lib/data";
import { staggerContainer, staggerItem, scrollViewport } from "@/lib/animations";

export function GenAIFocus() {
  return (
    <section id="genai" className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B1020] to-[#060816]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="gradient-blob absolute -top-20 right-1/4 h-[400px] w-[400px] bg-[#22D3EE]" style={{ opacity: 0.08 }} />
      <div className="gradient-blob absolute -bottom-20 left-1/4 h-[300px] w-[300px] bg-[#8B5CF6]" style={{ opacity: 0.08, animationDelay: "3s" }} />

      <div className="relative z-10 section-container">
        <SectionHeading label="AI Focus" title="GenAI Expertise" subtitle="Deep specialization in building production-grade AI systems." />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
          {genaiAreas.map((area) => (
            <motion.div key={area.title} variants={staggerItem}>
              <AnimatedCard glowColor="cyan" className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(34,211,238,0.1)] to-[rgba(59,130,246,0.1)] text-[#22D3EE]" style={{ marginBottom: '12px' }}>
                  <area.icon size={20} />
                </div>
                <h3 className="font-semibold text-[#F1F5F9]" style={{ marginBottom: '6px' }}>{area.title}</h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{area.description}</p>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
