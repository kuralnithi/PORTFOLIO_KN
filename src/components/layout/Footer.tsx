"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personal, navLinks } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.08)] bg-[#0B1020]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-40" />
      <div className="section-container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          {/* Logo / Branding */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', background: 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)' }}>
                <span className="text-xs font-bold text-white">K</span>
              </div>
              <span className="font-semibold text-[#F1F5F9]">{personal.name}</span>
            </div>
            <p className="text-sm text-[#64748B]" style={{ margin: '0' }}>GenAI Developer · Full Stack Engineer</p>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[#64748B] transition-colors hover:text-[#F1F5F9]"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Socials & Scroll to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {[
              { href: personal.github, icon: Github, label: "GitHub" },
              { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-lg text-[#64748B] transition-all hover:bg-[#131b38] hover:text-[#F1F5F9]"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <s.icon size={16} />
              </a>
            ))}
            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(148,163,184,0.08)', margin: '0 8px' }} />
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="rounded-lg border border-[rgba(148,163,184,0.08)] text-[#64748B] transition-all hover:border-[rgba(59,130,246,0.3)] hover:bg-[#131b38] hover:text-[#3B82F6]"
              style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', cursor: 'pointer' }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(148,163,184,0.05)', textAlign: 'center' }} className="text-center">
          <p className="text-xs text-[#64748B]" style={{ margin: '0' }}>© {new Date().getFullYear()} {personal.name}. Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
