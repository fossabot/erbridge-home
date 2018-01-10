import gamesPosts from '../pages/games';

import { getRoutePath, sanitizePathComponent } from './helpers';

export const sortedPosts = [...gamesPosts];

sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

export const routes = sortedPosts.map(
  ({ __content, image, links, slug, styles, title }) => ({
    path: getRoutePath('games', slug, title),
    exact: true,
    title,
    image,
    links,
    styles,
    content: __content,
  }),
);

export const route = {
  name: 'games',
  link: 'Games',
  path: '/games',
  exact: true,
  title: 'Games',
  routes,
};

export const redirectedRoutes = [
  ...sortedPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/games/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('games', slug, title),
      exact: true,
    })),
];
