# dsh-neu-theme

Neumorphism soft-UI theme for DeepSeek Harness web — gentle raised-and-recessed
surfaces in a cream light palette and an ink-dark palette. 轻拟物主题:柔和同色系、
浮起与凹陷,奶油浅色与墨蓝深色两套配色。

## Features

- **Two themes** registered into the built-in ThemeRuntime:
  - `neu-light` — cream warm-white canvas, soft slate-blue accent
  - `neu-dark` — ink-blue night canvas, luminous indigo accent
- **Soft-UI shadow layer** — a small defensive stylesheet adds neumorphic
  raise/recess shadows to the sidebar, conversation scrollport, composer seat
  and chat bubbles, scoped under `body[data-dsh-neu]` and switched by the
  palette attribute (no JavaScript on theme switch).
- **Settings row** — Settings → General gains a Neumorphism picker
  (Default / Light / Dark) with palette swatches, persisted in localStorage.

## Install

```sh
dsh plugin --profile web add <path-or-git-url>
# or, for a local checkout:
cd ~/.dsh/profiles/web
pnpm add file:/path/to/dsh-neu-theme
```

Then add `"dsh-neu-theme"` to `dsh.profile.bundles` in the profile's
`package.json`, and restart `dsh web`. The theme choice itself is applied
in-browser via Settings → General → 轻拟物主题.

## Develop

```sh
npm run build   # regenerates lib/client.js from src/client.tpl.js + themes/*.json
npm run check   # syntax-checks the built bundles
```

While `dsh web` runs with the HMR chain mounted, any rebuild of
`lib/client.js` (e.g. `node scripts/build.mjs`) is picked up by
the polling watcher and hot-reloads only this plugin's fiber.

## Design notes

- Colors live in `themes/*.json`; every value is concrete (no `var()`
  indirection) and covers the semantic alias layer plus the `--shiki-*`
  syntax palette.
- The shadow + micro-motion layer (`NEU_CSS` in `src/client.tpl.js`)
  targets exactly three surfaces, each verified in the official UI sources:
  - **Sidebar column** (`[class*='sidebarCol']`, AppFrame) — soft raised card;
  - **Composer capsule** (`[data-composer-card]`, InputBar) — pressed-in well,
    deepening on hover and `:focus-within` (keyboard reachable);
  - **User/steering bubbles** (`[data-chat-flow-kind='user'|'steering']`
    plus the hashed `.bubble` class) — barely-raised chips that lift 1px
    and brighten on hover.
  All motion is CSS-only, 160ms, and gated under
  `@media (prefers-reduced-motion: no-preference)`; with reduced motion the
  states still switch, just without transitions.
- **The shadow layer is preference-gated**: it mounts only while
  `neu-light` or `neu-dark` is the active preference (driven by
  `theme/change`), so selecting **Default** leaves the document exactly as
  dsh ships it — native colors and native shadows, with no `data-dsh-neu`
  attribute and no injected stylesheet.
- Want shadows on more surfaces? Inspect the element in DevTools and note
  its stable hook (a `data-*` attribute, or the readable part of the
  hashed class), then add a scoped rule — that is the only safe way to
  extend the layer.
- Light/dark switching is pure CSS (`body[data-ds-dark-theme]`), matching
  the token layer's own mechanism.

## License

MIT
