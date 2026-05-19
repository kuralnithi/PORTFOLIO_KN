"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { skills, techMarquee } from "@/lib/data";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="relative" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="Skills"
          title="Tech Stack"
          subtitle="Technologies I work with to build intelligent, scalable applications."
        />

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
        >
          {skills.map((category) => (
            <motion.div key={category.title} variants={staggerItem}>
              <AnimatedCard
                glowColor={category.accent}
                className={cn(
                  "h-full",
                  category.featured &&
                    "border-[rgba(34,211,238,0.15)]"
                )}
              >
                {/* Header */}
                <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      category.accent === "blue" &&
                        "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
                      category.accent === "violet" &&
                        "bg-[rgba(139,92,246,0.1)] text-[#8B5CF6]",
                      category.accent === "cyan" &&
                        "bg-[rgba(34,211,238,0.1)] text-[#22D3EE]"
                    )}
                  >
                    <category.icon size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#F1F5F9]">
                      {category.title}
                    </h3>
                    {category.featured && (
                      <span className="ai-badge rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                        Core
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap" style={{ gap: '8px' }}>
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "border font-mono transition-colors",
                        category.featured
                          ? "border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.04)] text-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)]"
                          : "border-[rgba(148,163,184,0.08)] bg-[#131b38] text-[#94A3B8] hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9]"
                      )}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "5px 12px",
                        fontSize: "12px",
                        borderRadius: "6px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Marquee Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 marquee-container"
        >
          <div className="marquee-track">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="mx-6 whitespace-nowrap font-mono text-sm text-[#64748B] opacity-40"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
