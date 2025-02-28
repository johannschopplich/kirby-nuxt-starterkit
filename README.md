> [!IMPORTANT]
> This repository is a demonstration. For **production use**, please use the [Cacao Kit](https://github.com/johannschopplich/cacao-kit-frontend) instead. It is a more advanced version of this repository and my best practice solution to build a Nuxt based frontend on top of Kirby CMS.

<p align="center">
  <img src="https://nuxt-kql.byjohann.dev/logo-shadow.svg" alt="Kirby Nuxt Starter Kit" width="128" height="128">
</p>

<h3 align="center">Kirby Nuxt Starter Kit</h3>

<p align="center">
  Kirby's sample site – but rewritten in Nuxt<br>
  <a href="https://kirby-nuxt-starter.pages.dev"><strong>Explore the kit live »</strong></a>
</p>

<br>

# Kirby Nuxt Starter Kit

This repository is a port of the [Kirby Starter Kit](https://github.com/getkirby/starterkit) to Nuxt. The content is fetched using the [`nuxt-kql`](https://nuxt-kql.byjohann.dev) module from [Kirby Headless Starter](https://github.com/johannschopplich/kirby-headless-starter), a headless Kirby instance instance.

## Key Features

- 🫂 Kirby Query Language with [`nuxt-kql`](https://nuxt-kql.byjohann.dev)
- 🪁 [Component based Kirby Blocks](./components/Kirby/Block/)
- 🏛 Global [site data](./plugins/site.ts) similar to Kirby's `$site`
- 🗳 [Collections](./composables/collections.ts) for pre-defined queries
- 🔎 SSR generated SEO metadata
- 📐 Prettier & ESLint
- 🔢 Pre-configured [VSCode settings](./.vscode/settings.json)
- 🔖 And much more!

## Usage

### Prerequisites

1. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
2. Install dependencies using `pnpm install`
3. Adapt the relevant environment variables:

```bash
# Base URL of the Kirby backend
KIRBY_BASE_URL=
# Token for bearer authentication
# See https://github.com/johannschopplich/kirby-headless-starter#private-vs-public-api
KIRBY_API_TOKEN=
```

### Development

1. Start the development server using `pnpm run dev`
2. Visit [localhost:3000](http://localhost:3000/)

### Production

Build the application for production with `pnpm run build`.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## FAQ

### Are There Any Drawbacks?

Data is fetched within Suspense components to ensure pre-rendered state for the user and SEO. Thus, the initial server response time is increased by about 50–100 ms for the initial KQL page query. This might be a road blocker for you. You can always [pre-render routes](https://github.com/johannschopplich/kirby-nuxt-starterkit/blob/413f8d434362380ba07238c91a39fd137368ac51/nuxt.config.ts#L23).

### What's Kirby?

- **[getkirby.com](https://getkirby.com)** – Get to know the CMS.
- **[Try it](https://getkirby.com/try)** – Take a test ride with our online demo. Or download one of our kits to get started.
- **[Documentation](https://getkirby.com/docs/guide)** – Read the official guide, reference and cookbook recipes.
- **[Issues](https://github.com/getkirby/kirby/issues)** – Report bugs and other problems.
- **[Feedback](https://feedback.getkirby.com)** – You have an idea for Kirby? Share it.
- **[Forum](https://forum.getkirby.com)** – Whenever you get stuck, don't hesitate to reach out for questions and support.
- **[Discord](https://chat.getkirby.com)** – Hang out and meet the community.
- **[YouTube](https://youtube.com/kirbyCasts)** - Watch the latest video tutorials visually with Bastian.
- **[Mastodon](https://mastodon.social/@getkirby)** – Spread the word.
- **[Instagram](https://www.instagram.com/getkirby/)** – Share your creations: #madewithkirby.

## License

[MIT](./LICENSE) License © 2022-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
