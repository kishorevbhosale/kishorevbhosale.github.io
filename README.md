# Aaradhya Management System Consultancy Services — Website

FSSAI compliance consultancy website built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. It is exported as a fully static site (no server or database needed).

## Requirements

- Node.js 18.18+ (20 LTS recommended) and npm

## Run locally

```bash
npm install          # first time only
npm run dev          # http://localhost:3000 (hot reload)
```

## Production build

```bash
npm run build        # static export into ./out (≈33 pages)
npm start            # preview ./out at http://localhost:3000 (uses `npx serve out`)
```

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Free key from [web3forms.com](https://web3forms.com). Enquiries are emailed to the address you register. Without it, forms open WhatsApp with the enquiry pre-filled. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format, no `+` (e.g. `919876543210`). |
| `NEXT_PUBLIC_SITE_URL` | Live domain, used for canonical URLs, sitemap and social previews. |

Restart `npm run dev` / rebuild after changing env values.

## Editing content

All business content lives in `src/data/`:

- `site.ts` — phone, email, address, hours, map, stats, founder, process, industries
- `services.ts` — the 13 services (descriptions, benefits, documents, FAQs)
- `faqs.ts`, `testimonials.ts`, `guides.ts` — FAQs, client reviews, resource articles

Images are in `public/images/` (WebP). To regenerate the social share image and Apple icon after branding changes: `node scripts/generate-og.mjs`.

## Deploy

Upload the `out/` folder to any static host — Vercel, Netlify, Cloudflare Pages, GitHub Pages, or shared hosting (cPanel `public_html`). On Vercel/Netlify just connect the repo; the build command is `npm run build` and the output directory is `out`.

## Project structure

```
src/
  app/            routes (home, services/[slug], about, contact, fssai-license-finder, resources/[slug], legal), SEO files
  components/     layout (header, footer, floating actions), sections, forms, ui
  data/           all editable content
  lib/seo.ts      metadata + JSON-LD helpers
public/images/    optimised photos
```
