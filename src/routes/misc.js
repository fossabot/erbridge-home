import miscPosts from '../pages/misc';

import { generateRoutes, getRoutePath } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'misc',
  'misc',
  'Misc',
  'Misc',
  miscPosts,
  [
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
  ],
);
