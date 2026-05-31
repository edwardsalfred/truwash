# Tru Wash Detail and Lawn Care — website

Single-page marketing site for Tory Lawson's Houma-based mobile detail, lawn, and pressure-wash crew.

## Structure

```
.
├── netlify.toml             Pins publish dir to `site/`, sets cache headers
├── research/                Client-facing research deliverables (not deployed)
│   ├── 01-client-brand.md
│   ├── 02-competitor-analysis.md
│   ├── 03-build-brief.md
│   └── 04-quality-audit.md
└── site/                    Publish directory
    ├── index.html           Single-page site
    ├── 404.html             Not-found page
    ├── competitive-analysis.html   Confidential client deliverable (noindex)
    ├── robots.txt           Disallows the analysis report
    ├── sitemap.xml
    ├── css/style.css
    ├── js/main.js
    └── assets/
        ├── logo.svg               Dark-text logo (light backgrounds)
        ├── logo-light.svg         Light-text logo (dark backgrounds)
        ├── favicon.svg
        ├── og-image.svg           Social share card
        ├── portfolio/             (empty until client supplies job photos)
        └── founders/              (empty until client supplies Tory's portrait)
```

## Local preview

```bash
# from the repo root
python -m http.server 8765 --directory site
# then open http://localhost:8765
```

## Deploy

### Netlify

Drop the repo root into Netlify. `netlify.toml` pins the publish directory to `site/`. No build step.

### Vercel

Add a `vercel.json` at the repo root with:

```json
{
  "outputDirectory": "site"
}
```

### Plain S3 / static host

Upload the contents of `site/` to the bucket. That's it.

## Things the client needs to fill in

Each is marked in the HTML with a comment or visible placeholder. Search for `REPLACE` in `site/index.html` and `[Placeholder` in the research files.

1. **Owner portrait** of Tory Lawson — replace the silhouette in the "Meet Tory" section. 4:5 ratio, 1000w minimum.
2. **Job photos** (5–10) — auto detail, lawn, pressure wash. Drop into `site/assets/portfolio/` and swap the `.svc-visual` placeholders.
3. **Real testimonials** — 5 named reviews. Update the three `.testi-card` blocks.
4. **Confirmed service area** — current copy lists Houma, Bayou Black, Schriever, Bayou Blue, Gray. Confirm or trim.
5. **Email address** for the quote form — current `mailto:` falls back to `hello@truwashhouma.com`. Replace with the real address or wire up a Formspree / Netlify Forms endpoint in `site/js/main.js`.
6. **Confirmed pricing floors** — every service card says "Quote on call." If Tory wants to publish "Starting at $X" floors, edit `.floor` in each `.service-card`.
7. **Founded year** — currently no count-up active; if you want a "years served" stat, add a `data-count` element pointing to a real start year.
8. **Insurance carrier** — for the badge tooltip.

## Domain

When the domain ships, find-replace `truwashhouma.com` in:
- `site/index.html` (LocalBusiness schema + Open Graph URLs)
- `site/sitemap.xml`

## Notes

- No JS framework. Vanilla HTML/CSS/JS, ~12kb JS, ~24kb CSS.
- Form is non-functional in v1; falls back to `mailto:` so leads still flow.
- Built per the build brief in `research/03-build-brief.md`. Direction was approved before code was written.
- Created by [Chatbot Boy AI](https://www.chatbotboy.ai/).
