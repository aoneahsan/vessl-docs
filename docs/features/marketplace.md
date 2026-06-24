---
id: marketplace
title: Marketplace
description: Vessl's storefront — inventory listing, car detail pages with three detail modes, categories, full-text search, and side-by-side comparison.
sidebar_label: Marketplace
---

# Marketplace

The marketplace is the public storefront where visitors browse and evaluate vehicles. It is built from real-time Firestore data in the `cars` and `categories` collections and renders entirely client-side, with structured data injected so each car is machine-readable.

## Inventory listing

`/cars` lists available vehicles with filtering, sorting, and pagination. Filter and sort state lives in the URL search parameters, so a filtered view is shareable and survives a refresh — a deliberate rule applied across the app. Quick filters on the homepage hero deep-link straight into a pre-filtered listing.

## Car detail and detail modes

`/cars/:slug` renders a single vehicle. Detail pages support three presentation modes — basic, intermediate, and advanced — that progressively reveal more specification depth, so the same data can be shown as a simple summary or a full spec sheet. Each detail page emits JSON-LD describing the vehicle and links into the quote, consultation, and comparison flows. A cost calculator and financing calculator let a buyer model total cost and monthly payments inline.

## Categories

`/categories` and `/category/:slug` group inventory by category. Categories are managed in the admin console and stored in the `categories` collection, with each car referencing its category.

## Search

`/search` provides full-text search across inventory. Results update as the query changes, and the query is reflected in the URL (`?q=`) so a search is bookmarkable.

## Comparison

`/compare` places vehicles side by side so a buyer can weigh specifications against each other. The comparison set is held in the URL, keeping it shareable.

## Recently viewed and favorites

The app tracks recently viewed vehicles locally, and signed-in customers can favorite cars. Favorites persist to Firestore against the user's account and surface in the dashboard under saved cars.

## Frequently asked questions

**Where does inventory data come from?**
The `cars` collection in Firestore, written through the admin console and streamed to the storefront with real-time listeners.

**Can I share a filtered or compared view?**
Yes. Filters, sort, search query, and the comparison set are all encoded in the URL, so any view can be copied and shared.

**How do detail modes work?**
A single car record drives three layouts. Basic shows the essentials, intermediate adds specifications, and advanced shows the complete spec sheet plus the 3D viewer and calculators.
