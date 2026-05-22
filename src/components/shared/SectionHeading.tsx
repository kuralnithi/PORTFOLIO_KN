"use client";

import { motion } from "framer-motion";
import { sectionHeaderVariant, scrollViewport } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={sectionHeaderVariant}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      className="mb-8 md:mb-10"
      style={{ marginBottom: '40px' }}
    >
      {label && (
        <span className="mb-2.5 inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-[#3B82F6] uppercase">
          <span className="h-px w-6 bg-[#3B82F6]"></span>
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[#F1F5F9] sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
