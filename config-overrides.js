const rewireMarkdown = require('react-app-rewire-markdown-with-front-matter-loader');

module.exports = {
  webpack: rewireMarkdown,

  jest(config) {
    if (!config.snapshotSerializers) {
      config.snapshotSerializers = [];
    }

    config.snapshotSerializers.push('enzyme-to-json/serializer');

    return config;
  },
};
