import moment from 'moment';

export const formatDate = (date, format) => {
  if (!date) {
    return null;
  }

  date = moment(date);

  if (!date.isValid()) {
    return null;
  }

  return date.format(format);
};

export const sanitizePathComponent = rawComponent =>
  encodeURI(
    rawComponent
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/--+/g, '-')
      .replace(/:|#|\(|\)|@/g, ''),
  );

export const getRoutePath = (prefix, slug, title) =>
  `/${prefix}/${sanitizePathComponent(slug || title)}`;

export const generateRoutes = (
  name,
  basePathName,
  baseLink,
  baseTitle,
  posts,
  extraRedirects = [],
) => {
  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

  const routes = sortedPosts.map(
    ({ __content, image, links, slug, styles, subtitle, title }) => ({
      path: getRoutePath(basePathName, slug, title),
      exact: true,
      image,
      title,
      subtitle,
      links,
      styles,
      content: __content,
    }),
  );

  const route = {
    name,
    link: baseLink,
    path: `/${basePathName}`,
    exact: true,
    title: baseTitle,
    routes,
  };

  const redirectedRoutes = [
    ...extraRedirects,
    ...sortedPosts
      .filter(({ oldSlug }) => oldSlug)
      .map(({ oldSlug, slug, title }) => ({
        path: `/${basePathName}/${sanitizePathComponent(oldSlug)}`,
        to: getRoutePath(basePathName, slug, title),
        exact: true,
      })),
  ];

  return { redirectedRoutes, route, routes };
};
