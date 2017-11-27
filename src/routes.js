import moment from 'moment';

import blogPosts from './blog';

import home from './pages/home.md';

const sanitizePathComponent = rawComponent =>
  encodeURI(
    rawComponent
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/--+/g, '-')
      .replace(/:|#/g, ''),
  );

const getBlogRoutePath = (slug, title) =>
  `/blog/${sanitizePathComponent(slug || title)}`;

const formatDate = (date, format) => {
  if (!date) {
    return null;
  }

  date = moment(date);

  if (!date.isValid()) {
    return null;
  }

  return date.format(format);
};

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
  ({ __content, date, slug, styles, title }) => ({
    path: getBlogRoutePath(slug, title),
    exact: true,
    title,
    date: formatDate(date, 'DD MMMM YYYY'),
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
    .map(post => ({ ...post, date: formatDate(post.date, 'YYYY/MM/DD') }))
    .filter(({ date }) => date)
    .map(({ date, oldSlug, slug, title }) => ({
      path: `/blog/${date}/${sanitizePathComponent(oldSlug || slug || title)}`,
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
