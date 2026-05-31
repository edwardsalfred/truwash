# Tru Wash Detail and Lawn Care — Website Build Brief

This brief combines the brand snapshot (Phase 1) and the competitor analysis (Phase 2) into a single direction document. Approve this before I start the build.

---

## The wedge

> **One trusted crew for your vehicle and your property. Detail. Lawn. Pressure wash. Houma-born, owner-operated.**

That's the wedge nobody in Houma owns. The site will be built to tell that story.

---

## Design Direction

### Palette

| Token | Hex | Use |
|---|---|---|
| Bayou Navy | `#0B2A3A` | Primary, hero backgrounds, headings on light |
| Spring Grass | `#5BAE3E` | Lawn-track accent, "Bundle" highlights |
| Water Blue | `#3FB7E6` | Detail/wash-track accent, links |
| Paper | `#F6F4EF` | Warm neutral background |
| Sand | `#EBE5D8` | Card grounds, dividers |
| Ink | `#0E1116` | Body text |
| Mist | `#6B7A85` | Muted text |

The dual accent (Spring Grass + Water Blue) lets the homepage visually split into a "vehicle" track and a "property" track without forcing them into a single muddy brand color. This is the single biggest visual differentiator from every Houma competitor.

### Typography

- **Headings:** Bricolage Grotesque (variable, Google Fonts). Friendly geometric sans, reads modern without feeling corporate.
- **Body:** Inter. Workhorse, excellent legibility on mobile.
- **Weights:** 400 / 500 / 700 only. No light weights (poor mobile contrast).

### Photography style

- **Hero:** Cinematic wide shot of a clean truck or vehicle in golden hour, slight Louisiana atmosphere. Placeholder until client photos arrive.
- **Service tiles:** Tight, real-world job shots. Driveway before/after. Mowed yard. Detailed dashboard.
- **Owner portrait:** Natural light, working shot of Tory. Marked as placeholder.
- **Texture:** Subtle paper grain on light sections (we already use this on the report) to add warmth without theming the whole site.

### Animation rules

- GSAP + ScrollTrigger for all reveals.
- Hero: slow parallax on background, staggered fade-in of H1 / subtitle / CTA.
- Section transitions: 40px upward translate + opacity fade, 0.6s ease-out.
- Service cards: hover lift (translateY(-4px)), color border slide-in.
- Trust badges: count-up on stats (years served, jobs done).
- `prefers-reduced-motion`: all transforms become instant, opacity still animates softly.
- 3D hero placeholder reserved with a clearly labeled comment block.

### What to AVOID
- Stock chrome car wash blueprints (Cleaner Image and Bayou both lean on this — looks generic).
- Hard-template look (every Houma site uses one — instant tell).
- Overuse of green (Gladiator owns lawn-green-everywhere; we use grass only as a track accent).
- Big animated water splashes (cliché, hurts page speed).
- Em-dashes in copy. Periods, commas, or `|`.

---

## Site Architecture

**Single-page site for v1.** Houma's small-service market is a high-intent, low-research audience: they land, they look at services, they call. Multi-page splits hurt conversion at this scale. Anchor links inside one page beat 5 thin pages.

### Sections (in scroll order)

1. **Nav** — fixed, transparent over hero, solid after scroll. Logo left, links center, "Get a Quote" CTA right.
2. **Hero** — H1 wedge headline, sub, primary CTA (Get a Quote), secondary CTA (tel: link). 3D asset placeholder reserved.
3. **Trust stack** — 3-badge row: Owner-Operated · Houma-Born · Insured & Bonded.
4. **Services overview** — 4-card grid (Auto Detail, Lawn Care, Pressure Washing, Painting). Each card: icon, title, 2-line description, "Starting at $X" floor, anchor to deeper section.
5. **Why Tru Wash** — 3 columns: One Crew / Cheaper Prices / Houma Born. The "Cheaper prices, better work" motto becomes the centerpiece.
6. **Bundle and Save panel** — full-width, navy ground, side-by-side comparison: "Detail only" vs. "Detail + Lawn" vs. "Detail + Lawn + Wash." Explicit savings shown. This is the wedge panel.
7. **Service detail blocks** — alternating left/right image + copy for each of the 4 services. Each block has a price floor, what's included, and an "Add to bundle" CTA.
8. **Meet Tory** — owner portrait placeholder, 3-paragraph story, signed line.
9. **Testimonials** — 3-up grid, named (first name + initial), SVG stars, dated. Placeholder copy pulled from real public review themes.
10. **Service area** — Houma + Terrebonne Parish boundary statement. Simple SVG-styled area note (no Google Maps embed — keeps the page fast and avoids API key).
11. **FAQ** — 6 questions. "Do you come to me?" / "What if it rains?" / "Are you insured?" / "Bundle discount?" / "Card or cash?" / "How fast can you book me in?"
12. **Final CTA** — full-width navy, big phone number, "Get a Quote" button, hours line.
13. **Footer** — mini-nav, phone, area served, social link (Facebook), Chatbot Boy AI credit line.

