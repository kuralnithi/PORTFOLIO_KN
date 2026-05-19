"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/shared/TechBadge";
import { projects } from "@/lib/data";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useRef, useState, type MouseEvent } from "react";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-[#0d1328] transition-all duration-500",
        project.featured
          ? "border-[rgba(34,211,238,0.15)] hover:border-[rgba(59,130,246,0.3)]"
          : "border-[rgba(148,163,184,0.08)] hover:border-[rgba(59,130,246,0.3)]",
        "hover:bg-[#111a3a]"
      )}
      style={{ padding: '0px', overflow: 'hidden' }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Spotlight hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            project.isAI ? "rgba(34, 211, 238, 0.05)" : "rgba(59, 130, 246, 0.04)"
          }, transparent 40%)`,
        }}
      />

      {/* Featured project top glow */}
      {project.featured && (
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#22D3EE] opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-15" />
      )}

      {/* Image area — loaded live project website iframe with image/letter fallbacks */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-[rgba(148,163,184,0.05)] bg-[#070b19]">
        {project.liveUrl ? (
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#070b19]">
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="pointer-events-none absolute top-0 left-0"
              style={{
                width: '200%',
                height: '220%',
                border: 'none',
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                overflow: 'hidden',
              }}
              scrolling="no"
              loading="lazy"
            />
            {/* Transparent overlay that captures clicks/hovers and applies gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d1328] via-[#0d1328]/30 to-transparent" />
          </div>
        ) : project.image && !imgError ? (
          <div className="absolute inset-0 h-full w-full bg-[#070b19]">
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Elegant gradient overlay to blend mockup into card */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d1328] via-[#0d1328]/30 to-transparent" />
          </div>
        ) : (
          <>
            {/* Grid overlay fallback */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Project icon fallback */}
            <div
              className={cn(
                "relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold transition-transform duration-500 group-hover:scale-110",
                project.isAI
                  ? "bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(34,211,238,0.2)] text-[#22D3EE] shadow-lg shadow-cyan-500/10"
                  : "bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(59,130,246,0.15)] text-[#3B82F6]"
              )}
            >
              {project.title.charAt(0)}
            </div>
          </>
        )}

        {/* AI Badge */}
        {project.isAI && (
          <div
            className="absolute top-3 right-3 z-20 ai-badge font-semibold tracking-wider"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              fontSize: "10px",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={10} />
            AI Project
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ padding: '20px' }}>
        {/* Title + Subtitle */}
        <div style={{ marginBottom: '8px' }}>
          <h3 className="text-base font-semibold text-[#F1F5F9]">
            {project.title}
          </h3>
          <p className="text-xs text-[#64748B]">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#94A3B8]" style={{ marginBottom: '12px' }}>
          {project.description}
        </p>

        {/* Impact */}
        <div className="rounded-lg border border-[rgba(148,163,184,0.05)] bg-[#131b38]" style={{ marginBottom: '12px', padding: '10px' }}>
          <p className="text-xs text-[#64748B]">
            <span className="font-medium text-[#3B82F6]">Impact:</span>{" "}
            {project.impact}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '16px' }}>
          {project.techStack.map((tech) => (
            <TechBadge
              key={tech}
              label={tech}
              variant={project.isAI ? "ai" : "default"}
            />
          ))}
        </div>

        {/* Links */}
        <div className="flex" style={{ gap: '12px' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center rounded-lg text-xs font-medium transition-all",
                project.isAI
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25"
                  : "border border-[rgba(59,130,246,0.3)] text-[#3B82F6] hover:bg-[rgba(59,130,246,0.08)]"
              )}
              style={{ padding: '8px 16px', gap: '6px' }}
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-[rgba(148,163,184,0.08)] text-xs font-medium text-[#94A3B8] transition-all hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9]"
              style={{ padding: '8px 16px', gap: '6px' }}
            >
              <Github size={12} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B1020] to-[#060816]" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="Projects"
          title="What I've Built"
          subtitle="Production-grade applications powered by AI and modern engineering."
        />

        {/* GenAI Projects Category Heading */}
        <div className="flex items-center" style={{ gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(34,211,238,0.1)] text-[#22D3EE]">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">GenAI Projects</h3>
            <p className="text-sm text-[#94A3B8]">Multi-agent systems, Policy RAGs, and intelligent orchestrators</p>
          </div>
        </div>

        {/* Featured AI Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2"
          style={{ gap: '20px' }}
        >
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        {/* Spacer */}
        <div style={{ height: '56px' }} />

        {/* Full-Stack Projects Category Heading */}
        <div className="flex items-center" style={{ gap: '12px', marginBottom: '24px' }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(59,130,246,0.1)] text-[#3B82F6]">
            <Code2 size={18} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">Full-Stack & Web Projects</h3>
            <p className="text-sm text-[#94A3B8]">Enterprise portals, custom software systems, and integrated payment flows</p>
          </div>
        </div>

        {/* Other Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '20px' }}
        >
          {other.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
