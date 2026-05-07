# Brand & images

Your site has three image slots that matter most: **logo**, **hero photo**, and **gallery photos**. Plus brand colors. This guide covers what looks good and what to avoid.

## Logo

You'll upload up to three versions in **Site Settings → Branding & Colors**:

- **Logo** — for your header (white background). Most logos work here.
- **Logo for dark backgrounds** — for your footer. If your main logo is dark blue text on white, it'll be invisible on a dark footer. Use a white or light version here.
- **Favicon** — the tiny icon in the browser tab. Square, simple shapes only. A monogram (just your initials) often works better than the full logo at this size.

### What format?

- **PNG with transparent background** is best. The "transparent" part means it sits on any background color cleanly.
- **SVG** also works and is sharper at any size.
- **JPG** works but won't have transparency — there'll be a visible square around your logo.

### What size?

- **Logo**: at least 400px wide. Bigger is fine; we resize automatically.
- **Favicon**: ideally exactly 512×512 pixels, square.

### Don't have a logo?

That's fine. Leave the logo field blank. Your business name will show up as text in your brand color. It looks clean.

If you want a logo without paying a designer, two options:
- **Looka.com** — drag-and-drop logo maker, $20–$80 for the files.
- Hand the prompt below to ChatGPT or Claude with image generation:

> Make a clean, minimal logo for [Your Business Name], a [your industry] in [your city]. Two versions: one with full color text on transparent background, one in white only on transparent background. Simple, professional, works at small sizes. PNG output.

## Hero photo

The big image at the top of your homepage. This is the single most important image on your site.

### What works

- A photo of YOU or YOUR TEAM doing the work.
- A photo of your storefront or vehicle if it's recognizable.
- A clean, professional shot of a finished job.

### What doesn't work

- Stock photos of generic plumbers/hairdressers/restaurants. Visitors can spot them in a second.
- Cluttered photos. Pick something with a clear subject.
- Dark/grainy iPhone photos taken at night.

### Specs

- At least 1600×900 pixels (so it's sharp on big screens).
- Landscape orientation (wider than tall).
- File size under 2 MB (we compress automatically, but smaller is better).

### Don't have one?

Use your phone's camera in good daylight. Take 10 shots, pick the best. iPhone photos from the last 5 years are good enough.

## Gallery photos

The photo grid in the middle of your site. 6–9 photos is the sweet spot.

### What works

- Before-and-after pairs (especially powerful for trades).
- Detail shots of your craft.
- Happy customers (with permission!) holding/using your product or in your space.

### Caption every photo

Below each photo there's a "Caption" field. Don't skip it. Two reasons:

1. **Google reads captions** to understand what's in your images, which can show your photos in image search.
2. **Visitors with screen readers** depend on captions to know what they're looking at.

Format: short and descriptive. Bad caption: "IMG_1234". Good caption: "Burst pipe repair in Vancouver, March 2024".

You can use smart placeholders here too. e.g. `"Kitchen renovation in {{business.address.city}}"` automatically fills in your city.

## Colors

Two colors to pick in **Branding & Colors**:

- **Primary** — your buttons, headings, accents. The main brand color.
- **Accent** — your phone number and "Call Now" buttons. The "look at me" color.

### Picking colors

If you have a brand book, use those colors. If not:

1. Look at your logo. The most prominent color → Primary. The second most prominent (or a complementary color) → Accent.
2. If your logo is one color only, pick a contrasting accent. Examples:
   - Blue logo → Yellow or Orange accent
   - Green logo → Yellow or White accent
   - Red logo → Black or Yellow accent
   - Black logo → Bright color of your choice as accent

### Test your contrast

Open your live site after saving. Can you read the white text on the primary color buttons clearly? Can you read the accent-colored phone number against the header? If anything looks washed out or hard to read, lighten or darken the color slightly.

### Color codes

When you click the color box in the editor, you can either:
- Use the color picker (drag the dot around)
- Type a hex code directly (e.g. `#0F4C81`)

If you have brand colors documented, paste the hex codes in.

## Image sources you can use legally

- Photos you took yourself: ✅ always fine.
- Customer photos with their permission: ✅ fine.
- **Unsplash.com**, **Pexels.com**, **Pixabay.com**: free for commercial use, no attribution required.
- Google image search: ❌ NOT okay. Most are copyrighted. Don't use.
- AI-generated images (Midjourney, DALL-E, etc.): ✅ generally fine, but disclose if customers ask.

## Tools to make images look better

- **Canva** ([canva.com](https://canva.com)) — free, drag-and-drop. Great for quick edits, adding text overlays, cropping.
- **Photopea** ([photopea.com](https://photopea.com)) — free Photoshop in the browser. For more advanced edits.
- **TinyPNG** ([tinypng.com](https://tinypng.com)) — drag your image, drag the smaller one out. Cuts file size in half with no visible quality loss.

## Quick checklist before going live

- [ ] Logo uploaded (at least the light-background version)
- [ ] Hero photo is yours, not a stock photo
- [ ] At least 4 gallery photos, all with captions
- [ ] Primary and accent colors match your brand (or look intentional, not random)
- [ ] Favicon shows up correctly in your browser tab (visit your site, look at the tab icon)
