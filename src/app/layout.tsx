import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";
import fs from "fs";
import path from "path";

try {
  const srcFinbot = "C:\\Users\\kural\\.gemini\\antigravity\\brain\\b9055f29-79ec-4513-9dd3-9e6ebaeac62f\\finbot_1779194302405.png";
  const srcNovaworks = "C:\\Users\\kural\\.gemini\\antigravity\\brain\\b9055f29-79ec-4513-9dd3-9e6ebaeac62f\\novaworks_1779194320291.png";
  const srcMhcet = "c:\\kural\\mhce.png";
  const srcVise = "c:\\kural\\vise.png";
  const srcNandanam = "c:\\kural\\nandanam.png";
  const destDir = "c:\\kural\\PORTFOLIO\\genai-portfolio\\public\\projects";

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(srcFinbot)) {
    fs.copyFileSync(srcFinbot, path.join(destDir, "finbot.png"));
  }
  if (fs.existsSync(srcNovaworks)) {
    fs.copyFileSync(srcNovaworks, path.join(destDir, "novaworks.png"));
  }
  if (fs.existsSync(srcMhcet)) {
    fs.copyFileSync(srcMhcet, path.join(destDir, "mhcet.png"));
  }
  if (fs.existsSync(srcVise)) {
    fs.copyFileSync(srcVise, path.join(destDir, "vise.png"));
  }
  if (fs.existsSync(srcNandanam)) {
    fs.copyFileSync(srcNandanam, path.join(destDir, "nandanam.png"));
  }
} catch (e) {
  console.error("Copy error:", e);
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuralnithi | GenAI Developer & Full Stack Engineer",
  description:
    "Portfolio of Kuralnithi — a GenAI Developer specializing in LangChain, LangGraph, RAG pipelines, and modern full-stack development with React, Next.js, FastAPI, and Node.js.",
  keywords: [
    "GenAI Developer",
    "Full Stack Engineer",
    "LangChain",
    "LangGraph",
    "RAG",
    "AI Engineer",
    "React",
    "Next.js",
    "FastAPI",
    "Python",
    "Portfolio",
    "Kuralnithi",
  ],
  authors: [{ name: "Kuralnithi" }],
  creator: "Kuralnithi",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kuralnithi | GenAI Developer & Full Stack Engineer",
    description:
      "GenAI Developer specializing in multi-agent AI systems, RAG pipelines, and modern full-stack engineering.",
    siteName: "Kuralnithi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuralnithi | GenAI Developer",
    description:
      "GenAI Developer specializing in multi-agent AI systems, RAG pipelines, and modern full-stack engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
