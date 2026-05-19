"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Send, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { personal } from "@/lib/data";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const socialLinks = [
  { label: "GitHub", href: personal.github, icon: Github, username: "@kuralnithi" },
  { label: "LinkedIn", href: personal.linkedin, icon: Linkedin, username: "Kuralnithi" },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail, username: personal.email },
  { label: "Phone", href: `tel:${personal.phone}`, icon: Phone, username: personal.phone },
];

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] to-[#0B1020]" />
      <div className="relative z-10 section-container">
        <SectionHeading label="Contact" title="Let's Connect" subtitle="Interested in working together? I'd love to hear from you." />

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Form */}
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328]"
              style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#94A3B8]" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#131b38] text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  style={{ padding: '12px 16px', display: 'block', width: '100%' }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#94A3B8]" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#131b38] text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  style={{ padding: '12px 16px', display: 'block', width: '100%' }}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-[#94A3B8]" style={{ display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#131b38] text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  style={{ padding: '12px 16px', display: 'block', width: '100%' }}
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-60"
                style={{ padding: '14px 24px', gap: '8px', marginTop: '8px', cursor: 'pointer' }}
              >
                {isSubmitted ? "Message Prepared ✓" : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </motion.form>

            {/* Social Links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
              style={{ gap: '16px' }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Phone" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  className="group flex items-center rounded-xl border border-[rgba(148,163,184,0.08)] bg-[#0d1328] transition-all duration-300 hover:border-[rgba(59,130,246,0.3)] hover:bg-[#111a3a]"
                  style={{ padding: '18px 24px', gap: '16px', textDecoration: 'none' }}
                >
                  <div
                    className="flex shrink-0 items-center justify-center rounded-xl bg-[rgba(59,130,246,0.08)] text-[#3B82F6] transition-all group-hover:bg-[rgba(59,130,246,0.15)]"
                    style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
                  >
                    <link.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#F1F5F9]">{link.label}</p>
                    <p className="truncate text-xs text-[#64748B]" style={{ marginTop: '2px' }}>{link.username}</p>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-[#64748B] transition-all group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
