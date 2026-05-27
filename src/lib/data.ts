/* ============================================
   PORTFOLIO DATA — Single Source of Truth
   All content derived from resume, professionally
   enhanced for portfolio presentation.
   ============================================ */

import {
  Brain,
  Code2,
  Database,
  Globe,
  Layout,
  Lock,
  Server,
  Cpu,
  Bot,
  Search,
  Zap,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ---- Personal ----

export const personal = {
  name: "Kuralnithi",
  role: "GenAI Developer",
  tagline: "Building intelligent applications at the intersection of AI and modern engineering.",
  headline: [
    "GenAI Developer",
    "Full Stack Engineer",
    "AI Agent Builder",
    "LLM Integrator",
  ],
  email: "kuralnithi1999@gmail.com",
  phone: "+91 6380701533",
  github: "https://github.com/kuralnithi",
  linkedin: "https://www.linkedin.com/in/kural-nithi-0b967122b",
  resumeUrl: "https://drive.google.com/file/d/18_42Jg0gQ33ZTedXuMI0yCTqRGgkpa9_/view?usp=sharing",
  location: "India",
} as const;

// ---- About ----

export const about = {
  summary:
    "I'm a GenAI Developer specializing in building production-grade web applications and AI-powered systems. I specialize in designing multi-agent architectures using LangGraph, building RAG pipelines with vector databases, and developing full-stack applications with React, Next.js, FastAPI, and Node.js. My work bridges the gap between cutting-edge AI research and real-world software engineering — turning complex LLM capabilities into elegant, user-facing products. I bring nearly 2 years of professional Software Development Engineer (SDE) experience building production-grade applications.",
  stats: [
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Projects Shipped", value: 5, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "AI Systems Built", value: 3, suffix: "+" },
  ],
} as const;

// ---- Skills ----

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
  accent: "blue" | "violet" | "cyan";
  featured?: boolean;
}

export const skills: SkillCategory[] = [
  {
    title: "AI / LLM Stack",
    icon: Brain,
    skills: [
      "LangChain",
      "LangGraph",
      "RAG Pipelines",
      "Prompt Engineering",
      "LangSmith",
      "Azure OpenAI",
      "Multi-Agent Systems",
    ],
    accent: "cyan",
    featured: true,
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material-UI",
      "JavaScript",
    ],
    accent: "blue",
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "Django",
      "REST APIs",
      "Python",
    ],
    accent: "violet",
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Qdrant",
    ],
    accent: "blue",
  },
  {
    title: "DevOps & Cloud",
    icon: Globe,
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "GCP",
      "Netlify",
    ],
    accent: "violet",
  },
  {
    title: "Auth & Security",
    icon: Lock,
    skills: [
      "Keycloak",
      "JWT",
      "RBAC",
      "OAuth 2.0",
    ],
    accent: "blue",
  },
];

// ---- Projects ----

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  githubBackendUrl?: string;
  linkedinPostUrl?: string;
  isAI: boolean;
  featured: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    title: "FinBot",
    subtitle: "Stock Equity Research Agent",
    description:
      "A multi-agent AI-powered stock research platform built with LangGraph, featuring conversational memory workflows, real-time streaming responses, and intelligent equity analysis. The system orchestrates multiple specialized agents to deliver comprehensive stock insights.",
    impact: "Multi-agent orchestration with real-time streaming and conversational AI",
    techStack: [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Qdrant",
    ],
    liveUrl: "https://cb-a1-finbot-frontend.vercel.app/",
    githubUrl: "https://github.com/kuralnithi/CB_A1_FINBOT_FRONTEND",
    githubBackendUrl: "https://github.com/kuralnithi/CB_A1_FINBOT_BACKEND",
    linkedinPostUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7444815302963585024/",
    isAI: true,
    featured: true,
    image: "/projects/finbot.png",
  },
  {
    title: "NovaWorks",
    subtitle: "AI HR Copilot",
    description:
      "An AI-powered HRMS platform featuring a Policy RAG Assistant and automated HR workflows using LangGraph. Includes semantic search over HR policies via Qdrant Cloud vector database, achieving 85% retrieval accuracy across enterprise policy documents.",
    impact: "RAG pipeline with 85% retrieval accuracy on enterprise HR policies",
    techStack: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Qdrant",
    ],
    liveUrl: "https://cb-a2-hrms-frntd.vercel.app/login",
    githubUrl: "https://github.com/kuralnithi/CB_A2_HRMS_FRNTD",
    githubBackendUrl: "https://github.com/kuralnithi/CB_A2_HRMS",
    isAI: true,
    featured: true,
    image: "/projects/novaworks.png",
  },
  {
    title: "MHCET Admission Portal",
    subtitle: "Enterprise Education Platform",
    description:
      "A production-scale admission platform handling student registration, slot booking, document verification, and payment workflows with secure multi-gateway payment integration and cloud-based file management.",
    impact: "End-to-end admission workflow with multi-gateway payment integration",
    techStack: [
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Keycloak",
      "PayU",
      "BillDesk",
      "GCP",
    ],
    isAI: false,
    featured: false,
    image: "/projects/mhcet.png",
  },
  {
    title: "VIBGYOR VISE",
    subtitle: "Scholarship Exam Portal",
    description:
      "A responsive scholarship examination portal enabling student applications and exam registration with full-stack development and integrated payment processing through BillDesk.",
    impact: "Streamlined scholarship application with integrated payment processing",
    techStack: ["React.js", "Node.js", "PostgreSQL", "BillDesk"],
    isAI: false,
    featured: false,
    image: "/projects/vise.png",
  },
  {
    title: "NANDANAM",
    subtitle: "Milk Procurement System",
    description:
      "A comprehensive admin dashboard for managing procurement operations including orders, inventory, customer management, driver assignments, and delivery tracking with efficient UI state management.",
    impact: "Complete procurement operations dashboard with real-time tracking",
    techStack: ["React.js", "Bootstrap", "Node.js", "PostgreSQL"],
    isAI: false,
    featured: false,
    image: "/projects/nandanam.png",
  },
];

