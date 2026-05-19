"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/shared/TechBadge";
import { experiences, education } from "@/lib/data";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export function Experience() {
  return (
    <section id="experience" className="relative" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="Experience"
          title="Career Journey"
          subtitle="Professional experience and continuous learning path."
        />

        {/* Work Experience */}
        <div className="max-w-3xl">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
              style={{ marginBottom: '32px' }}
            >
              {/* Timeline line */}
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-transparent opacity-30" />

              {/* Timeline dot */}
              <div className="absolute top-6 left-[14px] h-5 w-5 rounded-full border-2 border-[#3B82F6] bg-[#060816]">
                <div className="absolute inset-1 rounded-full bg-[#3B82F6]" />
              </div>

              {/* Card */}
              <div
                className="rounded-2xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] transition-all duration-300 hover:border-[rgba(59,130,246,0.3)] hover:bg-[#111a3a]"
                style={{ padding: '24px', marginLeft: '56px' }}
              >
                <div className="flex flex-wrap items-start justify-between" style={{ marginBottom: '16px', gap: '12px' }}>
                  <div>
                    <div className="flex items-center animate-pulse-slow" style={{ gap: '8px' }}>
                      <Briefcase size={16} className="text-[#3B82F6]" />
                      <h3 className="text-base font-semibold text-[#F1F5F9]">{exp.role}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8]" style={{ marginTop: '4px', marginLeft: '24px' }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end" style={{ gap: '6px' }}>
                    <span className="flex items-center font-mono text-xs text-[#3B82F6]" style={{ gap: '4px' }}>
                      <Calendar size={11} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center text-xs text-[#64748B]" style={{ gap: '4px' }}>
                      <MapPin size={11} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul style={{ marginBottom: '16px', marginLeft: '24px' }}>
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} className="flex text-sm text-[#94A3B8] leading-relaxed" style={{ gap: '10px', marginBottom: '10px' }}>
                      <span className="shrink-0 rounded-full bg-[#3B82F6]" style={{ width: '5px', height: '5px', marginTop: '8px' }} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap" style={{ gap: '6px', marginLeft: '24px' }}>
                  {exp.technologies.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div className="max-w-3xl" style={{ marginTop: '56px' }}>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center"
            style={{ gap: '12px', marginBottom: '24px' }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(139,92,246,0.1)] text-[#8B5CF6]">
              <GraduationCap size={18} />
            </div>
            <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">Education</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
            style={{ gap: '16px' }}
          >
            {education.map((edu) => (
              <motion.div
                key={edu.institution}
                variants={staggerItem}
                className="group flex items-start rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] transition-all duration-300 hover:border-[rgba(59,130,246,0.3)] hover:bg-[#111a3a]"
                style={{ padding: '20px', gap: '16px' }}
              >
                <div className="flex h-2.5 w-2.5 shrink-0 rounded-full border border-[#8B5CF6] bg-[#060816]" style={{ marginTop: '5px' }}>
                  <div className="m-auto h-1 w-1 rounded-full bg-[#8B5CF6]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#F1F5F9]">{edu.degree}</h4>
                  <p className="text-sm text-[#94A3B8]" style={{ marginTop: '2px' }}>{edu.institution}</p>
                  <div className="flex flex-wrap items-center" style={{ gap: '16px', marginTop: '8px' }}>
                    <span className="flex items-center font-mono text-xs text-[#64748B]" style={{ gap: '4px' }}>
                      <Calendar size={10} />
                      {edu.duration}
                    </span>
                    <span className="flex items-center text-xs text-[#64748B]" style={{ gap: '4px' }}>
                      <MapPin size={10} />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
