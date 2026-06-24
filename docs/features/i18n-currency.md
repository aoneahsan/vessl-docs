---
id: i18n-currency
title: i18n & multi-currency
description: Vessl localizes its interface with i18next and prices inventory in multiple currencies using daily FX rates cached by a Cloudflare Worker.
sidebar_label: i18n & currency
---

# Internationalization and multi-currency

Vessl is built to serve more than one language and one currency from the same data. Translation is handled by i18next; currency conversion is handled by a dedicated engine fed by a Worker that refreshes exchange rates daily.

## Internationalization

The interface uses `i18next` with `react-i18next` and the browser language detector. Translation strings live as JSON under `public/locales/`, one folder per locale, so adding a language is a matter of adding a locale folder and its keys. A language switcher in the footer lets any visitor change language, and the choice persists. Strings are referenced by key throughout the components rather than hardcoded, including dynamic content such as the rotating search-box placeholders on the homepage hero.

## Multi-currency pricing

Prices are stored once and presented in the visitor's chosen currency. A `<Price>` component and a currency switcher read live rates that the `currency-rates` Worker fetches daily and caches in Cloudflare KV. The Worker exposes the rate table to the client, and the conversion engine applies it at render time, so a single price field can display in any supported currency without re-storing values.

## How rates stay fresh

The `currency-rates` Worker runs on a cron schedule, pulls current exchange rates, and writes them to KV with a timestamp. Clients read the cached table rather than calling a rate provider directly, which keeps the provider quota low and conversion fast. If the Worker is not deployed, pricing falls back to the base currency.

## Frequently asked questions

**How do I add a new language?**
Add a locale folder under `public/locales/` with the translated keys and register the locale; the switcher picks it up.

**Where do exchange rates come from?**
The `currency-rates` Worker fetches them daily and caches them in Cloudflare KV. The client reads the cached table.

**What happens if the currency Worker is offline?**
Prices display in the base currency. Conversion degrades gracefully rather than erroring.
