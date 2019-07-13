const path = require('path');

const babelLoaderMatcher = rule => {
  const loaderName = 'babel-loader';

  return (
    rule &&
    rule.loader &&
    typeof rule.loader === 'string' &&
    (rule.loader.indexOf(`${path.sep}${loaderName}${path.sep}`) !== -1 ||
      rule.loader.indexOf(`@${loaderName}${path.sep}`) !== -1)
  );
};

const getBabelLoader = rules => {
  let loader;

  rules.some(rule => {
    loader = babelLoaderMatcher(rule)
      ? rule
      : getBabelLoader(
          rule.use ||
            rule.oneOf ||
            (Array.isArray(rule.loader) && rule.loader) ||
            [],
        );

    return loader;
  });

  return loader;
};

module.exports = (config, _env) => {
  const babelLoader = getBabelLoader(config.module.rules);

  config.module.rules.map(rule => {
    if (typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
      return rule;
    }

    rule.oneOf.unshift({
      test: /.mdx$/,
      use: [
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
        '@mdx-js/loader',
      ],
    });

    return rule;
  });

  return config;
};
