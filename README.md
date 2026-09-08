# samuelleigh.co.uk

A static site built with Astro. Writing and work entries are markdown files; everything
else is a page.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:4321.

`npm run build` produces the static site in `dist/`.

## Changing your details

`src/site.ts` holds your name, location, email, LinkedIn URL and the short "currently"
note in the sidebar. Change them there and they update everywhere.

## Adding an article

Create a markdown file in `src/content/writing/`. The filename becomes the URL, so
`fiscal-rules-forecasting.md` becomes `/writing/fiscal-rules-forecasting`. Use lowercase
words separated by hyphens.

```
---
title: The fiscal rules are a forecasting problem, not a spending one
date: 2026-08-14
summary: Why five-year headroom targets keep producing autumn tax rises.
note: Adapted from an essay written in 2026
draft: false
---

Your article here, in markdown.
```

`summary` appears under the title in the list. `note` is optional and is the right place
to say a piece began as coursework. Set `draft: true` to keep something out of the build
while you work on it.

## Adding a work entry

Create a markdown file in `src/content/work/`.

```
---
title: Volunteer crew, RNLI
period: "2024–"
order: 10
summary: One line, shown in the list.
role: Volunteer crew member
context: One line of background for the fact box.
image: /images/rnli-helm.jpg
imageCaption: Training exercise, May 2026.
---
```

`order` controls the position on the work page; lower numbers come first. `image` and
`imageCaption` are optional. Images live in `public/images/` and are referenced from the
site root, so `public/images/foo.jpg` is written as `/images/foo.jpg`.

## Content collections

Three: `writing`, `work` and `hearings`. Each is a folder of markdown under `src/content/`,
and every entry has `draft: true` or `false`. Everything currently in the repository is set to
draft except the work entries, so the site builds but publishes nothing unfinished.

## Photos included

- `public/images/rnli-helm.jpg` — the 3:2 crop, used as the header on the RNLI page
- `public/images/rnli-card.jpg` — the 4:5 crop, spare
- `public/images/headshot.jpg` — used on the About page

Replace the headshot with a real photograph before the site goes live.

## Your CV

Put the PDF at `public/cv.pdf` and it will be served at `/cv.pdf`, which is what the CV
page links to. Keep that PDF plain: no tables, columns, text boxes, headers or footers,
and use the standard section headings, because it will be parsed by applicant tracking
software before a person sees it. The HTML version on `/cv` is the one that can look
designed.

## Design system

Defined in `src/styles/global.css` as custom properties.

| Token | Value | Job |
|---|---|---|
| `--ink` | `#14202A` | All body text |
| `--slate` | `#55666F` | Dates, captions, secondary text on plain background only |
| `--paper` | `#FBFAF7` | Page background |
| `--shoal` | `#DCE6E4` | Fact boxes, pull quotes, rules |
| `--foreshore` | `#E9E1CF` | The writing list only |
| `--magenta` | `#A62C5F` | Links, current nav item, focus ring. Nothing else. |

Typefaces are Archivo (headings and interface) and Source Serif 4 (body), both under the
SIL Open Font License and self-hosted through Fontsource, so nothing is fetched from
Google at runtime.

Two rules worth keeping. Do not use `--slate` for text sitting on `--shoal` or
`--foreshore`; it only just clears the 4.5:1 contrast threshold, so use `--ink` at a
smaller size instead. And do not give `--magenta` a second job.

## Editing in the browser

The site ships with Sveltia CMS, a Git-based editor that runs entirely in your browser at
`/admin`. You log in with GitHub, fill in a form, and it commits a markdown file to the
repository. Cloudflare rebuilds and the change is live within a minute or so. It works on a
phone, which matters for fixing a typo away from a desk.

Nothing about it affects the public site. `/admin` is a static page that does nothing until
you point it at a repository.

### Setup, once

1. **Push this project to GitHub.** A private repository is fine and is what I would use.

