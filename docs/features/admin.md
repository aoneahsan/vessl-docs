---
id: admin
title: Admin console
description: Vessl's RBAC admin panel — inventory, leads CRM with pipeline, offers, appointments, marketing automation, blog editor, team management, multi-tenant settings, and analytics.
sidebar_label: Admin
---

# Admin console

The admin console at `/admin` is the operations cockpit. Access is gated by role-based permissions, so each route checks the signed-in user's role before rendering. Tabular data uses TanStack Table grids with consistent search, sorting, and column controls.

## Inventory and catalog

Car CRUD lives at `/admin/cars`, with create and edit forms at `/admin/cars/new` and `/admin/cars/:id/edit`. Categories are managed at `/admin/categories`. Inventory events — stock changes and movements — are recorded in the `inventory_events` collection and surfaced under `/admin/inventory`.

## Leads CRM and pipeline

The leads module turns intake into a sales process. `/admin/leads` lists leads, `/admin/leads/:id` opens a lead, `/admin/pipeline` shows the pipeline board, and `/admin/leads/reports` provides reporting. Leads are stored in the `leads` collection and advance through pipeline stages.

## Offers and appointments

Offers (the `offers` collection) are created and edited under `/admin/offers`, with public offer pages at `/offer/:id`. Appointments are scheduled at `/admin/appointments` and visualized at `/admin/calendar`, backed by the `appointments` collection.

## Marketing automation

`/admin/marketing` manages audience segments and message sequences, stored in the `segments`, `sequences`, and `sequence_runs` collections. The `marketing-cron` Worker executes due sequence steps on a schedule, so nurture campaigns run without manual sends.

## Blog

The blog editor at `/admin/blog` uses TipTap for rich text, with create and edit routes at `/admin/blog/new` and `/admin/blog/:id/edit`. Posts live in the `blog_posts` collection and render publicly at `/blog` and `/blog/:slug` with Article structured data.

## Team and tenancy

Team management at `/admin/team` covers members, invitations (`/admin/team/invites`, backed by the `team-invites` Worker and the `invites` collection), and a permission matrix at `/admin/team/permissions`. Multi-tenant settings live at `/admin/tenants` and `/admin/tenant/settings`, with the `tenant-resolver` Worker mapping a host or slug to a tenant in the `tenants` collection.

## Users, audit, diagnostics, analytics

`/admin/users` manages user records, `/admin/audit-log` shows the immutable `audit_log` of sensitive actions, `/admin/diagnostics` reports system health, and `/admin/analytics` renders metrics with D3 charts. An onboarding flow at `/admin/onboarding` walks a new operator through initial setup.

## Frequently asked questions

**How is admin access controlled?**
By role. Each admin route is wrapped in a permission check; users without the required permission are blocked. See [RBAC](../architecture/rbac.md).

**What is the audit log for?**
It records sensitive operations so an operator can review who changed what. Entries are append-only.

**How does multi-tenancy work?**
Tenants are stored in the `tenants` collection and resolved at request time by the `tenant-resolver` Worker, allowing the same deployment to serve multiple branded storefronts.
