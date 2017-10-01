import home from './pages/home.md';

export const homeRoute = {
  name: 'home',
  path: '/',
  exact: true,
  link: 'Home',
  title: home.title,
  content: home.__content,
};

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
  },
];

export const topRoutes = [homeRoute];

export default [...topRoutes];
