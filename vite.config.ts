import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Makes dist/index.html work when opened directly from disk (file://):
 * - browsers refuse to load external <script type="module"> files from file://,
 *   so the app bundle is inlined into the HTML;
 * - `crossorigin` on local files also triggers a blocked CORS request, so it is removed.
 * The stylesheet and images stay as normal relative files, which file:// allows.
 * The same output is served unchanged by Vercel or any static host.
 */
function standaloneHtml(): Plugin {
  return {
    name: 'standalone-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find((file) => file.type === 'asset' && file.fileName === 'index.html');
      if (!html || html.type !== 'asset') return;

      let source = String(html.source);
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue;
        const tag = new RegExp(`<script type="module"[^>]*src="[^"]*${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*></script>`);
        const code = chunk.code.replace(/<\/script/gi, '<\\/script');
        source = source.replace(tag, () => `<script type="module">${code}</script>`);
        delete bundle[fileName];
      }
      html.source = source.replace(/<link[^>]*\.\/assets\/[^>]*>/g, (tag) => tag.replace(/\s+crossorigin(?:="[^"]*")?/, ''));
    },
  };
}

export default defineConfig({
  // Relative base: works at a domain root (Vercel), in a sub-folder, or from disk.
  base: './',
  plugins: [react(), standaloneHtml()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    modulePreload: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
