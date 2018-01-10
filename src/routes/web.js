import webPosts from '../pages/web';

import { generateRoutes } from './helpers';

export const { redirectedRoutes, route, routes } = generateRoutes(
  'web',
  'web',
  'Web',
  'Web',
  webPosts,
);
