# GEMINI.md - PhewPhew Analysis Demo

## Project Overview
PhewPhew Analysis Demo is a specialized Next.js application designed as a "Payload Inspector" and live demo for the PhewPhew AI skin analysis engine. It demonstrates real-time facial landmark detection and zone mapping using computer vision, and prepares data for AI-driven dermatological assessment.

### Core Technologies
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** **Tailwind CSS 4 (Strict Mandate)**
- **Computer Vision:** @mediapipe/face_mesh (Face landmark detection)
- **Icons:** Lucide React
- **Fonts:** DM Sans (Body), Syne (Headings), DM Serif Display, JetBrains Mono

## Architecture
The project follows an **Atomic Design** pattern located in `src/components`:
- **Atoms:** Base UI elements (`Button.tsx`, `Badge.tsx`, `Text.tsx`).
- **Molecules:** Composition of atoms (`AnalysisCard.tsx`, `NavBar.tsx`).
- **Organisms:** Complex UI sections (`ScanScreen.tsx`, `FaceAnalyzer.ts` integration).
- **Templates:** Page-level layouts.

## Styling Standards
- **Tailwind Only:** All components MUST use Tailwind CSS classes for styling. Inline styles (`style={{...}}`) are deprecated and should be refactored to Tailwind.
- **Custom Utilities:** For recurring complex styles, define Tailwind utility classes in `src/app/globals.css` using the `@utility` directive.
- **Color Palette:** Use the PhewPhew CI palette defined in the `@theme` block of `globals.css` (e.g., `bg-pp-accent`, `text-pp-text`).
- **Font Variables:** Use font utility classes like `font-sans` (DM Sans) and `font-syne`.

## Building and Running
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000`. |
| `npm run build` | Compiles the application for production. |
| `npm run start` | Runs the built production server. |
| `npm run lint` | Executes ESLint for code quality checks. |

## Development Conventions
- **TypeScript:** Strict typing is used throughout the logic and components.
- **Client Components:** Use the `"use client"` directive for components interacting with Browser APIs (Camera, MediaPipe).
- **Face Analysis:** Any changes to facial landmark processing should be handled within `FaceAnalyzer.ts` and validated against the `ZONES` definition in `Constants.ts`.

## AI Analysis Structure
The system is designed to generate a JSON payload for an AI model with the following structure:
- `overall_summary`: High-level assessment.
- `conditions`: Array of detected skin conditions with `severity`, `confidence`, and `zone`.
- `recommendations`: Actionable skin care steps.
- `limitations`: Disclosure about photo-only analysis.
