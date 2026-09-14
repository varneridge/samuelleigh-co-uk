import { defineConfig } from 'astro/config';
import rehypeFigure from './src/plugins/rehype-figure.mjs';

export default defineConfig({
  site: 'https://samuelleigh.co.uk',
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [rehypeFigure]
  }
});
