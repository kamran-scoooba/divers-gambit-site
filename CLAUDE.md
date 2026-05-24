# CLAUDE.md — Diver's Gambit website

Operating notes for this repo. Read this first; it captures decisions that aren't
obvious from the code and that a well-meaning edit could silently undo.

This is the marketing site for the **Diver's Gambit** PADI Distinctive Specialty
(buddy-team chess played underwater). It is a sibling to the Reef Cartographer site
but deliberately has its own visual identity — do not converge the two.

---

## Hard rules (do not undo these)

- **Static site. No build step.** No framework, bundler, package.json, or npm. On
  Netlify the **build command and publish directory are both empty** — the finished
  files sit at the repo root. Do not "helpfully" add tooling; it will break the deploy.
- **One shared stylesheet.** All five pages link `styles.css`. Edit the design there
  once; never inline per-page CSS or fork the stylesheet.
- **`thanks.html` is `noindex` and is intentionally excluded from `sitemap.xml`.**
  Never add it to the sitemap — that would tell search engines to index a page we've
  told them to ignore.
- **Keep `sitemap.xml`, `robots.txt`, and `llms.txt` in sync** when you add, remove,
  or rename a page. Canonical URLs in those files use `https://diversgambit.com`.
- **Favicon links live in every page's `<head>`**, immediately after the
  `<meta name="theme-color">` line. If you add a page, copy that 5-line block.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Home — premise, what the game trains, how a match works |
| `course.html` | The Course — standards, the three dives, continuing education |
| `rules.html` | The Game — rules, hand signals, the slate-board SVG, variants, tournament |
| `contact.html` | Enquire — the Netlify contact form |
| `thanks.html` | Post-submission page (`noindex`, kept out of the sitemap) |
| `styles.css` | Shared stylesheet for all pages |
| `favicon.svg` `.ico` `favicon-32.png` `favicon-16.png` `apple-touch-icon.png` | Icons |
| `robots.txt` `sitemap.xml` `llms.txt` | Crawl / SEO / LLM metadata at root |

---

## Design tokens (`styles.css` `:root`)

- Palette: abyss `#06151c`, deep `#0a232e`, current `#13495a`, ivory `#f3eddd`,
  ink `#08161c`, brass `#caa45c`, brass-bright `#e8cb84`, aqua `#74cdd4`.
- Fonts: **Cormorant Garamond** (display serif), **Hanken Grotesk** (body),
  **Space Mono** (data / chess notation).
- Aesthetic: abyssal-teal ground + brass accent + ivory "board-light" panels, with a
  recurring chessboard motif. The copy **intentionally names the novelty**
  ("looks like a party trick, trains like a discipline") rather than playing it fully
  earnest. Keep that voice unless explicitly asked to change it.

---

## Deploy pipeline

- Repo: `kamran-scoooba/divers-gambit-site`, branch `main`.
- Netlify project: `divers-gambit` (`divers-gambit.netlify.app`). **Auto-deploys on
  every push to `main`** — no build, static root.
- **To ship a change:** edit files → commit → push to `main` → live in ~30s.
- **Local preview:** serve over HTTP, e.g. `python3 -m http.server 8080`, then open
  `http://localhost:8080`. **Do not** open pages as `file://` — the relative
  `styles.css` link won't resolve and pages render unstyled. (This is a viewing
  artifact, not a bug in the files.)

---

## Domains & DNS (GoDaddy, external DNS)

- **Canonical / primary:** `diversgambit.com`. `www.diversgambit.com` redirects to it.
- **Alias:** `divergambit.com` (no "s") + its `www` — added as a domain alias on the
  same Netlify site; non-primary domains auto-redirect to the primary, so it's a 301
  to `diversgambit.com`. Keep `diversgambit.com` as primary (matches the brand "Diver's").
- **GoDaddy records (per apex domain):** A `@` → `75.2.60.5`; CNAME `www` →
  `divers-gambit.netlify.app`. Replace GoDaddy's default parked records; keep Domain
  Forwarding off. If Netlify's domain panel ever shows different values, use those.
- HTTPS via Netlify / Let's Encrypt, auto-renews.
- **Known gotcha:** if SSL provisioning fails with *"certificate parameter is required
  when updating an existing certificate,"* that's a Netlify stale-cert bug, not a DNS
  problem — ask Netlify support to reset the certificate state, then re-provision.

---

## Netlify Forms

- **Form detection is enabled.** It only scans deploys made *after* it was turned on —
  if you add or rename a form or a field, you must redeploy for it to register.
- **Contact form:** `name="contact"`, `data-netlify="true"`,
  `data-netlify-honeypot="bot-field"`, posts to `/thanks.html`. Every input has a
  unique `name`. The hidden `form-name` value must match the form name. Keep all of this.
- **Email notification:** a "New form submission" notification is configured in Netlify
  (subject: `New enquiry — Diver's Gambit`). The destination address is stored in
  Netlify's notification settings, not in this repo.

---

## Site content facts (so copy edits stay accurate)

Diver's Gambit is an **already-approved PADI Distinctive Specialty**.

- Prerequisite: PADI Advanced Open Water **or** Peak Performance Buoyancy.
- Minimum age 12. Depth 6–12 m / 20–40 ft. Three open-water dives, ~9–10 hours.
- Buddy teams play standard chess over a weighted board; communication by slate and
  hand signals only; roles "Thinker" and "Mover".
- 60-second moves; 15-minute match cap; min cylinder fill 1500 PSI.
- A match ends at checkmate or stalemate, **or** when any diver reaches a 500 PSI
  reserve (counts as a loss). Tiebreak: material (P1 / N3 / B3 / R5 / Q9) + remaining air.
- Certification counts as one of five specialties toward PADI Master Scuba Diver.
