---
target: Hero section
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-06-17T20-33-05Z
slug: app-components-hero-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Minimal feedback needed; hover-grow on the "Meet Dr. Saad" link is a nice touch |
| 2 | Match System / Real World | 4 | Warm, human copy ("Care that takes its time", "Meet Dr. Saad"), zero jargon |
| 3 | User Control and Freedom | 3 | n/a-leaning; anchor nav, nothing traps |
| 4 | Consistency and Standards | 3 | Uses BookButton + tokens, but new Inter display breaks the established serif/sans contrast system |
| 5 | Error Prevention | n/a (3) | No inputs in hero |
| 6 | Recognition Rather Than Recall | 4 | Everything visible and labeled |
| 7 | Flexibility and Efficiency | 3 | n/a-leaning |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and focused; dings for dead `blur-[px]` class, over-choreographed entrance, Inter flattening the premium feel |
| 9 | Error Recovery | n/a (3) | No error states |
| 10 | Help and Documentation | 3 | "Meet Dr. Saad" gives a clear next step |
| **Total** | | **32/40** | **Good** (several heuristics n/a for a static hero) |

## Anti-Patterns Verdict

**LLM assessment:** Not obviously AI-generated. The image-led hero (real warm reception photo, dimmed as a desktop background, full uncropped frame on mobile) is a confident, on-brand move that matches the "private members' clinic" stance. Single primary CTA + one secondary text link = correct restraint. The hero avoids every brand-ban (no gradient text, no hero-metric template, no card grid). The one template-adjacent element is the hairline + "Private dental care" eyebrow, but as a single hero kicker (sentence case, tight tracking, not repeated as section grammar) it stays on the right side of the line.

**Deterministic scan:** `detect.mjs --json app/components/Hero.tsx` → `[]`, exit 0. Clean. No slop patterns.

**Visual overlays:** Attempted but unavailable — headless Chrome did not apply the dev page's CSS/JS (font resolved to Times New Roman, spans at opacity:0). No reliable user-visible overlay; reporting fallback signal only.

## Overall Impression
A genuinely strong, restrained hero that does its job: the photograph carries the mood and the headline lands the promise. The biggest opportunity is removing the risk that the most important content on the page is gated behind a JS animation, and reconsidering the just-changed display font, which trades away the editorial contrast that made the headline feel premium.

## What's Working
1. **The photograph is the design.** Letting the real reception (warm light, dark panelled wall, leather) be the hero is exactly the brand's image-led canonical move, and far better than a colored panel.
2. **Decisive action hierarchy.** One primary `BookButton` + one secondary "Meet Dr. Saad" link. Single intent, single label, no competing CTAs.
3. **Per-mode responsiveness handled with care.** Mobile shows copy on page colors (text-ink); desktop overlays white copy on a dimmed image, with the accent label swapping shade per context. Thoughtful, not lazy.

## Priority Issues

**[P1] Hero content is gated behind a JS reveal (violates CLAUDE.md)**
- Why it matters: The H1, subhead, and CTA are wrapped in raw `motion.span`/`motion.div` with `initial="hidden"` (opacity:0, rendered inline — 32 `opacity:0` styles confirmed in served HTML), lifted only by `animate="show"` on mount. This is NOT the `Reveal` primitive, which `globals.css` force-shows under reduced-motion/no-JS via `.reveal`. CLAUDE.md states explicitly: "Never gate content visibility on a reveal firing... do not hide content behind a class-triggered transition that may never run." Under no-JS, non-JS crawlers, and social unfurlers, the hero ships blank — for a marketing site whose whole job is SEO + first-impression conversion, the H1 being invisible to non-JS agents is a real exposure. (Reduced-motion IS handled; no-JS is not. JS-enabled browsers including Googlebot are fine.)
- Fix: Render the hero copy visible by default and use the `Reveal` primitive (or replicate its force-visible `.reveal` fallback) so the entrance enhances already-visible content instead of gating it.
- Suggested command: /impeccable animate

**[P1/P2] Display font swap to Inter flattens the premium voice (design-intent check)**
- Why it matters: The display face was just changed from Libre Caslon Display to Inter. PRODUCT.md's voice is "precise, warm, considered / quiet luxury," and the serif headline was carrying the editorial contrast that made the hero feel expensive. Inter is on the brand register's reflex-reject list, and pairing Inter (display) with Hanken Grotesk (body) is two similar-but-not-identical sans-serifs — the typography rules warn to pair on a contrast axis (serif + sans) instead. The serif/sans contrast that signalled craft is now gone.
- Fix: If the swap was for legibility/performance, keep Inter for body and restore a distinctive display serif for headings; or commit fully to a deliberate sans display with much stronger weight/size contrast so it reads as a choice, not a default.
- Suggested command: /impeccable typeset

**[P2] Desktop subhead contrast over the fading gradient**
- Why it matters: Subhead is `text-white/85` over a left-to-right `from-black/72 ... to-black/20` gradient. On the left it passes; if copy extends toward the black/20 region over a bright part of the reception image, white/85 may drop below 4.5:1. PRODUCT.md commits to WCAG AA.
- Fix: Verify measured contrast at the subhead's right edge; widen/strengthen the gradient under the text column or cap the text width so it never reaches the light zone.
- Suggested command: /impeccable audit

**[P3] Dead/invalid utility class on the LCP image**
- Why it matters: Hero.tsx:32 has `lg:blur-[px]` — an invalid arbitrary value (no number), so it silently does nothing. It's dead code on the most important image on the page and signals the blur intent was never realized.
- Fix: Either remove it or set a real value (`lg:blur-[2px]`) if a subtle background blur was intended.
- Suggested command: /impeccable polish

## Persona Red Flags

**Jordan (First-Timer):** Once rendered, the first action is clear within 5s (Book + "Meet Dr. Saad"). Red flag: if JS doesn't execute, Jordan sees a photo with no headline and no CTA — zero guidance.

**Riley (Stress Tester):** Disables JS / views via a non-rendering crawler → hero is blank despite copy being in the DOM (the opacity:0 gate). Exactly the failure CLAUDE.md's no-JS rule exists to prevent.

**Pat (Comparison Shopper, project persona — 25-55 evaluating private clinics):** Judges credibility in the first 5 seconds. The photo earns trust; but the generic Inter display weakens the "is this genuinely premium?" read versus the prior editorial serif, and any blank-render path destroys the impression entirely.

## Minor Observations
- The "Private dental care" eyebrow is the most template-adjacent element; acceptable as a single hero kicker, but it's the first thing to reconsider if the hero ever feels generic.
- Entrance choreography (delayChildren + 0.09 stagger + 0.85s rise) means the headline fully arrives ~0.9-1.3s after mount; for a conversion hero the core message is muted on the first beat. Consider a snappier reveal.
- Mobile: full-bleed uncropped photo then copy in-flow below is clean and legible; CTA stays reachable.

## Questions to Consider
- What would a visitor with JS disabled (or a link-preview bot) see — and is that acceptable for a site selling "premium"?
- Was the move away from the editorial serif a deliberate brand decision, or a quick swap? What was the serif costing you?
- Does the headline need a ~1s entrance, or would a faster, more confident reveal serve a conversion hero better?
