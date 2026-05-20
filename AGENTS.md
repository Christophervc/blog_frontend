# AGENTS.md

## Tech Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (uses `@tailwindcss/postcss`, no `tailwind.config.js`)
- **shadcn/ui** (radix-nova style, Lucide icons, CSS variables)
- **pnpm** package manager

## Commands
```
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture
- **`app/`** — Next.js App Router entry. `layout.tsx` (root layout with Geist fonts), `page.tsx` (home).
- **`components/ui/`** — shadcn/ui primitives. Add new ones via `pnpm shadcn add <component>`.
- **`features/feed/`** — Feature-driven domain for the feed (Header, LeftSidebar, MainFeed, RightSidebar, BlogCard). `components/`, `constants/` (mock data, static types), `types/`.
- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge).
- **`hooks/`** — Custom React hooks (e.g., `use-mobile.ts`).

## Conventions
- **Path alias**: `@/*` maps to `./*` (e.g., `@/components/ui/button`).
- **Strict TypeScript**: `strict: true` in tsconfig.
- **ESLint**: flat config (`eslint.config.mjs`) using `eslint-config-next` core-web-vitals + typescript rules.
- **Tailwind v4**: uses `@theme inline` in `app/globals.css` for custom values, not a config file.
- **shadcn theming**: CSS variables defined in `app/globals.css` (`:root` / `.dark`). New components inherit automatically.

## Gotchas
- No test framework configured yet.
- `.env*` files are gitignored; load env vars manually if needed.
- `next build` must pass before deployment; no separate typecheck script (TypeScript is checked during build).
- pnpm workspace exists but is a single-package project (only ignores `sharp`/`unrs-resolver` built deps).
