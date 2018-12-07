import React from 'react';

import Home, { meta as homeMeta } from '../pages/home.mdx';

import {
  categoryRoutes as blogCategoryRoutes,
  route as blogRoute,
  routes as blogRoutes,
  redirectedRoutes as redirectedBlogRoutes,
} from './blog';
import {
  categoryRoutes as fictionCategoryRoutes,
  route as fictionRoute,
  routes as fictionRoutes,
  redirectedRoutes as redirectedFictionRoutes,
} from './fiction';
import {
  route as gamesRoute,
  routes as gamesRoutes,
  redirectedRoutes as redirectedGamesRoutes,
} from './games';
import {
  categoryRoutes as miscCategoryRoutes,
  route as miscRoute,
  routes as miscRoutes,
  redirectedRoutes as redirectedMiscRoutes,
} from './misc';
import {
  route as toolsRoute,
  routes as toolsRoutes,
  redirectedRoutes as redirectedToolsRoutes,
} from './tools';
import {
  route as webRoute,
  routes as webRoutes,
  redirectedRoutes as redirectedWebRoutes,
} from './web';

export const homeRoute = {
  name: 'home',
  link: 'Home',
  path: '/',
  navExact: true,
  title: homeMeta.title,
  styles: homeMeta.styles,
  loadContent: () => props => <Home {...props} />,
};

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
  },
  ...redirectedBlogRoutes,
  ...redirectedFictionRoutes,
  ...redirectedGamesRoutes,
  ...redirectedMiscRoutes,
  ...redirectedToolsRoutes,
  ...redirectedWebRoutes,
];

export const topRoutes = [
  homeRoute,
  gamesRoute,
  webRoute,
  toolsRoute,
  miscRoute,
  fictionRoute,
  blogRoute,
];

export default [
  ...topRoutes,
  ...blogCategoryRoutes,
  ...blogRoutes,
  ...fictionCategoryRoutes,
  ...fictionRoutes,
  ...gamesRoutes,
  ...miscCategoryRoutes,
  ...miscRoutes,
  ...toolsRoutes,
  ...webRoutes,
];
