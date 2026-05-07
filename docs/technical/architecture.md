# Technical architecture

> **Audience:** AI agents and operators implementing the generator pipeline, developers modifying the template, or anyone debugging a deployment.

This template is the artifact every AI-generated buyer site is forked from. It's a Next.js 16 (App Router, Turbopack) project. The core idea: **content lives in `content/site.json` (in dev) or Vercel Blob (in prod), and every public page reads from one place via `lib/content.ts → getContent()`.**

## High-level flow

```
┌────────────────────────────────────────────────────────────────┐
│ Buyer's browser                                                │
│  ┌──────────────────────┐         ┌──────────────────────┐     │
│  │ /         (public)   │         │ /admin    (logged-in)│     │
│  │ Header                │         │ Editor (left form,   │     │
│  │ Hero / Services / …   │         │ right iframe preview)│     │
│  │ Footer                │         │ Tabs:                 │    │
│  └──────────┬───────────┘         │  - Site Settings     │     │
│             │                      │  - Page Content      │     │
│             │ getContent()         └──────────┬───────────┘     │
│             ▼                                 │ saveContent     │
│      ┌─────────────────────────────────────────────────┐        │
│      │ lib/content.ts                                   │       │
│      │  isLocalDev() ?                                   │      │
│      │    → fs.readFile/writeFile content/site.json     │       │
│      │  :                                                │      │
│      │    → @vercel/blob get/put with                    │      │
│      │      unstable_cache + revalidateTag               │      │
│      └─────────────────────────────────────────────────┘        │
└────────────────────────────────────────────────────────────────┘
```

## Storage layer

`lib/content.ts` is the single source of truth.

