import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

  return rss({
    title: '我的博客',
    description: '在这里记录生活的点滴，分享关于音乐、读书、电商运营和宝可梦的思考',
    site: context.site || 'https://jarenivss-a11y.github.io/my-blog',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.body.slice(0, 200) + '...',
      link: `/my-blog/post/${post.id}/`,
    })),
    customData: '<language>zh-cn</language>',
  });
}