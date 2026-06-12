"use client";

import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Code2,
  Linkedin,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  Cpu,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/shared/TechBadge";
import { projects } from "@/lib/data";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect, type MouseEvent, type ComponentType } from "react";

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-[#0d1328]/95 backdrop-blur-md transition-all duration-500",
        "border-[rgba(148,163,184,0.12)] hover:border-[rgba(59,130,246,0.35)]",
        "shadow-[0_-12px_40px_rgba(0,0,0,0.6),_0_20px_50px_rgba(0,0,0,0.7)]"
      )}
      style={{ padding: '0px', overflow: 'hidden' }}
    >
      {/* Spotlight hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.05), transparent 40%)`,
          zIndex: 5,
        }}
      />

      <div className="grid grid-cols-12 w-full">
        {/* Left Side: Mockup / Image Preview */}
        <div className="relative col-span-12 md:col-span-5 h-48 md:h-auto min-h-[220px] overflow-hidden border-b md:border-b-0 md:border-r border-[rgba(148,163,184,0.08)] bg-[#070b19]">
          {project.liveUrl ? (
            <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#070b19]">
              <iframe
                src={project.liveUrl}
                title={project.title}
                className="pointer-events-none absolute top-0 left-0"
                style={{
                  width: '200%',
                  height: '200%',
                  border: 'none',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  overflow: 'hidden',
                }}
                scrolling="no"
                loading="lazy"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-[#0d1328] via-[#0d1328]/10 to-transparent" />
            </div>
          ) : project.image && !imgError ? (
            <div className="absolute inset-0 h-full w-full bg-[#070b19]">
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-[#0d1328] via-[#0d1328]/10 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-[#070b19]">
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(59,130,246,0.15)] text-[#3B82F6]">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Content details */}
        <div 
          className="col-span-12 md:col-span-7 flex flex-col justify-between relative z-10"
          style={{ padding: 'clamp(24px, 4.5vw, 36px)' }}
        >
          <div>
            {/* Title + Subtitle */}
            <div style={{ marginBottom: '12px' }}>
              <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs text-cyan-400 mt-1 font-semibold tracking-wide">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#94A3B8]" style={{ marginBottom: '16px' }}>
              {project.description}
            </p>

            {/* Impact */}
            <div className="rounded-xl border border-[rgba(148,163,184,0.06)] bg-[#131b38]/60 backdrop-blur-sm" style={{ marginBottom: '16px', padding: '12px' }}>
              <p className="text-xs text-[#94A3B8]">
                <span className="font-semibold text-[#3B82F6] mr-1">Impact:</span>{" "}
                {project.impact}
              </p>
            </div>
          </div>

          <div>
            {/* Tech Stack */}
            <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '20px' }}>
              {project.techStack.map((tech) => (
                <TechBadge
                  key={tech}
                  label={tech}
                  variant={project.isAI ? "ai" : "default"}
                />
              ))}
            </div>

            {/* Divider */}
            <hr className="border-[rgba(148,163,184,0.08)]" style={{ marginBottom: '18px' }} />

            {/* Links */}
            <div className="flex flex-wrap items-center" style={{ gap: '10px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                    project.isAI
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25"
                      : "border border-[rgba(59,130,246,0.3)] text-[#3B82F6] hover:bg-[rgba(59,130,246,0.08)]"
                  )}
                  style={{ padding: '9px 16px', gap: '8px' }}
                >
                  <ExternalLink size={14} />
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] text-xs font-semibold text-[#94A3B8] transition-all hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9] whitespace-nowrap"
                  style={{ padding: '9px 16px', gap: '8px' }}
                >
                  <Github size={14} />
                  {project.githubBackendUrl ? "Frontend" : "Code"}
                </a>
              )}
              {project.githubBackendUrl && (
                <a
                  href={project.githubBackendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] text-xs font-semibold text-[#94A3B8] transition-all hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9] whitespace-nowrap"
                  style={{ padding: '9px 16px', gap: '8px' }}
                >
                  <Github size={14} />
                  Backend
                </a>
              )}
              {project.linkedinPostUrl && (
                <a
                  href={project.linkedinPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] text-xs font-semibold text-[#94A3B8] transition-all hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9] whitespace-nowrap"
                  style={{ padding: '9px 16px', gap: '8px' }}
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedCard({ 
  project, 
  index, 
  total 
}: { 
  project: (typeof projects)[0]; 
  index: number; 
  total: number; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate high-end scaling down and subtle fading for stacked cards underneath
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <motion.div
      ref={containerRef}
      className="sticky w-full"
      style={{
        top: `calc(120px + ${index * 48}px)`,
        zIndex: index + 1,
        paddingBottom: '24px',
      }}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "top center",
        }}
      >
        <ProjectCard project={project} />
      </motion.div>
    </motion.div>
  );
}

function FeaturedProjectCard({ 
  project, 
  onClick, 
  onInteract 
}: { 
  project: (typeof projects)[0]; 
  onClick: () => void; 
  onInteract?: () => void;
}) {
  const [phase, setPhase] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setPhase(0);
  }, [project.title]);

  const currentFace = phase % 3;
  const isContainerBackward = phase % 2 === 1;
  const activeFaceTransform = isContainerBackward ? 'rotateY(180deg)' : 'rotateY(0deg)';

  // Filter links for synapse visualization
  const availableLinks = [
    project.liveUrl && { label: "Live Website", href: project.liveUrl, icon: ExternalLink },
    project.githubUrl && { label: project.githubBackendUrl ? "Frontend Code" : "Source Code", href: project.githubUrl, icon: Github },
    project.githubBackendUrl && { label: "Backend Code", href: project.githubBackendUrl, icon: Github },
    project.linkedinPostUrl && { label: "LinkedIn Post", href: project.linkedinPostUrl, icon: Linkedin },
  ].filter(Boolean) as { label: string; href: string; icon: ComponentType<{ size?: number; className?: string }> }[];

  const glowColor = project.isAI ? "rgba(34, 211, 238, 0.25)" : "rgba(59, 130, 246, 0.25)";
  const glowColorInner = project.isAI ? "rgba(34, 211, 238, 0.15)" : "rgba(59, 130, 246, 0.15)";
  const accentColor = project.isAI ? "#22D3EE" : "#3B82F6";

  return (
    <div className="relative my-6 flex justify-center">
      {/* 1. Outermost fixed-size wrapper to prevent collapse in any browser */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0 animate-pulse-slow"
        style={{
          width: '340px',
          height: '340px',
          perspective: '1200px',
        }}
      >
        {/* 2. 3D Rotating card parent */}
        <motion.div
          animate={{ rotateY: phase * 180 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
          }}
          className="relative"
        >
          {/* ==================== FACE 0: SHOWCASE IMAGE BUBBLE ==================== */}
          <motion.div
            animate={{ 
              borderRadius: ["50% 50% 50% 50%", "47% 53% 49% 51%", "51% 49% 52% 48%", "50% 50% 50% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => {
              onInteract?.();
              onClick();
            }}
            className="absolute inset-0 w-full h-full overflow-hidden bg-[#070b19] border flex flex-col justify-center items-center shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-[1.01] transition-transform duration-300"
            style={{
              backfaceVisibility: 'hidden',
              transform: activeFaceTransform,
              zIndex: currentFace === 0 ? 10 : 0,
              opacity: currentFace === 0 ? 1 : 0,
              transition: 'opacity 0.25s, transform 0.25s',
              borderColor: accentColor + "30",
              boxShadow: `0 0 25px ${glowColorInner}, inset 0 0 20px ${glowColorInner}`,
            }}
          >
            {/* Main Showcase Image */}
            {project.image && !imgError ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                {/* Spherical Overlay Shadow for 3D depth */}
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, transparent 30%, rgba(13,19,40,0.85) 90%)`
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-[#0d1328] flex items-center justify-center">
                <div className="absolute inset-0 grid-pattern opacity-15" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(34,211,238,0.2)] text-2xl font-bold text-[#22D3EE] shadow-lg shadow-cyan-500/10">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}

            {/* Glossy Highlight Ring for Bubble Effect */}
            <div className="absolute top-[6%] left-[10%] w-[30%] h-[15%] rounded-full bg-gradient-to-b from-white/20 to-transparent rotate-[-25deg] pointer-events-none z-20" />
            <div className="absolute bottom-[8%] right-[12%] w-[15%] h-[8%] rounded-full bg-gradient-to-t from-white/10 to-transparent rotate-[35deg] pointer-events-none z-20" />

            {/* Glassmorphic center/bottom drawer info */}
            <div className="absolute inset-x-0 bottom-10 mx-auto w-[82%] bg-[#0d1328]/90 backdrop-blur-md border border-[rgba(148,163,184,0.18)] rounded-2xl p-4 text-center z-10 shadow-lg select-none">
              <h3 className="text-base font-bold text-[#F1F5F9]">{project.title}</h3>
              <p className="text-[11px] text-[#94A3B8] mt-1">{project.subtitle}</p>
              <div className="inline-flex items-center gap-1 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25 rounded-full px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider mt-2">
                <Sparkles size={8} className="animate-pulse" /> AI Project
              </div>
            </div>
          </motion.div>

          {/* ==================== FACE 1: DETAILS INFO BUBBLE ==================== */}
          <motion.div
            animate={{ 
              borderRadius: ["50% 50% 50% 50%", "52% 48% 53% 47%", "48% 52% 47% 53%", "50% 50% 50% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => {
              onInteract?.();
              onClick();
            }}
            className="absolute inset-0 w-full h-full overflow-hidden p-6 text-center flex flex-col justify-center items-center border bg-[#0d1328] shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-[1.01] transition-transform duration-300"
            style={{
              backfaceVisibility: 'hidden',
              transform: activeFaceTransform,
              zIndex: currentFace === 1 ? 10 : 0,
              opacity: currentFace === 1 ? 1 : 0,
              transition: 'opacity 0.25s, transform 0.25s',
              borderColor: accentColor + "30",
              boxShadow: `0 0 25px ${glowColorInner}, inset 0 0 20px ${glowColorInner}`,
            }}
          >
            {/* Glossy Highlight Ring */}
            <div className="absolute top-[6%] left-[10%] w-[30%] h-[15%] rounded-full bg-gradient-to-b from-white/15 to-transparent rotate-[-25deg] pointer-events-none z-20" />

            <div className="select-none flex flex-col items-center w-full z-10">
              <h3 className="text-base font-bold text-[#F1F5F9]">{project.title}</h3>
              <p className="text-[10px] text-[#64748B] mt-0.5">{project.subtitle}</p>

              <p className="text-[11px] leading-relaxed text-[#94A3B8] max-w-[240px] my-3">
                {project.description}
              </p>

              {/* Impact indicator */}
              <div className="rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#131b38]/80 backdrop-blur-sm p-2.5 w-[240px] mb-3">
                <p className="text-[10px] text-[#94A3B8] text-center">
                  <span className="font-semibold text-[#3B82F6]">Impact:</span>{" "}
                  {project.impact}
                </p>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap justify-center gap-1 max-w-[240px]">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[8.5px] font-mono rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(34,211,238,0.05)] text-[#22D3EE] shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ==================== FACE 2: INTERACTIVE LINKS BUBBLE ==================== */}
          <motion.div
            animate={{ 
              borderRadius: ["50% 50% 50% 50%", "49% 51% 48% 52%", "51% 49% 52% 48%", "50% 50% 50% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-full h-full overflow-hidden border bg-[#0d1328] flex items-center justify-center p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: activeFaceTransform,
              zIndex: currentFace === 2 ? 10 : 0,
              opacity: currentFace === 2 ? 1 : 0,
              transition: 'opacity 0.25s, transform 0.25s',
              borderColor: "rgba(139,92,246,0.3)",
              boxShadow: `0 0 25px rgba(139,92,246,0.15), inset 0 0 20px rgba(139,92,246,0.15)`,
            }}
          >
            {/* Glossy Highlight Ring */}
            <div className="absolute top-[6%] left-[10%] w-[30%] h-[15%] rounded-full bg-gradient-to-b from-white/15 to-transparent rotate-[-25deg] pointer-events-none z-20" />

            {/* Central core node */}
            <div 
              onClick={() => {
                onInteract?.();
                onClick();
              }}
              className="absolute flex flex-col items-center justify-center rounded-full pointer-events-auto cursor-pointer z-20 text-center select-none w-20 h-20 bg-[#131b38] border border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse-slow hover:border-[#22D3EE] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
            >
              <Sparkles size={16} className="text-[#8B5CF6] mb-1 animate-pulse" />
              <span className="text-[10px] font-bold text-[#F1F5F9]">{project.title}</span>
            </div>

            {/* SVG connection wires from core to link satellites */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {availableLinks.map((link, index) => {
                const total = availableLinks.length;
                const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
                const radius = 95;
                const x = 170 + radius * Math.cos(angle);
                const y = 170 + radius * Math.sin(angle);

                return (
                  <g key={`link-wire-${index}`}>
                    <line
                      x1={170}
                      y1={170}
                      x2={x}
                      y2={y}
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1.2"
                      strokeDasharray="4 6"
                    />
                    {/* Synaptic traveling impulse */}
                    <motion.circle
                      cx={170}
                      cy={170}
                      r={2.5}
                      fill="#8B5CF6"
                      animate={{
                        cx: [170, x],
                        cy: [170, y],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: index * 0.35,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ filter: "drop-shadow(0 0 4px #8B5CF6)" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Link Satellites (Clickable Bubbles) */}
            {availableLinks.map((link, index) => {
              const total = availableLinks.length;
              const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
              const radius = 95;
              const x = 170 + radius * Math.cos(angle);
              const y = 170 + radius * Math.sin(angle);

              const floatDuration = 3 + index * 0.4;

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute z-10 h-10 w-10 rounded-full bg-[#131b38] border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-300 pointer-events-auto shadow-md"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    x: [0, Math.cos(angle) * 3, 0],
                    y: [0, Math.sin(angle) * 3, 0],
                  }}
                  transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  title={link.label}
                >
                  <link.icon size={16} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* 3. Small floating rotate button - rendered OUTSIDE the 3D container, so it never gets mirrored! */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInteract?.();
            setPhase((p) => p + 1);
          }}
          className={cn(
            "absolute h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg pointer-events-auto hover:scale-110 active:scale-95 z-30",
            currentFace === 0 && "bg-[#3B82F6] hover:bg-[#22D3EE] text-white shadow-blue-500/25",
            currentFace === 1 && "bg-[#22D3EE] hover:bg-[#8B5CF6] text-white shadow-cyan-500/25",
            currentFace === 2 && "bg-[#8B5CF6] hover:bg-[#3B82F6] text-white shadow-purple-500/25"
          )}
          style={{
            bottom: '48px',
            right: '48px',
          }}
          title="Rotate Bubble"
        >
          <RotateCw size={16} className="animate-spin-slow" />
        </button>
      </motion.div>
    </div>
  );
}

function NavArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/30 bg-[#0d1328]/80 text-[#22D3EE] backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-90 flex-shrink-0"
      aria-label={`${direction === "left" ? "Previous" : "Next"} project`}
    >
      {/* Concentric glowing shockwave ripples */}
      <span className="absolute inset-0 rounded-full border border-cyan-400/0 transition-all duration-300 group-hover:animate-ping opacity-75" />
      
      {/* Framer motion concentric rings for beautiful shock effect */}
      <motion.div
        className="absolute inset-[-10px] rounded-full border border-cyan-500/20 opacity-0 pointer-events-none"
        animate={{
          scale: [1, 1.4],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-[-20px] rounded-full border border-cyan-500/10 opacity-0 pointer-events-none"
        animate={{
          scale: [1, 1.6],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 1.8,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-[-30px] rounded-full border border-cyan-500/5 opacity-0 pointer-events-none"
        animate={{
          scale: [1, 1.8],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 1.8,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      <Icon size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}

interface ProjectDetailsModalProps {
  project: (typeof projects)[0];
  isOpen: boolean;
  onClose: () => void;
}

function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation for escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const accentColor = project.isAI ? "#22D3EE" : "#3B82F6";
  const glowColorInner = project.isAI ? "rgba(34, 211, 238, 0.12)" : "rgba(59, 130, 246, 0.12)";
  const glowColorOuter = project.isAI ? "rgba(34, 211, 238, 0.2)" : "rgba(59, 130, 246, 0.2)";

  const availableLinks = [
    project.liveUrl && { label: "Live Website", href: project.liveUrl, icon: ExternalLink },
    project.githubUrl && { label: project.githubBackendUrl ? "Frontend Code" : "Source Code", href: project.githubUrl, icon: Github },
    project.githubBackendUrl && { label: "Backend Code", href: project.githubBackendUrl, icon: Github },
    project.linkedinPostUrl && { label: "LinkedIn Post", href: project.linkedinPostUrl, icon: Linkedin },
  ].filter(Boolean) as { label: string; href: string; icon: ComponentType<{ size?: number; className?: string }> }[];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]/90 backdrop-blur-xl p-4 md:p-8 overflow-y-auto">
        {/* Backdrop clickable space to close */}
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.1, borderRadius: "50%" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            borderRadius: ["3rem 3rem 3rem 3rem", "3.3rem 2.7rem 3.2rem 2.8rem", "2.8rem 3.2rem 2.7rem 3.3rem", "3rem 3rem 3rem 3rem"]
          }}
          exit={{ opacity: 0, scale: 0.1, borderRadius: "50%" }}
          transition={{
            borderRadius: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            default: {
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1] // premium bubble spring pop ease!
            }
          }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#090d1f]/95 border border-cyan-500/20 shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 py-6 md:py-8 px-0 flex flex-col animate-wobble-slow"
          style={{
            boxShadow: `0 0 50px ${glowColorOuter}, inset 0 0 40px ${glowColorInner}`,
          }}
        >
          {/* Glossy highlight overlays for wobbly bubble visual depth */}
          <div className="absolute top-[1.5%] left-[3%] w-[45%] h-[15%] rounded-full bg-gradient-to-b from-white/8 to-transparent rotate-[-10deg] pointer-events-none z-20" />
          <div className="absolute bottom-[3%] right-[5%] w-[25%] h-[8%] rounded-full bg-gradient-to-t from-white/4 to-transparent rotate-[18deg] pointer-events-none z-20" />

          {/* Close Bubble on Top Right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 z-30"
            aria-label="Close bubble details"
          >
            <X size={22} />
          </button>

          {/* Scrollable details container */}
          <div 
            className="flex-1 overflow-y-auto relative z-10 w-full no-scrollbar-container"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Local CSS override to hide webkit scrollbar */}
            <style dangerouslySetInnerHTML={{__html: `
              .no-scrollbar-container::-webkit-scrollbar {
                display: none !important;
              }
            `}} />
            {/* Inner padding wrapper to prevent scroll container layout bugs */}
            <div
              style={{
                paddingLeft: 'clamp(48px, 6vw, 80px)',
                paddingRight: 'clamp(24px, 4vw, 64px)',
                paddingTop: 'clamp(48px, 6vw, 80px)',
                paddingBottom: '64px'
              }}
              className="w-full flex flex-col"
            >
              {/* Header info */}
              <div className="mb-6 text-left">
                <div className="inline-flex items-center gap-1 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25 rounded-full pl-4 pr-5 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-3 animate-pulse">
                  <Sparkles size={10} /> Live AI Environment
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">{project.title}</h2>
                <p className="text-sm sm:text-base text-cyan-400 mt-2 font-medium">{project.subtitle}</p>
              </div>

              {/* Layout Grid */}
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left Column: Interactive Live Site Bubble Preview (Col Span 5) */}
                <div className="md:col-span-5 flex flex-col items-center gap-6">
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" /> Live Preview Bubble (Scroll & Explore)
                  </div>
                  
                  <motion.div 
                    animate={{ 
                      borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 50% 50% / 50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative aspect-square w-full max-w-[260px] overflow-hidden border border-cyan-500/35 shadow-[0_0_40px_rgba(34,211,238,0.25)] bg-[#040816] group"
                  >
                    {project.liveUrl ? (
                      <div className="w-full h-full relative overflow-hidden pointer-events-auto">
                        <iframe 
                          src={project.liveUrl} 
                          title={`Live Preview of ${project.title}`}
                          className="w-[150%] h-[150%] absolute top-[-25%] left-[-25%] border-none scale-[0.67] select-none pointer-events-auto"
                          loading="lazy"
                        />
                        {/* Overlay Click Shield */}
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-transparent cursor-pointer z-10"
                          title="Click to open live site in a new tab"
                        />
                        {/* Glass Sphere Specular Highlights */}
                        <div className="absolute top-[4%] left-[6%] w-[35%] h-[15%] rounded-full bg-white/12 pointer-events-none rotate-[-15deg] z-20" />
                        <div className="absolute bottom-[4%] right-[6%] w-[20%] h-[10%] rounded-full bg-white/4 pointer-events-none rotate-[20deg] z-20" />
                      </div>
                    ) : project.image ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060918]/60 via-transparent to-transparent pointer-events-none" />
                        {/* Glass highlight inside mockup */}
                        <div className="absolute top-[4%] left-[6%] w-[35%] h-[15%] rounded-full bg-white/10 pointer-events-none rotate-[-15deg] z-20" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#060918] relative">
                        <div className="absolute inset-0 grid-pattern opacity-10" />
                        <span className="text-4xl text-[#22D3EE] font-bold">{project.title.charAt(0)}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* High Visibility Action Buttons */}
                  <div className="flex items-center justify-center gap-4 mt-5 w-full">
                    {availableLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-full text-slate-300 bg-slate-800/80 border border-slate-700 hover:bg-slate-700/90 hover:border-[#22D3EE]/80 hover:text-[#22D3EE] hover:scale-110 active:scale-95 shadow-lg shadow-black/45 hover:shadow-cyan-500/20 transition-all duration-300 relative group"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <link.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        
                        {/* Custom Cyber-Cyan Tooltip */}
                        <span className="absolute bottom-full mb-2.5 px-2.5 py-1 text-[10px] font-bold text-[#22D3EE] bg-slate-950/95 border border-[#22D3EE]/25 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl z-30 font-mono tracking-wide">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

              {/* Right Column: Detailed description, stats, tech categories (Col Span 7) */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  {/* Project Overview Card */}
                  <div 
                    className="rounded-2xl border border-slate-800 bg-[#0d1328]/35 shadow-inner"
                    style={{ padding: 'clamp(20px, 3vw, 26px)' }}
                  >
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Project Overview</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal text-left">
                      {project.description}
                    </p>
                  </div>

                  {/* KPI/Tech Stats Grid */}
                  <div className="grid grid-cols-2 gap-5">
                    <motion.div 
                      animate={{ borderRadius: ["16px 16px 16px 16px", "20px 12px 18px 14px", "16px 16px 16px 16px"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="border border-slate-800 bg-[#0d1328]/50 shadow-inner flex flex-col justify-between"
                      style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[#22D3EE] mb-2">
                          <Activity size={15} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Engine Impact</span>
                        </div>
                        <p className="text-xs text-slate-300 font-semibold leading-relaxed text-left">
                          {project.impact}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      animate={{ borderRadius: ["16px 16px 16px 16px", "14px 18px 12px 20px", "16px 16px 16px 16px"] }}
                      transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                      className="border border-slate-800 bg-[#0d1328]/50 shadow-inner flex flex-col justify-between"
                      style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[#3B82F6] mb-2">
                          <Cpu size={15} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Architecture</span>
                        </div>
                        <p className="text-xs text-slate-300 font-semibold leading-relaxed text-left">
                          {project.isAI ? "Autonomous Multi-Agent Systems" : "Microservices / Hybrid App"}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Engine Stack Card */}
                  <div 
                    className="rounded-2xl border border-slate-800 bg-[#0d1328]/35 shadow-inner"
                    style={{ padding: 'clamp(20px, 3vw, 26px)' }}
                  >
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Engine Stack</h4>
                    <div className="flex flex-wrap gap-2.5 mt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-semibold rounded-full border border-slate-800 bg-slate-900/80 text-[#22D3EE] shadow-sm select-none transition-all duration-300 hover:border-[#22D3EE]/50 hover:bg-[#22D3EE]/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [navDirection, setNavDirection] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePrev = () => {
    setNavDirection(-1);
    setActiveFeaturedIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setNavDirection(1);
    setActiveFeaturedIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} id="projects" className="relative" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B1020] to-[#060816]" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="Projects"
          title="What I've Built"
          subtitle="Production-grade applications powered by AI and modern engineering."
        />

        {/* AI Projects Category Heading */}
        <div className="flex items-center" style={{ gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(34,211,238,0.1)] text-[#22D3EE]">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">AI Projects</h3>
            <p className="text-sm text-[#94A3B8]">Multi-agent systems, Policy RAGs, and intelligent orchestrators</p>
            {/* Glowing synapse scanner pipeline */}
            <div className="relative h-[2px] w-48 rounded-full bg-gradient-to-r from-[rgba(34,211,238,0.2)] via-[rgba(139,92,246,0.2)] to-transparent overflow-hidden" style={{ marginTop: '6px' }}>
              <motion.div
                className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Centered Single Bubble Featured AI Projects Carousel Showcase */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16 py-8 relative">
          {/* Left Arrow */}
          <NavArrow direction="left" onClick={() => {
            setHasInteracted(true);
            handlePrev();
          }} />
          
          {/* Centered Single Bubble Showcase with slide animation */}
          <div className="w-[340px] h-[340px] relative flex justify-center items-center overflow-visible select-none">
            <AnimatePresence mode="wait" custom={navDirection}>
              <motion.div
                key={activeFeaturedIndex}
                custom={navDirection}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 120 : -120,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(4px)",
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -120 : 120,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(4px)",
                    transition: { duration: 0.3 }
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <FeaturedProjectCard
                  project={featured[activeFeaturedIndex]}
                  onClick={() => {
                    setHasInteracted(true);
                    setIsExpanded(true);
                  }}
                  onInteract={() => setHasInteracted(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Pointer Tap-to-Explore Hint Overlay */}
            <AnimatePresence>
              {isInView && !hasInteracted && (
                <>
                  {/* 1. Pointer cursor hand directly OVER the UI (offset to bottom-right of the card) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 260, y: 260 }}
                    animate={{ opacity: 1, scale: 1, x: 50, y: 55 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ 
                      duration: 1.4, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.3
                    }}
                    className="absolute pointer-events-none z-40"
                    style={{
                      top: '55%',
                      left: '55%',
                    }}
                  >
                    {/* The Cursor & Clicking Animation */}
                    <motion.div
                      animate={{
                        scale: [1, 0.88, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative animate-bounce"
                      style={{ animationDuration: '2.5s' }}
                    >
                      {/* Clicking radiating sparks (rays) */}
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        className="absolute"
                        style={{
                          top: '-20px',
                          left: '-20px',
                        }}
                      >
                        {/* Little spark rays radiating from the pointer tip (approx at 20, 20) */}
                        <motion.g
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.7, 1.2, 0.7],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          style={{ originX: '20px', originY: '20px' }}
                        >
                          {/* Ray 1: Top */}
                          <line x1="20" y1="8" x2="20" y2="2" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }} />
                          {/* Ray 2: Top-Right */}
                          <line x1="12" y1="12" x2="7" y2="7" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }} />
                          {/* Ray 3: Left */}
                          <line x1="8" y1="20" x2="2" y2="20" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }} />
                          {/* Ray 4: Bottom-Left */}
                          <line x1="12" y1="28" x2="7" y2="33" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }} />
                          {/* Ray 5: Top-Left */}
                          <line x1="28" y1="12" x2="33" y2="7" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #22d3ee)' }} />
                        </motion.g>
                        
                        {/* Concentric clicking rings */}
                        <motion.circle
                          cx="20"
                          cy="20"
                          r="6"
                          fill="none"
                          stroke="#22D3EE"
                          strokeWidth="1.5"
                          animate={{
                            r: [6, 16],
                            opacity: [0.8, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      </svg>

                      {/* White hand pointing cursor with a crisp dark slate border (matches Magnific image perfectly) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.65)] rotate-[-10deg]"
                      >
                        <path
                          d="M14 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7H9.5a1.5 1.5 0 0 0-3 0v1.5H6a1 1 0 0 0-2 0v4.5A5.5 5.5 0 0 0 9.5 21h1a5.5 5.5 0 0 0 5.5-5.5V12a1.5 1.5 0 0 0-3 0v1h-1v-6.5Z"
                          fill="#ffffff"
                          stroke="#0f172a"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* 2. Text message "Click to view" rendered BELOW the card UI */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute pointer-events-none z-40 w-full flex justify-center"
                    style={{
                      bottom: '-45px',
                    }}
                  >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1328]/95 backdrop-blur-md text-[11px] font-bold text-[#22D3EE] border border-[#22D3EE]/30 shadow-[0_0_25px_rgba(34,211,238,0.2)] tracking-widest font-mono uppercase animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-ping" />
                      click to view
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* Right Arrow */}
          <NavArrow direction="right" onClick={() => {
            setHasInteracted(true);
            handleNext();
          }} />
        </div>


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
            {/* Glowing synapse scanner pipeline */}
            <div className="relative h-[2px] w-48 rounded-full bg-gradient-to-r from-[rgba(59,130,246,0.2)] via-[rgba(139,92,246,0.2)] to-transparent overflow-hidden" style={{ marginTop: '6px' }}>
              <motion.div
                className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Other Projects Stacked Cards */}
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto" style={{ gap: '48px', marginTop: '32px' }}>
          {other.map((project, idx) => (
            <StackedCard
              key={project.title}
              project={project}
              index={idx}
              total={other.length}
            />
          ))}
        </div>
      </div>

      {/* Full screen detailed modal overlay - placed outside relative z-10 container to prevent stacking context bugs */}
      <ProjectDetailsModal
        project={featured[activeFeaturedIndex]}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </section>
  );
}
