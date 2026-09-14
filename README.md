# Marina Mingnan Xu — personal archive

A static personal website for design, film, web tools, and material experiments. No installation or build step is required to use it.

## Pages

- `index.html`: selected projects and the complete index.
- `lab.html`: ceramics and handwritten type.
- `about.html`: a personal introduction.
- Six individual project pages, with original imagery and process material where available.
- `claystory.html`, `gateway.html`, and `arki_main.html` preserve older entry URLs.

Open `index.html` in a browser to preview. For a local server, run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`.

## Editing

All pages are ordinary HTML and share `css/styles.css`. Images and the Everyday Gourmet archive are in `assets/`. Fonts load from Google Fonts, with system fallbacks when offline. The site works without JavaScript.

For consistent edits across navigation, footers, and project metadata, edit `scripts/build.py` and run `python3 scripts/build.py`. This regenerates the HTML pages; direct HTML edits will be overwritten. CSS and assets are preserved.

## Publication

These files are ready for static hosting. The existing `CNAME` for `marinamingnanxu.com` is preserved. The site has not been deployed and the current public website has not been changed. Keep a backup of the current host/repository before replacing its website files. Place this folder’s contents at the hosting root, rather than nesting the folder itself.

## Content still to add

- The actual handwritten font and a specimen. The current type page explicitly says its display text is not the custom font.
- More Arki identity/website/process images and individual film projects.
- Current Wrap Sheet screenshots. Its cover is a title graphic, not a product screenshot.
- Further ceramics images and process notes when available.

Sous Chef is linked as an experimental demo with an AI availability note. Its project and backend have not been modified. Everyday Gourmet is presented as an academic concept, with its original PDF available to read.
