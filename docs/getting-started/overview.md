---
id: overview
title: Product overview
description: The Vessl product surface at a glance — public storefront, customer dashboard, and RBAC admin, plus the Firebase and Cloudflare Workers backend.
sidebar_label: Overview
---

# Product overview

Vessl is one React single-page application that renders three surfaces — a public storefront, a customer dashboard, and an admin console — selected by route and guarded by authentication and role checks. Routing is handled by TanStack Router with roughly seventy routes; server state comes from Firestore through TanStack Query, and every form runs on React Hook Form with Zod validation.

## The three surfaces

The **public storefront** is open to everyone. It includes the homepage, the inventory listing (`/cars`) and detail pages (`/cars/:slug`), categories, a comparison view, full-text search, a blog with article pages, a "sell your Vessl" intake, an about and contact page, the legal pages, and machine-readable `/sitemap.xml`, `/feed.xml`, and `/llms.txt`. Public detail pages render structured data (JSON-LD) so search engines and answer engines can extract them.

The **customer dashboard** sits behind authentication at `/dashboard`. A signed-in user sees saved cars, their consultations and inquiries, a messages view, a Google Drive connection used for document uploads, and account settings including the data-deletion flow.

The **admin console** at `/admin` is gated by role-based permissions. It covers car CRUD, categories, a blog editor built on TipTap, consultations and inquiries, a leads CRM with a pipeline and reports, offers, appointments and a calendar, inventory events, marketing automation (segments and sequences), team management with invites and a permission matrix, users, multi-tenant settings, an audit log, diagnostics, and an analytics dashboard rendered with D3.

## The backend

There is no traditional server. Firestore stores all application data and streams it to the client through real-time listeners. Firebase Auth issues identities. Anything that needs a secret, a cron schedule, or server-side compute runs in a Cloudflare Worker: contact and quote intake, transactional email, calendar booking, Google Drive and FilesHub upload proxying, currency rates, Open Graph image generation, sitemap and feed generation, search-engine pinging, marketing sequence execution, tenant resolution, team invites, and an account-purge cron. The [Workers overview](../workers/overview.md) lists all thirteen.

## What you can do next

Read the [tech stack](./tech-stack.md) for the full dependency matrix and the reasoning behind each choice, then follow [local setup](./local-setup.md) to run the app. To understand how data flows, start with the [architecture overview](../architecture/overview.md).
