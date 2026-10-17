# مصنع المقرن للأثاث والديكور
# AlMuqrin Furniture & Decor Factory — Digital Showroom

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Production URL:** https://www.almuqrinfurniturefactory.com  
**Location:** Riyadh, Saudi Arabia — 2nd Industrial City

---

## Overview

Full-stack bilingual (Arabic/English) corporate website and digital showroom for **AlMuqrin Furniture & Decor Factory** — a premier Saudi manufacturer of executive office furniture, luxury residential joinery, VIP majlis seating, architectural wall claddings, and custom millwork.

This is a **corporate portfolio and showroom website**, not an e-commerce store. There is no shopping cart, pricing list, or checkout flow.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| 3D Rendering | Three.js + React Three Fiber + Drei |
| Animations | Framer Motion |
| Forms & Validation | React Hook Form + Zod |
| Localization | next-intl (Arabic RTL + English LTR) |
| Icons | Lucide React |
| Backend | Supabase (database, storage, auth) |
| Deployment | Vercel / Custom VPS |

---

## Features

### Public Website (`/ar`, `/en`)
- **Bilingual RTL/LTR** — full Arabic and English support
- **Homepage** with Hero, Factory Intro, Services Grid, Featured Furniture, 3D Showcase, Featured Projects, Manufacturing Process, Gallery, Why Choose Us, Quote CTA, Contact
- **Services** — 10 manufacturing divisions with detail pages
- **Furniture Catalog** — filterable by category, search, 3D-ready filter
- **Product Detail Pages** — interactive 3D viewer (parametric procedural model), image gallery, dimensions, materials, finishes
- **Projects Portfolio** — filterable by project type, with gallery, scope, manufacturing photos
- **Manufacturing Technology** — 8-stage CNC manufacturing process detail page
- **Quote Request** — secure form with Zod validation, rate limiting, honeypot, file attachment support
- **Contact Page** — factory address, map embed, working hours
- **SEO** — metadata, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt
- **Performance** — dynamic imports for 3D viewer, WebP images, lazy loading

### Admin Dashboard (`/admin`)
- Quote requests management with status workflow
- Product catalog management
- Project portfolio management
- Services content management
- Media library

---

## Directory Structure

```
src/
├── app/
│   ├── [locale]/          # ar / en locale routes
│   │   ├── page.tsx       # Homepage
│   │   ├── about/
│   │   ├── services/[slug]/
│   │   ├── catalog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── manufacturing/
│   │   ├── request-quote/
│   │   └── contact/
│   ├── admin/             # Admin dashboard
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── media/
│   │   └── quote-requests/
│   └── api/
│       └── quote-request/ # POST endpoint with rate limiting
├── components/
│   ├── 3d/                # Three.js / R3F viewer
│   ├── brand/             # Logo + watermark
│   ├── home/              # All homepage sections
│   ├── layout/            # Navbar + Footer
│   ├── quote/             # Quote form
│   └── seo/               # JSON-LD
├── lib/
│   ├── data/              # Static data (services, products, projects, categories)
│   ├── i18n/              # Arabic/English dictionaries
│   ├── store/             # In-memory quote store
│   ├── utils.ts
│   └── validation/        # Zod schemas
└── types/                 # TypeScript type definitions
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/mysseralmugren-web/1-configure-mcp-set-up-your.git
cd 1-configure-mcp-set-up-your
npm install
cp .env.example .env.local
# Fill in .env.local with real values
npm run dev
```

### Available Scripts

```bash
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Production build
npm run start       # Start production server
npm run lint        # ESLint check
npm run typecheck   # TypeScript check (tsc --noEmit)
```

The site auto-redirects from `/` → `/ar` (Arabic is the primary locale).

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret (server-only) |
| `RESEND_API_KEY` | Email notification API key |
| `ADMIN_EMAIL` | Admin portal email |

See `.env.example` for the complete list.

---

## Design System

### Color Palette
| Token | Value | Use |
|---|---|---|
| `--primary` | `#101d35` | Main navy brand color |
| `--primary-dark` | `#091326` | Dark navy |
| `--silver` | `#b9c2cc` | Secondary / silver |
| `--brand-gold` | `#c5a467` | Accent gold |
| `--background` | `#f7f8fa` | Page background |
| `--surface` | `#ffffff` | Card surfaces |

### Typography
- **Arabic:** Cairo (Google Fonts) — weights 400–900
- **English:** Plus Jakarta Sans + Inter (Google Fonts)

---

## 3D Viewer Notes

The 3D furniture viewer uses **procedural parametric geometry** (React Three Fiber) based on the product's verified engineering dimensions. This generates an architecturally accurate representation showing materials and proportions.

- Every 3D model is tied to its specific furniture product's dimensions
- No generic reused models
- Products without a confirmed 3D model display photography with a "model under review" badge
- Dynamic import ensures the heavy Three.js bundle doesn't affect initial page load

---

## Quotation System

Quote requests are:
1. Validated server-side with Zod schema
2. Rate-limited (max 8 requests per 10 minutes per IP)
3. Spam-filtered via honeypot field
4. Stored in memory (dev) or Supabase (production)
5. Assigned a reference number (`AMQ-RFQ-YYYY-NNNN`)
6. Manageable via the Admin Dashboard

---

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```
Set all environment variables in Vercel Dashboard → Settings → Environment Variables.

### Custom VPS / Docker
```bash
npm run build
npm run start
```

**Important:** The internal ERP/accounting/payroll systems at `app.almuqrinfurniturefactory.com` are completely separate and must not be modified.

---

## Security Notes

- Admin routes (`/admin/*`) should be protected with Supabase Auth or NextAuth in production
- Supabase RLS policies must be enabled on all tables before going live
- `SUPABASE_SERVICE_ROLE_KEY` is server-only — never expose to the browser
- Customer quote attachments must be stored in private Supabase Storage buckets
- HTTPS required in production

---

## Localization

Translations are in [`src/lib/i18n/dictionaries.ts`](src/lib/i18n/dictionaries.ts).

Routes:
- `/ar/...` — Arabic (RTL, Cairo font, primary)
- `/en/...` — English (LTR, Plus Jakarta Sans)

Language switcher is in the Navbar and toggles between locales while preserving the current page path.

---

## License

Proprietary — All rights reserved by AlMuqrin Furniture & Decor Factory.  
© 2026 مصنع المقرن للأثاث والديكور — الرياض، المملكة العربية السعودية
