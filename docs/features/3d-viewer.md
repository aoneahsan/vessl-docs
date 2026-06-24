---
id: 3d-viewer
title: 3D vehicle viewer
description: Vessl's interactive 3D viewer is built on Three.js with the GLTF loader and orbit controls, rendering CC0 demo GLB models on the car detail page.
sidebar_label: 3D viewer
---

# 3D vehicle viewer

The 3D viewer lets a buyer rotate and inspect a vehicle directly in the browser. It is implemented with Three.js, the GLTF loader for model loading, and orbit controls for camera interaction, and it appears on the advanced car-detail layout.

## How it works

The viewer mounts a Three.js scene, loads a `.glb` model with `GLTFLoader`, and attaches `OrbitControls` so the user can orbit, zoom, and pan with mouse or touch. Lighting and camera framing are set so the model reads well against the dark theme. The component cleans up its renderer and animation loop on unmount to avoid leaking WebGL contexts when navigating between cars.

## Models

The repository ships six Creative Commons Zero demo GLB models under `public/models/`, used as stand-ins for real vehicle scans. Each car can point at a model; when none is set, the detail page falls back to its image gallery. Because the models are CC0, they can be redistributed without attribution constraints.

## Performance considerations

GLB files are loaded on demand only when a detail page that uses the viewer is opened, so the listing and lighter detail modes never pay the cost. The viewer respects the user's reduced-motion preference by avoiding gratuitous auto-rotation, and it releases GPU resources when the page changes.

## Frequently asked questions

**What model format does the viewer use?**
glTF binary (`.glb`), loaded with Three.js `GLTFLoader`.

**Can I add my own vehicle models?**
Yes. Drop a `.glb` into `public/models/` and reference it from the car record. Keep file size modest so first render stays fast.

**Is the viewer shown on every car?**
No. It renders on the advanced detail mode. Basic and intermediate modes stay image-based for speed.
