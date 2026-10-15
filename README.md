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
2. Configure the project as a static site: Framework Preset **Other**, Build Command `npm run build`, Output Directory `.`.
3. Deploy. The site uses relative asset paths and does not need a server runtime.

No `vercel.json` is required for this plain static site. Add a custom domain in Vercel project settings if desired.

## Content maintenance

The experience duration and role are based on the supplied portfolio details. Case-study items use explicit bracketed prompts where technical specifics and outcomes have not yet been verified. Replace those prompts with sanitized, evidence-backed details before publishing. Architecture diagrams are illustrative and call out their assumptions in the page.

Do not add internal application names, private domains, IP addresses, credentials, tokens, or confidential architecture to this public portfolio.
