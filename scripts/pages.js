const { lstatSync, readdirSync, readFileSync } = require('fs');
const { extname, join, relative } = require('path');

const babel = require('@babel/core'); // Inherited from react-scripts.
const mdx = require('@mdx-js/mdx');
const metagen = require('directory-metagen');
const requireFromString = require('require-from-string');

process.env.BABEL_ENV = 'production';

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const format = (files, { path: basePath }) => {
  let output = 'export default ';

  output += JSON.stringify(
    files.map(path => {
      const fullPath = `${basePath}/${path}`;
      const text = readFileSync(fullPath, 'utf8');
      const jsx = mdx.sync(text);
      const obj = requireFromString(
        babel
          .transformSync(jsx, {
            presets: [
              [
                require.resolve('babel-preset-env'),
                { targets: { node: '10' } },
              ],
            ],
            plugins: [
              require.resolve('@babel/plugin-proposal-object-rest-spread'), // Inherited from react-scripts.
              require.resolve('@babel/plugin-transform-react-jsx'), // Inherited from react-scripts.
            ],
          })
          .code.replace(/require\(.+\)/g, '"removed"'), // Strip out require calls, since we only care about the metadata.
        fullPath,
      );

      return {
        ...(obj.meta || {}),
        path: relative(`${__dirname}/../src/pages`, fullPath),
      };
    }),
  );

  output += ';';

  return output;
};

getDirectories(`${__dirname}/../src/pages`)
  .map(path => ({
    path,
    format,
    filter: files => files.filter(path => extname(path) === '.mdx'),
    output: 'index.js',
  }))
  .forEach(metagen);
