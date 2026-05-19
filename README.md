# Kuralnithi — GenAI Portfolio

A premium, modern portfolio website for an AI-Powered Full Stack / GenAI Developer. Built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React Icons.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export for Netlify)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment (Netlify)

This project is configured for static export (`output: "export"` in `next.config.ts`).

### Option 1: Netlify CLI
```bash
npm run build
npx netlify deploy --prod --dir=out
```

### Option 2: Netlify Dashboard
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy

## Adding Your Resume PDF

Place your resume PDF at `public/resume.pdf` for the download/view button to work.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis
- **Fonts**: Inter + JetBrains Mono

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout (fonts, SEO, providers)
│   ├── page.tsx      # Home page (all sections)
│   └── globals.css   # Design system & utilities
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, Projects, Experience, GenAI, Contact
│   ├── shared/       # Reusable components
│   └── providers/    # Theme, Smooth Scroll
├── lib/
│   ├── data.ts       # All content data
│   ├── animations.ts # Framer Motion presets
│   └── utils.ts      # Utility functions
└── hooks/            # Custom React hooks
```
