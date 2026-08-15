/**
 * dsh-neu-theme build script (zero dependencies, plain Node).
 *
 * Reads themes/*.json and src/client.tpl.js, injects the theme catalog at
 * the __THEMES_JSON__ placeholder, and writes lib/client.js. Also copies
 * the host half src/index.js → lib/index.js.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const themeFiles = ['neu-light.json', 'neu-dark.json']
const themes = themeFiles.map((file) => {
  const theme = JSON.parse(readFileSync(join(root, 'themes', file), 'utf8'))
  const required = ['id', 'name', 'colorScheme', 'tokens']
  for (const key of required) {
    if (!(key in theme)) throw new Error('themes/' + file + ': missing ' + key)
  }
  if (theme.colorScheme !== 'light' && theme.colorScheme !== 'dark') {
    throw new Error('themes/' + file + ': colorScheme must be light or dark')
  }
  return theme
})

const template = readFileSync(join(root, 'src', 'client.tpl.js'), 'utf8')
if (!template.includes('__THEMES_JSON__')) {
  throw new Error('src/client.tpl.js is missing the __THEMES_JSON__ placeholder')
}
const client = template.replace('__THEMES_JSON__', JSON.stringify(themes, null, 2))

mkdirSync(join(root, 'lib'), { recursive: true })
writeFileSync(join(root, 'lib', 'client.js'), client)
copyFileSync(join(root, 'src', 'index.js'), join(root, 'lib', 'index.js'))

const totalTokens = themes.reduce((sum, theme) => sum + Object.keys(theme.tokens).length, 0)
console.log('built lib/client.js (' + themes.length + ' themes, ' + totalTokens + ' tokens) and lib/index.js')
