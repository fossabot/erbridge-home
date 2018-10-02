import compareDateDesc from 'date-fns/compare_desc';
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
  `/${prefix}${
    slug || title ? `/${sanitizePathComponent(slug || title)}` : ''
  }`;

const generateRedirectsFromOldSlugs = (posts, basePathName) =>
  posts.filter(({ oldSlug }) => oldSlug).map(({ oldSlug, slug, title }) => ({
    path: `/${basePathName}/${sanitizePathComponent(oldSlug)}`,
    to: getRoutePath(basePathName, slug, title),
  }));

const loadPageContent = path => async () => {
  const page = await import(`../pages/${path}`);

  return page.default.__content;
};

export const generateRoutes = (
  name,
  basePathName,
  baseLink,
  baseTitle,
  posts,
  {
    categories = [],
    extraRedirects = [],
    generateRedirects = generateRedirectsFromOldSlugs,
    routeDefaults = {},
  } = {},
) => {
  const basePath = `/${basePathName}`;

  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => {
    if (a.sortOrder && b.sortOrder) {
      return b.sortOrder - a.sortOrder;
    }

    if (a.sortOrder) {
      return -1;
    }

    if (b.sortOrder) {
      return 1;
    }

    if (a.date && b.date) {
      return compareDateDesc(a.date, b.date);
    }

    return 0;
  });

  const routes = sortedPosts.map(
    ({
      categories,
      date,
      image,
      links,
      path,
      showHeadingImage = routeDefaults.showHeadingImage !== undefined
        ? routeDefaults.showHeadingImage
        : true,
      slug,
      styles,
      subtitle,
      tags,
      title,
    }) => ({
      path: getRoutePath(basePathName, slug, title),
      categories,
      image,
      showHeadingImage,
      title,
      subtitle,
      date: formatDate(date, 'DD MMMM YYYY'),
      links,
      tags,
      styles,
      loadContent: loadPageContent(path),
    }),
  );

  const categoryRoutes = categories
    .map(({ link, name: categoryName, path, routeFilter, title }) => {
      const filteredRoutes = routes.filter(routeFilter);

      if (!filteredRoutes.length) {
        return null;
      }

      return {
        name: `${name}__${categoryName}`,
        path: `${basePath}/${path}`,
        link,
        title,
        routes: filteredRoutes,
      };
    })
    .filter(route => route);

  const route = {
    name,
    path: basePath,
    link: baseLink,
    title: baseTitle,
    routes: categoryRoutes.length ? categoryRoutes : routes,
  };

  const redirectedRoutes = [
    ...extraRedirects,
    ...generateRedirects([...sortedPosts], basePathName),
  ];

  return { categoryRoutes, redirectedRoutes, route, routes };
};
