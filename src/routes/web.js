import webPosts from '../web';

import { getRoutePath, sanitizePathComponent } from './helpers';

export const sortedPosts = [...webPosts];

sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

export const routes = sortedPosts.map(
  ({ __content, links, slug, styles, title }) => ({
    path: getRoutePath('web', slug, title),
    exact: true,
    title,
    links,
    styles,
    content: __content,
  }),
);

export const route = {
  name: 'web',
  link: 'Web',
  path: '/web',
  exact: true,
  title: 'Web',
  routes,
};

export const redirectedRoutes = [
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/web/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('web', slug, title),
      exact: true,
    })),
];
