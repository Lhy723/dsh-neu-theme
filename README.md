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
  targets six surfaces, each verified in the official UI sources:
  - **Sidebar column** (`[class*='sidebarCol']`, AppFrame) — soft raised card;
  - **Composer capsule** (`[data-composer-card]`, InputBar) — pressed-in
    well, deepening on hover and `:focus-within` (keyboard reachable);
  - **User/steering bubbles** (`[data-chat-flow-kind='user'|'steering']`
    plus the hashed `.bubble` class) — barely-raised chips that lift 1px
    and brighten on hover;
  - **Code blocks** (`.md-code-block`, ui-primitives CodeBlock) — recessed
    well at 16px radius, deepening on hover;
  - **Tool rows** (`[data-tool]`, ui-tool ToolRow) — unified raised cards
    (same-family surface + 12px radius), so an outer call and its nested
    indented sub-calls (e.g. the bash row under run_code) read as one
    language; strengthening on hover (shadow only, no transform: internal
    sticky geometry stays anchored);
  - **Reasoning rows** (`[data-variant='think']`, ReasoningRow) — the same
    card language as tool rows (12px radius), strengthening on hover.
  Plus two ambient motions: conversation nodes fade in 220ms as they mount
  (`[data-chat-flow-key]` — streaming updates do not remount, so each node
  animates once), and workspace/session tree rows smooth their hover
  background (`[role='treeitem']`).
- **Lighting, material and texture** (v6/v7): ambient light (top glow +
  faint bottom-right fill) and a fine grayscale grain texture (inline SVG
  feTurbulence data URI) are painted on the **visible surfaces**, not just
  body — ConversationRoot paints an opaque bg-base, so the conversation
  canvas (`[data-phase]`), the sidebar column and the details column each
  carry their own light + grain; raised cards additionally carry a 1px
  top-edge highlight inside their shadow and a 145° gloss gradient across
  their surface, so surfaces read as lit material rather than flat color
  plus shadow.
- **Layered shadows, material and texture** (v11/v12): raised surfaces now
  carry a three-layer shadow (1px contact shadow, main cast shadow,
  top-edge highlight), the sidebar gloss follows the light direction
  (145°), and code blocks gained a material surface (dark backlit inner
  top wall + grain), joining the ambient light and grain already painted
  on the conversation canvas, sidebar and details column. The sidebar
  additionally got its own stronger raise (and a fill that separates from
  the canvas — lighter in light mode, lifted in dark mode — the dark rule
  was previously missing its shadow entirely).
- **Glassmorphism** (v12): floating surfaces turn frosted — dropdown
  menus (`[role='menu']`, covering PermissionSelect, ModelSelect and the
  shared Menu) and the composer-side context panel
  (`[data-composer-card] [role='dialog']`, ContextMeter) get a translucent
  `bg-overlay` at 62–70% plus `backdrop-filter: blur(16px) saturate(1.3)`,
  so the ambient light behind them glows through.
  All motion is CSS-only, 160–220ms, and gated under
  `@media (prefers-reduced-motion: no-preference)` (the same gate the
  official ReasoningRow shimmer uses); with reduced motion the states still
  switch, just without transitions.
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
