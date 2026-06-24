---
id: overview
title: Architecture overview
description: How Vessl fits together — a React SPA reading Firestore in real time, with Cloudflare Workers carrying secrets, cron jobs, and server-side compute.
sidebar_label: Overview
---

# Architecture overview

Vessl has three moving parts: a React single-page application, Firebase (Firestore and Auth), and a fleet of Cloudflare Workers. There is no application server. The browser talks to Firestore directly for reads and most writes, and it calls a Worker whenever a secret, a cron schedule, or third-party server-side logic is involved.

## Request flow

When a visitor opens the app, Vite serves a static SPA bundle. TanStack Router resolves the route and renders the matching surface. Data comes from Firestore through real-time `onSnapshot` listeners wrapped in TanStack Query, so the UI updates live as records change. Writes go straight to Firestore when the operation is a plain authenticated mutation, and Firestore security rules enforce ownership and role.

For anything the browser must not do — sending email, holding a calendar refresh token, pinging search engines, running a daily purge — the client calls a Cloudflare Worker over HTTPS. Each Worker validates its input with Zod, performs the privileged action with secrets held in Cloudflare, and returns a result. CORS is locked to the app's origins through a shared helper.

## Why this shape

The design avoids paid infrastructure. Firestore's free tier covers the data store, Firebase Auth covers identity, and the Cloudflare free plan covers the Workers. File uploads sidestep object-storage costs: admin uploads proxy to FilesHub, and customer uploads go to the customer's own Google Drive. The result is a full marketplace, dashboard, and admin suite that runs without a server bill.

## Client structure

The frontend is organized by feature. `src/modules/` holds feature-scoped modules — auth, RBAC, theme, cars, home, currency, i18n, leads, appointments, offers, inventory, marketing, three-d, and more. `src/components/` holds shared UI primitives, layout, cards, forms, charts, and the data-table wrapper. `src/pages/` holds route components grouped into public, dashboard, and admin. `src/lib/` holds the logger, Firebase setup, Firestore helpers, sanitization, and native bridges. `src/config/` holds environment access, route constants, roles, and currencies.

## Cross-cutting rules

State that should survive a refresh lives in the URL: tabs, modals, filters, pagination, search, and multi-step form steps are all encoded as search parameters. Transient state — loading flags, hover, in-flight submissions — stays in component state. All logging routes through one logger module rather than `console` directly, so log level is controllable and production stays quiet. Errors flow to Sentry; product analytics multiplex to Firebase, Amplitude, and Clarity, each active only when configured.

## Where to go next

See the [Firestore data model](./firestore-data-model.md) for the collections and how they relate, and [RBAC](./rbac.md) for how roles gate access. The [Workers overview](../workers/overview.md) documents the backend Worker by Worker.