- **Local dev** (`NODE_ENV !== 'production'`): reads/writes `content/site.json` directly. Zero Blob calls. Saves are visible immediately on refresh.
- **Production** (Vercel deploy): reads via direct CDN fetch (URL constructed from token's storeId — see `publicBlobUrl()`), wrapped in `unstable_cache` (1-hour TTL + tag-based invalidation), writes to Vercel Blob with `access: 'public'`, then calls `revalidateTag(CONTENT_TAG, 'max')` and `revalidatePath('/', 'layout')` so the next request re-fetches.
- **Per-request memoization:** `getContent()` is wrapped with React's `cache()`, so even though 9+ components call it during a single render (layout, page, manifest, icon, apple-icon, og, sitemap, robots, llms), only one fetch happens.

### Vercel Blob ops budget (the cost story)

The free tier is generous on Simple Ops (raw GETs from public CDN — used for reads) and tighter on Advanced Ops (`put`, `list`, `head`, `copy`, `del`).

This template is engineered for **near-zero Advanced Ops** per buyer site:

| Action | Advanced Ops cost |
| --- | --- |
| Public page render (cache hit) | 0 |
| Public page render (cache miss / cold start) | 0 (direct CDN fetch — `publicBlobUrl()` constructs URL from token, no `list`/`head`) |
| `saveContent()` per Save click | 1 (`put` only — no version snapshot) |
| `getAuthDoc()` per login | 1 (`list` to find newest auth blob) |
| `saveAuthDoc()` per password change | 1 (`put`) |

Typical buyer site: ~5 saves/month + ~5 logins/month = **~10 Advanced Ops/month per site**. The Hobby tier supports thousands of buyer sites under one operator account pre-handoff.

**If usage spikes:** the most likely culprit is local development NOT bypassing Blob (`NODE_ENV` not set to development somehow). Confirm by visiting `/admin/diagnose` — the dev path should show "no Blob calls."

**Versioned snapshots are intentionally NOT written on every save.** The previous "every save = 2 puts" implementation halved the free-tier headroom for no real value (no UI to restore versions). If snapshot history becomes important, add a daily Vercel cron that copies `site.json` → `versions/site.<date>.json` (1 op/day instead of 1 op/save).

### Why `access: 'public'`?

Blobs are uploaded through `@vercel/blob` `put()` with `access: 'public'`. This requires the Vercel Blob store to be configured as public. **Private stores will reject `access: 'public'` puts** — the SDK throws "Cannot use private access on a public store" / vice versa.

### Vercel Blob CDN bot protection (the big gotcha)

The public CDN at `*.public.blob.vercel-storage.com` rejects fetches it considers bot-like with HTTP 403. Local dev hitting the CDN with Node's default `User-Agent` triggers this. Mitigations in code:

1. Send full browser-mimicking headers (User-Agent, Accept, Accept-Language, Sec-Fetch-*) — see `BROWSER_HEADERS` in `lib/content.ts`.
2. Cache aggressively per-request (`cache()`) and per-instance (`unstable_cache`) so we hit the CDN as rarely as possible.

Even with all of this, **local dev pointed at production Blob can intermittently 403**. That's why the dev path bypasses Blob entirely. The prod path (which actually runs on Vercel infrastructure) doesn't have this problem.

## Schema

`lib/schema.ts` defines `SiteConfigSchema` (Zod). The schema covers:

- `meta`: archetype, title, description, url, ogImage, locale
- `branding`: logo, logoDark, icon
- `business`: name, tagline, phone, email, ownerEmail, schemaType, priceRange, address, hours, socials
- `hero`: variant, image, trustItems, primaryCta, secondaryCta
- `services[]`: id, icon, title, description
- `gallery[]`: src, alt
- `reviews[]`: id, author, rating, date, text
- `about`: narrative, badges[]
- `theme`: palette, primary, accent
- `integrations` (optional): googleSiteVerification, ga4MeasurementId

**The schema is intentionally larger than what the editor exposes.** Many fields (`meta.archetype`, `business.schemaType`, `business.address.lat/lng`, `hero.variant`, `service.icon`, etc.) are written by the AI generator and never shown to the buyer. The editor only exposes fields the buyer can correctly fill.

## Universal vs. variable surfaces

The editor splits into two tabs that map to fundamentally different concerns:

- **Site Settings** (every site has these): business info, branding & colors, page title & description, search & analytics, account. The shape is universal — the AI generator does not modify the structure here, only the values.
- **Page Content** (the AI designs these per archetype): hero, services, gallery, reviews, about. Even though the schema has fixed properties for these today, the seam is drawn so a future refactor can replace them with `sections: Section[]` (a discriminated union) without touching Site Settings.

## Variable system

`lib/variables.ts` exposes `resolveVariables(text, data)` and `SITE_VARIABLES`.

Page Content text fields support `{{business.name}}`, `{{business.phone}}`, `{{business.address.city}}`, etc. — they resolve at render time using values from Site Settings. The buyer changes the phone number once; everything that references `{{business.phone}}` updates everywhere.

Public components (`components/hero/*`, `components/services`, `components/gallery`, `components/reviews`, `components/about`) call `resolveVariables(text, data)` on every text field they render. The Page Content tab shows a `{ }` picker on every text field plus a live "Preview" line below.

**Generator pattern:** the AI can write copy like `"Trusted plumbers in {{business.address.city}} since 1962"` once and reuse the same template across cities. The buyer can either edit the static text (overrides the variable) or leave it; either way it stays editable.

## Files map

```
app/
  page.tsx                  // public homepage
  layout.tsx                // metadata + JSON-LD + theme CSS vars + GA4
  icon.tsx, apple-icon.tsx  // dynamic favicons (use branding.icon if Blob URL,
                            //   else generated initial-letter ImageResponse)
  opengraph-image.tsx       // 1200x630 social card; embeds branding.logo
  manifest.ts, sitemap.ts, robots.ts, llms.txt/route.ts
  privacy/, terms/

  admin/
    page.tsx                // editor (gated by checkAdminConfig + requireSession)
    layout.tsx
    setup-needed.tsx        // shown when env vars are missing
    actions.ts              // saveContentAction, changePasswordAction
    diagnose/page.tsx       // /admin/diagnose: Blob health check (logged-in only)

    login/page.tsx          // bcrypt password gate, iron-session cookie
    login/login-form.tsx
    login/actions.ts
    logout/route.ts

    api/upload/route.ts     // handles client-side image uploads via @vercel/blob/client

    editor/editor.tsx       // main editor UI with tabs
    editor/fields.tsx       // TextField, ImageField, ContentTextField (variable-aware), …
    editor/change-password.tsx

components/
  header/, footer/, hero/ (variant subdir), services/, gallery/, reviews/,
  about/, hours/, contact/
  integrations/analytics.tsx  // GA4 script tag

lib/
  schema.ts                 // Zod SiteConfigSchema
  config.ts                 // type re-exports + seedConfig (parses content/site.json)
  content.ts                // getContent / saveContent / getAuthDoc / saveAuthDoc
  auth.ts                   // bcrypt password verify + rotate
  session.ts                // iron-session helpers + checkAdminConfig
  seo.ts                    // buildLocalBusinessJsonLd, getSiteUrl
  variables.ts              // resolveVariables, SITE_VARIABLES
  icons.ts                  // lucide-react icon name → component lookup
  utils.ts                  // cn() classname merger

content/site.json           // seed (dev: also live data)
```

## Environment variables

| Var | Required | Where used |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Production only | Auto-set when Vercel Blob is connected. Used by `@vercel/blob`. |
| `ADMIN_PASSWORD_HASH` | Yes | bcrypt hash of the initial admin password. Generator computes; buyer can rotate. |
| `SESSION_SECRET` | Yes | 32+ random chars. Encrypts the iron-session cookie. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL — drives sitemap, robots, JSON-LD, OG metadataBase. |

No Resend / SendGrid / DNS verification needed. The contact form opens the visitor's email app via `mailto:`.

## Generator contract (per buyer site)

When the upstream pipeline provisions a new site, it should:

1. Create a GitHub repo from this template (under the operator org).
2. Create a Vercel project linked to the repo.
3. **Set Framework Preset to "Next.js"** at project creation time. Vercel sometimes fails to auto-detect; explicit beats implicit. This avoids the "no framework detected" build success → 404 trap.
4. Connect a Vercel Blob store (sets `BLOB_READ_WRITE_TOKEN`).
5. Generate `ADMIN_PASSWORD_HASH` (bcrypt, cost 12) and `SESSION_SECRET` (32+ random hex). Set them on the project.
6. Set `NEXT_PUBLIC_SITE_URL`.
7. Pre-seed `content/site.json` with archetype-specific copy. Use `{{business.*}}` variables liberally — they let the buyer edit Site Settings without breaking copy.
8. Trigger first deploy.
9. Email the buyer the plaintext password + admin URL.

## Common Vercel deployment issues (and fixes)

### "The Deployment was blocked because the commit author does not have contributing access"
Vercel's Git Author Verification gates deployments to project members' commit emails. Fix:
- Vercel → Project → Settings → Git → toggle "Commit Author Verification" off, OR
- Make sure the operator-pipeline's commit email is added as a Vercel team member.

### Build succeeds, deployment URL returns 404
Almost always: **Framework Preset is "Other" instead of "Next.js"**. Vercel built the project but is serving its output as static files; the dynamic `/` route never gets invoked.

Fix: Project → Settings → Build and Deployment → Framework Preset → Next.js → Save → Redeploy without cache.

### "Configuration Settings in the current Production deployment differ from your current Project Settings"
Means a settings change was made after the last build. Just redeploy: Deployments → latest → ⋯ → Redeploy (or push any commit).

### Local dev `[getContent] fetch ... returned 403`
Vercel Blob CDN's bot detection rejecting your local machine's fetch. Either:
- Use a fresh dev session (the local-dev path now bypasses Blob entirely — all reads go to `content/site.json`), OR
- If you need to test against production Blob, deploy to a Vercel preview and verify there.

### `app/admin/diagnose` exists for Blob debugging
Visit `/admin/diagnose` (after login) on any deployed instance to see:
- Whether `BLOB_READ_WRITE_TOKEN` is set
- Every `site.json` blob in the store
- Per-blob fetch status from the server
- First 200 chars of the response body

If the page shows 200s but the editor still doesn't reflect saves, the problem is in the cache layer, not Blob.

## Adding a new section type (future)

The current schema has fixed properties (`hero`, `services`, etc.). The intended evolution:

1. Replace fixed properties with `sections: Section[]` (a Zod discriminated union by `type`).
2. Add a section registry: each type registers `{ schema, defaultData, PublicComponent, EditorComponent, displayName }`.
3. `app/page.tsx` iterates `data.sections` and dispatches each to its `PublicComponent`.
4. The editor's Page Content tab iterates and dispatches to `EditorComponent` with reorder/delete/add controls.
5. The AI generator picks types per archetype (trades, wellness, food, professional, etc.) and writes the array.

The tabbed editor was built specifically so this refactor only touches the Page Content tab. Site Settings is already isolated.

## What NOT to do

- **Don't add Resend / SendGrid / external email services.** The contact form is `mailto:` by design — zero buyer signup, zero recurring cost.
- **Don't add ongoing third-party services that require operator-side accounts.** Anything that has to keep working post-handoff must transfer to the buyer with the repo, or it violates the autonomous-revenue model.
- **Don't expose `meta.archetype`, `business.schemaType`, `business.address.lat/lng`, `hero.variant`, `service.icon` (lucide name) in the editor.** These are AI-generation inputs the buyer cannot fill correctly.
- **Don't bypass `lib/content.ts`.** Every read of saved content must go through `getContent()` so the cache + dev/prod split works consistently.
