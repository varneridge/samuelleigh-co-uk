# Running the site on your own machine

Two ways. The first lets you edit and see changes instantly, which is what you want most of
the time. The second is just a look at the finished thing with nothing installed.

## 1. The development server (for editing)

You need Node.js version 18.20 or later. Check with `node -v`. If you don't have it, get the
LTS build from nodejs.org.

Then, in this folder:

```
npm install
npm run dev
```

Open http://localhost:4321. Leave the terminal running. Every time you save a file the browser
updates by itself, usually before you have switched windows.

`npm install` only needs doing once, or again after you change `package.json`.

To stop the server, press Ctrl+C in the terminal.

### What to edit

| You want to change | Edit this |
| --- | --- |
| Your name, email, location, sidebar note | `src/site.ts` |
| The home page opening paragraph | `src/pages/index.astro` |
| The About or CV page | `src/pages/about.astro`, `src/pages/cv.astro` |
| An article | the file in `src/content/writing/` |
| A work entry | the file in `src/content/work/` |
| A hearing note | the file in `src/content/hearings/` |
| Colours, type, spacing | `src/styles/global.css` |

Everything in `writing`, `hearings` and the Missang work entry is currently `draft: true`, so
it does not appear on the site. Set `draft: false` to publish one.

Drafts do show in the dev server if you would rather see them while working: run
`npm run dev -- --mode development` and they still won't appear, so the simpler approach is
just to flip the flag temporarily and flip it back.

## 2. The built site (just to look at it)

The `preview` folder in this package is the finished site, already built. It will not work if
you double-click `index.html`, because the pages link to each other by absolute path. Serve it
instead.

If you have Python, which macOS and most Linux machines do:

```
cd preview
python3 -m http.server 8000
```

Then open http://localhost:8000.

On Windows without Python, `npx serve preview` will do the same thing if you have Node.

This folder is a snapshot. Editing it does nothing useful, because the next build overwrites
it. Use option 1 for real changes.

## Building it yourself

```
npm run build
```

That regenerates the static site into `dist/`. Cloudflare Pages runs this same command for
you, so you never strictly need to.

`npm run preview` serves the last build locally, which is worth doing before you deploy.

## If something goes wrong

**`npm install` fails on a corporate or university network.** The registry may be blocked.
Try a phone hotspot.

**Port 4321 already in use.** Something else is on it. `npm run dev -- --port 4322`.

**The fonts look wrong.** They are installed by `npm install` as packages rather than
downloaded from the web, so if they have not appeared, the install did not finish.

**Changes don't show.** Check the terminal running `npm run dev` for a red error message. A
mistake in the frontmatter block at the top of a markdown file is the usual cause, and the
error will name the file and the field.
