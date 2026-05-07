# Editing your site

Everything you can change in the editor, section by section.

## Site Settings tab

### Business Info

| Field | What it controls |
| --- | --- |
| Business name | Shows everywhere — header, footer, browser tab, Google results. |
| Tagline | One short line under your business name on the homepage. Like "Vancouver's 24/7 emergency plumber." |
| Phone | Powers every "Call Now" button. Use international format: `+1-604-555-0100`. |
| Public email | Shown in the footer and contact section. |
| Where to send contact form messages | When someone clicks "Email us" on your site, the message goes here. Defaults to your public email. Change it to a private inbox if you want enquiries kept separate. |
| Address | Street, city, region/state, postal/ZIP, country. Shows in the footer and powers Google's local search results. |
| Hours | Add a row per group. e.g. "Mon – Fri", open `9am`, close `5pm`. Add another row for "Sat" if it's different. |
| Social links | Optional. Just paste the full URL of your Facebook page or Instagram profile. |

### Branding & Colors

- **Logo** — for use on white/light backgrounds (your header). Square or wide both work.
- **Logo for dark backgrounds** — for the footer (dark blue/black). If you only have one logo and it's already light-colored, you can use it for both.
- **Favicon** — the tiny icon in the browser tab. Square, simple, works at 32×32 pixels. If you don't upload one, we generate a colored letter from your business name.
- **Primary color** — used on your buttons and headings. Usually your main brand color.
- **Accent color** — used on the phone number and call-to-action buttons. Often a bright color (orange, yellow) that stands out against the primary.

Tip: If you don't know your brand colors, copy the colors of your logo. Pick the strongest color as primary, the second-strongest as accent.

### Page Title & Description

These are what Google shows in search results.

- **Page title** — under 60 characters. Format: "Service — Business Name, City". For example: "Emergency Plumbing — Hillcrest Plumbing, Vancouver, BC".
- **Description** — under 160 characters. The pitch. What you do, who for, where. Mention your city.

### Search & Analytics (optional)

Two optional connections, both free, both meaningful for getting found on Google:

- **Google Search Console** — tells you which searches lead to your site. See [Connecting Google](./google-search.md) for the 60-second setup.
- **Google Analytics** — tells you how many visitors you get and where they come from. Same guide.

You can skip this entirely. Your site works fine without it. But if you ever wonder "is anyone actually visiting?" — this is how you find out.

### Account

Just the password change form. Use it.

## Page Content tab

### Hero (top of homepage)

The big section visitors see first.

- **Hero photo** — upload a great photo of your business, your work, or a happy customer. Avoid stock photos that look fake.
- **Trust badges** — short pills under the headline. Things like "Licensed & Insured", "24/7 Emergency", "Family Owned Since 1962". 3–4 is plenty.

### Services

Each service is a card on your homepage. Add as many as you want; 6 is a sweet spot.

- **Service name** — the headline. e.g. "Emergency Drain Cleaning".
- **Short description** — one or two sentences. What it is, who it's for.

### Photo Gallery

Photos of your work. Lightbox-enabled — visitors click and they expand.

- **Image** — upload a photo.
- **Caption** — describe the photo in plain language. e.g. "Burst pipe repair, Vancouver". Helps Google understand the image.

### Reviews

Customer reviews. The first 5 from your Google profile were copied here when your site was generated. You can edit the wording, change the date, or add new ones.

- **Customer name**, **Date** (in YYYY-MM-DD format), **Stars** (1–5), **Review text**

You can use smart placeholders here too. If a review says "Hillcrest Plumbing was fast", you could replace "Hillcrest Plumbing" with `{{business.name}}` so future re-branding doesn't leave stale review text.

### About Us

A paragraph or two about your business. The story. Who you are, how long you've been doing it, what makes you different.

**Trust highlights** below it are short pills like "Family Owned Since 1962", "Lifetime Warranty", "BBB Accredited". Same as hero trust badges, but on the About section.

## Saving and previewing

- **Save** button at the top right. Click it after every change.
- **Live preview** is the right-hand pane. Refreshes automatically after a save.
- **View live ↗** opens your actual public site in a new tab.

Every save also creates a hidden backup in case you need to revert. (For now, restoring a backup requires a developer — but it means you literally cannot lose your work permanently.)

## What you can't break

- The technical stuff (sitemap, robots.txt, security headers, structured data) is all auto-generated. You don't need to think about it.
- Each save validates your edits. If something is missing or wrong, you'll see a red "Error" message and the save won't go through. Fix it and try again.
- Old versions are kept. Worst case, you ask whoever built the site to roll back.

## What you CAN break (be careful)

- **Don't paste HTML or weird symbols into text fields.** Plain text only. The editor handles formatting for you.
- **Don't change `business.phone` to a non-phone-number.** It needs to be in the format `+1-604-555-0100` or your "Call" buttons stop working.
- **Don't delete the seed reviews if you have nothing to replace them with.** A "What our customers say" section with zero reviews looks worse than the seeded ones.
