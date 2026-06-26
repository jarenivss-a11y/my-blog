import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /tags/

Sitemap: https://jarenivss-a11y.github.io/my-blog/sitemap-index.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
};