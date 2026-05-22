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
  const [isShocking, setIsShocking] = useState(false);
  const [gravityOffset, setGravityOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % personal.headline.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Peak height is at 3s into the 12s float cycle.
    // Trigger shock event exactly when the bubble kisses the navbar!
    const delayTimer = setTimeout(() => {
      const triggerShock = () => {
        setIsShocking(true);
        window.dispatchEvent(new CustomEvent("navbar-bubble-shock"));
        setTimeout(() => setIsShocking(false), 350);
      };
      
      triggerShock();
      const interval = setInterval(triggerShock, 12000);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    let hasSensor = false;

    // Accelerometer / Gyroscope tilt listener (laptops/mobiles)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        hasSensor = true;
        const maxShift = 45;
        // gamma is roll (left/right: -90 to 90), beta is pitch (front/back: -180 to 180)
        const xShift = (e.gamma / 30) * maxShift;
        const yShift = ((e.beta - 45) / 30) * maxShift; // calibrated for typical 45 degree laptop viewing angle

        setGravityOffset({
          x: Math.max(-maxShift, Math.min(maxShift, xShift)),
          y: Math.max(-maxShift, Math.min(maxShift, yShift)),
        });
      }
    };

    // Mouse tilt fallback for desktop devices
    const handleMouseMove = (e: MouseEvent) => {
      if (hasSensor) return; // Prioritize actual laptop/mobile gravity sensors

      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) - 0.5;
      const ny = (e.clientY / innerHeight) - 0.5;
      const maxPull = 35; // px max shift

      setGravityOffset({
        x: nx * maxPull,
        y: ny * maxPull,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

      {/* Outer Gravity-Sensor Wrapper */}
      <motion.div
        className="pointer-events-none hidden md:block"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '580px',
          height: '580px',
          zIndex: 0,
        }}
        animate={{
          x: `calc(-50% + ${gravityOffset.x}px)`,
          y: `calc(-50% + ${gravityOffset.y}px)`,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      >
        {/* Inner Glassmorphic Bubble (Handles Slow Float & Collisions) */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            background: isShocking
              ? "radial-gradient(circle at center, rgba(34, 211, 238, 0.04) 0%, rgba(139, 92, 246, 0.01) 70%, transparent 100%)"
              : "radial-gradient(circle at center, rgba(59, 130, 246, 0.02) 0%, rgba(139, 92, 246, 0.01) 70%, transparent 100%)",
            border: isShocking
              ? "1.8px solid rgba(34, 211, 238, 0.45)"
              : "1.5px solid rgba(255, 255, 255, 0.08)",
            boxShadow: isShocking
              ? "inset 0 0 80px rgba(34, 211, 238, 0.08), 0 0 100px rgba(34, 211, 238, 0.2)"
              : "inset 0 0 80px rgba(255, 255, 255, 0.02), 0 0 100px rgba(34, 211, 238, 0.03)",
            borderRadius: '50%',
          }}
          animate={isShocking ? {
            x: ['0%', '-0.4%', '0.4%', '-0.4%', '0%'],
            y: ['-1.8%', '-0.5%', '-1.2%', '0.2%', '-0.8%'], // Bounces back downwards relative to center!
            scale: [1, 0.99, 1.01, 0.99, 1],
          } : {
            x: ['0%', '2%', '-2%', '0%'],
            y: ['0%', '-1.8%', '3%', '0%'], // Slow elegant float cycle
            scale: [1, 1.02, 0.98, 1],
          }}
          transition={isShocking ? {
            duration: 0.35,
            ease: "easeOut",
          } : {
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* ---- Content ---- */}
      <div className="relative z-10 section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -300, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
          initial={{ opacity: 0, x: -800, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-5xl font-bold tracking-tight text-[#F1F5F9] sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ margin: '0 0 16px 0', lineHeight: 1.1 }}
        >
          {personal.name}
        </motion.h1>

        {/* Animated Role Title */}
        <motion.div
          initial={{ opacity: 0, x: 800, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
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
          initial={{ opacity: 0, y: 350, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-5 text-base leading-relaxed text-[#94A3B8]"
          style={{ marginTop: '24px', maxWidth: '460px', lineHeight: '1.6', fontSize: '15px' }}
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            y: { type: "spring", stiffness: 100, damping: 15, delay: 0.8 },
            opacity: { duration: 0.8, delay: 0.8 },
            scale: { type: "spring", stiffness: 100, damping: 15, delay: 0.8 }
          }}
        >
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px', marginTop: '28px' }}
          >
            <motion.button
              onClick={() => handleScroll("#projects")}
              whileHover={{ y: -3, scale: 1.04, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.35)" }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-xs font-semibold text-white shadow-md shadow-blue-500/15 transition-all hover:shadow-lg hover:shadow-blue-500/25"
              style={{ padding: '9px 18px', gap: '6px' }}
            >
              <span className="relative z-10">View Projects</span>
              <ExternalLink
                size={12}
                className="relative z-10 transition-transform group-hover:translate-x-0.5"
              />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            <motion.a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.04, borderColor: "rgba(59, 130, 246, 0.4)", backgroundColor: "#111a3a", boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] text-xs font-semibold text-[#F1F5F9] transition-all hover:bg-[#111a3a]"
              style={{ padding: '9px 18px' }}
            >
              Resume
            </motion.a>

            <motion.button
              onClick={() => handleScroll("#contact")}
              whileHover={{ y: -3, scale: 1.04, borderColor: "rgba(59, 130, 246, 0.4)", color: "#F1F5F9", boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="inline-flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] bg-transparent text-xs font-semibold text-[#94A3B8] transition-all hover:text-[#F1F5F9]"
              style={{ padding: '9px 18px', gap: '6px' }}
            >
              <Mail size={12} />
              Contact
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
