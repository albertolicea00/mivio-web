# Mivio Web Agents Configuration

## Project Overview
Mivio Landing Page is the official presentation website for Mivio — the ultimate multi-platform media player ecosystem. This repository contains a lightweight, zero-build static website (HTML/CSS/Alpine.js) designed to showcase the Mivio ecosystem to users.

## Key Technologies
- HTML5
- TailwindCSS
- Alpine.js

## Project Structure
```
mivio-web/
├── api/                      # API endpoints (if any)
├── static/                   # Static assets
├── *.html                    # HTML pages (index.html, download.html, etc.)
├── navbar.html               # Navigation component
├── footer.html               # Footer component
├── replace_i18n.js           # Internationalization script
└── vercel.json               # Vercel configuration
```

## Development Guidelines
- This is a static website with no build process
- Changes to HTML, CSS, or JavaScript take effect immediately
- Use TailwindCSS utility classes for styling
- Use Alpine.js for interactivity
- Keep the site lightweight and fast-loading
- Ensure responsive design for all device sizes
- Follow web accessibility guidelines (WCAG)

## Agent Instructions
When working on this project:
1. Maintain consistency with the existing design system
2. Ensure all changes are responsive and mobile-friendly
3. Keep performance optimizations in mind (minimize HTTP requests, optimize images)
4. Test changes across different browsers and devices
5. Update navigation and footer consistently across all pages
6. Follow the existing code organization patterns