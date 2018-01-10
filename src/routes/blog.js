import compareDateDesc from 'date-fns/compare_desc';

import blogPosts from '../pages/blog';

import { formatDate, getRoutePath, sanitizePathComponent } from './helpers';

// FIXME: Refactor this module to use the output of helper.generateRoutes.

const sortedPosts = [...blogPosts];

sortedPosts.sort((a, b) => compareDateDesc(a.date, b.date));

export const routes = sortedPosts.map(
  ({ __content, categories, date, image, slug, styles, subtitle, title }) => ({
    path: getRoutePath('blog', slug, title),
    exact: true,
    image,
    title,
    subtitle,
    date: formatDate(date, 'DD MMMM YYYY'),
    categories,
    styles,
    content: __content,
  }),
);

export const categoryRoutes = [
  {
    name: 'blog__all',
    path: '/blog/all',
    exact: true,
    title: 'All Posts',
    routes,
  },
  {
    name: 'blog__gamedev',
    path: '/blog/gamedev',
    exact: true,
    title: 'Game Development',
    routes: routes.filter(
      ({ categories }) => categories && categories.indexOf('gamedev') !== -1,
    ),
  },
  {
    name: 'blog__journals',
    path: '/blog/journals',
    exact: true,
    title: 'Roleplaying Journals',
    routes: routes.filter(
      ({ categories }) =>
        categories &&
        categories.indexOf('roleplaying') !== -1 &&
        categories.indexOf('journal') !== -1,
    ),
  },
];

export const route = {
  name: 'blog',
  link: 'Blog',
  path: '/blog',
  exact: true,
  title: 'Blog',
  routes: categoryRoutes,
};

export const redirectedRoutes = [
  {
    path: '/blog/skald',
    to: route.path,
    exact: true,
  },
  ...sortedPosts
    .map(post => ({ ...post, date: formatDate(post.date, 'YYYY/MM/DD') }))
    .filter(({ date }) => date)
    .map(({ date, oldSlug, slug, title }) => ({
      path: `/blog/${date}/${sanitizePathComponent(oldSlug || slug || title)}`,
      to: getRoutePath('blog', slug, title),
      exact: true,
    })),
];
