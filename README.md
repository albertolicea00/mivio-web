# Mivio Landing Page

> Marketing landing page for **Mivio** — the ultimate Android media player.

[![MIT License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?logo=alpine.js&logoColor=black)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dark / Light mode** | Toggle persisted in `localStorage`, respects `prefers-color-scheme` |
| **i18n** | English (default) and Spanish, auto-detected from browser language |
| **Showcase carousel** | Auto-advances every 4 s, manual arrows and slide selectors |
| **Zero build step** | Plain HTML + CDN — open `index.html` directly in any browser |
| **Responsive** | Mobile-first layout, collapsible nav |

---

## 📂 Project structure

```
Mivio_Landing/
├── index.html          # Main page
├── static/
│   ├── css/
│   │   └── style.css   # Theme variables (dark/light), custom utility classes
│   ├── js/
│   │   └── app.js      # Alpine.js stores (theme, i18n) + showcase component
│   └── images/
│       ├── mockup.png      # Hero phone mockup
│       ├── showcase1.png   # Home screen screenshot
│       ├── showcase2.png   # Movie detail screenshot
│       └── showcase3.png   # Player screenshot
└── .gitignore
```

---

## 🚀 Quick start

No build step required — just open the file:

```bash
# Clone
git clone https://github.com/albertolicea00/Mivio_Landing.git
cd Mivio_Landing

# Open directly
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve it locally with any static server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## 🖼️ Adding screenshots

Drop your Android screenshots into `static/images/`:

| File | Used in |
|---|---|
| `mockup.png` | Hero section (phone render) |
| `showcase1.png` | Showcase slide 1 — Home screen |
| `showcase2.png` | Showcase slide 2 — Movie detail |
| `showcase3.png` | Showcase slide 3 — Player |

If an image is missing, a placeholder with an emoji is shown automatically.

---

## 🎨 Design tokens

Defined as CSS custom properties in `static/css/style.css`:

| Token | Dark | Light |
|---|---|---|
| Primary | `#FF6B00` | `#FF6B00` |
| Accent | `#00C4FF` | `#00C4FF` |
| Page background | `#121212` | `#F6F6F6` |
| Surface | `#1A1A1A` | `#FFFFFF` |

---

## 🌐 Adding a new language

1. Open `static/js/app.js`.
2. Add a new key to `Alpine.store('i18n').strings` (e.g. `fr: { ... }`).
3. Update the `toggle()` method to cycle through the new language.

---

## 📄 License

MIT © [Alberto Licea](https://github.com/albertolicea00)
