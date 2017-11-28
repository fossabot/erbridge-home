const assetsContext = require.context(
  './',
  true,
  /\.(bmp)|(gif)|(jpe?g)|(png)|(pdf)$/,
);

const assets = {};

assetsContext.keys().forEach(path => {
  assets[path.replace(/^.\//, '/assets/')] = assetsContext(path);
});

export default assets;
