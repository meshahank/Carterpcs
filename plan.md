# CarterPCS Website Development Roadmap

## Project direction
Build the CarterPCS fan/concept website as an evolving public project. Each completed milestone becomes a polished Instagram post showing progress, care, and usefulness. Keep the tone respectful and clearly label the site as an independent fan project—not an official CarterPCS property.

## Important boundaries
- Do not present the site as official or endorsed by CarterPCS.
- Use only verifiable public information.
- Attribute official channels and external assets.
- Avoid private information, impersonation, spam, or pressure.
- Label unfinished work as `concept`, `prototype`, or `coming next`.

## Development steps

### Step 1 — Homepage polish and project framing
- Audit the existing homepage for responsive behavior, accessibility, loading performance, and broken interactions.
- Add a clear independent-project label and a concise “why this exists” section.
- Refine hero copy, calls to action, social links, metadata, and mobile navigation.
- Add reusable design tokens for spacing, colors, motion, typography, and reduced-motion behavior.

**Instagram Build 01**
- Content: “I started building a website for @carterpcs until he buys me a MacBook Pro.”
- Visuals: desktop screenshot, mobile screenshot, 5–8 second hero recording, and a `BUILD 01` cover.
- Caption angle: explain the idea, why you chose CarterPCS, and ask which page should come next.

### Step 2 — About CarterPCS page
- Create `/about` with creator identity, content categories, public milestones, and a short timeline.
- Use verifiable public information and link to official channels.
- Add structured metadata, accessible headings, and a respectful disclaimer.

**Instagram Build 02**
- Content: introduce the creator-focused profile page.
- Visuals: profile hero, timeline section, typography close-up, and page-scroll recording.
- Caption angle: “A proper digital profile for the creator behind the content.”

### Step 3 — Content hub / videos page
- Create `/videos` with featured videos, category filters, search, and official-content links.
- Store content in a central data file so a CMS or API can be added later.
- Add video cards, hover states, empty states, and responsive grid/list layouts.

**Instagram Build 03**
- Content: demonstrate video cards, categories, search, and filtering.
- Visuals: video grid, filter recording, featured-video frame, and empty/search state.
- Caption angle: show how a large video library could feel easier to explore.

### Step 4 — Tech topics and editorial page
- Create `/topics` for PCs, phones, EVs, AI, and tech news.
- Build reusable topic cards and article previews with tags, dates, reading time, and source attribution.
- Add `/topics/[slug]` detail views for future editorial content.

**Instagram Build 04**
- Content: reveal the topic system and editorial layout.
- Visuals: topic-card collage, category transition, article-preview screenshot, and detail-page concept.
- Caption angle: explain the information architecture simply.

### Step 5 — PC builds and setup page
- Create `/builds` for PC builds, parts, upgrade paths, and setup photography.
- Include comparison tables, part notes, performance context, and example/inspiration labels.
- Add sort/filter controls and mobile-friendly table behavior.

**Instagram Build 05**
- Content: show an interactive PC build explorer.
- Visuals: build overview, component close-ups, comparison table, and filter/sort recording.
- Caption angle: “What if CarterPCS builds had their own interactive showroom?”

### Step 6 — Gear / recommendations page
- Create `/gear` for categorized products and tools relevant to the audience.
- Add affiliate disclosure placeholders and never imply Carter’s endorsement without permission.
- Add comparison cards, pros/cons, price/date fields, and last-checked labels.
- Keep product data separate from UI components.

**Instagram Build 06**
- Content: present a categorized gear guide.
- Visuals: product-card grid, comparison screenshot, detail-card close-up, and price/date state.
- Caption angle: emphasize usefulness without claiming endorsement.

### Step 7 — Community page
- Create `/community` with fan submissions, questions, polls, build showcases, and moderation guidance.
- Begin with seeded examples; defer public submissions until validation, moderation, and storage are designed.
- Add reporting rules, consent language, and community standards.

**Instagram Build 07**
- Content: show fan builds, questions, polls, and submission concepts.
- Visuals: community wall, featured-build card, poll recording, and community-rules panel.
- Caption angle: invite respectful ideas for making the site useful.

### Step 8 — Updates / changelog page
- Create `/updates` as a public project diary documenting shipped features, design changes, and lessons learned.
- Add milestone cards, dates, status labels, and related Instagram links.

**Instagram Build 08**
- Content: show the changelog and real project progress.
- Visuals: milestone timeline, before/after carousel, update-card close-up, and scrolling reel.
- Caption angle: share what changed and what you learned.

### Step 9 — Contact and collaboration page
- Create `/contact` with collaboration ideas, project context, social links, and a lightweight contact form UI.
- Add spam protection and server-side handling only when a real submission workflow is approved.
- Add a media-kit/download area later if appropriate.

**Instagram Build 09**
- Content: reveal the collaboration/contact concept.
- Visuals: contact page, form close-up, collaboration card, and social-link section.
- Caption angle: keep the invitation friendly, concise, and non-demanding.

### Step 10 — Easter eggs and creator-focused finale
- Add tasteful, discoverable interactions such as a keyboard shortcut panel, hidden build notes, or a share action.
- Keep interactions fast, keyboard accessible, and respectful.
- Create `/project` or `/story` explaining the complete “building this until Carter notices” journey.

**Instagram Build 10**
- Content: recap every page and explain the full project story.
- Visuals: page montage, final desktop/mobile screenshots, timeline carousel, and an unofficial-project title card.
- Caption angle: thank viewers, link to the project, and ask what should improve next.

## Cross-cutting production work
- Extract shared navigation, footer, buttons, cards, tags, modals, and animation helpers.
- Add SEO titles/descriptions, Open Graph images, canonical URLs, sitemap, robots rules, and JSON-LD where appropriate.
- Test mobile, tablet, desktop, keyboard navigation, screen readers, reduced motion, and performance.
- Verify uncertain statistics, images, and claims or mark them as concepts.
- Add analytics only with a privacy notice and minimal tracking.
- Keep content in one data layer so future CMS, YouTube, or social integrations stay isolated from the UI.

## Instagram visual checklist
- Use a 1080×1350 portrait cover or reel cover with large `BUILD 01–10` text.
- Use the same accent treatment for every cover so the series is recognizable.
- Capture both desktop and mobile views.
- Record 5–15 second vertical screen captures at a readable speed.
- Use 3–5 carousel frames: cover, hero screen, feature close-up, responsive view, and final CTA.
- Use real screenshots whenever possible.
- Label concepts and prototypes clearly.
- Avoid unlicensed logos, likenesses, private information, or copyrighted thumbnails.
- Add descriptive alt text and captions/subtitles to reels.
- Keep captions focused on the build rather than pressuring Carter.

## Recommended execution order
Implement and publish Steps 1–3 first to establish the visual and content direction. Then build Steps 4–7 as the core product surface, followed by Steps 8–10 and the production pass. Do not add authentication, databases, payments, or public submissions until their requirements are confirmed.

## Success criteria
- The homepage remains the strongest entry point.
- Every page feels like one coherent design system.
- Each milestone is independently presentable as an Instagram post.
- Claims and assets are sourced, attributed, or clearly marked as concepts.
- The site works on mobile, is keyboard accessible, respects reduced motion, and loads efficiently.
- The project communicates genuine effort without presenting itself as official CarterPCS branding.

## Suggested post sequence
1. Homepage reveal
2. About page
3. Videos hub
4. Topics system
5. PC builds explorer
6. Gear guide
7. Community page
8. Updates/changelog
9. Contact page
10. Complete project tour

Reuse the same cover treatment and label every post `Build 01` through `Build 10`.
