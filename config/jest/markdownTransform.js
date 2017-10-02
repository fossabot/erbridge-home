'use strict';

const markdownLoader = require('markdown-with-front-matter-loader');

module.exports = {
  process(src, filename) {
    return markdownLoader(src);
  },
};
