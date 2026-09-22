# Shuttle.Direct

Compare airport shuttles, private transfers and group transport — direct from local operators worldwide.
Built for **GitHub Pages (free plan)** using its built-in Jekyll: no build step, no server.

- Business blueprint + phase-wise build prompt: [`PROMPT.md`](PROMPT.md)
- 64 pages: home, 4-step quote engine, group/event & corporate RFQ, operator plans + application,
  40 airport pages, 6 SEO guides, videos, partners/affiliates, advertise, support/donate, contests,
  careers, FAQ, about, contact, privacy, terms, 404.

## Structure
| Path | Purpose |
|---|---|
| `_layouts/default.html` | Shared head, domain-interest bar, header, footer |
| `_layouts/airport.html` | Template for every airport page |
| `_layouts/guide.html` | Template for guides (auto "More guides" list) |
| `_data/airports.json` | Airport data (prices are indicative estimates) |
| `airports/xxx.html` | 3-line stubs: `layout: airport` + `code:` |
| `assets/js/config.js` | All monetisation switches |

**Add an airport:** add a row to `_data/airports.json` and a stub file `airports/<code>.html`.
**Add a guide:** copy any file in `guides/`, change the front matter and body.

## Monetisation switches — `assets/js/config.js`
| Setting | Turns on |
|---|---|
| `adsenseClient`, `adSlots` | AdSense in every reserved ad slot (also edit `ads.txt`) |
| `videos[].id`, `youtubeChannel` | YouTube lite-embeds on home, videos and airport pages |
| `donate.kofi / paypal / bmac / stripe` | Instant donation buttons (otherwise pledges use the form) |
| `partners[].url` | Affiliate tracking links (Travelpayouts, Awin, direct programmes) |
| `formAlias` | FormSubmit random alias — hides the inbox from network requests too |

## Forms
Every form posts via FormSubmit AJAX to one inbox. The address is stored encoded and only assembled at
runtime — it never appears in page text or HTML. **The first submission triggers a one-time FormSubmit
activation email — click "Activate".** Then paste the alias FormSubmit gives you into `formAlias`.

## Custom domain
1. DNS: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `webworksa1.github.io`.
2. Settings → Pages → Custom domain: `shuttle.direct`, tick *Enforce HTTPS*.
3. In `_config.yml` set `url: "https://shuttle.direct"` and `baseurl: ""`.
