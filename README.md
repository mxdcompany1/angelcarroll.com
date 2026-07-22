# From the Desk — Angel Carroll blog

Editorial blog page for angelcarroll.com. The design and the data are decoupled: the
page renders cards from `posts.json`, and Angel edits `posts.json` through a friendly
CMS form — no code.

## Files
- `From-The-Desk.dc.html` — the blog page (design). Fetches `posts.json`; falls back to an
  inline copy so it still renders when opened locally.
- `posts.json` — all posts live here. This is the single source of truth for the grid.
- `admin/index.html` + `admin/config.yml` — Decap CMS (formerly Netlify CMS).
- Cover images upload to `images/uploads/`.

## Post fields
`title`, `date` (YYYY-MM-DD), `category` (Op-Ed · Feature · Commentary · Interview),
`source` (outlet), `description` (short), `link` (URL to the piece), `cover` (optional image).
Cards sort newest-first. If `cover` is empty, a branded gradient placeholder with the source
name is shown.

## Deploy (Netlify)
1. Push this project to a Git repo and connect it to a new Netlify site.
2. In Netlify → **Identity**, click **Enable Identity**.
3. Under **Identity → Services**, click **Enable Git Gateway**.
4. Set registration to **Invite only**, then **Invite users** (invite Angel's email).
5. Angel accepts the email invite, sets a password, and logs in at `/admin/`.

## Managing posts
- Go to `yoursite.com/admin/` and log in.
- Editorial workflow is on: new posts start as **Draft**, move to **In review**, then
  **Publish** — so nothing goes live by accident.
- Add/edit entries in the **From the Desk → Blog Posts** list. Save & publish; Netlify
  rebuilds automatically.

## Recoloring
All brand colors live in one labeled `--token` block at the top of
`From-The-Desk.dc.html`. Change them there to restyle the whole page.
