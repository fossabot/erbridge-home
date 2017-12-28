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
