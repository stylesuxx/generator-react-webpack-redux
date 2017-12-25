'use strict';
const fs = require('fs');
const path = require('path');

const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

const isPresent = function(path) {
  return fs.existsSync(path);
};

const read = function(path) {
  const data = fs.readFileSync(path, 'utf8');
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };

  return esprimaFb.parse(data, options);
};

const write = function(path, tree) {
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = {
    comment: true,
    format: {
      indent: { style: '  ' },
      compact: false
    }
  };

  const code = escodegenJsx.generate(tree, options) + '\n';
  fs.writeFileSync(path, code, 'utf8');
};

const getDestinationPath = function(name, type, suffix) {
  const prefix = path.join('src', type, name);
  const portablePrefix = path.sep === '/' ? prefix : prefix.split(path.sep).join('/');
  return [portablePrefix, suffix].join('.');
};

const getRelativePath = function(name, type, suffix) {
  const filePath = path.join('..', type, name);
  const portableFilePath = path.sep === '/' ? filePath : filePath.split(path.sep).join('/');
  return [portableFilePath, suffix].join('.');
};

const getBaseName = function(path) {
  const items = path.split('/');
  return items[items.length - 1];
};

module.exports = {
  isPresent: isPresent,
  read: read,
  write: write,
  getDestinationPath: getDestinationPath,
  getBaseName: getBaseName,
  getRelativePath: getRelativePath
}
