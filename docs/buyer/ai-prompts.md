# AI prompts for your website

Copy these into ChatGPT, Claude, or any AI you like. Replace the `[bracketed]` parts with your actual info.

## Quick context to paste first

If you're starting a new chat, paste this so the AI knows what kind of help you need:

> I run a [type of business] called [Business Name] in [City, State/Region]. I'm editing my website and need help writing content. Keep it short, plain English, focused on conversions. No buzzwords. Don't write like a marketing agency. Write like a customer would actually want to read.

The AI will calibrate to that and stop sounding like a copywriting bot.

---

## Writing prompts

### Tagline (one short line)

> Write 5 options for a one-line tagline (under 12 words) for [Business Name], a [type of business] in [City]. The tagline shows under the business name on the homepage. Tone: confident, direct, no hype. Each option should be different in style.

### Page title (Google search result)

> Write a Google-search-result title for my [type of business] in [City]. Format: "[Service] — [Business Name], [City]". Keep it under 60 characters total. Give me 3 options.

### Meta description (the snippet under your title in Google)

> Write a meta description (under 160 characters) for my [type of business] in [City]. Mention: what we do, our city/region, and one differentiator. No "Welcome to" or generic openers. Pitch like a friend recommending us.

### Hero trust badges (the pills under your headline)

> Give me 4 short trust pills (3-5 words each) for the homepage of my [type of business] in [City]. Examples like "Licensed & Insured", "24/7 Service", "Family Owned Since 1970". Pick 4 that would actually be true and credible for a [type of business].

### About Us paragraph

> Write a 2-paragraph "About Us" section for [Business Name], a [type of business] in [City]. We've been doing this for [X years]. Our differentiator is [something specific, e.g. "we always quote upfront prices" or "we specialize in heritage homes"]. Tone: human, confident, no marketing fluff. Don't say "we strive" or "our mission". Write like the owner is talking to a customer at the front desk.

### Service descriptions

> Write 6 service descriptions for my [type of business] in [City]. Each one should be:
> - One short title (under 5 words)
> - One sentence describing what it is and who it's for (under 25 words)
>
> Make each service distinct. No filler. Don't repeat the city in every one — use the placeholder `{{business.address.city}}` if you want to reference it.
>
> The 6 services I offer are: [list them in plain English, e.g. "fixing leaks, installing toilets, water heater repair, drain cleaning, gas line work, emergency calls"].

### Review responses (when you reply to Google reviews)

> Write 3 different reply variations to this Google review for my [type of business]:
>
> "[paste the review here]"
>
> Each reply should be 1-2 sentences. Tone: warm, specific, no "Thank you for your feedback!" template language. Mention something from their actual review.

---

## Editing prompts

### "Make this less corporate"

> Here's my About Us section. Rewrite it to sound less like a corporate website and more like a real human. Cut every sentence that uses words like "strive", "passionate", "dedicated", "mission", or "deliver value". Keep it under 150 words.
>
> [paste your text]

### "Shorten this without losing the point"

> Cut this in half. Keep the meaning. Don't lose the specific details (numbers, places, names). Aim for [X] words.
>
> [paste your text]

### "Fix awkward phrasing"

> Read this aloud as if a real person were saying it. Fix anything that doesn't sound natural. Don't change the meaning. Don't add new claims.
>
> [paste your text]

### "Localize for my city"

> Rewrite this to feel specific to [City, State]. Mention neighborhoods, local landmarks, or regional terms where it makes sense. Don't force it — only add local touches where they'd actually fit.
>
> [paste your text]

---

## Image prompts (for AI image generators)

If you're generating logos, icons, or stock-photo-replacements with Midjourney, DALL-E, Adobe Firefly, etc.:

### Logo

> A clean, minimal logo for [Business Name], a [type of business] in [City]. Style: [modern minimalist / vintage / hand-drawn / bold geometric]. Color palette: [your colors]. Output as SVG-style flat vector with transparent background. Two versions: full color and white-only.

### Hero image

> A photo of [a specific scene relevant to your business — e.g., "a plumber in clean uniform fixing a sink in a bright modern kitchen, natural daylight, photographed at hip-level, shallow depth of field"]. Realistic photography, not illustration. Wide aspect ratio (16:9). High quality.

### Service icon (if you want to replace the auto-generated icons)

> A simple flat icon representing [the service, e.g. "drain cleaning"]. Single color line drawing, transparent background, no text. Style: like Heroicons or Phosphor icons.

---

## Strategy prompts

### "What should I write about?"

> I run [Business Name], a [type of business] in [City]. List 10 specific topics that potential customers in my area would search for. Order them by:
> 1. How often people search for them
> 2. How easy they'd be for me to write about (1-2 sentences each)
>
> No generic stuff like "About us" — give me searchable topics like "what to do when your water heater leaks" or "how much does X cost in [city]".

### "Help me prepare for asking for reviews"

> Write a short text message (under 200 characters) I can send to a satisfied customer asking them to leave a Google review. Sound friendly, not pushy. Mention that it really helps. Include a [PLACE_FOR_LINK] where I'll paste my Google review link.

### "What's a fair price for this?"

> I want to charge [X] for [service] in [City]. Is that high, low, or about right for the local market? What questions would a customer ask before paying that, and how should I answer them?

---

## Things to NOT ask AI

- "What should my brand colors be?" — Pick from your logo. Or pick what you like. AI guesses are worse than your taste.
- "Write me a privacy policy." — This is legal text. Use a free generator like [termly.io](https://termly.io) or pay a lawyer if your business is big enough to need one. AI-written policies have been challenged in court.
- "Generate fake reviews for me." — Don't. Google detects them. Costs you the listing if caught.

---

## A note on AI-generated content

Search engines (and human readers) increasingly recognize AI-written text. If every paragraph on your site sounds the same — same rhythm, same word choices, same style — it stops feeling personal.

**Best workflow:** ask the AI for a draft, then edit by hand. Cut things that don't sound like you. Add specific details only you'd know — names of products you use, places in your city, weird customer stories.

The personality is what converts. AI gets you to a working draft in minutes; the personal edit is what makes it actually yours.
