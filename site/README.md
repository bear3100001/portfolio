# Portfolio site

A single-page portfolio built from the Framer homepage. The hero sentence is the interface:

| Drawing | Opens |
|---|---|
| Girl (after "Hi,") | Profile card → "Full CV" opens the About view (`/#/about`) |
| Guinea pig | 01 Schedule Assistant |
| Cat | 02 Consultant Door Sync |
| Faces | 03 Selected Works (scrolling portfolio pages) |
| Hands | 04 (draft) |

The mouse logo and "← Hi, back to start" return to the hero. In a project, ← / → switch projects and Esc goes back.
Every project has its own link (e.g. `/#/schedule-assistant`), and the browser back button works.

## Files

- `index.html`: the page, including the hero sentence and profile card text
- `styles.css`: all styling; the design tokens are at the top
- `app.js`: routing, transitions and profile card positioning
- `projects.js`: **all content: the CV (`PROFILE`) and the projects (`PROJECTS`). The only file you need to edit.**
- `assets/`: your drawings, taken from the Framer site

## Adding a project

Open `projects.js`, find the `project-03` entry, remove `draft: true` and fill in `title`, `meta`, `summary`,
`problem`, `created`, `steps`, `note`, `tools`, `outcome`, `link` and `linkLabel`. Leave out any field you don't need.

To link a project to a different drawing, change `data-project="…"` on that drawing in `index.html`
so it matches the project's `id`.

## Selected Works (portfolio pages)

The faces drawing opens a scrolling view of portfolio pages, defined by the `selected-works` entry in `projects.js`
(`type: "folio"`). Each section has a `title`, `subtitle` and a list of `pages`: `[file name, description, "portrait"?]`.
Page images live in `assets/folio/` as `<name>-l.jpg` (large, 2400 px wide spreads / 1300 px portrait) and
`<name>-s.jpg` (small, for phones). Click a page on the site to view it full-screen; click again to zoom.

## Editing the CV

The About view reads from `PROFILE` at the top of `projects.js`. Each entry in `experience` is one row
(dates, role, text, tags), newest first. The quick profile card is plain text in `index.html`.

## Previewing locally

From the `port-folio` folder:

```bash
python3 serve.py
```

Then open http://localhost:4321. Caching is off, so a normal refresh shows your latest edits.

## Publishing on GitHub Pages

The repo includes `.github/workflows/pages.yml`, which publishes only the `site` folder on every push to `main`.

1. Create an empty public repository on GitHub, e.g. `portfolio`.
2. In that repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. From the `port-folio` folder, push:

   ```bash
   git remote add origin https://github.com/bear3100001/portfolio.git
   git push -u origin main
   ```

4. The site goes live at `https://bear3100001.github.io/portfolio/` within a minute or two.
   After that, every `git push` updates it.
