import gamesPosts from '../pages/games';

import { generateRoutes, getRoutePath } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'games',
  'games',
  'Games',
  'Games',
  gamesPosts,
  {
    extraRedirects: [
      {
        path: '/fatal-attraction',
        to: getRoutePath('games', 'fatal-attraction'),
      },
    ],
  },
);
