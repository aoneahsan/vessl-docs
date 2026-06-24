---
id: overview
title: Workers overview
description: Vessl's backend is 13 Cloudflare Workers behind a CORS-locked origin — intake, email, calendar, uploads, currency, SEO, marketing, tenancy, and a purge cron.
sidebar_label: Overview
---

# Workers overview

Vessl's server-side logic lives in thirteen Cloudflare Workers under `workers/`. Each is an independent TypeScript Worker with its own `wrangler.toml`, sharing a CORS-locked helper module in `workers/_shared`. They exist because the browser cannot safely hold secrets, run cron jobs, or proxy third-party APIs — so those responsibilities move to the edge.

## Why Workers and not Firebase Functions

Cloudflare's free Worker plan covers this workload, whereas Firebase Functions require the paid Blaze plan. Keeping the backend on Workers preserves Vessl's zero-cost posture. Every Worker validates input with Zod, locks CORS to the app origins, and exposes a `GET /health` endpoint returning `{ ok, worker, version }`.

## Authentication

Endpoints authenticate one of two ways depending on what they do. User-facing actions expect a Firebase ID token in the `Authorization: Bearer ...` header, which the Worker verifies before acting. Internal or cron endpoints use a shared service token in an `X-Service-Token` header. The chosen scheme is documented per endpoint in `docs/api/openapi.yaml`.

## Secret naming

Because all of the author's projects share one Cloudflare account, every Worker secret is prefixed with the project name — `VESSL_RESEND_API_KEY`, `VESSL_GOOGLE_CALENDAR_REFRESH_TOKEN`, and so on — and Worker names are prefixed too (`vessl-contact-form`, `vessl-email-sender`). This prevents collisions across projects in the same account.

## The thirteen Workers

| Worker | Responsibility |
| --- | --- |
| `contact-form` | Contact, quote, and inquiry intake into Firestore |
| `email-sender` | Transactional email via Resend |
| `google-calendar-proxy` | Consultation booking + Google Calendar event creation |
| `gdrive-token-proxy` | Per-user Google Drive OAuth and uploads |
| `fileshub-proxy` | Admin file uploads proxied to FilesHub |
| `currency-rates` | Daily FX-rate cron, cached in KV |
| `og-generator` | Dynamic Open Graph SVG image generation |
| `indexnow-pusher` | Search-engine ping (IndexNow / Bing / Yandex) |
| `sitemap-worker` | Dynamic `sitemap.xml` and RSS `feed.xml` from Firestore |
| `account-purge-cron` | Daily hard-delete of accounts soft-deleted over 30 days |
| `marketing-cron` | Executes due marketing sequence steps |
| `team-invites` | Issues and validates team invitation tokens |
| `tenant-resolver` | Resolves a host or slug to a tenant configuration |

The [Workers reference](./reference.md) describes each one's endpoints, auth, and secrets in detail.

## Frequently asked questions

**Do I need all thirteen Workers to run the app?**
No. The SPA boots and the storefront works without any Worker. Workers add the server-side flows — intake, email, calendar, uploads, currency, SEO, marketing, tenancy, and the purge cron.

**How is CORS handled?**
A shared helper in `workers/_shared` locks every Worker's CORS to the app's origins, so the endpoints cannot be called from arbitrary sites.

**How do I deploy them?**
With Wrangler, one Worker at a time or in bulk. See [Workers deployment](../deployment/workers.md).
