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
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region dsh-neu-theme: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.neu";
		/** localStorage key holding the selected theme id. */
		const STORAGE_KEY = "dsh-neu:skin";
		/** Sentinel meaning "no custom theme — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";

		/**
		 * The Neumorphism theme catalog. Each entry is a third-party theme for
		 * the built-in ThemeRuntime: an id, the base palette it builds on
		 * (colorScheme drives body[data-ds-dark-theme]), and --dsw-alias-*
		 * overrides applied as inline custom properties on <body> by
		 * ui-layout's ThemePresenter. Values are concrete CSS colors (no var()
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
			"  --dsh-neu-raise: inset 0 1px 0 rgba(255, 255, 255, 0.85), 6px 6px 14px rgba(122, 118, 108, 0.22), -6px -6px 14px rgba(255, 255, 255, 0.85);",
			"  --dsh-neu-raise-sm: inset 0 1px 0 rgba(255, 255, 255, 0.8), 3px 3px 8px rgba(122, 118, 108, 0.18), -3px -3px 8px rgba(255, 255, 255, 0.75);",
			"  --dsh-neu-inset: inset 3px 3px 8px rgba(122, 118, 108, 0.16), inset -3px -3px 8px rgba(255, 255, 255, 0.3);",
			"  --dsh-neu-inset-focus: inset 4px 4px 10px rgba(122, 118, 108, 0.22), inset -4px -4px 10px rgba(255, 255, 255, 0.4);",
			"  /* Ambient light: a soft top glow plus a faint bottom-right fill,",
			"     then a fine grain texture over the whole canvas. background-image",
			"     layers on top of the shell background (higher specificity), so the",
			"     token background-color stays intact. */",
			"  background-image:",
			"    radial-gradient(1400px 900px at 50% -8%, rgba(255, 255, 255, 0.72), transparent 62%),",
			"    radial-gradient(900px 600px at 85% 110%, rgba(255, 255, 255, 0.3), transparent 60%),",
			    "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] {",
			"  --dsh-neu-raise: inset 0 1px 0 rgba(255, 255, 255, 0.13), 6px 6px 14px rgba(0, 0, 0, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.05);",
			"  --dsh-neu-raise-sm: inset 0 1px 0 rgba(255, 255, 255, 0.11), 3px 3px 8px rgba(0, 0, 0, 0.4), -3px -3px 8px rgba(255, 255, 255, 0.04);",
			"  --dsh-neu-inset: inset 3px 3px 8px rgba(0, 0, 0, 0.5), inset -3px -3px 8px rgba(255, 255, 255, 0.06);",
			"  --dsh-neu-inset-focus: inset 4px 4px 10px rgba(0, 0, 0, 0.6), inset -4px -4px 10px rgba(255, 255, 255, 0.08);",
			"  background-image:",
			"    radial-gradient(1400px 900px at 50% -8%, rgba(255, 255, 255, 0.06), transparent 62%),",
			"    radial-gradient(900px 600px at 85% 110%, rgba(0, 0, 0, 0.4), transparent 60%),",
			    "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* Sidebar column: a soft raised card over the canvas (AppFrame's",
			"   css.sidebarCol — verified in ui-layout sources). */",
			"body[data-dsh-neu] [class*='sidebarCol'] {",
			"  background-image:",
			"    linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 30%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"  box-shadow: var(--dsh-neu-raise);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [class*='sidebarCol'] {",
			"  background-image:",
			"    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0) 30%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* Composer capsule: a pressed-in input well (InputBar's",
			"   data-composer-card — verified in ui-conversation sources). */",
			"body[data-dsh-neu] [data-composer-card] {",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"/* Conversation canvas: ConversationRoot's .root paints an opaque",
			"   bg-base that hides the body layer — so ambient light and grain",
			"   must live HERE (div[data-phase] on the root — verified in",
			"   ui-conversation sources). */",
			"body[data-dsh-neu] div[data-phase] {",
			"  background-image:",
			"    radial-gradient(1100px 700px at 50% -6%, rgba(255, 255, 255, 0.55), transparent 62%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] div[data-phase] {",
			"  background-image:",
			"    radial-gradient(1100px 700px at 50% -6%, rgba(255, 255, 255, 0.055), transparent 62%),",
			"    url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.1%27/%3E%3C/svg%3E\");",
			"}",
			"/* Details panel keeps the same grain. */",
			"body[data-dsh-neu] [class*='detailsCol'] {",
			"  background-image: url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E\");",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [class*='detailsCol'] {",
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
			"/* Code blocks: a recessed well with a softer radius (CodeBlock's",
			"   stable md-code-block class — verified in ui-primitives sources). */",
			"body[data-dsh-neu] .md-code-block {",
			"  border-radius: 16px;",
			"  box-shadow: var(--dsh-neu-inset);",
			"}",
			"/* Tool rows and their nested sub-calls (e.g. the indented bash row",
			"   under run_code): one unified raised card — same-family surface,",
			"   rounded corners, gloss gradient, so outer call and inner sub-call",
			"   read as one material (ToolRow's data-tool + ToolCallTree's",
			"   data-subcalls — ui-tool sources). */",
			"body[data-dsh-neu] [data-tool] {",
			"  background-color: var(--dsw-alias-bg-layer-1);",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 42%);",
			"  border-radius: 12px;",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-tool] {",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0) 42%);",
			"}",
			"/* Reasoning rows: same card language as tool rows (ReasoningRow's",
			"   data-variant='think' — ui-conversation sources). */",
			"body[data-dsh-neu] [data-variant='think'] {",
			"  background-color: var(--dsw-alias-bg-layer-1);",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 42%);",
			"  border-radius: 12px;",
			"  box-shadow: var(--dsh-neu-raise-sm);",
			"}",
			"body[data-dsh-neu][data-ds-dark-theme] [data-variant='think'] {",
			"  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0) 42%);",
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
			"  body[data-dsh-neu] [data-composer-card]:hover,",
			"  body[data-dsh-neu] [data-composer-card]:focus-within {",
			"    box-shadow: var(--dsh-neu-inset-focus);",
			"  }",
			"  /* Tool rows (outer call and nested sub-calls alike): lift on",
			"     hover (shadow only — no transform, so internal sticky/absolute",
			"     geometry stays anchored). */",
			"  body[data-dsh-neu] [data-tool] {",
			"    transition: box-shadow 160ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-tool]:hover {",
			"    box-shadow: var(--dsh-neu-raise);",
			"  }",
			"  /* Reasoning rows: hover reveals a slightly stronger raise. */",
			"  body[data-dsh-neu] [data-variant='think'] {",
			"    transition: box-shadow 160ms ease;",
			"  }",
			"  body[data-dsh-neu] [data-variant='think']:hover {",
			"    box-shadow: var(--dsh-neu-raise);",
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
			"skin.title": "轻拟物主题",
			"skin.caption": "柔和同色系 · 浮起与凹陷",
			"skin.default": "默认",
			"skin.neu-light": "浅色",
			"skin.neu-dark": "深色"
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

		//#region dsh-neu-theme: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
			} catch {
				// storage unavailable / quota — the preference stays process-local
			}
		}

		/** Saved skin id (may be unknown/absent). */
		function readSavedSkin() {
			return readStorage(STORAGE_KEY);
		}

		/** Persist a skin choice; DEFAULT_SKIN clears the stored value. */
		function writeSavedSkin(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_SKIN ? null : id);
		}
		//#endregion

		//#region dsh-neu-theme: settings row store
		/**
		 * Skin row slot store: a mirror of the theme service snapshot. The
		 * plugin's apply-world change listener is the only writer; the row
		 * component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					skin: DEFAULT_SKIN,
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
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
		 * Required services: theme runtime (skins, switching), slots/locale
		 * (the settings row). Persistence is localStorage, so no settings
		 * transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme"
		];

		/**
		 * Client plugin body: register the Neumorphism flavors into the theme
		 * runtime, restore the saved choice, keep the soft-UI shadow layer in
		 * lockstep with the active preference, keep the row's store in sync
		 * with theme/change, and register the picker into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = SKINS.map((skinDefinition) => ctx.theme.register(skinDefinition));
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "dsh-neu-theme: theme registration");

			// Soft-UI shadow layer, mounted ONLY while a Neumorphism flavor is
			// the active preference. Selecting Default (or any built-in
			// appearance) must leave the document exactly as dsh ships it —
			// colors are handled by the ThemeRuntime, the shadow layer and the
			// body attribute belong to the plugin and follow the same switch.
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
			const syncShadow = (snapshot) => {
				const neumorphic = SKINS.some((skinDefinition) => skinDefinition.id === snapshot.preference);
				if (neumorphic) {
					ensureShadow();
					document.body.dataset.dshNeu = "";
				} else {
					removeShadow();
					delete document.body.dataset.dshNeu;
				}
			};
			ctx.effect(() => () => {
				removeShadow();
				delete document.body.dataset.dshNeu;
			}, "dsh-neu-theme: soft-ui shadow layer");

			const skinStore = createSkinStore();
			let skinBound;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
			};
			ctx.on("theme/change", syncSkin);
			ctx.on("theme/change", syncShadow);

			// Restore the saved skin once (before any user interaction); the
			// setTheme below emits theme/change, which drives both syncs. The
			// explicit syncShadow(getTheme()) covers the no-change case where
			// the persisted preference is already system (nothing to set).
			const saved = readSavedSkin();
			if (typeof saved === "string" && saved !== DEFAULT_SKIN && SKINS.some((skinDefinition) => skinDefinition.id === saved)) {
				const current = ctx.theme.getTheme().preference;
				if (current !== saved) ctx.theme.setTheme(saved);
			}
			syncShadow(ctx.theme.getTheme());

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-neu-theme: settings row dictionaries");

			const skinInjected = (actions) => {
				skinBound = actions;
				syncSkin(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						ctx.theme.setTheme(id);
						writeSavedSkin(id);
					}
				};
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
