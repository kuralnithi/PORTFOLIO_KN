"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "violet" | "cyan";
}

export function AnimatedCard({ children, className, glowColor = "blue" }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const glowColors = {
    blue: "rgba(59, 130, 246, 0.06)",
    violet: "rgba(139, 92, 246, 0.06)",
    cyan: "rgba(34, 211, 238, 0.06)",
  };

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] transition-all duration-300",
        "hover:border-[rgba(59,130,246,0.3)] hover:bg-[#111a3a]",
        className
      )}
      style={{ padding: '24px' }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColors[glowColor]}, transparent 40%)` }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
