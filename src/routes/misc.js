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
    },
    {
      path: '/tools/lime-text',
      to: getRoutePath('misc', 'limetext'),
    },
    {
      path: '/tools/nqr',
      to: getRoutePath('misc', 'nqr'),
    },
  ],
);
