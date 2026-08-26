/**
 * dsh-neu-theme — Host half.
 *
 * The browser theme registry is still provided by ./client, but the selected
 * skin is a user preference. Register its namespace with the Host settings
 * seam so loopback Web clients persist it in the DSH user document instead of
 * partitioning it by browser origin.
 */
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import z from '@deepseek-ai/schemastery'

/** Settings namespace shared by the Host and browser halves. */
export const SETTINGS_NAMESPACE = 'dsh-neu-theme'
/** Settings field carrying the selected skin id. */
export const SETTINGS_FIELD = 'preference'
/** No custom skin: keep the built-in DSH appearance. */
export const DEFAULT_SKIN = 'system'
/** Skin ids accepted at the durable settings boundary. */
export const SKIN_PREFERENCES = [DEFAULT_SKIN, 'neu-light', 'neu-dark']

/** Durable skin schema, also used by the browser settings scope decoder. */
export const SkinSettingsSchema = z.object({
	[SETTINGS_FIELD]: z.union([...SKIN_PREFERENCES]).default(DEFAULT_SKIN),
})

/** Host loader entry for the browser implementation exported from `./client`. */
export function apply(ctx) {
	ctx.inject(['settings'], (settingsCtx) => {
		settingsCtx.settings.register(
			settingsNamespace(SETTINGS_NAMESPACE),
			SkinSettingsSchema,
		)
	})
}
