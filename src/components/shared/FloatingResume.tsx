"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown } from "lucide-react";
import { personal } from "@/lib/data";

export function FloatingResume() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={personal.resumeUrl}
      download="Kuralnithi_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        borderRadius: "9999px",
        color: "#FFFFFF",
        textDecoration: "none",
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 0 15px 2px rgba(139, 92, 246, 0.25)",
        cursor: "pointer",
        padding: isHovered ? "12px 24px" : "14px",
        gap: "8px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.6), 0 0 25px 5px rgba(139, 92, 246, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <FileDown size={20} style={{ display: "block" }} />
      
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              fontWeight: 600,
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              letterSpacing: "0.5px",
            }}
          >
            Download Resume
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
