---
id: dashboard
title: Customer dashboard
description: The signed-in customer area in Vessl — saved cars, consultations, inquiries, messages, Google Drive connection, and account settings with data deletion.
sidebar_label: Dashboard
---

# Customer dashboard

The dashboard at `/dashboard` is the signed-in customer's home. Authentication is required; an unauthenticated visit is redirected to sign-in. Customers reach it after signing in with Google or email through Firebase Auth.

## Saved cars

`/dashboard/saved` lists the vehicles the customer has favorited. Favorites are stored against the user's account in Firestore and stay in sync across devices because they read from the same real-time source.

## Consultations and inquiries

`/dashboard/consultations` shows the customer's booked consultations with their current status, and `/dashboard/inquiries` shows submitted quote and contact inquiries. Both read the customer's own records from the `consultations` and `inquiries` collections, enforced by Firestore security rules that scope reads to the owner.

## Messages

`/dashboard/messages` surfaces operator replies and notifications relevant to the customer, giving a single place to follow up on an inquiry or consultation.

## Google Drive connection

`/dashboard/drive-connection` lets a customer connect their Google Drive so that documents they upload route to their own Drive rather than shared storage. The connection uses the `gdrive-token-proxy` Worker to complete OAuth and obtain a per-user token; uploads then go through that Worker. This keeps customer documents in the customer's own account.

## Settings and account deletion

`/dashboard/settings` manages profile and preferences, including theme preferences that sync cross-device through the `users/{uid}.preferences` document. The account-deletion flow soft-deletes the account; the `account-purge-cron` Worker hard-deletes accounts that have been soft-deleted for more than thirty days. The public `/account-deletion` and `/data-deletion` pages document this for store compliance.

## Frequently asked questions

**Where are a customer's documents stored?**
In the customer's own Google Drive, via the per-user Drive connection, rather than in shared object storage.

**Can a customer delete their account and data?**
Yes. The settings flow soft-deletes immediately, and a daily cron permanently removes accounts after a thirty-day grace period.

**Do preferences follow the user across devices?**
Yes. Theme and related preferences persist to the user's Firestore document and to local Capacitor preferences, so a signed-in user sees the same settings everywhere.
