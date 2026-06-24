---
id: workers
title: Deploying Workers
description: Deploy Vessl's 13 Cloudflare Workers with Wrangler, set project-prefixed secrets, and wire the worker URLs back into the app's environment.
sidebar_label: Workers
---

# Deploying Workers

Each Worker deploys independently with Wrangler. The app repository includes scripts that iterate the `workers/` directory, but the deploys themselves need a Cloudflare account login and the Worker secrets, so they are human-only steps.

## Deploy all Workers

From the app repository root:

```bash
# Deploy every worker that has a wrangler.toml
yarn workers:deploy

# Or deploy in parallel
yarn workers:deploy:all

# Or one at a time
WORKER=contact-form yarn workers:deploy:one
```

Each Worker has its own `wrangler.toml`; `workers/_shared` is a helper module, not a deployable Worker.

## Set secrets

Secrets are set per Worker with Wrangler and must use the project prefix so they do not collide with other projects in the same Cloudflare account:

```bash
cd workers/email-sender
npx wrangler secret put VESSL_RESEND_API_KEY

cd ../google-calendar-proxy
npx wrangler secret put VESSL_GOOGLE_CALENDAR_REFRESH_TOKEN
```

The two secrets above are the ones that gate functionality until provided: `email-sender` cannot send mail and `google-calendar-proxy` cannot write calendar events without them. The FilesHub proxy, IndexNow pusher, and cron Workers need their own secrets (FilesHub key, IndexNow key, Firebase service account) as documented in each Worker's README.

## Wire the URLs back into the app

After deploying, copy each Worker's URL into the app's `VITE_WORKER_*` / `VITE_*_URL` environment variables and rebuild the web app, so the client calls the live endpoints. Until a Worker URL is set, the corresponding client call no-ops.

## Verify

Hit each Worker's health endpoint:

```bash
curl https://vessl-contact-form.aoneahsan.workers.dev/health
# -> {"ok":true,"worker":"contact-form","version":"..."}
```

CORS is locked to the app origins, so browser calls from other sites are rejected by design.

## Frequently asked questions

**Why are secrets prefixed with `VESSL_`?**
All projects share one Cloudflare account; the prefix prevents secret-name collisions across projects.

**What happens if I deploy a Worker but skip its secret?**
The Worker runs and answers `/health`, but the secret-dependent action (email, calendar) is disabled until the secret is set.

**Do I have to deploy all of them?**
No. Deploy the Workers whose features you want live. The app degrades gracefully for any Worker that is absent.
