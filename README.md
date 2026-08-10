# Karan Suthar — Portfolio

A premium, animated, SEO-optimised portfolio for **lalit suthar**, Software Engineer.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

---

## Quick start

This project needs **Node 18.18+**. An `.nvmrc` pins Node 22.

```bash
nvm use            # switches to Node 22 (reads .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

> **Note:** if your default `node` is older (e.g. v16), `npm run dev` will fail with a
> syntax error. Run `nvm use` first, or set Node 22 as your default with
> `nvm alias default 22`.

### Scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Dev server with hot reload                       |
| `npm run build`     | Production build                                 |
| `npm start`         | Serve the production build (run `build` first)   |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | TypeScript, no emit                              |
| `npm run format`    | Prettier write                                   |

---

## Environment variables

Copy the example file and fill in what you need:

```bash
cp .env.example .env.local
```

| Variable                               | Required | Purpose                                            |
| -------------------------------------- | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Yes\*    | Canonical URL for SEO, OG tags, sitemap, robots     |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`       | No       | Contact form delivery                              |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`      | No       | Contact form delivery                              |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`       | No       | Contact form delivery                              |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | No       | Google Analytics 4 (omit to disable entirely)      |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No       | Search Console verification tag                    |

\* Defaults to `https://karansuthar.vercel.app` — set it to your real domain before launch.

Everything renders fine without the optional vars. The contact form simply tells visitors to
email directly until EmailJS is configured.

### Setting up EmailJS (contact form, no backend)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → add a service (Gmail works) → copy the **Service ID**.
3. **Email Templates** → create a template → copy the **Template ID**.
4. **Account → API Keys** → copy the **Public Key**.
5. Paste all three into `.env.local` and restart the dev server.

The template receives these variables:

```
{{from_name}}  {{from_email}}  {{reply_to}}  {{subject}}  {{message}}  {{to_name}}
```

---

## Customising the content

All content lives in `src/constants/` — you should rarely need to touch a component.

| File               | Contains                                                   |
| ------------------ | ---------------------------------------------------------- |
| `site.ts`          | Name, role, email, phone, socials, nav links, stats, keywords |
| `skills.ts`        | Skill categories and proficiency levels                    |
| `experience.ts`    | Work history, responsibilities, achievements, stack        |
| `projects.ts`      | The 12 project case studies                                |
| `expertise.ts`     | Technical expertise groups                                 |
| `education.ts`     | Degree, languages, **and certifications**                  |

### Things to update before you deploy

1. **`SOCIALS.github` in `src/constants/site.ts`** — currently `github.com/lalitsuthar45`.
   Verify this is your actual handle.
2. **`CERTIFICATIONS` in `src/constants/education.ts`** — these are **placeholders**, since the
   resume lists none. Replace them with real credentials, or set the array to `[]` and the whole
   Certifications section removes itself from the page automatically.
3. **`public/images/profile.svg`** — a generated placeholder avatar. Drop in a real photo
   (`profile.jpg`) and point `SITE.profileImage` at it.
4. **`NEXT_PUBLIC_SITE_URL`** — set to your real domain.

### Adding project screenshots

Project cards render a generated gradient poster by default. To use a real screenshot, drop the
image into `public/projects/` and add an `image` field to that project:

```ts
{
  id: 'pos-system',
  image: '/projects/pos-system.png',
  // …
}
```

---

## Deploying

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is auto-detected.
3. Add your environment variables under **Settings → Environment Variables**.
4. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### Netlify

Build command `next build`, publish directory `.next`, and install the
[`@netlify/plugin-nextjs`](https://github.com/netlify/next-runtime) plugin.

### Cloudflare Pages

Framework preset **Next.js**, build command `next build`, output `.next`.

### GitHub Pages

Requires a static export. Add `output: 'export'` and `images: { unoptimized: true }` to
`next.config.ts`, then run `next build` and publish the `out/` directory. Note that
`next/image` optimisation and the dynamic OG image route are unavailable in this mode.

---

## Project structure

```
portfolio/
├── public/
│   ├── images/profile.svg          # Avatar placeholder
│   ├── projects/                   # Drop project screenshots here
│   ├── resume/                     # Resume PDF served by the download buttons
│   └── icon.svg                    # Favicon
├── src/
│   ├── app/                        # App Router
│   │   ├── layout.tsx              # Root layout, fonts, providers, analytics, JSON-LD
│   │   ├── page.tsx                # Composes every section
│   │   ├── loading.tsx             # Route loading UI
│   │   ├── not-found.tsx           # 404 page
│   │   ├── opengraph-image.tsx     # Generated social preview card
│   │   ├── robots.ts               # robots.txt
│   │   ├── sitemap.ts              # sitemap.xml
│   │   └── manifest.ts             # PWA manifest
│   ├── components/
│   │   ├── ui/                     # Button, GlassCard, Dialog, TiltCard, Counter, …
│   │   ├── layout/                 # Navbar, Footer, Preloader, ThemeToggle, Cursor, …
│   │   └── effects/                # Aurora, Grid, Particles, Spotlight, FloatingIcons
│   ├── sections/                   # The 10 page sections
│   ├── hooks/                      # useMediaQuery, useScrollSpy, useLockBodyScroll, …
│   ├── lib/                        # cn(), EmailJS client, SEO metadata + JSON-LD
│   ├── constants/                  # ← All content lives here
│   ├── animations/                 # Shared Framer Motion variants
│   ├── utils/                      # Validation, formatting
│   ├── types/                      # Shared TypeScript types
│   └── styles/globals.css          # Tailwind v4 theme, tokens, utilities
└── …config files
```

---

## Notes on the implementation

**Animation library.** Everything is driven by **Framer Motion** — scroll reveals, parallax, the
typing headline, timeline spines, 3D tilt, layout transitions and the preloader. GSAP, AOS and
Lottie were deliberately left out: Framer Motion covers every effect on the brief, and adding
three more animation runtimes would cost roughly 150 KB of JavaScript against the >95 Lighthouse
performance target. The particle field is a single `<canvas>` with one rAF loop rather than
animated DOM nodes.

**Performance.** Scroll-linked animations use motion values, so they run on the compositor
without re-rendering React. The particle loop pauses when off-screen or when the tab is hidden.
Icon barrels are tree-shaken via `optimizePackageImports`. Fonts are self-hosted through
`next/font` with `display: swap`.

**Accessibility.** Semantic landmarks throughout, a skip link, labelled form fields with
`aria-invalid` and `aria-describedby`, a focus-trapped and Escape-closable dialog, visible focus
rings, `aria-live` status regions, and a global `prefers-reduced-motion` guard that disables the
cursor, particles, floating icons, tilt and typing animations.

**Responsive.** Fluid `clamp()` typography, a 12-column grid from `lg` up, an ultra-wide `3xl`
breakpoint, and `overflow-x: hidden` on `body` as a hard guarantee against horizontal scroll.

---

## License

Personal portfolio — all rights reserved.
