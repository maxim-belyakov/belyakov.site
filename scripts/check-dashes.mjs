// Fails the build if a long dash appears in the sources or the content.
// The characters are built from code points so this file itself stays clean.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const EM = String.fromCharCode(0x2014)
const EN = String.fromCharCode(0x2013)
const PATTERN = new RegExp(`[${EM}${EN}]`)

const ROOTS = ['app', 'components', 'content', 'lib', 'scripts', 'README.md', 'next.config.ts']
const SKIP_DIRS = new Set(['node_modules', '.next', '.git'])
const SKIP_EXT = /\.(woff2|ico|png|jpg|jpeg|pdf|webp|svg)$/i

const hits = []

function walk(path) {
  const info = statSync(path, { throwIfNoEntry: false })
  if (!info) return
  if (info.isDirectory()) {
    for (const entry of readdirSync(path)) {
      if (SKIP_DIRS.has(entry)) continue
      walk(join(path, entry))
    }
    return
  }
  if (SKIP_EXT.test(path)) return
  readFileSync(path, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (PATTERN.test(line)) hits.push(`${path}:${i + 1}: ${line.trim()}`)
    })
}

ROOTS.forEach(walk)

if (hits.length > 0) {
  console.error(`Long dashes found in ${hits.length} place(s):`)
  hits.forEach((hit) => console.error(`  ${hit}`))
  process.exit(1)
}

console.log('No long dashes found.')
