import gamesPosts from '../pages/games';

import { generateRoutes } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'games',
  'games',
  'Games',
  'Games',
  gamesPosts,
);
