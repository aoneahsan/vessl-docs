---
id: intro
title: Vessl documentation
description: Vessl is a premium car-marketplace platform built as white-label SaaS — public storefront, customer dashboard, RBAC admin, on Firebase plus 13 Cloudflare Workers.
slug: /
sidebar_position: 1
---

# Vessl documentation

Vessl is a premium car-marketplace platform, built as a white-label SaaS demo. It pairs a public storefront — inventory, an interactive 3D vehicle viewer, a blog, and consultation/quote flows — with a signed-in customer dashboard and a full role-based admin console. The backend is deliberately zero-cost: Firebase handles Firestore and Auth, and 13 Cloudflare Workers carry every server-side concern that cannot run in the browser.

These docs describe the system as it actually exists in the codebase: the routes that ship, the Firestore collections that store data, the Workers that back the conversion flows, and the steps required to run and deploy it.

## What Vessl is

A single React 19 single-page app serves three audiences from one codebase:

- **Visitors** browse cars, filter and compare inventory, read the blog, view vehicles in 3D, and request a quote or book a consultation.
- **Customers** sign in (Google or email) to save cars, track their inquiries and consultations, connect Google Drive for document uploads, and manage settings.
- **Operators** use an RBAC admin panel to run inventory, a leads CRM with a pipeline, offers, appointments, marketing automation, a blog editor, team management, multi-tenant settings, and analytics.

Capacitor wraps the same web build into an Android application published under `com.aoneahsan.vessl`.

## How the docs are organized

The [Getting started](./getting-started/overview.md) section gives the product surface at a glance, the full tech stack, and local setup. [Features](./features/marketplace.md) documents each user-facing capability. [Architecture](./architecture/overview.md) explains how the SPA, Firestore, and Workers fit together, plus the data model and the role-based access model. [Workers API](./workers/overview.md) covers the Cloudflare Workers backend endpoint by endpoint. [Deployment](./deployment/web-hosting.md) lists the human-only steps to ship web, Workers, and Android.

## Quick links

- Live app: [vessl.aoneahsan.com](https://vessl.aoneahsan.com)
- Android: [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.vessl)
- Author: [Ahsan Mahmood](https://aoneahsan.com)

## Frequently asked questions

**Is Vessl a finished product or a template?**
Both. It is a working, code-complete application and is structured as a white-label SaaS demo that can be re-skinned per tenant. The multi-tenant model lives in the `tenants` collection and the `tenant-resolver` Worker.

**What does the backend cost to run?**
Nothing on the listed tiers. Firestore and Firebase Auth run on the free tier, and Cloudflare Workers run on the free plan. File uploads route to FilesHub and per-user Google Drive rather than paid object storage.

**Which platforms ship?**
Web (any modern browser) and Android via Capacitor. iOS is not built — there is no Apple developer account wired in.
