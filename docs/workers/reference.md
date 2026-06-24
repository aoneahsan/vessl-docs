---
id: reference
title: Workers reference
description: Endpoint-level reference for each of Vessl's 13 Cloudflare Workers — purpose, auth scheme, required secrets, and behavior.
sidebar_label: Reference
---

# Workers reference

Each Worker is independent, lives under `workers/<name>/`, and exposes `GET /health` returning `{ ok, worker, version }`. The OpenAPI source of truth is `docs/api/openapi.yaml` in the app repository. Auth is either a Firebase ID token (`Authorization: Bearer`) or a shared service token (`X-Service-Token`), noted per Worker below.

## contact-form

Intake for contact messages, quote requests, and inquiries. Validates the payload with Zod and writes to the `inquiries` collection, optionally triggering an email through `email-sender`. Auth: public submit (rate-limited and CORS-locked). Powers `/contact`, `/sell-vessl`, and car-detail quote requests.

## email-sender

Sends transactional email via Resend. Called by other Workers or admin actions with a service token. Requires the `VESSL_RESEND_API_KEY` secret; without it the Worker is deployed but cannot send, and the rest of the app continues to function.

## google-calendar-proxy

Books consultations and creates Google Calendar events for the chosen slot, recording the booking in `consultations`. Requires the `VESSL_GOOGLE_CALENDAR_REFRESH_TOKEN` secret (an admin Google account's refresh token from a one-time OAuth consent). Without it, bookings are stored but no calendar event is written. Auth: Firebase ID token for the booking user.

## gdrive-token-proxy

Completes per-user Google Drive OAuth and proxies uploads so a customer's documents land in their own Drive. Auth: Firebase ID token. Used by `/dashboard/drive-connection`.

## fileshub-proxy

Proxies admin file uploads to FilesHub, keeping the FilesHub API key server-side. Uploads use public visibility per the project's storage convention. Auth: admin Firebase ID token or service token. Requires the FilesHub key as a Worker secret.

## currency-rates

Runs on a cron schedule, fetches current exchange rates, and caches them in Cloudflare KV with a timestamp. Exposes the cached rate table to the client for the multi-currency engine. No user auth; read endpoint is CORS-locked.

## og-generator

Generates Open Graph images as SVG on demand for shareable URLs, so social previews are branded per page. No user auth; CORS-locked.

## indexnow-pusher

Pings IndexNow-compatible engines (Bing, Yandex) and search engines when content changes, so new and updated URLs are discovered quickly. Auth: service token. Requires an IndexNow key.

## sitemap-worker

Builds `sitemap.xml` and an RSS `feed.xml` dynamically from Firestore, so the sitemap and feed reflect live inventory and blog content rather than a stale static file. No user auth; CORS-locked.

## account-purge-cron

A daily cron that hard-deletes accounts soft-deleted more than thirty days earlier, completing the data-deletion guarantee surfaced on `/account-deletion`. Auth: cron-triggered with a service token; uses a Firebase service account.

## marketing-cron

Executes due steps of marketing sequences for matching segments, recording each run in `sequence_runs`. Cron-triggered with a service token. Backs `/admin/marketing`.

## team-invites

Issues team-invitation tokens and validates them on acceptance, writing to the `invites` collection. Auth: admin Firebase ID token to issue; token validation on accept at `/invite/:token`.

## tenant-resolver

Maps an incoming host or slug to a tenant configuration in the `tenants` collection, enabling one deployment to serve multiple branded storefronts. CORS-locked; read-oriented.

## Frequently asked questions

**Which Workers need secrets before they function?**
`email-sender` (Resend key), `google-calendar-proxy` (calendar refresh token), `fileshub-proxy` (FilesHub key), `indexnow-pusher` (IndexNow key), and the cron Workers (Firebase service account / service token). The rest run without per-deployment secrets.

**What is the health endpoint for?**
Every Worker answers `GET /health` with `{ ok, worker, version }` so deployment and uptime can be checked uniformly.

**Where is the formal API spec?**
`docs/api/openapi.yaml` in the app repository, with a Bruno collection under `docs/api/bruno`.
