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

const sortedBlogPosts = [...blogPosts];

sortedBlogPosts.sort((a, b) => moment(b.date) - moment(a.date));

const blogRoutes = sortedBlogPosts.map(
  ({ __content, categories, date, slug, styles, subtitle, title }) => ({
    path: getBlogRoutePath(slug, title),
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
  ...sortedBlogPosts
    .map(post => ({ ...post, date: formatDate(post.date, 'YYYY/MM/DD') }))
    .filter(({ date }) => date)
    .map(({ date, oldSlug, slug, title }) => ({
      path: `/blog/${date}/${sanitizePathComponent(oldSlug || slug || title)}`,
      to: getBlogRoutePath(slug, title),
      exact: true,
    })),
];

export const topRoutes = [homeRoute, blogRoute];

export default [...topRoutes, ...blogCategoryRoutes, ...blogRoutes];
