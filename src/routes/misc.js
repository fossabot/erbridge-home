import miscPosts from '../misc';

import { getRoutePath, sanitizePathComponent } from './helpers';

export const sortedPosts = [...miscPosts];

sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

export const routes = sortedPosts.map(
  ({ __content, image, links, slug, styles, title }) => ({
    path: getRoutePath('misc', slug, title),
    exact: true,
    title,
    image,
    links,
    styles,
    content: __content,
  }),
);

export const route = {
  name: 'misc',
  link: 'Misc',
  path: '/misc',
  exact: true,
  title: 'Misc',
  routes,
};

export const redirectedRoutes = [
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/misc/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('misc', slug, title),
      exact: true,
    })),
];
