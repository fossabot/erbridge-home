import formatDateFn from 'date-fns/format';

export const formatDate = (date, format) => {
  if (!date) {
    return null;
  }

  return formatDateFn(date, format);
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

export const loadPageContent = path => () =>
  import(`../pages/${path}`).then(({ __content }) => __content);

export const generateRoutes = (
  name,
  basePathName,
  baseLink,
  baseTitle,
  posts,
  extraRedirects = [],
) => {
  const basePath = `/${basePathName}`;

  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => b.sortOrder - a.sortOrder);

  const routes = sortedPosts.map(
    ({
      image,
      links,
      path,
      showHeadingImage = true,
      slug,
      styles,
      subtitle,
      tags,
      title,
    }) => ({
      path: getRoutePath(basePathName, slug, title),
      image,
      showHeadingImage,
      title,
      subtitle,
      links,
      tags,
      styles,
      loadContent: loadPageContent(path),
    }),
  );

  const route = {
    name,
    link: baseLink,
    path: basePath,
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
      })),
  ];

  return { redirectedRoutes, route, routes };
};