### Navigation links
Home · Services · Bundle · Meet Tory · Reviews · Contact

(Contact scrolls to final CTA; "Contact Us" form lives in the same section.)

---

## Content Framework

### Headline — 3 options

1. **"One trusted crew. Your truck and your yard."**
   *(Sub: Detail, lawn care, and pressure washing. Houma-born and owner-operated by Tory Lawson. Cheaper prices. Better work.)*

2. **"Cheaper prices. Better work. From the driveway to the dashboard."**
   *(Sub: Tru Wash handles your auto detail, your lawn, and your pressure washing. One crew, one number, every time.)*

3. **"Houma's go-to for detail, lawn, and a clean driveway."**
   *(Sub: Tory Lawson and the Tru Wash crew bundle your auto detail, lawn care, and pressure washing — for less than you'd pay separately.)*

**Recommended: #1.** It leads with the wedge ("one trusted crew") and grounds the dual offer ("truck and yard") in a phrase a Houma homeowner would actually say.

### Value proposition structure

```
[Wedge in one sentence]
[3 proof points in a row of 3 stat-like blocks]
[One paragraph in plain English from Tory's voice]
```

### Section copy direction
- **Tory's voice.** Conversational, second-person, working-class confident. "We come to you. We bring the water. You don't lift a finger."
- **Plain words.** Never "facilitate" / "leverage" / "comprehensive." Just "we do" / "we bring" / "we handle."
- **Honest about what's included.** Itemize. No vague "premium care."
- **Local nouns.** Houma, Terrebonne, the bayou, Highway 90, Bayou Black. Local color where it lands naturally; never forced.

### SEO keyword targets
- Primary: "detail and lawn service houma"
- Secondary: "mobile auto detail houma", "pressure washing houma", "lawn care houma"
- Long-tail: "houma car detail and yard service", "terrebonne parish detailing", "affordable detail houma"
- Title pattern: `Tru Wash Detail and Lawn Care | Houma's Mobile Detail, Lawn & Pressure Wash Crew`
- Meta description: 155-char max, lead with location + bundle.

---

## Conversion Playbook

### Primary conversion goal
Phone call to (985) 856-7396. Mobile-first audience; most leads will tap-to-call.

### Secondary goal
Quote form submission (name, phone, service track, message). Form posts to a `mailto:` for now with `[Form endpoint TBD]` comment; client wires Formspree / Netlify Forms later.

### Lead capture
- Persistent "Get a Quote" button in nav.
- Sticky bottom-of-screen "Call Tory" button on mobile (only mobile breakpoint).
- Final-CTA section with form + phone.
- Each service detail block has an "Add to bundle" / "Get this quoted" link.

### Social proof plan
- **3-up testimonial grid** (named, dated, stars).
- **Trust-stack badge row** (Owner-Operated · Houma-Born · Insured).
- **Years-served stat** (count-up to whatever year Tory started — placeholder pending client confirmation).
- **Real Facebook post quote** placed in the "Meet Tory" panel.

### Trust signals checklist
- Phone number visible in nav and final CTA.
- Facebook link in footer (live).
- Insured + bonded badge.
- Owner name and face.
- Honest pricing floors.
- Service area named.
- Privacy-respecting (no third-party trackers in v1).

---

## Logo

Custom typographic wordmark designed and committed at `site/assets/logo.svg`:

- **"TRU WASH"** in bold sans (Bricolage Grotesque ExtraBold).
- Paired glyph: a droplet (water blue) merged with a grass blade (spring grass), inside a navy circle.
- Tagline lockup option: "DETAIL · LAWN · WASH" in small caps below.
- Single-color fallback for footer / dark backgrounds.

---

## Service area + contact strategy

- No physical address shown (mobile service business; "222 Anywhere St" on Superpages is a placeholder).
- Phone: (985) 856-7396 (verified from multiple public listings).
- Facebook: https://www.facebook.com/TruWashDetailAndLawnCareLlc (linked in footer).
- Email: **[Placeholder — client to supply].** Form will post to a placeholder until then.
- Hours: **[Placeholder — client to supply].** Show "By appointment" until known.

---

## Data we still need from the client (post-launch fill-in list)

Each of these will be a clearly marked placeholder in the live HTML so the client can swap in real content via a single grep:

1. Owner portrait of Tory Lawson
2. 5-10 real job photos (auto detail, lawn, pressure wash)
3. Real testimonials with first names + initials
4. Real service area (Houma only? Thibodaux? Schriever?)
5. Email address for quote form
6. Actual hours of operation
7. Year Tru Wash was founded (for the years-served counter)
8. Insurance carrier / certificate detail (for the badge tooltip)
9. Confirmed price floors for each service (or remove if they want to keep pricing private)

---

## Approval needed

If this brief matches the direction you want, reply **"approved"** and I'll start the build. If you want to redirect:

- Change the wedge?
- Change the headline pick (defaulting to #1)?
- Drop or add a section from the architecture?
- Different color story?
- Different font pairing?

Tell me what to change and I'll update the brief before touching code.
