/**
 * dsh-neu-theme — Host half.
 *
 * The selected skin is a live profile preference. DSH 0.2 exposes volatile
 * plugin Config fields through the settings form service, which persists edits
 * into the active profile's Cordis patch.
 */
import z from '@deepseek-ai/schemastery'

/** Loader entry and ConfigForms key; also preserves the legacy settings id. */
export const SETTINGS_ENTRY_ID = 'dsh-neu-theme'
/** No custom skin: keep the built-in DSH appearance. */
export const DEFAULT_SKIN = 'system'
/** Skin ids accepted at the durable settings boundary. */
export const SKIN_PREFERENCES = [DEFAULT_SKIN, 'neu-light', 'neu-dark']

/** Live preference projected to the browser and editable in the active profile. */
export const Config = z.object({
  preference: z.union([...SKIN_PREFERENCES]).default(DEFAULT_SKIN).volatile(),
})

/** Host loader entry for the browser implementation exported from `./client`. */
export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
  })
}
