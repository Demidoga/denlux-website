# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## What this is

A single-page marketing site for **Denlux Dental**, a private dental clinic led by Dr. Saad Ahmed. The design _is_ the product: the goal is converting interested visitors into booked appointments through premium, restrained, editorial presentation. Read `PRODUCT.md` for the brand stance (register: `brand`, personality: "precise, warm, considered") before making design decisions; it is the source of truth for voice, audience, and anti-references.

Stack: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4, with `motion` (Framer Motion), `lenis` (smooth scroll), and `@phosphor-icons/react`.

## Commands

```bash
npm run dev                 # dev server on :3000
npm run dev -- -p 3210      # dev server on :3210 (REQUIRED before running screenshots)
npm run dev:clean -- -p 3210 # wipe .next, then dev on 3210 (use when the site renders broken)
npm run clean               # remove the .next build cache
npm run build               # production build
npm run start               # serve the production build
npm run lint                # next lint

node shot.mjs               # screenshot light/dark/wide/mobile -> /tmp/denlux-shots
```

There is no test suite. "Verifying" a change means building, linting, and visually checking with `shot.mjs`.

**Screenshot gotcha:** `shot.mjs` is hardcoded to `http://localhost:3210` and launches Chrome from `/usr/bin/google-chrome`. The dev server must be running on **3210**, not the default 3000, or every shot times out. It seeds the theme via `localStorage["denlux-theme"]` per shot, so it captures both modes correctly.

**Stale-cache gotcha (site renders blank / "all content not loading"):** if the page comes up empty or styleless, suspect a corrupted `.next` cache, not the browser or the network. The tell is an **HTTP 500** whose body contains `Cannot find module './<n>.js'` from `.next/server/webpack-runtime.js` — webpack's manifest references a chunk that no longer exists on disk, so every request to `/` throws and nothing renders. Confirm with `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3210/`; fix with `npm run dev:clean -- -p 3210` (or `npm run clean` then restart), and hard-refresh the tab. **Root cause:** `next dev` and `next build` share one `.next/` folder but write different chunk hashes, so running a build against a live dev server (or killing dev mid-compile) leaves the running process pointing at deleted chunks. Avoid it by not running `build` while a `dev` server is up.

## Architecture

`app/page.tsx` composes the whole site as an ordered list of section components (`Hero`, `Marquee`, `About`, `Services`, `Gallery`, `Interlude`, `Testimonials`, `Booking`, plus `Nav` and `Footer`). Each section lives in `app/components/` and owns its own layout. There are no routes beyond `/`; "pages" like About are sections, not separate routes.

`app/layout.tsx` loads the two fonts via `next/font/google`, injects `ThemeScript` into `<head>`, mounts `SmoothScroll`, and applies the `grain` overlay to `<body>`.

**Server vs. client:** components are React Server Components by default. Only components that need interactivity or motion hooks are marked `"use client"` (`Hero`, `Nav`, `Testimonials`, `ThemeToggle`, `BookButton`, `SmoothScroll`, and the shared `motion.tsx` primitives). Keep new components server-side unless they genuinely need the client.

## Theming

Two fully committed color modes share one accent (Denlux Cyan): `light` is warm-cream editorial, `dark` is the "private members' clinic" interior. The theme is an attribute, not a class.

- `ThemeScript.tsx` runs an inline script before paint that reads `localStorage["denlux-theme"]` (falling back to the OS preference) and sets `data-theme` on `<html>`. This prevents a flash of the wrong mode. `ThemeToggle.tsx` writes the same key.
- Tailwind's `dark:` variant is wired to that attribute in `globals.css` via `@custom-variant dark ([data-theme="dark"] &)`, **not** the default `prefers-color-scheme`. Most components never need `dark:` because they consume tokens that already swap per mode.

## Design tokens

Colors, fonts, and easings are CSS custom properties defined per-mode in `app/globals.css` (`:root`/`[data-theme="light"]` and `[data-theme="dark"]`), then re-exported to Tailwind through `@theme inline`. Consume them as ordinary Tailwind utilities, never hardcode hex:

- Surfaces: `bg-bg`, `bg-surface`, `bg-surface-2`. Text: `text-ink`, `text-ink-soft`, `text-muted`. Hairlines: `border-line` / `divide-line`.
- Accent: `bg-accent` for cyan fills; `text-accent-strong` for cyan _as text_ (it is the AA-contrast-safe shade and differs per mode); `text-accent-ink` for dark text on cyan.
- The `deep-*` and `frame-deep-*` tokens are the constant muddy-dark anchor used by `Interlude` and `Footer`; `frame`/`rail` back the framed images. These stay dark in both modes.

Type: add the `.font-display` class for the Libre Caslon Display serif (display headings); body defaults to Hanken Grotesk. `.prose-measure` caps measure at 62ch. The standard heading uses fluid `clamp()` with negative tracking; match the existing scale rather than inventing one.

## Layout & motion conventions

- **Container:** `mx-auto max-w-[1320px] px-5 sm:px-8` is the standard editorial container. **Section rhythm:** `py-24 sm:py-32 lg:py-40` (vary the exact values for rhythm, but stay in this family). Sections that are anchor targets add `scroll-mt-24` and an `id`.
- **Motion is reduced-motion-safe, always.** Every animation must have a `prefers-reduced-motion: reduce` fallback. Reuse the shared primitives in `app/components/motion.tsx` (`Reveal` for scroll entrances, `FramedImage` for the layered-frame photo treatment, `Magnetic` for CTAs) rather than re-implementing. The standard easing is `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).
- **Never gate content visibility on a reveal firing.** `Reveal` applies a `.reveal` class that `globals.css` forces visible under reduced motion, so content still shows for crawlers, headless renders, and no-JS. Preserve that pattern; do not hide content behind a class-triggered transition that may never run.
- **Smooth scroll:** `SmoothScroll.tsx` (Lenis) intercepts `a[href^="#"]` clicks with an `-84px` offset for the sticky nav, and disables itself entirely under reduced motion. In-page links should be plain `#anchor` hrefs.
- **One booking CTA:** always use `BookButton` (anchors to `#book`) so there is one label for one intent. Do not hand-roll booking buttons.

## Copy convention

Body and heading copy contains **no em-dashes (U+2014) or en-dashes (U+2013)** anywhere; the source is currently clean of both. Restructure with commas, periods, or rewording instead. This is a deliberate house style from the original brief, not an accident, so preserve it when writing or editing copy.
