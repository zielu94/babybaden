// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://babybaden.de',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/rss.xml'),
      serialize: (item) => {
        // Homepage: höchste Priorität
        if (item.url === 'https://babybaden.de/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
        }
        // Produkt-Seiten
        if (item.url.includes('/produkte/')) {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
        }
        // Ratgeber/Blog-Artikel
        if (item.url.includes('/ratgeber/')) {
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
        }
        // Checkliste
        if (item.url.includes('/checkliste/')) {
          return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() };
        }
        // Restliche Seiten (Impressum, Datenschutz, Über uns)
        return { ...item, changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() };
      },
    }),
  ],
});
