---
id: tech-stack
title: Tech stack
description: Every dependency Vessl uses and why — React 19, Vite, Tailwind v4, Radix, TanStack, RHF+Zod, Three.js, Firebase, Cloudflare Workers, Capacitor.
sidebar_label: Tech stack
---

# Tech stack

Vessl is a TypeScript codebase that picks one tool per concern and reuses it everywhere. The choices below match `package.json` exactly.

## Frontend runtime

React 19 renders the UI, bundled by Vite 8 with the React plugin and a PWA plugin (`vite-plugin-pwa` with `workbox-window`). Tailwind v4 supplies utility styling through `@tailwindcss/vite`, layered on top of design tokens defined as CSS custom properties in `src/styles/vessl-tokens.css`. The visual system is dark-first with a teal signature accent.

Radix UI primitives provide every interactive control — dialogs, dropdowns, tabs, tooltips, popovers, selects, switches, toasts, and more — so accessibility and keyboard behavior are consistent without bespoke widgets. `class-variance-authority`, `clsx`, and `tailwind-merge` compose class names; `lucide-react` supplies icons.

## Routing, data, and forms

TanStack Router defines the route tree and handles navigation and URL state. TanStack Query manages server state and caching against Firestore. TanStack Table powers the admin data grids. Forms use React Hook Form with Zod schemas through `@hookform/resolvers`, the project-wide standard for validation. `nanoid` generates client-side identifiers.

## Specialized rendering

Three.js renders the interactive 3D vehicle viewer using the GLTF loader and orbit controls. TipTap (with the image, link, and placeholder extensions) is the rich-text editor behind the admin blog. D3 draws the analytics charts. `i18next` with `react-i18next` and the browser language detector handles internationalization, with translation JSON under `public/locales/`.

## Backend and platform

Firebase provides Firestore (the single data store, accessed through real-time listeners) and Authentication. Sentry (`@sentry/react`) captures errors, Amplitude captures product analytics, and Microsoft Clarity captures session insight — each activates only when its environment key is present. Thirteen Cloudflare Workers, written in TypeScript and validated with Zod, carry server-side logic; they share a CORS-locked helper module under `workers/_shared`.

Capacitor 8 wraps the web build for Android, with the official `@capacitor/preferences`, `@capacitor/share`, `@capacitor/status-bar`, `@capacitor/keyboard`, and `@capacitor/splash-screen` plugins, plus `@capawesome/capacitor-android-edge-to-edge-support` for correct system-bar insets on Android 15.

## Build and quality tooling

`tsc` type-checks under a project-references setup, ESLint (flat config) with `typescript-eslint`, the React Hooks plugin, and `eslint-plugin-jsx-a11y` enforces code quality, and Prettier formats. Lighthouse CI (`@lhci/cli`) and `@axe-core/cli` are wired for performance and accessibility auditing against the deployed site.

## Why these and not the alternatives

The stack avoids paid infrastructure on purpose. There is no application server, no managed database beyond Firestore's free tier, and no object-storage bill — uploads go to FilesHub and per-user Google Drive. Everything server-side that remains fits inside Cloudflare's free Worker plan, which is why intake, email, calendar, and cron logic live there rather than in Firebase Functions.
