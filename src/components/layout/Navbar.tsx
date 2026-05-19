"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.href.replace("#", "")));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isScrolled ? "glass-strong shadow-lg shadow-black/10" : "bg-transparent")}>
        <div className="section-container" style={{ display: 'flex', height: '64px', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group rounded-lg" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>
            <div style={{ display: 'flex', width: '32px', height: '32px', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)' }}>
              <span className="text-sm font-bold text-white">K</span>
            </div>
            <span className="hidden font-semibold text-[#F1F5F9] sm:block" style={{ fontSize: '15px' }}>{personal.name}</span>
          </button>

          <div className="hidden md:flex" style={{ gap: '12px', alignItems: 'center' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative rounded-lg text-sm transition-colors focus-ring"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    color: isActive ? '#F1F5F9' : '#64748B',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.15)]"
                      style={{ zIndex: -1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex rounded-lg focus-ring"
              style={{
                border: '1px solid rgba(59,130,246,0.3)',
                background: 'transparent',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#3B82F6',
                textDecoration: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              Resume
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#131b38] focus-ring md:hidden"
              style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-[rgba(148,163,184,0.08)] glass-strong p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => handleNavClick(link.href)}
                  className="rounded-lg px-4 py-2.5 text-left text-sm text-[#94A3B8] transition-colors hover:bg-[#131b38] hover:text-[#F1F5F9]">
                  {link.label}
                </button>
              ))}
              <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="mt-2 rounded-lg border border-[rgba(59,130,246,0.3)] px-4 py-2.5 text-center text-sm font-medium text-[#3B82F6] transition-all hover:bg-[rgba(59,130,246,0.08)]">
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
