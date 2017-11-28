import moment from 'moment';

import blogPosts from './blog';
import fictionPosts from './fiction';

import home from './pages/home.md';

const sanitizePathComponent = rawComponent =>
  encodeURI(
    rawComponent
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/--+/g, '-')
      .replace(/:|#|\(|\)/g, ''),
  );

const getRoutePath = (prefix, slug, title) =>
  `/${prefix}/${sanitizePathComponent(slug || title)}`;

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

const sortedFictionPosts = [...fictionPosts];

sortedFictionPosts.sort((a, b) => b.sortOrder - a.sortOrder);

const fictionRoutes = sortedFictionPosts.map(
  ({ __content, slug, styles, subtitle, title }) => ({
    path: getRoutePath('fiction', slug, title),
    exact: true,
    title,
    subtitle,
    styles,
    content: __content,
  }),
);

const fictionRoute = {
  name: 'fiction',
  link: 'Fiction',
  path: '/fiction',
  exact: true,
  title: 'Fiction',
  routes: fictionRoutes,
};

const sortedBlogPosts = [...blogPosts];

sortedBlogPosts.sort((a, b) => moment(b.date) - moment(a.date));

const blogRoutes = sortedBlogPosts.map(
  ({ __content, categories, date, slug, styles, subtitle, title }) => ({
    path: getRoutePath('blog', slug, title),
    exact: true,
    title,
    subtitle,
    date: formatDate(date, 'DD MMMM YYYY'),
    categories,
    styles,
    content: __content,
  }),
);

const blogCategoryRoutes = [
  {
    name: 'blog__all',
    path: '/blog/all',
    exact: true,
    title: 'All Posts',
    routes: blogRoutes,
  },
  {
    name: 'blog__gamedev',
    path: '/blog/gamedev',
    exact: true,
    title: 'Game Development',
    routes: blogRoutes.filter(
      ({ categories }) => categories && categories.indexOf('gamedev') !== -1,
    ),
  },
  {
    name: 'blog__journals',
    path: '/blog/journals',
    exact: true,
    title: 'Roleplaying Journals',
    routes: blogRoutes.filter(
      ({ categories }) =>
        categories &&
        categories.indexOf('roleplaying') !== -1 &&
        categories.indexOf('journal') !== -1,
    ),
  },
];

const blogRoute = {
  name: 'blog',
  link: 'Blog',
  path: '/blog',
  exact: true,
  title: 'Blog',
  routes: blogCategoryRoutes,
};

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
    exact: true,
  },
  {
    path: '/blog/skald',
    to: blogRoute.path,
    exact: true,
  },
  ...sortedFictionPosts
    .filter(({ oldSlug }) => oldSlug)
    .map(({ oldSlug, slug, title }) => ({
      path: `/fiction/${sanitizePathComponent(oldSlug)}`,
      to: getRoutePath('fiction', slug, title),
      exact: true,
    })),
  ...sortedBlogPosts
    .map(post => ({ ...post, date: formatDate(post.date, 'YYYY/MM/DD') }))
    .filter(({ date }) => date)
    .map(({ date, oldSlug, slug, title }) => ({
      path: `/blog/${date}/${sanitizePathComponent(oldSlug || slug || title)}`,
      to: getRoutePath('blog', slug, title),
      exact: true,
    })),
];

export const topRoutes = [homeRoute, fictionRoute, blogRoute];

export default [
  ...topRoutes,
  ...fictionRoutes,
  ...blogCategoryRoutes,
  ...blogRoutes,
];
