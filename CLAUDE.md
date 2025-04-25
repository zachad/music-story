# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `pnpm dev` - Run development server
- `pnpm build` - Build for production (runs TypeScript and Vite)
- `pnpm lint` - Run ESLint on codebase
- `pnpm preview` - Preview production build

## Code Style Guidelines
- Use TypeScript with strict typing; define interfaces for component props
- React functional components with hooks (useState, useEffect, useRef)
- Use TailwindCSS for styling with appropriate responsive classes
- Import organization: React/libraries first, then local components, then styles
- Export components as default at end of file
- Component file naming: PascalCase.tsx
- Component props naming: ComponentNameProps interface
- Arrow function components with explicit return statements
- Proper cleanup in useEffect return functions
- Follow ESLint rules including react-hooks, react-refresh plugins
- Use template strings for dynamic strings
- Boolean checks use explicit comparison