// ---- Experience ----

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "Praathee Technologies Pvt. Ltd.",
    role: "Software Developer",
    duration: "Mar 2024 — Dec 2025",
    location: "Coimbatore, India",
    achievements: [
      "Engineered full-stack web applications using React.js, Node.js, Express.js, and PostgreSQL with optimized REST APIs and high-performance backend architecture.",
      "Implemented enterprise-grade authentication and role-based access control using Keycloak, securing multiple production applications.",
      "Leveraged Google Cloud Platform (GCP) for secure file storage, cloud integrations, and scalable infrastructure management.",
      "Optimized PostgreSQL query performance and reporting modules, significantly improving application responsiveness and data throughput.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Keycloak",
      "GCP",
      "REST APIs",
    ],
  },
];

// ---- Education ----

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export const education: Education[] = [
  {
    institution: "Codebasics",
    degree: "AI Engineering Bootcamp",
    duration: "Mar 2026 — May 2026",
    location: "Hyderabad, India",
  },
  {
    institution: "GUVI IITM Research Park",
    degree: "Full Stack Web Development",
    duration: "2023",
    location: "Chennai, India",
  },
  {
    institution: "Shanmuganathan Engineering College",
    degree: "B.E. Civil Engineering",
    duration: "2016 — 2020",
    location: "Tamil Nadu, India",
  },
];

// ---- GenAI Focus Areas ----

export interface GenAIArea {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const genaiAreas: GenAIArea[] = [
  {
    title: "RAG Systems",
    description:
      "Building retrieval-augmented generation pipelines with semantic search, vector databases, and context-aware LLM responses for enterprise knowledge bases.",
    icon: Search,
  },
  {
    title: "AI Agents",
    description:
      "Designing multi-agent architectures using LangGraph for complex, multi-step reasoning workflows with tool-use and state management.",
    icon: Bot,
  },
  {
    title: "LLM Integration",
    description:
      "Integrating large language models into production applications with streaming, prompt engineering, and chain-of-thought orchestration.",
    icon: Cpu,
  },
  {
    title: "Vector Search",
    description:
      "Implementing high-performance vector search with Qdrant for semantic similarity, document retrieval, and knowledge-graph augmented search.",
    icon: Database,
  },
  {
    title: "Prompt Engineering",
    description:
      "Crafting structured prompts, few-shot templates, and system instructions to maximize LLM accuracy and output quality for specific domains.",
    icon: Code2,
  },
  {
    title: "AI-Powered Apps",
    description:
      "End-to-end development of AI-powered applications — from model integration and API design to polished frontend interfaces and deployment.",
    icon: Zap,
  },
];

// ---- Navigation ----

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI Focus", href: "#genai" },
  { label: "Contact", href: "#contact" },
] as const;

// ---- Tech Marquee (for animated strip) ----

export const techMarquee = [
  "LangChain",
  "LangGraph",
  "RAG",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Qdrant",
  "Docker",
  "Node.js",
  "Tailwind CSS",
  "LangSmith",
  "Azure OpenAI",
  "Redis",
  "MongoDB",
  "GCP",
  "Keycloak",
  "REST APIs",
];
