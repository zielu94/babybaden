import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: 'babybaden.de – Ratgeber rund ums Baby-Baden',
    description:
      'Alles rund ums Baby-Baden: Ratgeber, Produktvergleiche und Tipps von Eltern für Eltern.',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/ratgeber/${post.id}/`,
    })),
    customData: '<language>de</language>',
  });
}
