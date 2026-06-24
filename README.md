# Vessl Docs

Documentation site for [Vessl](https://vessl.aoneahsan.com) — a premium car-marketplace platform built as white-label SaaS. Built with [Docusaurus 3](https://docusaurus.io/).

| | |
|---|---|
| **Docs site** | https://vessl-docs.aoneahsan.com |
| **App** | https://vessl.aoneahsan.com |
| **App repo** | github.com/aoneahsan/vessl (private) |
| **Package manager** | yarn |
| **Node** | ≥ 20 |

## Develop

```bash
yarn install
yarn start      # local dev server
yarn build      # static build into build/
yarn serve      # preview the built site
```

## Hosting

Dual-hosted:

- **GitHub Pages** — `.github/workflows/deploy.yml` builds and deploys on push to `main`; custom domain via `static/CNAME` (`vessl-docs.aoneahsan.com`).
- **Firebase Hosting** — `firebase.json` + `.firebaserc` target `vessl-docs`. Deploy with `firebase deploy --only hosting:vessl-docs` after `yarn build`.

Both deploys are user-only (need credentials).

## Structure

```
docs/                      ← all documentation pages (routeBasePath '/')
  getting-started/         ← overview, tech stack, local setup
  features/                ← marketplace, 3D viewer, consultations, dashboard, admin, i18n, theming
  architecture/            ← overview, Firestore data model, RBAC
  workers/                 ← overview + endpoint reference for 13 Cloudflare Workers
  deployment/              ← web hosting, Workers, Android
src/css/custom.css         ← brand theme (teal accent, dark-first)
static/                    ← robots.txt (AI-bot allowlist), llms.txt, CNAME, images
docs/tracking/             ← SEO content enrichment tracker
```

## SEO

robots.txt allows all major AI crawlers, `sitemap.xml` is emitted on every build, `llms.txt` is at the root, and every page carries meta + Open Graph plus site-wide JSON-LD (WebSite, Organization, SoftwareApplication).

Long-tail content enrichment is tracked in `docs/tracking/vessl-docs-content-tracker.json`.

## License

Proprietary. All rights reserved.
