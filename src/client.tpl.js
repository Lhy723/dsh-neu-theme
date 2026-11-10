// dsh-neu-theme — browser half (client plugin bundle). GENERATED FILE:
// run `node scripts/build.mjs` to regenerate lib/client.js from
// src/client.tpl.js + themes/*.json.
//
// Loaded by dsh-client-modules at /plugins/dsh-neu-theme/client.js and
// executed through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
window.__ModuleLoader__.load({
	id: "dsh-neu-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		// DSH 0.2 exposes defineStore from the client-store platform module.
		let _store = require("@deepseek-ai/dsh-client-store");

		//#region dsh-neu-theme: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.neu";
		/** Profile entry id owning the selected skin preference. */
		const SKIN_SETTINGS_ENTRY_ID = "dsh-neu-theme";
		/** Profile Config field carrying the selected skin id. */
		const SKIN_SETTINGS_FIELD = "preference";
		/** Entry id of the built-in theme service's settings form. */
		const BASE_THEME_ENTRY_ID = "ui-theme";
		/** Source identity of this plugin's token-override layer. */
		const SKIN_OVERRIDE_SOURCE = "dsh-neu-theme";
		/** Sentinel meaning "no custom theme — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";

		/**
		 * The Neumorphism theme catalog. `colorScheme` names the built-in base
		 * palette each skin builds on, and `tokens` carries the --dsw-alias-*
		 * overrides. DSH 0.2 persists only the built-in light/dark/system
		 * preference, so the plugin applies these tokens as one override layer
		 * over that base instead of registering a theme id the host cannot
		 * remember across reloads. Values are concrete CSS colors (no var()
		 * indirection) so every alias resolves on its own.
		 */
		const SKINS = __THEMES_JSON__;

		/**
		 * Soft-UI enhancement stylesheet, injected while the plugin is active.
		 * Neumorphism is as much about shadow as color, and the product token
		 * system only owns colors — so the plugin adds a small shadow + micro
		 * motion layer keyed off stable document hooks. Every rule is scoped
		 * under body[data-dsh-neu] (set by apply, removed by the disposer).
		 *
		 * Selector discipline (learned the hard way): every hook is verified
		 * in the official UI sources —
		 *   • AppFrame renders the sidebar grid column as css.sidebarCol
		 *     (hash-suffixed module class, stable substring "sidebarCol");
		 *   • InputBar renders the composer capsule with data-composer-card;
		 *   • ChatNodeSeat renders data-chat-flow-kind={node.kind} and
		 *     MessageItem's user/steering bubble carries the hashed .bubble
		 *     class.
		 * These three surfaces get the neumorphic treatment; everything else
		 * stays untouched. Micro-interactions are CSS-only transitions under
		 * @media (prefers-reduced-motion: no-preference) — hover lifts the
		 * bubble, hover/focus-within deepens the composer recess (keyboard
		 * reachable), and the sidebar keeps its static raise.
		 */
		const NEU_CSS = [
			"body[data-dsh-neu] {",
						"  --dsh-neu-raise: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 1px 2px rgba(122, 118, 108, 0.18), 6px 6px 14px rgba(122, 118, 108, 0.22), -6px -6px 14px rgba(255, 255, 255, 0.85);",
						"  --dsh-neu-raise-sm: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 2px rgba(122, 118, 108, 0.14), 3px 3px 8px rgba(122, 118, 108, 0.18), -3px -3px 8px rgba(255, 255, 255, 0.75);",
						"  /* Cards get a neutral halo in addition to the directional highlight,",
						"     so all four edges remain readable on a flat conversation canvas. */",
						"  --dsh-neu-card-raise: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(122, 118, 108, 0.08), 0 0 8px 1px rgba(122, 118, 108, 0.14), -3px -3px 8px rgba(255, 255, 255, 0.7);",
						"  --dsh-neu-card-raise-strong: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 0 0 1px rgba(122, 118, 108, 0.08), 0 0 14px 1px rgba(122, 118, 108, 0.18), -6px -6px 14px rgba(255, 255, 255, 0.82);",
			"  --dsh-neu-inset: inset 3px 3px 8px rgba(122, 118, 108, 0.16), inset -3px -3px 8px rgba(255, 255, 255, 0.3);",
			"  --dsh-neu-inset-focus: inset 4px 4px 10px rgba(122, 118, 108, 0.22), inset -4px -4px 10px rgba(255, 255, 255, 0.4);",
			"  --dsh-neu-focus-ring: rgba(113, 128, 213, 0.24);",
			"  --dsh-neu-accent-glow: rgba(113, 128, 213, 0.22);",
			"  /* Keep the shell lighting uniform. Broad radial layers form a visible",
			"     oval on high-DPI windows, so the theme uses only a restrained grain",
			"     texture over the token background. */",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] {",
						"  /* Dark neumorphism needs far less light than the cream palette. Keep one",
						"     top highlight and a compact directional shadow; broad white glows",
						"     and 1px perimeter rings read as glowing rectangles on dark surfaces. */",
						"  --dsh-neu-raise: inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 -1px 0 rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.28), 5px 5px 12px rgba(0, 0, 0, 0.32), -2px -2px 6px rgba(255, 255, 255, 0.02);",
						"  --dsh-neu-raise-sm: inset 0 1px 0 rgba(255, 255, 255, 0.065), inset 0 -1px 0 rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0, 0, 0, 0.22), 3px 3px 8px rgba(0, 0, 0, 0.26);",
						"  --dsh-neu-card-raise: inset 0 1px 0 rgba(255, 255, 255, 0.065), inset 0 -1px 0 rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.22);",
						"  --dsh-neu-card-raise-strong: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.28), -2px -2px 6px rgba(255, 255, 255, 0.018);",
			"  --dsh-neu-inset: inset 2px 2px 6px rgba(0, 0, 0, 0.34), inset -2px -2px 6px rgba(255, 255, 255, 0.035);",
			"  --dsh-neu-inset-focus: inset 3px 3px 8px rgba(0, 0, 0, 0.42), inset -3px -3px 8px rgba(255, 255, 255, 0.05);",
			"  --dsh-neu-focus-ring: rgba(139, 153, 232, 0.26);",
			"  --dsh-neu-accent-glow: rgba(139, 153, 232, 0.28);",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* Sidebar column: a soft raised card over the canvas (AppFrame's",
			"   css.sidebarCol — verified in ui-layout sources). */",
			"body[data-dsh-neu] [class*='sidebarCol'] {",
			"  background-image:",
						"    linear-gradient(145deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0) 32%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9),",
			"              0 2px 6px rgba(122, 118, 108, 0.22),",
			"              10px 10px 24px rgba(122, 118, 108, 0.26),",
			"              -8px -8px 20px rgba(255, 255, 255, 0.9);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [class*='sidebarCol'] {",
			"  background-image:",
						"    linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0) 32%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),",
			"              0 2px 6px rgba(0, 0, 0, 0.32),",
			"              10px 10px 24px rgba(0, 0, 0, 0.38),",
			"              -6px -6px 16px rgba(255, 255, 255, 0.03);",
			"}",
			"/* Tactile navigation: rows lift on hover, and the selected session",
			"   presses into the sidebar with a thin brand rail. */",
			"body[data-dsh-neu] [class*='panelRow'],",
			"body[data-dsh-neu] [class*='sessionRow'],",
			"body[data-dsh-neu] [class*='projectRow'] {",
			"  border-radius: 12px;",
			"  transition: box-shadow 160ms ease, background-color 160ms ease;",
			"}",
			"@media (hover: hover) {",
			"  body[data-dsh-neu] [class*='panelRow']:hover,",
			"  body[data-dsh-neu] [class*='sessionRow']:hover,",
			"  body[data-dsh-neu] [class*='projectRow']:hover {",
			"    background-color: var(--dsw-alias-interactive-bg-hover);",
			"    box-shadow: var(--dsh-neu-raise-sm);",
			"  }",
			"}",
			"body[data-dsh-neu] [class*='sessionRow'][aria-selected='true'] {",
			"  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary), var(--dsh-neu-inset);",
			"}",
			"body[data-dsh-neu] [class*='newSession'] {",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"  transition: box-shadow 160ms ease;",
			"}",
			"body[data-dsh-neu] [class*='newSession']:hover {",
			"  box-shadow: var(--dsh-neu-raise);",
			"}",
			"body[data-dsh-neu] [class*='newSession']:active {",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"/* Glassmorphism: the composer and its popovers share one DOM subtree.",
			"   Keep the card's frost on a sibling pseudo-layer so the card does not",
			"   become the popovers' backdrop root. Menus and the context dialog can",
			"   then each apply their own real backdrop blur. */",
			"body[data-dsh-neu] [role='menu'],",
			"body[data-dsh-neu] [data-composer-card] [role='dialog'] {",
			"  background-color: color-mix(in srgb, var(--dsw-alias-bg-overlay) 55%, transparent);",
			"  backdrop-filter: blur(16px) saturate(1.3);",
			"  -webkit-backdrop-filter: blur(16px) saturate(1.3);",
			"  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [role='menu'],",
			"body[data-dsh-neu][data-ds-dark-theme] [data-composer-card] [role='dialog'] {",
			"  background-color: color-mix(in srgb, var(--dsw-alias-bg-overlay) 62%, transparent);",
			"  backdrop-filter: blur(16px) saturate(1.3);",
			"  -webkit-backdrop-filter: blur(16px) saturate(1.3);",
			"  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);",
			"}",
			"/* Composer capsule: put the frost on a non-ancestor pseudo-layer. This",
			"   preserves the card's glass appearance without preventing nested",
			"   permission/model/context surfaces from sampling the page behind them. */",
			"body[data-dsh-neu] [data-composer-card] {",
			"  position: relative;",
			"  z-index: 0;",
			"  background-color: transparent;",
			"  backdrop-filter: none;",
			"  -webkit-backdrop-filter: none;",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"body[data-dsh-neu] [data-composer-card]::before {",
			"  content: '';",
			"  position: absolute;",
			"  inset: 0;",
			"  z-index: -1;",
			"  border-radius: inherit;",
			"  background-color: color-mix(in srgb, var(--dsw-specific-input-major) 40%, transparent);",
			"  backdrop-filter: blur(8px) saturate(1.15);",
			"  -webkit-backdrop-filter: blur(8px) saturate(1.15);",
			"  pointer-events: none;",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-composer-card] {",
			"  background-color: transparent;",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-composer-card]::before {",
			"  /* A 40% frost lets the canvas/footer boundary behind the card show",
			"     through as a hard horizontal band. Keep the blur but make the",
			"     fill nearly opaque so the composer reads as one surface. */",
			"  background-color: color-mix(in srgb, var(--dsw-specific-input-major) 92%, transparent);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-composer-card] [class*='input'] {",
			"  /* The native input grain ends at the toolbar row and reads as a",
			"     lighter rectangle inside the capsule; the card surface owns the",
			"     texture instead. */",
			"  background-image: none;",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [class*='composerSeat'] {",
			"  /* The native seat gradient fades to an opaque base color over the",
			"     canvas grain, so the footer reads as a flat black band. Let the",
			"     conversation surface continue behind the capsule instead. */",
			"  background-image: none;",
			"}",
			"/* Composer controls sit on the recessed capsule as raised chips. */",
			"body[data-dsh-neu] [data-composer-card] [class*='add'],",
			"body[data-dsh-neu] [data-composer-card] [class*='primary'] {",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"  transition: box-shadow 160ms ease;",
			"}",
			"body[data-dsh-neu] [data-composer-card] [class*='add']:hover,",
			"body[data-dsh-neu] [data-composer-card] [class*='primary']:hover {",
			"  box-shadow: var(--dsh-neu-raise), 0 0 12px var(--dsh-neu-accent-glow);",
			"}",
			"body[data-dsh-neu] [data-composer-card] [class*='add']:active,",
			"body[data-dsh-neu] [data-composer-card] [class*='primary']:active {",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"body[data-dsh-neu] [data-composer-card] [class*='trigger'] {",
			"  border-radius: 10px;",
			"  transition: box-shadow 160ms ease, background-color 160ms ease;",
			"}",
			"body[data-dsh-neu] [data-composer-card] [class*='trigger']:hover {",
			"  background-color: var(--dsw-alias-interactive-bg-hover);",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"}",
			"body[data-dsh-neu] [data-composer-card] [class*='trigger']:active {",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"body[data-dsh-neu] [data-composer-card]:focus-within {",
			"  box-shadow: var(--dsh-neu-inset-focus), 0 0 0 2px var(--dsh-neu-focus-ring);",
			"}",

			"/* Keep the conversation canvas uniform. A large radial spotlight here",
			"   creates a visible oval boundary over messages on wide/high-DPI windows;",
			"   ambient lighting belongs to the full page, while the canvas only needs",
			"   the fine grain texture. */",
			"body[data-dsh-neu] div[data-phase] {",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] div[data-phase] {",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* Right sidebar panel keeps the same grain (ui-layout rightbarCol). */",
			"body[data-dsh-neu] [class*='rightbarCol'] {",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [class*='rightbarCol'] {",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* User and consumed-steering bubbles: barely-raised chips with a",
			"   gloss gradient across the surface (ChatNodeSeat's",
			"   data-chat-flow-kind + MessageItem's .bubble). */",
			"body[data-dsh-neu] [data-chat-flow-kind='user'] [class*='bubble'],",
			"body[data-dsh-neu] [data-chat-flow-kind='steering'] [class*='bubble'] {",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 42%);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-chat-flow-kind='user'] [class*='bubble'],",
			"body[data-dsh-neu][data-ds-dark-theme] [data-chat-flow-kind='steering'] [class*='bubble'] {",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 42%);",
			"}",
			"/* Code blocks: a recessed well with a softer radius and a material",
			"   surface — dark top inner wall (backlit), grain texture (CodeBlock's",
			"   stable md-code-block class — verified in ui-primitives sources). */",
			"body[data-dsh-neu] .md-code-block {",
			"  border-radius: 16px;",
			"  background-image:",
			"    linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0) 28%),",
			    "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\")",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] .md-code-block {",
			"  background-image:",
			"    linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0) 28%),",
			    "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\")",
			"}",
			"/* Tool rows and their nested sub-calls (e.g. the indented bash row",
			"   under run_code): one unified raised card — same-family surface,",
			"   rounded corners, gloss gradient, so outer call and inner sub-call",
			"   read as one material (ToolRow's data-tool + ToolCallTree's",
			"   data-subcalls — ui-tool sources). */",
			"body[data-dsh-neu] [data-tool] {",
			"  background-color: var(--dsw-alias-bg-layer-1);",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 42%);",
			"  border-radius: 8px;",
			"  overflow: visible;",
			"  box-shadow: var(--dsh-neu-card-raise);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-tool] {",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0) 42%);",
			"}",
			"/* Reasoning rows: same card language as tool rows (ReasoningRow's",
			"   data-variant='think' — ui-conversation sources). */",
			"body[data-dsh-neu] [data-variant='think'] {",
			"  background-color: var(--dsw-alias-bg-layer-1);",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 42%);",
			"  /* Think rows can expand into multi-line reasoning. Use a normal card",
			"     radius so they never turn into a capsule when expanded. Keep the",
			"     root unclipped so its soft shadow can extend on all four sides. */",
			"  border-radius: 8px;",
			"  overflow: visible;",
			"  box-shadow: var(--dsh-neu-card-raise);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-variant='think'] {",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0) 42%);",
			"}",
			"/* Raised-card feedback is non-motion, so keep the stronger perimeter",
			"   shadow available even when the OS asks to reduce motion. */",
			"body[data-dsh-neu] [data-tool]:hover,",
			"body[data-dsh-neu] [data-variant='think']:hover {",
			"  box-shadow: var(--dsh-neu-card-raise-strong);",
			"}",
			"/* Expanded reasoning is long-form text, not a card. In the dark palette",
			"   drop the raised surface and keep one inset accent so the block reads",
			"   without a glowing perimeter. The collapsed preview keeps its chip. */",
			"body[data-dsh-neu][data-ds-dark-theme] [data-variant='think']:not([data-preview]) {",
			"  background-color: transparent;",
			"  background-image: none;",
			"  border-radius: 0;",
			"  box-shadow: inset 2px 0 0 var(--dsw-alias-border-l3);",
			"}",
			"/* Micro-interactions: CSS-only, gated on reduced-motion (matching",
			"   the official ReasoningRow shimmer gate). */",
			"@media (prefers-reduced-motion: no-preference) {",
			"  /* Conversation nodes fade in softly as they mount (ChatNodeSeat's",
			"     data-chat-flow-key; streaming updates do not remount, so the",
			"     animation plays once per node). */",
			"  @keyframes dsh-neu-enter {",
			"    from { opacity: 0; transform: translateY(4px); }",
			"    to { opacity: 1; transform: none; }",
			"  }",
			"  body[data-dsh-neu] [data-chat-flow-key] {",
			"    animation: dsh-neu-enter 220ms ease-out both;",
			"  }",
			"  /* User/steering bubbles: lift on hover. */",
			"  body[data-dsh-neu] [data-chat-flow-kind='user'] [class*='bubble'],",
			"  body[data-dsh-neu] [data-chat-flow-kind='steering'] [class*='bubble'] {",
			"    transition: box-shadow 160ms ease, transform 160ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-chat-flow-kind='user'] [class*='bubble']:hover,",
			"  body[data-dsh-neu] [data-chat-flow-kind='steering'] [class*='bubble']:hover {",
			"    transform: translateY(-1px);",
			"    box-shadow: var(--dsh-neu-raise);",
			"  }",
			"  /* Composer: recess deepens on hover and keyboard focus. */",
			"  body[data-dsh-neu] [data-composer-card] {",
			"    transition: box-shadow 160ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-composer-card]:hover:not(:focus-within) {",
			"    box-shadow: var(--dsh-neu-inset-focus);",
			"  }",
			"  /* Tool rows (outer call and nested sub-calls alike): deepen the shadow",
			"     on hover without moving the card or changing document geometry. */",
			"  body[data-dsh-neu] [data-tool] {",
			"    transition: box-shadow 320ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-tool]:hover {",
			"    box-shadow: var(--dsh-neu-card-raise-strong);",
			"  }",
			"  /* Reasoning rows: hover reveals a slightly stronger raise. */",
			"  body[data-dsh-neu] [data-variant='think'] {",
			"    transition: box-shadow 320ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-variant='think']:hover {",
			"    box-shadow: var(--dsh-neu-card-raise-strong);",
			"  }",
			"  /* Code blocks: recess deepens on hover (copy button reachable",
			"     by keyboard — hover is decorative only). */",
			"  body[data-dsh-neu] .md-code-block {",
			"    transition: box-shadow 160ms ease;",
			"  }",
			"  body[data-dsh-neu] .md-code-block:hover {",
			"    box-shadow: var(--dsh-neu-inset-focus);",
			"  }",
			"  /* Workspace/session tree rows: smooth background on hover state",
			"     changes (aria role — stable). */",
			"  body[data-dsh-neu] [role='treeitem'] {",
			"    transition: background-color 160ms ease;",
			"  }",
			"}",
		].join("\n");

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "Neumorphism theme",
			"skin.caption": "Soft UI · gentle depth",
			"skin.default": "Default",
			"skin.neu-light": "Neu Light",
			"skin.neu-dark": "Neu Dark"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Neumorphism theme",
			"skin.caption": "Soft UI · gentle depth",
			"skin.default": "Default",
			"skin.neu-light": "Light",
			"skin.neu-dark": "Dark"
		};
		//#endregion

		//#region dsh-neu-theme: settings boundary
		/** Whether an id is a valid third-party skin or the built-in fallback. */
		function isSkinPreference(id) {
			return id === DEFAULT_SKIN || SKINS.some((skin) => skin.id === id);
		}

		//#endregion

		//#region dsh-neu-theme: settings row store
		/**
		 * Skin row slot store: the selected catalog id. The plugin's apply
		 * world is the only writer; the row component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _store.defineStore)({
				init: () => ({ skin: DEFAULT_SKIN }),
				actions: {
					sync: (d, skin) => {
						d.skin = skin;
					}
				}
			});
		}
		//#endregion

		//#region dsh-neu-theme: settings row
		/** Inline style sheet for the row (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			caption: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				// longhand on purpose: the shorthand leaves borderColor to
				// fall back to currentColor once React clears the selected
				// override, painting stale black/white boxes on deselect
				borderWidth: "2px",
				borderStyle: "solid",
				borderColor: "transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			}
		};

		/** Mini palette preview driven by one skin's token table. */
		function Swatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: "1px solid " + tokens["--dsw-alias-border-l2"]
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable skin card. */
		function SkinCard({ skin, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: (event) => {
					onSelect();
					// drop focus so a stale focus ring never outlives the selection
					event.currentTarget.blur();
				},
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(Swatch, { tokens: skin.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t("skin." + skin.id)
					})
				]
			});
		}

		/**
		 * Skin picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per Neumorphism flavor.
		 */
		function SkinRow({ t, setSkin, useStore }) {
			const skin = useStore((s) => s.skin);
			const selected = SKINS.some((candidate) => candidate.id === skin) ? skin : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.title")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.caption,
						children: t("skin.caption")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: (event) => {
									setSkin(DEFAULT_SKIN);
									// drop focus so a stale focus ring never outlives the selection
									event.currentTarget.blur();
								},
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("skin.default")
									})
								]
							}),
							SKINS.map((skinDefinition) => (0, react_jsx_runtime.jsx)(SkinCard, {
								skin: skinDefinition,
								selected: selected === skinDefinition.id,
								onSelect: () => setSkin(skinDefinition.id),
								t
							}, skinDefinition.id))
						]
					})
				]
			});
		}
		//#endregion

		//#region dsh-neu-theme: client plugin body
		/**
		 * Required services: theme runtime, ConfigForms and remote settings
		 * transport, plus slots/locale for the settings row.
		 */
		const inject = [
			"slots",
			"locale",
			"theme",
			"remote",
			"configForms"
		];

		/**
		 * Client plugin body: restore the profile Config choice as a token
		 * layer over the matching built-in palette, keep the soft-UI shadow
		 * layer in lockstep with the selection, and register the picker into
		 * Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			// DSH 0.2 persists only the built-in light/dark/system preference, and
			// ui-theme re-adopts that section whenever it refreshes. A third-party
			// theme id therefore cannot stay selected across those refreshes; the
			// skin lives in this entry's Config and is applied as one token-override
			// layer over the matching built-in base palette.
			const skinSettings = ctx.configForms.get(SKIN_SETTINGS_ENTRY_ID);
			const baseSettings = ctx.configForms.get(BASE_THEME_ENTRY_ID);

			// Soft-UI shadow layer, mounted ONLY while a Neumorphism flavor is
			// selected. Selecting Default (or any built-in appearance) must leave
			// the document exactly as dsh ships it.
			let styleNode = null;
			const ensureShadow = () => {
				if (styleNode !== null) return;
				styleNode = document.createElement("style");
				styleNode.dataset.plugin = "dsh-neu-theme";
				styleNode.dataset.skinOwner = "dsh-neu-theme";
				styleNode.textContent = NEU_CSS;
				document.head.append(styleNode);
			};
			const removeShadow = () => {
				if (styleNode !== null) {
					styleNode.remove();
					styleNode = null;
				}
			};

			const skinStore = createSkinStore();
			let skinBound;
			let selected = DEFAULT_SKIN;
			let overrideDispose = null;
			let appliedBase = null;
			let restored = false;
			let applying = false;
			let pendingSelection = null;

			const publish = () => skinBound?.sync(selected);

			const reportWriteFailure = (error) => {
				ctx.logger?.warn("dsh-neu-theme: could not persist the skin preference", error);
			};

			const readStoredSkin = () => {
				const saved = skinSettings.getSnapshot().value?.[SKIN_SETTINGS_FIELD];
				return isSkinPreference(saved) ? saved : DEFAULT_SKIN;
			};

			// A local write owns the selection until the accepted section shows the
			// same value (or the write fails). Releasing it earlier would let a stale
			// snapshot undo the click and then re-apply it.
			const finishSelectionWrite = (failed) => {
				if (failed || readStoredSkin() === pendingSelection) pendingSelection = null;
				if (pendingSelection === null) adoptSkinSettings();
			};

			const removeOverride = () => {
				if (overrideDispose === null) return;
				const dispose = overrideDispose;
				overrideDispose = null;
				// A theme/change listener can dispose this layer while the runtime is
				// already notifying that event; re-emitting inside the dispatch can
				// leave the presenter holding the stale token list. Remove the layer
				// after the current notification turn instead.
				queueMicrotask(dispose);
			};

			const applySkin = (id) => {
				const skin = SKINS.find((candidate) => candidate.id === id);
				if (skin === undefined) return;
				selected = id;
				appliedBase = skin.colorScheme;
				// overrideTokens and setTheme publish theme/change synchronously.
				// Keep the opt-out listener from mistaking our own writes for a
				// built-in choice made elsewhere.
				applying = true;
				try {
					removeOverride();
					const tokens = {};
					for (const [name, value] of Object.entries(skin.tokens)) {
						// One value per palette: repeat the skin's concrete color so the
						// override stays legible whichever base scheme is active.
						tokens[name] = { light: value, dark: value };
					}
					overrideDispose = ctx.theme.overrideTokens(SKIN_OVERRIDE_SOURCE, tokens);
					// Switch the built-in base palette so every token this catalog does
					// not override still matches the skin's light/dark semantics.
					ctx.theme.setTheme(skin.colorScheme);
				} finally {
					applying = false;
				}
				ensureShadow();
				document.body.dataset.dshNeu = "";
				publish();
			};

			const clearSkin = (restoreSystem) => {
				selected = DEFAULT_SKIN;
				appliedBase = null;
				removeOverride();
				removeShadow();
				delete document.body.dataset.dshNeu;
				if (restoreSystem) ctx.theme.setTheme(DEFAULT_SKIN);
				publish();
			};

			// ui-theme adopts its durable preference asynchronously. Wait until its
			// accepted section and the runtime agree before restoring the skin, so
			// that the first adoption cannot immediately overwrite it.
			const baseSettled = () => {
				const snapshot = baseSettings.getSnapshot();
				const value = snapshot.value;
				if (snapshot.status !== "ready" || value === null || typeof value !== "object") return false;
				return typeof value.preference === "string" && ctx.theme.getTheme().preference === value.preference;
			};

			const restoreSkin = () => {
				if (restored || pendingSelection !== null || !baseSettled()) return;
				restored = true;
				const saved = readStoredSkin();
				if (saved !== DEFAULT_SKIN) applySkin(saved);
			};

			const adoptSkinSettings = () => {
				if (pendingSelection !== null) {
					if (readStoredSkin() !== pendingSelection) return;
					pendingSelection = null;
				}
				if (!restored) {
					restoreSkin();
					return;
				}
				const saved = readStoredSkin();
				if (saved === DEFAULT_SKIN) {
					// Another client cleared the skin. Drop the local layer but leave
					// the base palette to the ui-theme preference that client chose.
					if (selected !== DEFAULT_SKIN) clearSkin(false);
					return;
				}
				if (saved !== selected) applySkin(saved);
			};

			const onThemeChange = (snapshot) => {
				if (applying) return;
				if (!restored) {
					restoreSkin();
					return;
				}
				if (selected === DEFAULT_SKIN) return;
				// Our own base-palette switch (or ui-theme adopting the value we
				// wrote) keeps the skin. Any other preference is a built-in choice
				// made elsewhere — the Appearance row or another browser — so drop
				// the skin instead of forcing it back on the next launch.
				if (snapshot.preference === appliedBase) return;
				clearSkin(false);
				pendingSelection = DEFAULT_SKIN;
				void skinSettings.unset(SKIN_SETTINGS_FIELD).then(
					() => finishSelectionWrite(false),
					(error) => {
						reportWriteFailure(error);
						finishSelectionWrite(true);
					});
			};

			ctx.effect(() => {
				const offSkinSettings = skinSettings.subscribe(adoptSkinSettings);
				const offBaseSettings = baseSettings.subscribe(restoreSkin);
				const offTheme = ctx.on("theme/change", onThemeChange);
				return () => {
					offSkinSettings();
					offBaseSettings();
					offTheme();
				};
			}, "dsh-neu-theme: profile preference adoption");

			ctx.effect(() => () => {
				clearSkin(false);
			}, "dsh-neu-theme: soft-ui shadow layer");

			// Cover values that settled before these subscriptions existed.
			restoreSkin();
			adoptSkinSettings();

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-neu-theme: settings row dictionaries");

			const requestSkin = (id) => {
				if (!isSkinPreference(id)) return;
				pendingSelection = id;
				if (id === DEFAULT_SKIN) {
					// `system` means "no custom skin"; ui-theme owns the base.
					clearSkin(true);
				} else {
					applySkin(id);
				}
				const write = id === DEFAULT_SKIN
					? skinSettings.unset(SKIN_SETTINGS_FIELD)
					: skinSettings.set(SKIN_SETTINGS_FIELD, id);
				void write.then(
					() => finishSelectionWrite(false),
					(error) => {
						reportWriteFailure(error);
						finishSelectionWrite(true);
					});
			};

			const skinInjected = (actions) => {
				skinBound = actions;
				skinBound.sync(selected);
				return { setSkin: requestSkin };
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "neu-theme",
				order: 19,
				store: skinStore,
				locale: SETTINGS_NS,
				inject: skinInjected
			}, SkinRow));
		}
		//#endregion

		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

