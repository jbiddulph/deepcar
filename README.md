# Deepcar Animal Supplies

Professional Nuxt website for Deepcar Animal Supplies (Sheffield): product catalogue, order enquiry basket (no online payments), collection/delivery choice, contact page, and local SEO basics.

## Quick start

Requires Node.js 22+.

```bash
nvm use
npm install
npm run dev
```

Open http://localhost:3000

## What’s included

- Homepage with business info, hours, map and categories
- Product categories and product pages with guide prices
- Enquiry basket (collection or delivery) — no card payments
- Contact page and social links
- Creative Commons / public-domain imagery with attributions at `/credits`
- Server API `POST /api/enquiry` (logs enquiries; wire to email when ready)

## Updating content

Edit:

- `app/data/business.ts` — address, hours, phone, email, social
- `app/data/products.ts` — categories, products, prices, images
- `public/images/` — replace placeholder CC photos with your own

## Hosting & costs (low ongoing spend)

Recommended: deploy with `npm run build` on **Vercel** or **Netlify** free/hobby tiers.

- Static-friendly Nuxt app, no expensive CMS subscription required
- You update products by editing data files (or we can add a simple CMS later)
- Custom domain: one annual domain fee only
- Free SSL on Vercel/Netlify

## Security & maintenance

- HTTPS by default on modern hosts
- No online payment handling (reduces PCI scope)
- Enquiry endpoint validates input server-side
- Dependency updates via `npm outdated` / scheduled updates
- Backups: Git history for code + host deploy history; keep product photos and business details in the repo
- Optional hardening later: form rate limiting, bot protection (e.g. Vercel BotID), email provider with SPF/DKIM

Replace placeholder phone, address and social URLs before going live.
