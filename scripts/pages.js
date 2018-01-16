const { lstatSync, readdirSync, readFileSync } = require('fs');
const { extname, join, relative } = require('path');

const metagen = require('directory-metagen');
const yaml = require('yaml-front-matter');

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
      const source = readFileSync(fullPath, 'utf8');
      const obj = yaml.parse(source);

      delete obj.__content;

      obj.path = relative(`${__dirname}/../src/pages`, fullPath);

      return obj;
    }),
  );

  output += ';';

  return output;
};

getDirectories(`${__dirname}/../src/pages`)
  .map(path => ({
    path,
    format,
    filter: files => files.filter(path => extname(path) === '.md'),
    output: 'index.js',
  }))
  .forEach(metagen);
