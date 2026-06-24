---
id: consultations-quotes
title: Consultations & quotes
description: Vessl's conversion flows — book a consultation against Google Calendar, request a quote, submit an inquiry or contact message, and capture leads.
sidebar_label: Consultations & quotes
---

# Consultations & quotes

Vessl's conversion flows turn a browsing visitor into a tracked lead. Three intake paths exist — booking a consultation, requesting a quote, and contacting the team — and each writes to Firestore through a Cloudflare Worker so server-side validation, email, and calendar logic stay off the client.

## Book a consultation

`/book-consultation` collects a preferred time and contact details and posts to the `google-calendar-proxy` Worker. The Worker creates a Google Calendar event for the chosen slot and records the booking in the `consultations` collection. The customer sees their consultations in the dashboard; operators see them in the admin console with status management.

Calendar booking requires an admin Google account refresh token set as a Worker secret; until that is configured, the flow records the consultation but cannot write the calendar event.

## Request a quote

A quote request, reachable from car detail pages, captures the vehicle of interest plus contact details and posts to the `contact-form` Worker. The Worker validates the payload with Zod, persists it, and can trigger a transactional email via the `email-sender` Worker. Quote and inquiry records appear in the customer dashboard and the admin inquiries view.

## Contact and inquiries

`/contact` is the general contact form. Like quotes, it routes through the `contact-form` Worker into the `inquiries` collection. The same intake powers the "sell your Vessl" path at `/sell-vessl`.

## Leads CRM

Every intake also feeds the leads pipeline. The admin `leads` module groups, scores, and advances leads through pipeline stages, with reports under `/admin/leads/reports`. Marketing segments and sequences (the `segments` and `sequences` collections, executed by the `marketing-cron` Worker) can nurture leads automatically.

## Frequently asked questions

**Why do intake forms go through Workers instead of writing Firestore directly?**
So secrets (email provider keys, the calendar refresh token) never reach the browser, and so server-side validation and email run in one place.

**What happens to a quote after submission?**
It is stored as an inquiry, optionally emailed to the operator, and surfaced in both the customer dashboard and the admin inquiries and leads views.

**Does booking require a paid calendar service?**
No. It uses a Google account's Calendar API through a free Cloudflare Worker, gated on an admin refresh token.
