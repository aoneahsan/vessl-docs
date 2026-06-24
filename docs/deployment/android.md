---
id: android
title: Android build
description: Build the Vessl Android app with Capacitor — sync the web build, bump the version, produce a signed AAB, and submit to the Play Console.
sidebar_label: Android
---

# Android build

Vessl ships to Android by wrapping the web build with Capacitor. The Android project is initialized under `android/`, the app id is `com.aoneahsan.vessl`, and the splash, status bar, and edge-to-edge behavior are configured in `capacitor.config.ts`. Signing, the signed build, and the Play Console submission are manual steps that need a keystore and a developer account.

## Sync the web build into the native project

```bash
yarn build
yarn cap:sync       # cap sync android — regenerates android assets + capacitor.config.json
```

Running `cap sync` is required after any change to `capacitor.config.ts`, because it regenerates `android/app/src/main/assets/capacitor.config.json` that the native app actually reads.

## Bump the version

Use the version bump helper, then confirm the version name and version code in the Gradle config:

```bash
yarn bump:android
```

The version code must exceed every previously uploaded artifact, including any rejected one.

## Edge-to-edge and system bars

Android 15 enforces edge-to-edge. Vessl makes the `@capawesome` support plugin the sole insets owner by setting `SystemBars.insetsHandling: 'disable'` in `capacitor.config.ts`, and a theme-aware service recolors the status and navigation bars on theme change. On-device verification — that content sits below the status bar and above the navigation bar, that bars match the theme, and that rotation introduces no gap — is a manual step.

## Build and sign the AAB

Open the project in Android Studio and produce a signed Android App Bundle:

```bash
yarn cap:open      # opens android/ in Android Studio
```

Build the release AAB with the real keystore (never committed to git). The release build enables R8 with Capacitor and plugin keep rules, resource shrinking, and native debug symbols.

## Submit to the Play Console

Upload the signed AAB to the Play Console, complete the App content declarations and the Data Safety form, attach store assets, and submit for review. The store listing copy and declarations live in the app repository under `docs/play-store/`.

## Frequently asked questions

**Why must I run `cap sync` after editing the Capacitor config?**
Because the native app reads a generated `capacitor.config.json`; editing the TypeScript config alone does not update what runs on the device.

**Is iOS supported?**
No iOS build is wired in — there is no Apple developer account configured. The same web build could target iOS later through Capacitor.

**Where is the keystore?**
Held by the owner, never committed. Signed builds and the Play upload are human-only steps.
