---
id: web-hosting
title: Web hosting
description: Deploy Vessl's web build to Firebase Hosting, deploy Firestore rules and indexes, and wire the domain — the human-only steps to ship the storefront.
sidebar_label: Web hosting
---

# Web hosting

The Vessl web app is a static SPA built by Vite into `dist/`. Hosting is Firebase Hosting, configured in `firebase.json`, with the project set in `.firebaserc`. These steps require deploy credentials and are performed by a human, not by automation.

## Build the app

```bash
yarn install
yarn build          # tsc -b && vite build -> dist/
```

A successful build emits `dist/` with the SPA shell, assets, and the static SEO files (`sitemap.xml`, `feed.xml`, `llms.txt`, `robots.txt`, `og-image.png`).

## Deploy Firestore rules and indexes

Deploy security rules and indexes before or alongside the hosting deploy so the live database enforces the right access:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

Deploy rules and indexes together. Avoid `firebase deploy --only firestore`, which can remove indexes.

## Deploy hosting

```bash
firebase deploy --only hosting
```

The app serves at `vessl.aoneahsan.com`. The SPA relies on Firebase Hosting rewrites to route all paths to `index.html` so client-side routing works on deep links.

## Set environment variables

The build reads `VITE_*` variables at build time. Provide them in the build environment (or `.env.local`) before `yarn build`. The four `VITE_FIREBASE_*` keys are required; the rest enable optional integrations and Worker endpoints. See [local setup](../getting-started/local-setup.md).

## Post-deploy checks

After deploying, confirm the storefront loads, a deep link such as `/cars` resolves, the OG image renders in a social-preview validator, and `sitemap.xml` and `llms.txt` are reachable. Run Lighthouse and axe against the live URL with the project's `audit:lighthouse` and `audit:axe` scripts.

## Frequently asked questions

**Why deploy rules and indexes separately?**
Because `--only firestore` can delete indexes. Targeting `firestore:rules,firestore:indexes` is the safe form.

**Does the SPA need server-side rendering?**
No. It is a static SPA with hosting rewrites; the static HTML carries the SEO meta and JSON-LD, and the dynamic sitemap/feed come from the `sitemap-worker`.
