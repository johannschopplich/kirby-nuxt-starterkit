> [!IMPORTANT]
> This repository is a demo. For production, use the [Cacao Kit](https://github.com/johannschopplich/cacao-kit-frontend) instead – the advanced version of this stack and my best practice for a Nuxt frontend on top of Kirby.

<div align="center">

<img src="https://nuxt-kirby.byjohann.dev/logo-shadow.svg" alt="Kirby Nuxt Starter Kit" width="128" height="128">

# Kirby Nuxt Starter Kit

Kirby's sample site – rewritten in Nuxt.

[Live Demo](https://kirby-nuxt-starter.byjohann.dev) •
[Development](#development) •
[Deployment](#deployment)

</div>

This repository ports the [Kirby Starter Kit](https://github.com/getkirby/starterkit) to Nuxt. The content comes from [Kirby Headless Starter](https://github.com/johannschopplich/kirby-headless-starter), a headless Kirby instance, queried with [`nuxt-kirby`](https://nuxt-kirby.byjohann.dev).

## Key Features

- 🫂 Kirby Query Language with [`nuxt-kirby`](https://nuxt-kirby.byjohann.dev)
- 🪁 [Component-based Kirby blocks](./app/components/Kirby/Block/)
- 🏛 Global [site data](./app/composables/site.ts) similar to Kirby's `$site`
- 🗳 [Queries](./app/queries/) for pre-defined KQL requests
- 🔎 Server-rendered SEO metadata
- 📐 Prettier & ESLint
- 🔢 Pre-configured [VS Code settings](./.vscode/settings.json)

## Project Structure

```
app/
├── components/Kirby/       # Block and layout renderers
├── composables/            # Page and site data, SEO metadata, and links
├── pages/                  # Home, about, notes, photography, and a catch-all for every other Kirby page
└── queries/                # KQL queries and their response types
shared/types/kirby.ts       # `ResolvedKirbyImage` type
```

## Development

1. Copy `.env.example` to `.env`. It points at the public demo backend; for your own [Kirby Headless](https://kirby.tools/docs/headless/getting-started) backend, set `NUXT_KIRBY_URL` to its base URL and `NUXT_KIRBY_TOKEN` to its [bearer token](https://kirby.tools/docs/headless/configuration/authentication).

   ```bash
   cp .env.example .env
   ```

2. Install dependencies using `pnpm install`.
3. Start the development server using `pnpm run dev` and visit [localhost:3000](http://localhost:3000/).

## Deployment

Every push to `main` builds the app with the `cloudflare_module` preset and deploys it to Cloudflare Workers through [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The workflow reads three repository secrets:

- `KIRBY_BASE_URL` and `KIRBY_API_TOKEN` – the Kirby backend, passed to the build as `NUXT_KIRBY_URL` and `NUXT_KIRBY_TOKEN`
- `CLOUDFLARE_API_TOKEN` – the token `wrangler deploy` authenticates with

In a fork, change:

- `name` in [`wrangler.toml`](./wrangler.toml), and the `routes` pattern to a domain on your Cloudflare account – without one, drop `[[routes]]` and set `workers_dev = true`
- `siteUrl` in [`nuxt.config.ts`](./nuxt.config.ts)

For another host, build with `pnpm run build` and follow the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment).

A server-rendered page waits for its KQL query, which carries the site data too, before it responds. The home page is [prerendered](https://nuxt.com/docs/getting-started/prerendering) at build time, so its content updates with the next deploy; add other pages whose content can wait for a deploy to `prerender.routes` in `nuxt.config.ts`.

## License

[MIT](./LICENSE) License © 2022-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
