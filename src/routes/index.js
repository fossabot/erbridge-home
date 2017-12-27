import home from '../pages/home.md';

import {
  categoryRoutes as blogCategoryRoutes,
  route as blogRoute,
  routes as blogRoutes,
  redirectedRoutes as redirectedBlogRoutes,
} from './blog';
import {
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
  route as webRoute,
  routes as webRoutes,
  redirectedRoutes as redirectedWebRoutes,
} from './web';

export const homeRoute = {
  name: 'home',
  link: 'Home',
  path: '/',
  exact: true,
  navExact: true,
  title: home.title,
  styles: home.styles,
  content: home.__content,
};

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
    exact: true,
  },
  ...redirectedBlogRoutes,
  ...redirectedFictionRoutes,
  ...redirectedGamesRoutes,
  ...redirectedWebRoutes,
];

export const topRoutes = [
  homeRoute,
  gamesRoute,
  webRoute,
  fictionRoute,
  blogRoute,
];

export default [
  ...topRoutes,
  ...blogCategoryRoutes,
  ...blogRoutes,
  ...fictionRoutes,
  ...gamesRoutes,
  ...webRoutes,
];
