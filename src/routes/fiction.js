import fictionPosts from '../fiction';

import { getRoutePath, sanitizePathComponent } from './helpers';

export const sortedPosts = [...fictionPosts];

sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

export const routes = sortedPosts.map(
  ({ __content, slug, styles, subtitle, title }) => ({
    path: getRoutePath('fiction', slug, title),
    exact: true,
    title,
    subtitle,
    styles,
    content: __content,
  }),
);

export const route = {
  name: 'fiction',
  link: 'Fiction',
  path: '/fiction',
  exact: true,
  title: 'Fiction',
  routes,
};

export const redirectedRoutes = [
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/fiction/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('fiction', slug, title),
      exact: true,
    })),
];
