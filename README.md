# 🍿 Mivio Landing Page & Ecosystem Hub

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/CSS-Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Alpine.js](https://img.shields.io/badge/JS-Alpine.js-8BC0D0?style=flat-square&logo=alpine.js&logoColor=black)](https://alpinejs.dev/)

**Mivio Landing Page** is the official presentation website for **Mivio** — the ultimate multi-platform media player ecosystem. 

Rather than being a complex application itself, this repository contains a lightweight, zero-build static website (HTML/CSS/Alpine.js) designed to showcase the Mivio ecosystem to users.

---

## 🌍 The Mivio Ecosystem

Mivio is built natively for every major platform to ensure the best possible performance and user experience. You can find the source code for each specific platform in their respective repositories:

| Platform / Ecosystem | Repository | Technologies |
| :--- | :--- | :--- |
| **🍎 Apple Ecosystem** | [**mivio-apple**](https://github.com/albertolicea00/mivio-apple) | Swift 6, SwiftUI, SwiftData |
| **🤖 Android** | [**mivio-android**](https://github.com/albertolicea00/mivio-android) | Kotlin, Jetpack Compose, Room |
| **📺 Smart TV** | [**mivio-smarttv**](https://github.com/albertolicea00/mivio-smarttv) | Tizen, LG webOS, Web Tech |
| **🟣 Roku** | [**mivio-roku**](https://github.com/albertolicea00/mivio-roku) | BrightScript, Roku SceneGraph |
| **💻 Desktop (PC/Linux)** | [**mivio-desktop**](https://github.com/albertolicea00/mivio-desktop) | Electron, Rust Bridges, mpv/VLC |
| **🥽 Virtual Reality** | [**mivio-vr**](https://github.com/albertolicea00/mivio-vr) | Unity 3D / OpenXR |

---

## 🎯 Repository Purpose & Features

This repository acts as the central hub for the entire Mivio ecosystem, serving multiple roles:

- ✅ **Official Landing Page**: The main entry point to download the various clients.
- ✅ **Help Center**: Centralized documentation, user manuals, FAQs, and setup guides.
<!-- - ✅ **Web Marketplace**: A dedicated web interface to browse and download immersive environments for VR and visionOS. -->
<!-- - ✅ **Community Space**: A platform where the community can upload, share, and rate custom 3D models and environments. -->

---

## 📊 Feature Comparison Matrix

Because Mivio adapts natively to the constraints and paradigms of each ecosystem, the feature set varies by platform. 

| Feature | iOS & macOS | Android Mobile | Android/Google TV | Desktop (PC/Linux) | tvOS | Smart TV (Tizen) | Roku | visionOS | VR (Quest/Pico) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Local File Reading** | ✅ Yes | ✅ Yes | ✅ Yes (USB) | ✅ Yes | ❌ No | ✅ Yes (USB) | ❌ No | ❌ No | ❌ No |
| **Local File Writing** | ✅ Yes | ✅ Yes | ✅ Yes (.nfo) | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| **Local Multi-Account** | ✅ Yes | ✅ Yes | ✅ Optional | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| **Home Server Client** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Metadata Parsing** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Server | ❌ Server | ❌ Server | ❌ Server | ❌ Server |
| **Native Player** | AVPlayer | ExoPlayer | ExoPlayer / VLC | mpv / VLC | AVPlayer | Native Tizen | BrightScript | AVPlayer | ExoPlayer |
| **Immersive Spaces**| ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ✅ RealityKit | ✅ AssetBundle |
| **Marketplace** | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
