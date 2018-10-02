const rewireMarkdown = require('react-app-rewire-markdown-with-front-matter-loader');

module.exports = function override(config, env) {
  config = rewireMarkdown(config, env);

  return config;
};
