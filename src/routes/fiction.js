import fictionPosts from '../pages/fiction';

import { generateRoutes } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'fiction',
  'fiction',
  'Fiction',
  'Fiction',
  fictionPosts,
);
