import toolsPosts from '../tools';

import { getRoutePath, sanitizePathComponent } from './helpers';

export const sortedPosts = [...toolsPosts];

sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

export const routes = sortedPosts.map(
  ({ __content, links, slug, styles, title }) => ({
    path: getRoutePath('tools', slug, title),
    exact: true,
    title,
    links,
    styles,
    content: __content,
  }),
);

export const route = {
  name: 'tools',
  link: 'Tools',
  path: '/tools',
  exact: true,
  title: 'Tools',
  routes,
};

export const redirectedRoutes = [
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/tools/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('tools', slug, title),
      exact: true,
    })),
];
