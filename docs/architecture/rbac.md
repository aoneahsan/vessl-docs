---
id: rbac
title: Roles & permissions (RBAC)
description: Vessl gates admin features with a role-based access model — permissions mapped to roles, enforced in the UI with guards and in Firestore with security rules.
sidebar_label: RBAC
---

# Roles and permissions

Vessl controls who can do what with a role-based access model. Permissions describe discrete capabilities; roles bundle permissions; and both the client UI and Firestore security rules check them, so access is enforced in two places rather than trusting the browser alone.

## The model

The RBAC module defines a permission set covering the admin surface — managing cars, categories, blog, leads, offers, appointments, inventory, marketing, team, tenants, users, and settings — and a small number of roles that group those permissions. A signed-in user carries a role; their effective permissions are the union granted by that role.

## Enforcement in the UI

Admin routes and controls are wrapped in guards. `RequireRole` blocks a route for users without the needed role, and a `PermissionGate` hides or disables individual controls based on a permission. This means an operator only sees the actions they are allowed to take, and a direct navigation to a forbidden route is redirected rather than rendered.

## Enforcement in Firestore

The same boundaries are mirrored in `firestore.rules`. Even if a client check were bypassed, a write to a restricted collection is rejected by the rules unless the requesting user holds the matching role. Customer-owned collections are scoped to the owner's `uid`; admin collections require an operator role. This dual enforcement is what makes the model trustworthy.

## Team management

Operators are organized into teams (the `teams` collection). New operators are added by invitation: an admin issues an invite through the `team-invites` Worker, which records it in the `invites` collection; the invitee accepts at `/invite/:token`. A permission matrix at `/admin/team/permissions` shows which roles hold which permissions.

## Frequently asked questions

**Where are permissions defined?**
In the RBAC module under `src/modules/rbac`, with roles mapping to permission sets.

**Is access enforced only in the browser?**
No. The UI guards are convenience; Firestore security rules enforce the same boundaries server-side, so the rules are the real gate.

**How are new operators onboarded?**
Through invitations issued by the `team-invites` Worker and accepted via a tokenized link, after which the operator's role determines their access.
