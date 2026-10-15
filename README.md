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

The experience duration and role are based on the supplied portfolio details. The DevOps tenure (currently 1 year, 6 months since April 2025) is written by hand in three places: the hero profile panel, the Experience tenure stamp, and the meta description in `index.html`. Update all three together. Architecture diagrams are illustrative and call out their assumptions in the page.

Do not add internal application names, private domains, IP addresses, credentials, tokens, or confidential architecture to this public portfolio.
