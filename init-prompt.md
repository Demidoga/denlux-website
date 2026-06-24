@.agents/skills/design-taste-frontend/SKILL.md  Treat this skill file as the single source of truth for this task. Read it in full. If anything in this skill conflicts with your defaults, the skill wins. 

Also use the impecable skill for design decisions. @.claude/skills/impeccable/SKILL.md

Brief:
  Page kind: hero + About Us + Services + Gallery + Testimonials + footer, single landing.
  Product or brand: landing page for "Denlux Dental" A local high quality dental clinic.
  Audience: Families and Individuals.
  Vibe words: Editorial, calm, mudy, creamy, minimal.
  Reference signals: @public/Roweam - Nice People.jpeg , @public/_ (1).jpeg , @public/_.jpeg ,  @public/screen-shot.png  .
  What to avoid: gradient text, cluttered text.
  Out of scope: pricing page, 

Before writing any code, do a design read in the format the taste-skill requires, also refer to PRODUCT.md .

Declare your design read in one sentence and the three dial values with one-line reasoning each. Stop.

Step 2 (after my OK). Ship a single Next.js page with at least 8 sections. Pick the sections that actually fit the product. At least 4 different layout families across the page. Use real images (gen-tool first, then Picsum-seed). Lock one theme for the whole page.

Step 3. Run in writing:
- Em-dash audit (zero em-dashes U+2014 or en-dashes U+2013 anywhere)
- Pre-Flight Check (Section 14, every box marked Pass or Fail with one-line justification)
- Section-Layout-Repetition audit (list each section's layout family)
- Hero discipline audit (headline lines, subtext words, CTA visibility)

Finally, ask me any questions if you require clarification in any decision.