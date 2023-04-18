import { allArticles } from 'contentlayer/generated';

export default async function sitemap() {
  const articles = allArticles.map((post) => ({
    url: `https://abjt.dev/writing/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/lab', '/writing'].map(
    (route) => ({
      url: `https://abjt.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...articles];
}