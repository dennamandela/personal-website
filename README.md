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

The current DevOps position is listed as starting on 26 October 2026 at PT Adi Data Informatika, on placement at PT Bank Negara Indonesia (Persero) Tbk. The prior PT CKL Indonesia Raya role ran from 29 April 2025 to 20 October 2026. Date subtraction gives 539 elapsed days for CKL and 1 day for the current placement as of 27 October 2026: 540 elapsed days total, with the five-day gap between roles excluded. The profile displays this as 1 year, 5 months, omitting the remaining days. That duration appears in three places in `index.html`: the meta description, hero profile panel, and Experience tenure stamp. Update all three together as time passes. Technologies listed for the PT Bank Negara Indonesia (Persero) Tbk environment describe that environment and do not claim implementation or ownership. Architecture diagrams are illustrative and call out their assumptions in the page.

Do not add internal application names, private domains, IP addresses, credentials, tokens, or confidential architecture to this public portfolio.
