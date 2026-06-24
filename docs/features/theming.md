---
id: theming
title: Theming
description: Vessl ships a user-facing theme customizer built on Radix and CSS design tokens, with cross-device persistence and a boot loader that prevents theme flash.
sidebar_label: Theming
---

# Theming

Vessl exposes appearance controls to every visitor, signed in or not. The design system is dark-first with a teal signature accent, expressed as CSS custom properties in `src/styles/vessl-tokens.css` and surfaced to Tailwind v4 through an `@theme` block.

## Design tokens

Color, typography, spacing, and radius are defined as CSS variables — for example `--bg-1`, `--accent`, and `--text-1`. Components reference these tokens rather than hardcoded values, so a theme change re-tints the whole app at once. The default palette is a near-black background (`#0A0B0C`) with a teal accent (`#3BB9CE`) and an editorial serif paired with a humanist sans.

## The customizer

A theme customizer lets users set appearance (light, dark, or system) and related preferences. Card-based selectors, not dropdowns, present the choices visually. The customizer is reachable from the app chrome and works for unauthenticated visitors, whose choices persist locally.

## Persistence and sync

Preferences persist in two layers. For everyone, choices are written to local storage through `@capacitor/preferences`, which maps to localStorage on web and native key-value storage on Android. For signed-in users, preferences also write to the `users/{uid}.preferences` Firestore document, so the same settings follow the user across devices. On sign-in, the remote preferences merge into local state.

## Boot loader and no theme flash

To avoid a flash of the wrong theme on first paint, the app shows a full-page boot loader until the theme has hydrated and authentication has resolved its first state. The resolved appearance maps `system` to light or dark using the `prefers-color-scheme` media query, with a live listener so the app follows the OS if the user picked system.

## System bars on Android

On Android the status bar and navigation bar are recolored to match the active theme. The app uses edge-to-edge rendering with the `@capawesome` support plugin as the sole insets owner and a theme-aware service that flips bar background and icon contrast on theme change.

## Frequently asked questions

**Can signed-out users change the theme?**
Yes. The customizer works for everyone, and unauthenticated choices persist locally on the device.

**Why is there a boot loader?**
It gates first paint until the theme is hydrated, which prevents the app from rendering in the wrong theme and then snapping to the user's preference.

**Where are theme tokens defined?**
In `src/styles/vessl-tokens.css` as CSS custom properties, exposed to Tailwind through an `@theme` block.
