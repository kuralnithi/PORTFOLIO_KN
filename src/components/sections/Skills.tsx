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

      {/* Subtle floating AI Synapse background nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
        <svg className="w-full h-full opacity-35" viewBox="0 0 1000 600">
          {/* Floating Bubble A (Cyan) */}
          <motion.circle
            cx={200}
            cy={250}
            r={10}
            fill="rgba(34, 211, 238, 0.08)"
            stroke="rgba(34, 211, 238, 0.5)"
            strokeWidth="1"
            animate={{
              cx: [200, 215, 185, 200],
              cy: [250, 235, 265, 250],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.2))" }}
          />
          {/* Floating Bubble B (Violet) */}
          <motion.circle
            cx={800}
            cy={350}
            r={12}
            fill="rgba(139, 92, 246, 0.08)"
            stroke="rgba(139, 92, 246, 0.5)"
            strokeWidth="1"
            animate={{
              cx: [800, 780, 820, 800],
              cy: [350, 370, 330, 350],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.2))" }}
          />
          {/* Floating Bubble C (Blue) */}
          <motion.circle
            cx={500}
            cy={120}
            r={8}
            fill="rgba(59, 130, 246, 0.08)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
            animate={{
              cx: [500, 515, 485, 500],
              cy: [120, 135, 105, 120],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.2))" }}
          />
          {/* Floating Bubble D (Cyan Small) */}
          <motion.circle
            cx={350}
            cy={420}
            r={6}
            fill="rgba(34, 211, 238, 0.06)"
            stroke="rgba(34, 211, 238, 0.4)"
            strokeWidth="1"
            animate={{
              cx: [350, 360, 340, 350],
              cy: [420, 410, 430, 420],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(34, 211, 238, 0.15))" }}
          />
          {/* Floating Bubble E (Violet Small) */}
          <motion.circle
            cx={700}
            cy={180}
            r={9}
            fill="rgba(139, 92, 246, 0.06)"
            stroke="rgba(139, 92, 246, 0.4)"
            strokeWidth="1"
            animate={{
              cx: [700, 685, 715, 700],
              cy: [180, 195, 165, 180],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(139, 92, 246, 0.15))" }}
          />

          {/* Delicate glass synapse thread lines connecting them */}
          <motion.path
            d="M 200 250 Q 500 120 800 350"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
            strokeDasharray="4 12"
            animate={{ strokeDashoffset: [0, -80] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 500 120 Q 700 180 800 350"
            fill="none"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
            strokeDasharray="3 9"
            animate={{ strokeDashoffset: [0, 60] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <SectionHeading
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
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="flex justify-center w-full"
            >
              {/* Large Rectangular Card Container */}
              <div
                className={cn(
                  "rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:scale-[1.02] flex flex-col w-full",
                  category.accent === "cyan" && "border-[rgba(34,211,238,0.12)] hover:border-[#22D3EE]/40 bg-[#0d1328]/35 shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                  category.accent === "violet" && "border-[rgba(139,92,246,0.12)] hover:border-[#8B5CF6]/40 bg-[#0d1328]/35 shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                  category.accent === "blue" && "border-[rgba(59,130,246,0.12)] hover:border-[#3B82F6]/40 bg-[#0d1328]/35 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                )}
                style={{ padding: '24px', minHeight: '220px' }}
              >
                {/* Header */}
                <div className="flex items-center gap-3" style={{ marginBottom: '20px' }}>
                  {/* Icon Box */}
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-transform duration-500",
                      category.accent === "blue" && "bg-[rgba(59,130,246,0.1)] border border-[#3B82F6]/20 text-[#3B82F6]",
                      category.accent === "violet" && "bg-[rgba(139,92,246,0.1)] border border-[#8B5CF6]/20 text-[#8B5CF6]",
                      category.accent === "cyan" && "bg-[rgba(34,211,238,0.1)] border border-[#22D3EE]/20 text-[#22D3EE]"
                    )}
                  >
                    <category.icon size={20} />
                  </div>
                  {/* Title + Core Badge */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-[#F1F5F9] tracking-tight">
                      {category.title}
                    </h3>
                    {category.featured && (
                      <span className="bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[#22D3EE]/30 rounded px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-widest leading-none">
                        Core
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub Skills */}
                <div className="flex flex-wrap" style={{ gap: '10px' }}>
                  {category.skills.map((skill) => {
                    return (
                      <span
                        key={skill}
                        className={cn(
                          "border font-mono text-[10px] rounded-lg flex items-center justify-center whitespace-nowrap shadow-sm transition-all duration-300 pointer-events-auto select-none",
                          category.featured
                            ? "border-[rgba(34,211,238,0.15)] bg-[rgba(13,19,40,0.5)] text-[#22D3EE] hover:bg-[rgba(34,211,238,0.15)] hover:border-[#22D3EE] hover:shadow-[0_0_8px_rgba(34,211,238,0.15)]"
                            : category.accent === "violet"
                            ? "border-[rgba(139,92,246,0.15)] bg-[rgba(13,19,40,0.5)] text-[#C084FC] hover:bg-[rgba(139,92,246,0.15)] hover:border-[#8B5CF6] hover:shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                            : "border-[rgba(59,130,246,0.15)] bg-[rgba(13,19,40,0.5)] text-[#93C5FD] hover:bg-[rgba(59,130,246,0.15)] hover:border-[#3B82F6] hover:shadow-[0_0_8px_rgba(59,130,246,0.15)]"
                        )}
                        style={{
                          padding: "6px 12px",
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Marquee Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="marquee-container"
          style={{ marginTop: '4rem' }}
        >
          <div className="marquee-track flex items-center" style={{ gap: '3rem', display: 'flex', alignItems: 'center' }}>
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="flex items-center font-mono text-sm text-[#64748B] opacity-50 whitespace-nowrap"
                style={{ gap: '1.5rem', display: 'flex', alignItems: 'center' }}
              >
                <span>{tech}</span>
                <span className="text-[#64748B] opacity-40 text-xs select-none">•</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
