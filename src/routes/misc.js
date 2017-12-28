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
  {
    path: '/tools/iris',
    to: getRoutePath('misc', 'iris'),
    exact: true,
  },
  {
    path: '/tools/lime-text',
    to: getRoutePath('misc', 'limetext'),
    exact: true,
  },
  {
    path: '/tools/nqr',
    to: getRoutePath('misc', 'nqr'),
    exact: true,
  },
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/misc/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('misc', slug, title),
      exact: true,
    })),
];
