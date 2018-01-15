const { lstatSync, readdirSync } = require('fs');
const { extname, join } = require('path');

const metagen = require('directory-metagen');

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const format = files => {
  let output = 'export default [\n';

  output += files.map(path => `  require('./${path}'),`).join('\n');

  output += '];\n';

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
