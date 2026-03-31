/**
 * Configured by create-tampermonkey-typescript to combine your entire codebase into a single TamperMonkey-ready script.
 * You can modify it as you like.
 */

import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import banner from 'vite-plugin-banner'
import checker from 'vite-plugin-checker'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf8'))
const hasReact = pkg.devDependencies?.react || pkg.dependencies?.react
const hasTailwind = pkg.devDependencies?.['@tailwindcss/vite'] || pkg.dependencies?.['@tailwindcss/vite']

const isBeta = process.env.IS_BETA === 'true'

// Replaced in the script's header to keep package.json as the source of truth.
const metaTags = {
  '<name>': pkg.name,
  '<version>': process.env.OVERRIDE_VERSION?.replace(/^v/, '') || pkg.version,
  '<description>': pkg.description,
  '<author>': pkg.author,
  '<homepage>': pkg.homepage,
  '<downloadURL>': isBeta
    ? `https://github.com/neth392/torn-stock-pocket/releases/download/beta/script.user.js`
    : `https://github.com/neth392/torn-stock-pocket/releases/latest/download/script.user.js`,
}

let meta = fs.readFileSync(resolve(__dirname, 'userscript.txt'), 'utf8')

for (const [tagName, tagValue] of Object.entries(metaTags).filter(([_, v]) => v)) {
  meta = meta.replaceAll(tagName, tagValue)
}

export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"', // Immer relies on this for some reason
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    checker({ typescript: true }),
    ...(hasTailwind
      ? [
          (await import('@tailwindcss/vite')).default({
            optimize: { minify: true },
          }),
        ]
      : []),
    cssInjectedByJsPlugin({
      topExecutionPriority: true,
    }),
    banner({ content: meta, verify: false }),
    {
      name: 'strip-comments',
      renderChunk(code) {
        return code.replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\/\*[^!][\s\S]*?\*\//g, '')
      },
    },
    {
      name: 'normalize-line-endings',
      writeBundle(options, bundle) {
        for (const fileName of Object.keys(bundle)) {
          const filePath = resolve(options.dir!, fileName)
          const content = fs.readFileSync(filePath, 'utf-8')
          fs.writeFileSync(filePath, content.replace(/\r\n/g, '\n'), 'utf-8')
        }
      },
    },
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/script.ts'),
      name: pkg.name.replace(/[^a-zA-Z0-9]/g, '_'),
      formats: ['iife'],
      fileName: () => `script.user.js`,
    },
    rollupOptions: {
      ...(hasReact ? { external: ['react', 'react-dom/client'] } : {}),
    },
    outDir: 'dist',
    minify: false,
  },
})