2. **Deploy the authenticator.** GitHub does not yet allow a browser-only app to complete
   sign-in, so a tiny Cloudflare Worker handles it. Follow the readme at
   `github.com/sveltia/sveltia-cms-auth`, which has a deploy button. It runs on Cloudflare's
   free tier. Note the worker URL it gives you.

3. **Register an OAuth app on GitHub.** In Settings, Developer settings, OAuth Apps. The
   authorization callback URL is your worker URL with `/callback` on the end. Generate a client
   secret.

4. **Add three variables to the worker** under Settings, Variables: `GITHUB_CLIENT_ID`,
   `GITHUB_CLIENT_SECRET` (click Encrypt), and `ALLOWED_DOMAINS` set to `samuelleigh.co.uk`.

5. **Fill in `public/admin/config.yml`.** Three values marked CHANGE-ME: your repository as
   `username/repo`, the branch, and the worker URL as `base_url`.

Then go to `https://samuelleigh.co.uk/admin` and sign in.

If you would rather skip the worker for now, Sveltia also supports signing in with a GitHub
personal access token. That is quicker to set up and fine for one person, though the worker is
the better long-term arrangement.

### What you get

Three collections, matching the three content folders. Writing and Hearings default new
entries to draft, so nothing goes live by accident. The Attendance field on hearing notes is a
dropdown limited to "In person" and "Watched online", and the date fields are pickers, so the
two things easiest to get wrong by hand are now impossible to get wrong.

Images uploaded through the CMS go to `public/images` and are referenced as `/images/name.jpg`.

The About page, the CV page, the home page paragraph and the sidebar details are not in the
CMS, because they are code rather than content. Edit those in the repository, or through
GitHub's own web editor, which also works from a browser.

## Keeping it out of search results

The site is set to be unlisted: reachable by anyone with the link, but not returned by search
engines. Two things do that, and both are already in place.

`public/_headers` sends `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` on every path,
which covers the HTML pages and `cv.pdf` alike. Astro copies that file to the root of `dist`
at build time. Do not move it into `dist` yourself, because that folder is wiped on every build.

`src/layouts/Base.astro` adds the same instruction as a meta tag in the head of every page,
plus `referrer: no-referrer` so the URL does not show up in the analytics of sites you link to.

Do not add a `robots.txt` with `Disallow: /`. It stops crawlers reading the page, which means
they never see the noindex instruction, and the bare URL can still surface if anyone links to
it. There is deliberately no `robots.txt` and no sitemap in this project.

Two other things to remember. Do not verify the domain in Google Search Console. And do not
link to the site from LinkedIn or anywhere else public, since that is the usual way these get
found. Put the link on your CV and in application forms only.

After deploying, check it took effect:

```
curl -I https://samuelleigh.co.uk/ | grep -i x-robots-tag
```

One Cloudflare specific point: every Pages project keeps a free `yourproject.pages.dev`
address alive even after you attach a custom domain, so there are two public URLs. The
`_headers` file covers both. If you want the `pages.dev` one gone, add a redirect rule in the
dashboard matching `hostname eq "yourproject.pages.dev"` and send it to the real domain.

Certificate transparency is worth knowing about: every certificate Cloudflare issues is
published to public CT logs within minutes, so the hostname is discoverable whether or not
anyone links to it. Unlisted is not the same as private. Do not put anything on the site you
would mind a stranger reading.

## Deploying

Cloudflare Pages or Netlify, both free for this.

1. Push the repository to GitHub.
2. Connect it in the Cloudflare Pages or Netlify dashboard.
3. Build command `npm run build`, output directory `dist`.
4. Add your domain in the dashboard and follow its DNS instructions.

Set `site` in `astro.config.mjs` to your real domain so canonical URLs are correct.

## Before it goes live

- Ask your station's press officer about using RNLI imagery and naming the charity
- Replace every piece of placeholder text, including the sidebar note
- Check the email address is a real one you monitor
- Have at least three finished articles published, so it does not look abandoned
