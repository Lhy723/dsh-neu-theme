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
assert.match(client, /ctx\.configForms\.get\(SKIN_SETTINGS_ENTRY_ID\)/)
assert.match(client, /skinSettings\.subscribe\(adoptSkinSettings\)/)
assert.match(client, /skinSettings\.set\(SKIN_SETTINGS_FIELD, id\)/)
assert.match(client, /skinSettings\.unset\(SKIN_SETTINGS_FIELD\)/)
assert.doesNotMatch(client, /settingsScope|dsh-client-runtime/,
  'the removed DSH 0.1 settings API must not remain in the browser bundle source')
assert.match(patch, /id: dsh-neu-theme/)
assert.match(client, /SKIN_SETTINGS_ENTRY_ID = "dsh-neu-theme"/)

console.log('DSH 0.2 Web/Desktop compatibility contract is complete')
