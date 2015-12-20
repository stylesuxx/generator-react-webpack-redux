'use strict';
let fs = require('fs');

/* For regular JS files */
//let esprima = require('esprima');
//let escodegen = require('escodegen');

/* For files with JSX syntax */
let esprimaFb = require('esprima-fb');
let escodegenJsx = require('escodegen-wallaby');

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
  let options = { comment: true, format: { indent: { style: '  ' } } };
  let code = escodegenJsx.generate(tree, options);
  fs.writeFileSync(path, code, 'utf8');
};

module.exports.read = read;
module.exports.write = write;
