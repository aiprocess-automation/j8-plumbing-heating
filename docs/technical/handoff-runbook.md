# Handoff runbook

> **Audience:** Operator (or operator's automation pipeline) transferring a generated site to a buyer.

When a buyer purchases, the operator runs through this checklist. After it's done, the operator has zero ongoing obligations or costs for that site.

## Pre-handoff (operator-side, automated where possible)

1. **Generate plaintext password** — strong random, e.g. `openssl rand -base64 18`. Store the plaintext only long enough to email the buyer; don't persist.
2. **Generate bcrypt hash** — cost factor 12. `node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" "$PW"`
3. **Generate session secret** — `openssl rand -hex 32` (32 bytes / 64 hex chars).
4. Set on the Vercel project:
   - `ADMIN_PASSWORD_HASH=<bcrypt hash>`
   - `SESSION_SECRET=<hex>`
   - `NEXT_PUBLIC_SITE_URL=https://<their-domain-or-subdomain>`
5. Confirm `BLOB_READ_WRITE_TOKEN` is auto-set (connecting a Blob store does this).
6. Trigger a deploy. Confirm `/`, `/admin/login`, `/sitemap.xml`, `/robots.txt` all return 200.
7. **Email the buyer.** Template:

```
Subject: Your new website is live

Your site: https://<their-url>
Admin: https://<their-url>/admin
Password: <plaintext>

After you log in once, click "Account" at the bottom of the editor
to change the password to something only you know.

Quick start guide: https://github.com/.../docs/buyer/README.md
```

## Buyer accepts purchase

### Step 1 — Repo transfer
```bash
gh api -X POST repos/<operator-org>/<repo-name>/transfer \
  -f new_owner=<buyer-github-username>
```
Buyer accepts the transfer email from GitHub.

### Step 2 — Vercel project transfer
Vercel Dashboard → the project → Settings → Advanced → **Transfer Project** → buyer's team. The connected Blob store transfers with it. Environment variables stay set.

### Step 3 — Domain
Buyer adds their domain in Vercel → Settings → Domains, follows the DNS instructions Vercel provides. Once the custom domain is verified, the operator subdomain (`*.aiprocessautomation.co` or whatever you use) can be removed.

### Step 4 — Password rotation
Buyer logs in with the plaintext from the welcome email, opens the editor → Account section → Change Password. The new bcrypt hash is written to `auth/admin.json` in their Blob store; from then on it overrides `ADMIN_PASSWORD_HASH` env.

### Step 5 — Inbox sanity check
`business.ownerEmail` (where contact-form `mailto:` clicks go) should be the buyer's address. They can edit it in Site Settings → Business Info → "Where to send contact form messages."

## What the buyer is responsible for after handoff

- Their own GitHub account ownership
- Their own Vercel account (Hobby is free for one site, Pro is needed for >1 in a team)
- Their own DNS provider
- Their own Google Search Console + Google Analytics accounts (optional)

The operator has **no remaining accounts, no recurring costs, no SLA**.

## Things that DON'T happen at handoff

- **No DNS migration assistance.** Vercel's wizard walks buyers through it; the operator doesn't touch the buyer's DNS.
- **No email forwarding setup.** The contact form is `mailto:`, no SMTP needed.
- **No Resend / SendGrid / third-party email.** Removed from the template intentionally.
- **No Google Cloud / Places API key.** Reviews are pre-fetched at generation time and seeded into `content/site.json`. The buyer edits review text directly in the editor; nothing pulls from Google after handoff.

## Edge cases

- **Buyer never accepts the GitHub transfer.** Their Vercel project keeps reading from the operator's GitHub. After 7 days the GitHub transfer expires; you'd need to re-issue. If they go silent, the site keeps running but commits will need to be made under the operator account. Long-term recommendation: don't make code changes for the buyer post-handoff.
- **Buyer wants their domain on the operator's Vercel team.** Don't. Transfer the project to them first, then they connect the domain. Otherwise you're paying for their Pro seat forever.
- **Buyer locks themselves out of the admin.** If they forget the new password and lose access to the email used for password reset, the recovery path is: the operator (if still has team access pre-handoff) updates `ADMIN_PASSWORD_HASH` env to a new bcrypt hash. Post-handoff, only the buyer can do this on their own Vercel project. Document this clearly in the welcome email.
