# Your website — quick start

Welcome. This guide walks you through everything you can do with your new site. **You don't need to know any code.** If something here uses a word you don't recognize, look at the bottom of this page — there's a glossary.

## What you got

A fully working website for your business, hosted on Vercel (a high-quality web host). It includes:

- Your business info, services, photos, reviews, and an "About Us" section
- A "Call us" button on every page that rings your phone when tapped
- A contact form that opens the visitor's email app to message you
- All the under-the-hood stuff Google needs to find you (sitemap, robots.txt, structured data)

You can edit nearly everything yourself, no developer required.

## Logging in

1. Go to **`yoursite.com/admin`** (replace yoursite.com with your actual domain).
2. Type the password from your welcome email.
3. **First thing to do: change your password.** Scroll to the bottom of the editor → "Account" section → Change Password. Pick something only you know.

If you ever forget your password, contact the company that built your site.

## Two tabs to know

When you're logged in, you'll see two tabs at the top:

### Site Settings
The **basics about your business**. The stuff that should look the same on every page: your name, phone number, email, address, hours, social links, logo, brand colors. Change something here and it updates everywhere on the site automatically.

### Page Content
The **specific stuff on your homepage**: the hero image at the top, your services, the photo gallery, customer reviews, and the "About Us" paragraph. This is where you tell visitors what you actually do.

## The basics — what to fill in first

These are listed in priority order. Do them in this order if it's overwhelming.

1. **Site Settings → Business Info → Phone**: make sure this is the right number. It's the most important thing on the whole site.
2. **Site Settings → Business Info → Address & Hours**: get these right. Google uses them.
3. **Site Settings → Branding & Colors → Logo**: upload your logo (a transparent PNG works best). If you don't have one, no problem — your business name shows as text.
4. **Site Settings → Page Title & Description**: these are what shows up in Google search results. Keep the description under 160 characters and mention your city + service.
5. **Page Content → Reviews**: read through them. Your AI-generated site started with the first 5 from your Google reviews. Edit any wording you'd like.
6. **Page Content → Hero photo**: upload a great photo. This is the first thing visitors see.

Click **Save** after each change. The right side shows a live preview of your site.

## Smart placeholders (the `{{ }}` thing)

In Page Content fields, you might see something like `{{business.name}}` or `{{business.address.city}}`. These are **smart placeholders**. They automatically fill in with whatever you set in Site Settings.

So if your service description says `"Trusted plumber in {{business.address.city}}"` and you set the city to `Vancouver` in Site Settings, visitors see `"Trusted plumber in Vancouver"`.

**Why this matters:** if you ever change your phone number or move addresses, you change it once in Site Settings and it updates everywhere on your site. You don't have to hunt through every paragraph.

**To insert a placeholder yourself:** in any Page Content text field, click the small `{ }` button at the top-right. Pick the value you want from the list. It gets inserted at your cursor position.

## Smart placeholders cheat sheet

| Placeholder | Fills in with |
| --- | --- |
| `{{business.name}}` | Your business name |
| `{{business.tagline}}` | Your tagline |
| `{{business.phone}}` | Your phone number |
| `{{business.email}}` | Your public email |
| `{{business.address.city}}` | Your city |
| `{{business.address.region}}` | Your state/region |
| `{{business.address.street}}` | Your street address |
| `{{business.address.postal}}` | Your postal/ZIP code |

## Topics

- [Editing your content](./editing.md) — the editor, the tabs, what each field does
- [Connecting Google](./google-search.md) — getting found on Google search
- [Brand & images](./brand-and-images.md) — logos, colors, photos that look good
- [Common questions](./troubleshooting.md) — "why isn't my change showing up?" and other gotchas
- [AI prompts](./ai-prompts.md) — copy-paste these into ChatGPT to help you write better content

## A few rules of thumb

- **Save often.** Every save creates a backup, so you can't really break anything.
- **The phone number is your most important conversion.** Make sure it's right and easy to find.
- **Photos beat text.** Especially on the hero (top of homepage) and gallery. Good photos sell more than good copy.
- **Don't write like a website.** Write like you'd talk to a customer at the front desk.

## Glossary

- **Admin** — your private editor at `yoursite.com/admin`. Only you can access it.
- **Editor** — what you see when you log in. Two tabs: Site Settings and Page Content.
- **Hero** — the big section at the top of your homepage with the photo and headline.
- **CTA** — Call To Action. The button you want visitors to click. On your site it's "Call Now".
- **Sitemap** — a list of every page on your site, sent to Google so it knows what to index. Already auto-generated for you at `yoursite.com/sitemap.xml`.
- **OG / Open Graph** — the preview card that shows when someone shares your site on Facebook or in iMessage. Auto-generated from your business name + logo.
