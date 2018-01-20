import fictionPosts from '../pages/fiction';

import { generateRoutes } from './helpers';

export const {
  categoryRoutes,
  redirectedRoutes,
  route,
  routes,
} = generateRoutes('fiction', 'fiction', 'Fiction', 'Fiction', fictionPosts, {
  categories: [
    {
      name: 'all',
      path: 'all',
      title: 'All Fiction',
      routeFilter: route => route,
    },
    {
      name: 'poetry',
      path: 'poetry',
      title: 'Poetry',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('poetry') !== -1,
    },
    {
      name: 'short-stories',
      path: 'short-stories',
      title: 'Short Stories',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('short-story') !== -1,
    },
    {
      name: 'generative',
      path: 'generative',
      title: 'Generative',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('generative') !== -1,
    },
    {
      name: 'uncategorized',
      path: 'uncategorized',
      title: 'Uncategorized',
      routeFilter: ({ categories }) =>
        !categories ||
        (categories.indexOf('poetry') === -1 &&
          categories.indexOf('short-story') === -1 &&
          categories.indexOf('generative') === -1),
    },
  ],
});
