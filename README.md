# Vibed Waitlist

A coming-soon landing page for the fictional Nexus product, with an interactive email signup demo.

Live demo: [https://vibed-waitlist.xavainf.com](https://vibed-waitlist.xavainf.com)

Source: [View source on GitHub](https://github.com/xavadao/coming-soon-waitlist). This open-source website example is published for community review and development.

## Features

- Responsive hero with bundled original artwork
- Email validation, loading, error, and success states
- Countdown, product preview, and social sharing
- Same-origin Worker endpoint at `POST /api/waitlist`

## Search and accessibility

Every page includes a fixed bottom-right, keyboard-accessible “Made with XavaInf” badge linking to https://xavainf.com and a visible “View source on GitHub” footer link. The badge stays in place while scrolling, with safe-area spacing and footer clearance; demo disclosures remain in the page flow. Pages also include descriptive page metadata, a canonical URL, and social preview metadata. `robots.txt`, `sitemap.xml`, and `llms.txt` describe the published demo routes and limitations. Structured data identifies the site as a creative demonstration, without product ratings or customer claims. Keyboard focus and reduced motion are supported.

## Run locally

Requires Node.js 22.13 or newer and pnpm 11.13.0.

```sh
pnpm install
pnpm dev
```

Use `pnpm dev` for fast UI development at http://localhost:3000. Use `pnpm preview` to build and run the production Cloudflare serving configuration locally at http://localhost:8787. Signup requires `pnpm preview`, because the API runs in the Worker rather than the Next.js development server.

## Build and preview

```sh
pnpm build
pnpm start
```

`pnpm build` checks TypeScript and generates `out/`. `pnpm start` serves that existing build through Wrangler. `pnpm preview` combines both steps.

Run the Worker integration checks with `pnpm test`. They verify valid signup, duplicate normalization, invalid emails, malformed JSON, unsupported methods, static page serving, and 404 responses. Set `TEST_PORT` if the default test port 8793 is occupied.

## Deploy

```sh
pnpm exec wrangler login
pnpm deploy
```

Deployment builds the site and uploads it to Cloudflare Workers. `wrangler.jsonc` sets the Worker name to `vibed-waitlist` and the custom domain to `vibed-waitlist.xavainf.com`. The deploying account needs access to the configured Cloudflare account and the `xavainf.com` zone. To host your own copy, update the account, Worker name, and domain first.

## Runtime

Next.js 16 and React 19 build the site into static HTML, CSS, and JavaScript in `out/`. Cloudflare Workers Static Assets serves those files; no Next.js server runs in production. A small `WorkerEntrypoint` in `src/worker.ts` handles `/api/waitlist`, while the `ASSETS` binding serves the page and its files.

Source pages and components live in `src/`; bundled assets live in `public/`. Generated build output and local credentials are ignored by Git.

## Demo limitations

The signup endpoint keeps normalized emails in an in-memory Set inside each Worker isolate. Data resets when that isolate restarts and is not shared between isolates. Counts and duplicate checks are demonstration behavior. No mailing-list provider, persistent database, or launch notification service is connected. The displayed social proof, countdown, and product preview are example content; footer links are placeholders.

## License

Authored project source is available under the [MIT License](LICENSE). Third-party images, fonts, dependencies, and other materials retain their respective terms; see [Third-party notices](THIRD_PARTY_NOTICES.md).
