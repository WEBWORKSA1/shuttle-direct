# Shuttle.Direct — Business Blueprint & Phase-Wise Build Prompt

## 1. The Winning Idea

**Shuttle.Direct = "Compare & book airport shuttles and ground transfers direct from local operators — worldwide."**

A hybrid **directory + lead marketplace + affiliate comparison site** for airport shuttles, private transfers, group/event transport and cruise-port transfers. Closest proven model: AirportShuttles.com (3,000+ airport directory powered by a single booking partner) combined with GetTransfer's "post a request, operators respond" lead model and Rome2Rio's ad-supported route pages.

### Why this idea (logic, not vibes)

| Factor | Reasoning |
|---|---|
| Keyword fit | "shuttle" + "direct" maps exactly to search intent: *"[airport] shuttle"*, *"direct shuttle to [city]"*, *"airport transfer [city]"*. Thousands of long-tail airport/route combos = programmatic SEO. |
| Commercial intent | Transfer searches happen 1–30 days before travel — the user has a flight booked and money to spend. High CPC travel ads + affiliate commissions. |
| Proven affiliate supply | Kiwitaxi (~50% of margin via Travelpayouts), Holiday Taxis (8% Awin), Suntransfers, Hoppa (Awin), Welcome Pickups, GetTransfer, Jayride, Mozio, Taxi2Airport (8–12%), Viator transfers. |
| Two-sided lead value | B2C quote requests (sold/forwarded to operators) + B2B operator listings (subscription) + high-ticket group/corporate/wedding/event transport leads ($500–$20,000 contracts). |
| Low cost | 100% static site on GitHub Pages (free). No server needed. |

### Revenue stack (ranked by expected contribution)

1. **Lead generation** – Group/corporate/event transport quote requests forwarded to operators ($15–$75 per qualified group lead, or % referral fee).
2. **Affiliate bookings** – Instant-book partner links on every airport page (5–50% of margin per booking).
3. **Operator listings** – Free / Pro ($29/mo) / Premium ($99/mo) featured placement on airport pages.
4. **Google AdSense** – Display units on guides, airport pages, FAQ (travel RPM typically $8–$25).
5. **YouTube** – Airport arrival walkthrough videos ("How to find the shuttle at JFK Terminal 4") embedded on matching airport pages; double-dips ad revenue and boosts dwell time.
6. **Sponsorship & advertising** – Direct sold banners, sponsored guides, newsletter slots.
7. **Donations / supporters** – Ko-fi / PayPal / Buy Me a Coffee tiers for operations & free traveller tools.
8. **Contests** – Travel photo / "best airport tip" contests: sponsor-funded prizes, UGC content, email list growth.

### Competitive research summary (25 sites reviewed)

Fetched: SuperShuttle, GO/gowithus, Mozio, Welcome Pickups, Kiwitaxi, Hoppa, Suntransfers, Holiday Taxis, Jayride, Blacklane, AirportShuttles.com, Carmel, Shuttlefare, Transfeero, Rome2Rio, 12Go, Busbud, FlixBus, Wanderu, Omio, GetTransfer, Taxi2Airport, Talixo, Booking.com Taxis, Minicabit. (Groundlink, Intui, SkyShuttle, Karry, Smartride, Viator transfer pages were unreachable.)

**Must-have features adopted:** fixed-price quote request, one-way/return toggle, vehicle-class comparison with pax/bag capacity, flight number field (flight tracking), free-waiting & free-cancellation messaging, meet & greet, child seats/pets/extra stops, hourly & city-to-city, 24/7 support messaging, airport pages with meeting points, route pages, FAQ/help centre, operator partner signup, agent/business/corporate section, affiliate program.

**Most common quote fields (in order):** pickup, drop-off, date, time, passengers (adults/children/infants), return trip + return date/time, luggage, flight number, vehicle class, extras → then name, email, phone w/ country code, notes.

**Operator signup fields:** company, legal entity, contact, email, phone, country, cities/airports served, fleet size, vehicle types, license/permit #, insurance, driver count, languages, services, website, terms.

---

## 2. Phase-Wise Build Prompt

> Use each phase as a standalone prompt for an AI coding agent or developer. Each phase ends in a shippable state.

