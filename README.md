# NTV Socials website

A plain HTML, CSS and JavaScript site with no build step and no dependencies. Open `index.html` in a browser to view it, or upload the folder to any static host.

```
ntv-socials/
├── index.html          Homepage (hero, about, portfolio preview, services, results, clients, booking)
├── portfolio.html      Full portfolio: filters, event pages, photo/video viewer
├── css/styles.css      All styles. Brand colors and fonts are the tokens at the top.
├── js/main.js          Menu, nav highlighting, homepage "Featured work"
├── js/portfolio.js     Everything on the portfolio page
├── data/events.js      ← Portfolio content. This is the file you edit to add events.
└── images/
    ├── clients/        Client logos
    └── events/<slug>/  One folder of photos/videos per event
```

## Adding an event to the portfolio

1. Create a folder: `images/events/<event-slug>/` (for example `images/events/mavs-watch-party-2026/`).
2. Put the photos in it. Export them as JPGs about 1800px on the long side so pages load quickly. Short videos can go in as `.mp4` files.
3. Open `data/events.js`, copy the **TEMPLATE** block at the bottom, paste it into `NTV_EVENTS` after the last event, and fill it in:
   - `category` must be `"bts"`, `"corporate"` or `"guest"`.
   - `featured: true` puts the event on the homepage. Up to three of the newest featured events are shown.
   - `links` adds buttons to the Instagram or TikTok posts from that event.
4. Save the file and refresh. The event shows up on the portfolio page, its filter count goes up, and it gets its own link: `portfolio.html#<event-slug>`.

Useful links to share:
- `portfolio.html#corporate`, `portfolio.html#bts`, `portfolio.html#guest` open the portfolio with that filter selected.
- `portfolio.html#invest-in-you-2026` opens that event directly.

## Things to confirm before launch

- **Invest in You 2026** (`data/events.js`): the date, location, summary and deliverables are placeholders inferred from the photo file names. They're marked `TODO`. Replace them with Nikhael's details.
- **Booking button** (`index.html` and `portfolio.html`, "Book a free consultation"): it still points to the Squarespace appointments page. Swap in her Calendly, Acuity or other booking link.
- **Fonts**: the brand board uses Etna (headings) and Hagrid Text (body), which aren't on Google Fonts. The site uses DM Serif Display and Outfit as stand-ins. To use the real fonts, put the font files in a `fonts/` folder, add `@font-face` rules at the top of `css/styles.css` named `"Etna"` and `"Hagrid Text"`, and they'll load automatically. The font stacks already list them first.
- **Social preview image**: `og:image` uses a relative path. After the site has a domain, change it to the full URL (for example `https://ntvsocials.com/images/hero.jpg`) in both HTML files.

## Publishing

Any static host works. Three easy options:

- **Netlify**: drag the whole folder onto app.netlify.com/drop, then connect a domain in Site settings.
- **Vercel**: `npx vercel` from this folder, or import the GitHub repo. No settings needed.
- **GitHub Pages**: push to a repo, then Settings → Pages → deploy from the `main` branch, root folder.

To test locally with the portfolio links working exactly as they will live, run a small server from this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Brand tokens

From the AGC NTV Socials brand board, defined at the top of `css/styles.css`:

| Token | Hex | Use |
|---|---|---|
| `--blush` | `#F0E0E2` | Page background |
| `--cream` | `#F7DDBC` | Highlights, accents on dark |
| `--berry` | `#992447` | Accent, italics, labels |
| `--plum` | `#4F2533` | Headings, dark bands, buttons |
