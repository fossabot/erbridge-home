import blogPosts from '../pages/blog';

import {
  formatDate,
  generateRoutes,
  getRoutePath,
  sanitizePathComponent,
} from './helpers';

export const {
  categoryRoutes,
  redirectedRoutes,
  route,
  routes,
} = generateRoutes('blog', 'blog', 'Blog', 'Blog', blogPosts, {
  categories: [
    {
      name: 'all',
      path: 'all',
      title: 'All Posts',
      routeFilter: route => route,
    },
    {
      name: 'gamedev',
      path: 'gamedev',
      title: 'Game Development',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('gamedev') !== -1,
    },
    {
      name: 'journals',
      path: 'journals',
      title: 'Roleplaying Journals',
      routeFilter: ({ categories }) =>
        categories &&
        categories.indexOf('roleplaying') !== -1 &&
        categories.indexOf('journal') !== -1,
    },
  ],
  extraRedirects: [
    [
      {
        path: '/blog/skald',
        to: getRoutePath('blog'),
      },
    ],
  ],
  generateRedirects: posts =>
    posts
      .map(post => ({ ...post, date: formatDate(post.date, 'YYYY/MM/DD') }))
      .filter(({ date }) => date)
      .map(({ date, oldSlug, slug, title }) => ({
        path: `/blog/${date}/${sanitizePathComponent(
          oldSlug || slug || title,
        )}`,
        to: getRoutePath('blog', slug, title),
      })),
});