### PHASE 1 — Foundation & Brand
```
Build a static, dependency-free website for the domain Shuttle.Direct ("Compare & book airport shuttles
and ground transfers direct"). Host target: GitHub Pages free plan (no server code).
- Pure HTML5 + CSS3 + vanilla JS. Mobile-first, responsive (320px → 1600px), light/dark theme toggle.
- Design system: CSS custom properties (navy #0b1b3a, teal #14b8a6, amber #f59e0b), Inter font,
  8px spacing scale, rounded cards, subtle shadows, accessible contrast (WCAG AA).
- On TOP of EVERY page, a slim bar: "Contact, if you are interested in this website/domain name"
  linking to https://web.works/contact.
- Sticky header with logo (inline SVG), nav (Airports, Get a Quote, Group & Events, Operators,
  Guides, Videos, Contests, Support), mobile hamburger, primary CTA "Get Free Quote".
- Footer: sitemap links, newsletter signup, legal links, social links.
- SEO: unique <title>/meta description per page, Open Graph, JSON-LD (Organization, WebSite,
  FAQPage, BreadcrumbList), sitemap.xml, robots.txt, 404.html, favicon SVG.
- Single config file (assets/js/config.js) for AdSense ID, donation links, affiliate IDs, YouTube IDs.
```

### PHASE 2 — Lead Generation Engine (highest priority)
```
Create a dedicated, high-converting quote/lead system:
- Homepage hero quote widget (pickup, drop-off, date, time, passengers, return toggle) → continues
  to /get-quote.html with values prefilled via URL params.
- /get-quote.html: 4-step form with progress bar: (1) Trip (type: airport arrival/departure,
  point-to-point, hourly, cruise port, group/event; pickup, drop-off, date, time, flight #, return)
  (2) Passengers & luggage (adults/children/infants, bags, oversize, child seats, pets, wheelchair)
  (3) Vehicle & preferences (shared/private sedan/SUV/van/minibus/coach/luxury, budget, meet & greet)
  (4) Contact (name, email, phone + country code, preferred contact method, notes, consent).
- Inline validation, localStorage draft save, trust badges beside the form, "what happens next"
  timeline, instant fare estimate panel.
- Separate B2B forms: Group/Corporate/Event transport request; Operator "List your business".
- All submissions go to ONE email only, which must NEVER be visible in HTML/text. Store it obfuscated
  in JS (char codes), assemble at runtime, POST via FormSubmit AJAX; mailto links built on click.
- Thank-you state with next steps + upsell (affiliate instant-book, newsletter).
```

### PHASE 3 — Programmatic SEO Content
```
- Airport directory (/airports.html) with instant search + region filter across 30+ major airports.
- One static page per airport (/airports/{iata}.html): overview, transfer options table (shared,
  private, taxi, rail/bus, rideshare) with typical price ranges, meeting-point tips, distance to city,
  embedded quote form, relevant YouTube video slot, FAQ with FAQPage schema, ad slots, partner links.
- Guides hub (/guides/) with long-form articles: shuttle vs taxi vs rideshare, how to choose a
  transfer, tipping etiquette by country, travelling with kids, accessible transfers, group transport.
- Generate airport pages from one data file (_data/airports.json) + a single Jekyll layout, so the site scales to 3,000+ airports with zero build tooling (GitHub Pages builds it).
```

### PHASE 4 — Monetization Layer
```
- Google AdSense: auto-loaded only when publisher ID is set in config; responsive <ins> slots in
  header-below, in-content and sidebar; ads.txt in root; clearly labelled "Advertisement".
- Affiliate "Book instantly" partner cards (Kiwitaxi, Welcome Pickups, Holiday Taxis, GetTransfer,
  Jayride, Mozio) with rel="sponsored noopener", config-driven tracking IDs.
- /videos.html: YouTube gallery with lazy "lite" facades (no iframe until click), channel subscribe CTA.
- /advertise.html: media kit, ad packages, sponsored listing pricing, inquiry form.
- /operators.html: Free/Pro/Premium listing plans with feature comparison.
```

### PHASE 5 — Community, Support & Growth
```
- /support.html: donation tiers (Coffee $5, Supporter $25, Patron $100, Sponsor custom), purpose
  breakdown (operations, promotions, marketing, hiring, contests/prizes), progress bar, pledge form.
- /contests.html: active contest with prizes, countdown timer, rules, entry form, past winners slot,
  sponsor-a-prize form.
- /careers.html: open roles (content writer, SEO, video editor, partnerships, community mod), perks,
  application form with portfolio link.
- Newsletter capture in footer and exit-intent-free inline CTAs.
```

### PHASE 6 — Quality, Launch & Scale
```
- Lighthouse 90+ on all pages; lazy-load media; no layout shift on ad slots (reserved min-height).
- Accessibility: labels, focus states, aria-expanded, skip link, reduced-motion support.
- Privacy policy (AdSense/cookies disclosure), terms, affiliate disclosure.
- Deploy to GitHub Pages; add CNAME for shuttle.direct once DNS A records point to GitHub
  (185.199.108.153 / .109 / .110 / .111) and enable "Enforce HTTPS".
- Scale: add a row to _data/airports.json + a 3-line stub in /airports → commit. Add route pages next
  ("JFK to Manhattan shuttle"), then city pages and cruise ports.
```
