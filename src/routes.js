import moment from 'moment';

import blogPosts from './blog';

import home from './pages/home.md';

const sanitizePathComponent = rawComponent =>
  encodeURI(rawComponent.toLowerCase().replace(/\s/g, '-'));

const getBlogRoutePath = (slug, title) =>
  `/blog/${sanitizePathComponent(slug || title)}`;

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

export const blogRoutes = blogPosts.map(
  ({ __content, slug, styles, title }) => ({
    path: getBlogRoutePath(slug, title),
    exact: true,
    title,
    styles,
    content: __content,
  }),
);

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
    exact: true,
  },
  ...blogPosts
    .map(post => ({ ...post, date: moment(post.date) }))
    .filter(({ date }) => date.isValid())
    .map(({ date, oldSlug, slug, title }) => ({
      path: `/blog/${date.format('YYYY/MM/DD')}/${sanitizePathComponent(
        oldSlug || slug || title,
      )}`,
      to: getBlogRoutePath(slug, title),
      exact: true,
    })),
];

export const topRoutes = [
  homeRoute,
  {
    name: 'blog',
    link: 'Blog',
    path: '/blog',
    exact: true,
    routes: blogRoutes,
  },
];

export default [...topRoutes, ...blogRoutes];
