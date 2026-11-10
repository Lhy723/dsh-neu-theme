import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const manifest = JSON.parse(read('package.json'))
const host = read('src/index.js')
const client = read('src/client.tpl.js')
const patch = read('cordis.patch.yml')
const supportedDshRange = '^0.2.0-rc.2'

assert.equal(manifest.dsh?.client?.platform, 'web', 'Desktop loads the embedded DSH Web client')
assert.equal(manifest.engines?.dsh, supportedDshRange, 'the engine range must match the new runtime API')
for (const [name, range] of Object.entries(manifest.peerDependencies ?? {})) {
  if (name.startsWith('@deepseek-ai/dsh-')) {
    assert.equal(range, supportedDshRange, `${name} must target the DSH 0.2 API`)
  }
}
assert.equal(manifest.peerDependencies['@deepseek-ai/dsh-client-runtime'], undefined,
  'the removed runtime entry point must not remain a peer')
assert.ok(manifest.peerDependencies['@deepseek-ai/dsh-client-store'],
  'the DSH 0.2 client-store platform module must be declared')
assert.ok(manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-store'))
assert.ok(manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-settings'))
assert.ok(!manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-runtime'),
  'the removed DSH 0.1 module id must not remain in the client graph')
assert.match(host, /export const Config = z\.object\([\s\S]*?\.volatile\(\)/,
  'the selected skin must use the DSH 0.2 volatile Config API')
assert.match(host, /settings\.configure\(\{ auto: false \}, ctx\.fiber\)/,
  'the custom settings row must disable automatic form generation')
assert.doesNotMatch(host, /settings\.register\(/,
  'the removed DSH 0.1 Host settings API must not remain in the Host entry')
const schemastery = manifest.dependencies?.['@deepseek-ai/schemastery'] ?? ''
const schemasteryParts = schemastery.replace(/^[~^]/, '').split('.').map(Number)
assert.ok(
  schemasteryParts[0] > 3
    || schemasteryParts[0] === 3 && (schemasteryParts[1] > 18 || schemasteryParts[1] === 18 && schemasteryParts[2] >= 5),
  'Config.volatile() requires schemastery >= 3.18.5')
assert.match(client, /BASE_THEME_ENTRY_ID = "ui-theme"/)
assert.match(client, /SKIN_OVERRIDE_SOURCE = "dsh-neu-theme"/)
assert.match(client, /ctx\.theme\.overrideTokens\(SKIN_OVERRIDE_SOURCE, tokens\)/,
  'the skin must be applied as a token-override layer over the built-in palette')
assert.match(client, /tokens\[name\] = \{ light: value, dark: value \}/,
  'every override carries both palette modes')
assert.match(client, /ctx\.theme\.setTheme\(skin\.colorScheme\)/,
  'the built-in base palette must follow the skin color scheme')
assert.match(client, /queueMicrotask\(dispose\)/,
  'override removal must not re-enter the theme/change dispatch')
assert.match(client, /baseSettings\.subscribe\(restoreSkin\)/,
  'restoration must wait for the built-in theme settings form')
assert.match(client, /snapshot\.status !== "ready"/,
  'restoration must not race ui-theme initial adoption')
assert.match(client, /skinSettings\.subscribe\(adoptSkinSettings\)/)
assert.match(client, /skinSettings\.set\(SKIN_SETTINGS_FIELD, id\)/)
assert.match(client, /skinSettings\.unset\(SKIN_SETTINGS_FIELD\)/)
assert.doesNotMatch(client, /ctx\.theme\.register\(/,
  'DSH 0.2 cannot persist a third-party theme id, so the plugin must not register and select one')
assert.doesNotMatch(client, /settingsScope|dsh-client-runtime/,
  'the removed DSH 0.1 settings API must not remain in the browser bundle source')
assert.match(patch, /id: dsh-neu-theme/)
assert.match(client, /SKIN_SETTINGS_ENTRY_ID = "dsh-neu-theme"/)

console.log('DSH 0.2 Web/Desktop compatibility contract is complete')
