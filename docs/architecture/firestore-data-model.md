---
id: firestore-data-model
title: Firestore data model
description: Vessl's Firestore collections — cars, categories, leads, consultations, inquiries, offers, appointments, blog posts, users, teams, tenants, and more.
sidebar_label: Firestore data model
---

# Firestore data model

Firestore is Vessl's single data store. The client reads it through real-time listeners and writes through it directly for authenticated mutations, with security rules in `firestore.rules` enforcing who can read and write each collection. Composite indexes are declared in `firestore.indexes.json`.

## Collections

The schema is intentionally flat — top-level collections keyed by document id, related by reference fields rather than deep nesting.

| Collection | Holds | Access shape |
| --- | --- | --- |
| `cars` | Vehicle inventory records | Public read; admin write |
| `categories` | Inventory categories | Public read; admin write |
| `blog_posts` | Blog articles | Public read (published); admin write |
| `offers` | Promotional offers | Public read; admin write |
| `users` | User profiles and `preferences` | Owner read/write; admin read |
| `consultations` | Booked consultations | Owner + admin |
| `inquiries` | Quote and contact inquiries | Owner + admin |
| `leads` | CRM leads | Admin |
| `appointments` | Scheduled appointments | Admin |
| `inventory_events` | Stock changes and movements | Admin |
| `segments` | Marketing audience segments | Admin |
| `sequences` | Marketing message sequences | Admin |
| `sequence_runs` | Executed sequence steps | Admin / Worker |
| `teams` | Operator teams | Admin |
| `invites` | Team invitations | Admin / Worker |
| `tenants` | Multi-tenant configurations | Admin / resolver Worker |
| `settings` | Application and tenant settings | Admin |
| `activities` | Activity feed entries | Scoped |
| `audit_log` | Immutable record of sensitive actions | Append-only; admin read |

## Ownership and security rules

Customer-owned records — consultations, inquiries, favorites, and the user's own profile — are readable and writable only by their owner, identified by `request.auth.uid`, with admins granted broader read for operations. Public catalog data (cars, categories, published blog posts, offers) is world-readable but write-restricted to roles with the matching permission. The `audit_log` is append-only so history cannot be rewritten. Writes are run through a `stripUndefined` sanitizer before they reach Firestore to keep documents clean.

## Real-time by default

Reads use `onSnapshot` so the UI reflects changes immediately — a new lead appears in the pipeline, a status change shows in the customer dashboard — without manual refresh. One-time `getDoc`/`getDocs` reads are reserved for exports and server-side code.

## Frequently asked questions

**Are documents nested or flat?**
Flat. Collections are top-level and relate through reference fields, which keeps security rules and indexes simple.

**How is customer data protected?**
Security rules scope owner-only collections to `request.auth.uid`, so a customer can read only their own consultations, inquiries, and profile.

**Where are indexes defined?**
In `firestore.indexes.json`, deployed with `firebase deploy --only firestore:indexes`.
