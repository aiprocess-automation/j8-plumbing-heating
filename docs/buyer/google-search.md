# Connecting Google

Two free Google tools to plug your site into. Both are optional. Both take about a minute each. Combined they tell you (a) whether Google is finding you and (b) how many people are visiting.

## Why bother?

- **Google Search Console** is what tells Google "here's a new site, please index it." Without this, Google might still find you eventually, but it can take weeks. With it, usually within a few days. It also shows you what people search for to find you, which is gold for figuring out what content to add next.
- **Google Analytics** shows you how many visitors hit your site, where they come from, and what pages they look at. Useful for sanity-checking that your marketing is working.

## Step-by-step: Google Search Console

You need a Google account (Gmail counts). It's free.

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)** and sign in with your Google account.
2. Click **"Add property"**.
3. Pick **"URL prefix"** (the right-hand option, not "Domain").
4. Enter your full website URL (with https://). Click **Continue**.
5. You'll see verification methods. Pick the one called **"HTML tag"**.
6. Google will show you a meta tag that looks like this:
   ```
   <meta name="google-site-verification" content="abc123XYZ_some_long_code" />
   ```
   **Copy ONLY the part inside the quotes after `content=`.** Just the code, not the whole tag.
7. In your site's editor, go to **Site Settings → Search & Analytics → Google Search Console verification** and paste the code there.
8. Click **Save** in the editor.
9. **Wait 30 seconds**, then go back to Google Search Console and click **"Verify"**.
10. You should see "Ownership verified." Done.

After verification, in Google Search Console:
- Click **"Sitemaps"** in the left menu
- Type `sitemap.xml` and click Submit
- This tells Google about every page on your site

That's it. Within a few days you'll see "Performance" data showing what searches lead people to you.

## Step-by-step: Google Analytics

1. Go to **[analytics.google.com](https://analytics.google.com)** and sign in with the same Google account.
2. If this is your first time, click **Start measuring**. Otherwise, click the gear icon (bottom-left) → **Create** → **Property**.
3. Enter:
   - **Property name** — your business name.
   - **Reporting time zone** — your local time zone.
   - **Currency** — your local currency.
4. Click **Next**, fill in business size and category. Click **Next** again.
5. Pick what you want to track — choose **"Generate leads"** or **"Get baseline reports"**. Click **Create**.
6. Pick **Web** as the platform.
7. Enter your website URL and a stream name (use your business name).
8. After it's created, you'll see a **Measurement ID** at the top. It starts with **`G-`** followed by letters and numbers. Copy it.
9. In your site's editor, go to **Site Settings → Search & Analytics → Google Analytics — Measurement ID** and paste the `G-XXXXXXXXXX` value.
10. Click **Save**.

Test it: visit your live website (`yoursite.com`) in a new tab. Then go back to Google Analytics → **Reports** → **Realtime**. You should see "1 user in last 30 minutes." If yes, it's working.

## Other search engines (Bing, Yahoo, DuckDuckGo)

Bing has its own thing called **Bing Webmaster Tools**. You can do the same setup there if you want, but here's a shortcut: Bing lets you import everything from Google Search Console with one click. So set up Google first, then if you care about Bing:

1. Go to **[bing.com/webmasters](https://www.bing.com/webmasters)**
2. Click **"Import from Google Search Console"**
3. Sign in with the same Google account
4. Pick your site. Done — no other setup needed.

That covers Bing, Yahoo (powered by Bing), and DuckDuckGo (also powered by Bing).

## Realistically, when will I show up on Google?

Honest answer: it depends. Brand-new sites with no other websites linking to them can take **2–8 weeks** to start showing up for general searches. The fastest wins are:

1. **Claim your Google Business Profile** at **[business.google.com](https://business.google.com)**. This is the local-business listing that shows up on Google Maps and the right-hand panel for searches like "plumber near me." Higher ROI than anything else for a service business.
2. **Get reviews on your Google Business Profile.** Volume of reviews + recency = strongest ranking signal for local search.
3. **Make sure your phone, address, hours match exactly** between your website and your Google Business Profile. Mismatches hurt rankings.

Your website helps in the long run, but the Google Business Profile is what makes the phone ring tomorrow.

## Common questions

**"I added the verification code but Google says it can't find it."**
Wait 60 seconds and try again. Sometimes the change takes a moment to propagate. If it still fails, double-check you only pasted the code (the part between the quotes after `content=`), not the whole `<meta>` tag.

**"Will my Analytics work if my site is hidden behind a domain I haven't connected yet?"**
Yes — Google Analytics tracks any URL that loads your site. Your `*.vercel.app` URL works for testing.

**"Do I need both?"**
You can pick one. Search Console is more useful if you only have time for one — it's the bridge to Google's index. Analytics is more interesting once you have traffic.
