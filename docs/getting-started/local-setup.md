---
id: local-setup
title: Local setup
description: Run Vessl locally — install with yarn, copy the env file, and start the Vite dev server on port 7420. Only four Firebase keys are required.
sidebar_label: Local setup
---

# Local setup

Vessl runs as a standard Vite project. The app boots even with no keys configured — analytics, Sentry, Amplitude, Clarity, Google OAuth, FilesHub, and every Cloudflare Worker call silently no-op until their environment variables are set. Only the four core `VITE_FIREBASE_*` keys are needed to enable Firestore and Auth.

## Prerequisites

You need Node.js 20 or newer (22 is recommended) and Yarn. Install dependencies and start the dev server:

```bash
# Install dependencies
yarn install

# Copy the env template and fill in your Firebase keys
cp .env.example .env.local

# Start the dev server on http://localhost:7420
yarn dev
```

The dev server binds to port 7420, a project-specific port chosen to avoid clashing with other local apps.

## Required environment variables

Four keys are required for the app to read and write data. The rest are optional and degrade gracefully when absent.

| Key | Required | Purpose |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firestore project |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase app id |
| `VITE_SENTRY_DSN` | No | Error reporting |
| `VITE_AMPLITUDE_API_KEY` | No | Product analytics |
| `VITE_CLARITY_PROJECT_ID` | No | Session insight |
| `VITE_GOOGLE_CLIENT_ID` | No | Google OAuth / Drive |
| `VITE_FILESHUB_API_BASE`, `VITE_FILESHUB_API_KEY` | No | Admin file uploads |
| `VITE_WORKER_*` / `VITE_*_URL` | No | Cloudflare Worker endpoints |

The full, annotated list lives in `.env.example`, where every key carries a `[REQUIRED]` or `[OPTIONAL]` tag and a one-line reason.

## Build and verify

```bash
# Type-check the project
yarn type-check

# Production build (runs tsc then vite build)
yarn build

# Lint
yarn lint
```

A clean checkout type-checks, lints, and builds without errors. The dev server is something you start yourself; the build commands above are the verification gates.

## Android (optional)

The Android project is initialized under `android/`. After a web build, sync the native project and open it:

```bash
yarn build
yarn cap:sync       # cap sync android
yarn cap:open       # opens Android Studio
```

Signing and the Play Console upload are manual steps documented in [Android deployment](../deployment/android.md).
