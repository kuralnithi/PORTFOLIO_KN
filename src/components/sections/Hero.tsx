"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";
import { personal } from "@/lib/data";
import {
  heroTextReveal,
  heroSubtextReveal,
  heroCTAReveal,
} from "@/lib/animations";

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % personal.headline.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* ---- Background Effects ---- */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Gradient blobs */}
      <div className="gradient-blob -top-40 -left-40 h-[500px] w-[500px] bg-[#3B82F6]" />
      <div
        className="gradient-blob -bottom-40 -right-40 h-[600px] w-[600px] bg-[#8B5CF6]"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="gradient-blob top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#22D3EE]"
        style={{ animationDelay: "4s", opacity: 0.15 }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#060816_70%)]" />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* ---- Content ---- */}
      <div className="relative z-10 section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Status badge */}
        <motion.div
          variants={heroTextReveal}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '24px' }}
        >
          <span className="inline-flex items-center rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.06)] text-xs font-medium text-[#3B82F6]"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '9999px' }}
          >
            <span className="relative" style={{ display: 'flex', width: '8px', height: '8px', alignItems: 'center', justifyContent: 'center' }}>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" style={{ width: '8px', height: '8px', borderRadius: '50%', position: 'absolute' }}></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" style={{ width: '8px', height: '8px', borderRadius: '50%', position: 'relative' }}></span>
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={heroTextReveal}
          initial="hidden"
          animate="visible"
          className="text-5xl font-bold tracking-tight text-[#F1F5F9] sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ margin: '0 0 16px 0', lineHeight: 1.1 }}
        >
          {personal.name}
        </motion.h1>

        {/* Animated Role Title */}
        <motion.div
          variants={heroSubtextReveal}
          initial="hidden"
          animate="visible"
          style={{ marginTop: '16px', height: '40px', overflow: 'hidden' }}
        >
          <div
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateY(-${currentRole * 40}px)` }}
          >
            {personal.headline.map((role, i) => (
              <div
                key={i}
                className="flex h-10 items-center justify-center font-mono text-lg text-[#3B82F6] sm:text-xl md:text-2xl"
              >
                <span className="mr-2 text-[#22D3EE]">&gt;</span>
                {role}
                <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[#3B82F6]" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={heroSubtextReveal}
          initial="hidden"
          animate="visible"
          className="mt-5 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg"
          style={{ marginTop: '24px', maxWidth: '600px', lineHeight: '1.6', fontSize: '18px' }}
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroCTAReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '16px', marginTop: '48px' }}
        >
          <button
            onClick={() => handleScroll("#projects")}
            className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            style={{ padding: '12px 24px', gap: '8px' }}
          >
            <span className="relative z-10">View Projects</span>
            <ExternalLink
              size={14}
              className="relative z-10 transition-transform group-hover:translate-x-0.5"
            />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] text-sm font-medium text-[#F1F5F9] transition-all hover:border-[rgba(59,130,246,0.3)] hover:bg-[#111a3a]"
            style={{ padding: '12px 24px' }}
          >
            Resume
          </a>

          <button
            onClick={() => handleScroll("#contact")}
            className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] bg-transparent text-sm font-medium text-[#94A3B8] transition-all hover:border-[rgba(59,130,246,0.3)] hover:text-[#F1F5F9]"
            style={{ padding: '12px 24px', gap: '8px' }}
          >
            <Mail size={14} />
            Contact
          </button>
        </motion.div>
      </div>
    </section>
  );
}
