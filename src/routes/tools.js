import toolsPosts from '../pages/tools';

import { generateRoutes } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'tools',
  'tools',
  'Tools',
  'Tools',
  toolsPosts,
);
