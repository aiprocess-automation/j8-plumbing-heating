# Common questions

## "I made a change and clicked Save, but my site didn't update."

Try these in order:

1. **Hard refresh the live tab.** Browsers cache websites for speed. Hard refresh forces the browser to fetch a fresh copy.
   - Mac Safari/Chrome: `Cmd + Shift + R`
   - Windows Chrome/Edge: `Ctrl + Shift + R`
   - iPhone: pull the page down to refresh, or close and reopen the tab.
2. **Open the site in an incognito/private window.** This skips your cache entirely. If it shows the new content there, your normal browser was just being stubborn.
3. **Wait 30 seconds and try again.** There's a small delay between save and live propagation.

If it's still not showing after 5 minutes, scroll down to "Something is broken."

## "My logo doesn't look right."

- **Wrong size for your container** → Try a different aspect ratio. Wide rectangles work better in headers; square shapes work better as favicons.
- **Has a colored background** → It's clipping wrong. Get a version with a transparent background (PNG with alpha channel).
- **Looks fuzzy/pixelated** → Upload a higher-resolution version. We don't enlarge logos, only shrink them.

If you don't have a transparent-background version, use a free tool like **[remove.bg](https://www.remove.bg)** to strip the background from your existing logo.

## "I forgot my password."

If you set up the editor recently, check your welcome email — the original password is in there.

If you've changed it since then and forgot the new one, contact whoever built your site. They can generate a new one. (Side note: turn on a password manager. Your future self will thank you.)

## "I clicked the email button on my own site to test it, and nothing happened."

The "Email us" button uses your computer's default email app. If you don't have one set up (like the system Mail app or Outlook), nothing happens when clicked.

This isn't a problem for visitors who have email apps configured (almost everyone). But if you want to test it works, do this on your phone — phones always have a default mail app.

If you want to be extra safe, send yourself a test message FROM your phone TO the email address listed on your site. If it arrives, you're good.

## "Google still doesn't show my site when I search for my business."

Three things to check:

1. **Have you connected Google Search Console yet?** See [Connecting Google](./google-search.md). If not, do it. New sites can sit invisible to Google for weeks otherwise.
2. **Have you claimed your Google Business Profile?** This is the listing on Google Maps. Way more important than your website for local searches. Go to **[business.google.com](https://business.google.com)** and claim/create yours.
3. **It's only been a few days.** New sites take time. 4–8 weeks is normal for small local businesses with no inbound links yet.

For "**plumber in [your city]**" type searches, your Google Business Profile + reviews matter way more than your website. Spend your time getting customers to leave Google reviews on your profile.

## "Why does the contact form open my email app?"

That's by design — it's the simplest way to send the message without making you set up email forwarding, Mailchimp, or Resend. The visitor's email app opens with your address pre-filled and a subject line. They type their message and hit send.

Pros:
- Zero configuration. Works the day your site goes live.
- Can never lose messages to spam filters or service outages.
- No monthly fee for a contact form service.

Cons:
- Doesn't work if the visitor doesn't have an email app set up (rare on phones, more common on shared/work computers).
- They see your email address, so spam bots might find it.

If contact form spam becomes a real problem (it usually doesn't for local businesses), reach out to whoever built the site. There are upgrade paths.

## "My site is loading slowly."

Most likely cause: a huge hero photo or gallery photo. Files over 2 MB make the page sluggish.

Run your photos through **[tinypng.com](https://tinypng.com)** before uploading. It cuts file sizes by 50–80% with no visible quality loss.

## "I want to add another section/page that's not in the editor."

The editor exposes the most-changed parts of your site. For a brand-new section type (like a menu, a pricing table, a portfolio with case studies), reach out to whoever built the site — that's a development task, not a content edit.

## "I want to move my site to a different domain."

1. Buy your domain (Namecheap, Google Domains, GoDaddy — whichever is fine).
2. Log in to **vercel.com** with the account that owns your site.
3. Go to your project → **Settings** → **Domains**.
4. Click **Add** → enter your new domain → follow the DNS instructions Vercel shows you.
5. After DNS propagates (5 minutes to 24 hours), your site is live on the new domain.

Once your custom domain works, **also update Site Settings → "Page Title & Description"** to make sure URLs in your sitemap reflect the new domain.

## Something is broken / I'm stuck

If something seems genuinely broken (white screen, error message, nothing loading), contact whoever built your site. Include:

- The URL where you're seeing the problem
- What you were trying to do
- A screenshot if possible
- The time it happened (so they can check logs)

99% of "broken" issues are either (a) browser cache or (b) DNS propagation. The other 1% are real and need a developer.

## Asking AI for help

If you have a question and it's faster to ask ChatGPT or Claude than wait for a human, copy this into the chat first as context:

> I have a website built on Next.js with a built-in admin/CMS. The admin lives at /admin and has two tabs: "Site Settings" (business info, branding, page title, search & analytics) and "Page Content" (hero, services, gallery, reviews, about). Text fields support `{{variable}}` placeholders that resolve to values from Site Settings (e.g. `{{business.name}}`, `{{business.phone}}`). I'm not a developer.

Then ask your question. The AI will give better answers with that context.

See also: [AI prompts](./ai-prompts.md) for ready-made prompts to help you write better website content.
