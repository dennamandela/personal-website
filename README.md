# Denna Mandela — Portfolio

A lightweight static portfolio built with HTML, Tailwind CSS v4, and a small optional JavaScript enhancement.

## Build styles

Install the development dependencies and compile the production stylesheet:

```sh
npm install
npm run build
```

The generated `css/app.css` file is used by the static site. During development, run `npm run watch:css` to rebuild it when the HTML or Tailwind source changes.

## Local preview

After building the stylesheet, start any static web server from this folder. For example, with Python installed:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. You can also open `index.html` directly; the site does not require JavaScript for navigation or content.

## Deploy to Vercel

1. Import this repository into Vercel, or install the Vercel CLI and run `vercel` from the project root.
2. The repository's `vercel.json` runs `npm run build` and sets the static Output Directory to `.` (the project root), where `index.html`, generated `css/app.css`, JavaScript, and assets are available.
3. Deploy. The site uses relative asset paths and does not need a server runtime. Add a custom domain in Vercel project settings if desired.

## Content maintenance

The current DevOps position is listed as starting on 26 October 2026 at PT Adi Data Informatika, on placement at BNI. The prior PT CKL Indonesia Raya entry retains its supplied April 2025–present dates until its end date is confirmed. The displayed tenure remains 1 year, 6 months as of October 2026 based on the supplied month-level history; confirm continuity and update the three hand-written references in `index.html` together if needed. Technologies listed for the BNI environment describe that environment and do not claim implementation or ownership. Architecture diagrams are illustrative and call out their assumptions in the page.

Do not add internal application names, private domains, IP addresses, credentials, tokens, or confidential architecture to this public portfolio.
