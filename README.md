# JonathanHuangg.github.io

Jonathan Huang's personal site: a single hand-written `index.html` — no
template, no framework, no external dependencies. It lives at
[JonathanHuangg.github.io](https://JonathanHuangg.github.io), served by
GitHub Pages from this repo.

The old site was an OS Templates demo ("Chillaid") with placeholder pages
(Gallery, Full Width, Sidebar Left…), placeholder nav links ("Link Text"),
and a half-finished carousel. This version replaces all of it with real
content: the projects, with descriptions verified against the repos
themselves, and nothing that doesn't run.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Tests

```sh
npm test
```

Zero dependencies, plain `node --test`. The suite serves the site and
checks that it returns 200, that no template or placeholder text remains,
that every link resolves to a real repo or section, and that the project
filter data is consistent. The filters were also exercised in headless
Chromium (desktop and mobile viewports) with screenshots.

## Design notes

- One file. System fonts only (Georgia for display, system sans for body,
  ui-monospace for labels), so the page renders identically offline.
- Warm paper, near-black ink, Georgia Tech gold. Nothing is tracked.
- Project descriptions are factual and checkable: each one comes from the
  repo's own README or code, and every card links to the repo.
