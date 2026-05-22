"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { about } from "@/lib/data";
import { Cpu, Database, GitBranch, Terminal } from "lucide-react";
import {
  fadeInUp,
  scrollViewport,
} from "@/lib/animations";

const AI_NODES = [
  { id: "core", label: "Agent Core", desc: "LangGraph Coordinator", color: "from-[#3B82F6] to-[#8B5CF6]", icon: Cpu, x: 190, y: 150, size: 60 },
  { id: "planning", label: "Multi-Agent", desc: "LangGraph Routing & Orchestration", color: "from-[#8B5CF6] to-[#EC4899]", icon: GitBranch, x: 70, y: 60, size: 46 },
  { id: "rag", label: "Active RAG", desc: "Qdrant Vector Store Lookup", color: "from-[#3B82F6] to-[#22D3EE]", icon: Database, x: 310, y: 70, size: 46 },
  { id: "tools", label: "Tool Exec", desc: "SQL & Custom API Actions", color: "from-[#10B981] to-[#3B82F6]", icon: Terminal, x: 90, y: 240, size: 46 },
  { id: "reasoning", label: "Cognition", desc: "LLM Reasoning Chain", color: "from-[#F59E0B] to-[#EC4899]", icon: Cpu, x: 290, y: 230, size: 46 },
];

export function About() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeNodeInfo = AI_NODES.find(n => n.id === hoveredNode);

  return (
    <section id="about" className="relative" style={{ paddingTop: '6rem', paddingBottom: '10rem' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B1020] to-[#060816]" />

      <div className="relative z-10 section-container">
        <SectionHeading
          label="About"
          title="Who I Am"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8" style={{ marginTop: '2rem' }}>
          {/* Left Column: Summary Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="md:col-span-7"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <p className="text-base leading-relaxed text-[#94A3B8] sm:text-lg" style={{ maxWidth: '640px' }}>
              {about.summary}
            </p>
          </motion.div>

          {/* Right Column: AI Agent Synapse Network Animation */}
          <div className="md:col-span-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px', position: 'relative' }}>
            <div style={{ position: 'relative', width: '380px', height: '320px' }}>
              
              {/* Interactive Neural Synapse SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 380 320">
                {AI_NODES.slice(1).map((node) => (
                  <g key={`line-${node.id}`}>
                    {/* Passive structural connection */}
                    <line
                      x1={190}
                      y1={150}
                      x2={node.x}
                      y2={node.y}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1.5"
                    />
                    {/* Active pulsing electrical signals */}
                    <motion.line
                      x1={190}
                      y1={150}
                      x2={node.x}
                      y2={node.y}
                      stroke="url(#synapse-grad)"
                      strokeWidth="2"
                      strokeDasharray="4 14"
                      animate={{
                        strokeDashoffset: [-40, 40]
                      }}
                      transition={{
                        duration: hoveredNode === node.id ? 1.2 : 2.5, // Failsafe fast transmission on hover
                        ease: "linear",
                        repeat: Infinity
                      }}
                    />
                  </g>
                ))}
                <defs>
                  <linearGradient id="synapse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dynamic Interactive Nodes */}
              {AI_NODES.map((node) => {
                const IconComponent = node.icon;
                const isCore = node.id === "core";
                const isHovered = hoveredNode === node.id;

                return (
                  <motion.div
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: 'absolute',
                      left: node.x - node.size / 2,
                      top: node.y - node.size / 2,
                      width: node.size,
                      height: node.size,
                      zIndex: isCore ? 10 : 5,
                      cursor: 'pointer',
                    }}
                    animate={{
                      y: [0, -4, 4, 0],
                    }}
                    transition={{
                      duration: isCore ? 6 : 4 + node.size % 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: isCore ? 0 : node.size % 2,
                    }}
                  >
                    {/* Glowing breath backdrop */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        background: isCore 
                          ? "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)" 
                          : "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
                        zIndex: -1,
                      }}
                      animate={{
                        scale: isHovered ? 1.4 : [1, 1.15, 1],
                        opacity: isHovered ? 0.9 : [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Glassmorphic Node Button */}
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${node.color} border transition-all duration-300`}
                      style={{
                        padding: '1px',
                        backgroundOrigin: 'border-box',
                        borderColor: isHovered ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: isHovered 
                          ? "0 0 25px rgba(34, 211, 238, 0.45), inset 0 0 10px rgba(255, 255, 255, 0.15)"
                          : "0 4px 15px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.05)",
                        background: 'rgba(10, 15, 30, 0.75)',
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[#0d1225] flex items-center justify-center text-white">
                        <IconComponent 
                          size={isCore ? 24 : 18} 
                          className={`transition-colors duration-300 ${isHovered ? 'text-[#22D3EE]' : 'text-slate-300'}`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Central Dynamic Glass Info Card (Tooltip) */}
              <AnimatePresence>
                {activeNodeInfo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-x-0 bottom-[-45px] mx-auto glass-strong p-2.5 rounded-lg border border-[rgba(255,255,255,0.08)] shadow-xl pointer-events-none"
                    style={{
                      width: '240px',
                      zIndex: 30,
                      textAlign: 'center',
                    }}
                  >
                    <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-0.5">{activeNodeInfo.label}</h4>
                    <p className="text-[11px] text-[#94A3B8] leading-normal m-0">{activeNodeInfo.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
